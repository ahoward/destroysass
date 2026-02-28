import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const FROM = "destroysaas <ara@destroysaas.coop>";
const REPLY_TO = "ara@destroysaas.coop";

const STATUS_LABELS: Record<string, string> = {
  proposed: "Proposed",
  gaining_traction: "Gaining Traction",
  threshold_reached: "Threshold Reached",
  cell_forming: "Cell Forming",
  active: "Active",
  cancelled: "Cancelled",
};

function get_resend(): Resend | null {
  if (!RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping email");
    return null;
  }
  return new Resend(RESEND_API_KEY);
}

function get_service_client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) return null;
  return createClient(url, key);
}

export function email_template(title: string, body_html: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#e5e5e5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="font-size:14px;font-weight:600;color:#dc2626;margin-bottom:24px;">destroysaas</div>
    <div style="font-size:18px;font-weight:600;margin-bottom:16px;color:#fff;">${title}</div>
    <div style="font-size:14px;line-height:1.6;color:#d4d4d4;">
      ${body_html}
    </div>
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid #262626;font-size:12px;color:#737373;">
      <a href="https://destroysaas.coop/dashboard" style="color:#737373;">Manage your account</a>
    </div>
  </div>
</body>
</html>`;
}

export async function send_email(to: string, subject: string, html: string): Promise<void> {
  const resend = get_resend();
  if (!resend) return;

  try {
    await resend.emails.send({ from: FROM, replyTo: REPLY_TO, to, subject, html });
  } catch (err) {
    console.error("[email] send failed:", err);
  }
}

async function get_user_email(user_id: string): Promise<string | null> {
  const client = get_service_client();
  if (!client) return null;

  const { data, error } = await client.auth.admin.getUserById(user_id);
  if (error || !data?.user?.email) return null;
  return data.user.email;
}

async function get_pledger_emails(idea_id: string): Promise<string[]> {
  const client = get_service_client();
  if (!client) return [];

  const { data: pledges } = await client
    .from("pledges")
    .select("user_id")
    .eq("idea_id", idea_id);

  if (!pledges || pledges.length === 0) return [];

  const emails: string[] = [];
  for (const p of pledges) {
    const email = await get_user_email(p.user_id);
    if (email) emails.push(email);
  }
  return emails;
}

export async function notify_new_pledge(
  idea_id: string,
  pledger_id: string,
  amount: number
): Promise<void> {
  const client = get_service_client();
  if (!client) return;

  const { data: idea } = await client
    .from("idea_board")
    .select("title, created_by, total_pledged, pledge_count")
    .eq("id", idea_id)
    .single();

  if (!idea || !idea.created_by) return;

  // don't email yourself
  if (idea.created_by === pledger_id) return;

  const creator_email = await get_user_email(idea.created_by);
  if (!creator_email) return;

  const html = email_template(
    `New pledge on "${idea.title}"`,
    `<p>Someone just pledged <strong>$${amount}/mo</strong> to your idea.</p>
     <p style="margin-top:12px;">
       <strong>Total pledged:</strong> $${idea.total_pledged}/mo<br>
       <strong>Pledgers:</strong> ${idea.pledge_count}
     </p>
     <p style="margin-top:12px;">
       <a href="https://destroysaas.coop/ideas/${idea_id}" style="color:#dc2626;">View idea &rarr;</a>
     </p>`
  );

  await send_email(
    creator_email,
    `someone pledged $${amount}/mo to your idea: ${idea.title}`,
    html
  );
}

export async function notify_status_change(
  idea_id: string,
  new_status: string
): Promise<void> {
  const client = get_service_client();
  if (!client) return;

  const { data: idea } = await client
    .from("idea_board")
    .select("title, total_pledged, pledge_count")
    .eq("id", idea_id)
    .single();

  if (!idea) return;

  const emails = await get_pledger_emails(idea_id);
  if (emails.length === 0) return;

  const label = STATUS_LABELS[new_status] || new_status;

  const html = email_template(
    `"${idea.title}" is now ${label}`,
    `<p>An idea you pledged to has a new status: <strong>${label}</strong></p>
     <p style="margin-top:12px;">
       <strong>Total pledged:</strong> $${idea.total_pledged}/mo<br>
       <strong>Pledgers:</strong> ${idea.pledge_count}
     </p>
     <p style="margin-top:12px;">
       <a href="https://destroysaas.coop/ideas/${idea_id}" style="color:#dc2626;">View idea &rarr;</a>
     </p>`
  );

  const subject = `your idea "${idea.title}" is now ${label}`;
  for (const email of emails) {
    void send_email(email, subject, html);
  }
}

export async function notify_cell_formation(idea_id: string): Promise<void> {
  const client = get_service_client();
  if (!client) return;

  const { data: idea } = await client
    .from("idea_board")
    .select("title, created_by, total_pledged, pledge_count")
    .eq("id", idea_id)
    .single();

  if (!idea) return;

  const pledger_emails = await get_pledger_emails(idea_id);
  const creator_email = idea.created_by
    ? await get_user_email(idea.created_by)
    : null;

  const all_emails = new Set(pledger_emails);
  if (creator_email) all_emails.add(creator_email);

  if (all_emails.size === 0) return;

  const html = email_template(
    `Cell forming: ${idea.title}`,
    `<p>Great news — <strong>${idea.title}</strong> has enough support to form a cell!</p>
     <p style="margin-top:12px;">
       <strong>Total pledged:</strong> $${idea.total_pledged}/mo<br>
       <strong>Pledgers:</strong> ${idea.pledge_count}
     </p>
     <p style="margin-top:12px;">What happens next: the destroysaas team will reach out to coordinate the cell formation process. Stay tuned.</p>
     <p style="margin-top:12px;">
       <a href="https://destroysaas.coop/ideas/${idea_id}" style="color:#dc2626;">View idea &rarr;</a>
     </p>`
  );

  const subject = `cell forming: ${idea.title}`;
  for (const email of all_emails) {
    void send_email(email, subject, html);
  }
}
