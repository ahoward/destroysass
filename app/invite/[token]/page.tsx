import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import ViewTracker from "./view_tracker";

export const metadata: Metadata = {
  title: "you're invited — destroysaas",
};

type Props = { params: Promise<{ token: string }> };

export default async function InviteLandingPage({ params }: Props) {
  const { token } = await params;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!key) notFound();

  const adminClient = createServiceClient(url, key);

  const { data: invitation } = await adminClient
    .from("invitations")
    .select("*")
    .eq("token", token)
    .single();

  if (!invitation) notFound();

  // expired?
  const isExpired =
    invitation.expires_at && new Date(invitation.expires_at) < new Date();
  const isAccepted = !!invitation.accepted_at;

  // check if visitor is signed in
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const acceptUrl = `/invite/${token}/accept`;
  const authUrl = `/auth?next=${encodeURIComponent(acceptUrl)}`;

  if (isExpired) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
        <nav className="max-w-2xl mx-auto px-6 py-6">
          <a
            href="/"
            className="text-red-600 font-bold text-lg tracking-tight"
          >
            destroysaas
          </a>
        </nav>
        <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
          <h1 className="text-3xl font-bold tracking-tight lowercase mb-4">
            invitation expired
          </h1>
          <p className="text-[var(--text-muted)] mb-8">
            this invitation is no longer valid. contact the person who sent it
            for a new one.
          </p>
          <a
            href="/"
            className="text-sm text-red-600 hover:text-red-500 transition-colors"
          >
            &larr; back to home
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <ViewTracker token={token} />

      <nav className="max-w-2xl mx-auto px-6 py-6">
        <a
          href="/"
          className="text-red-600 font-bold text-lg tracking-tight"
        >
          destroysaas
        </a>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        {/* personalized greeting */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          {invitation.recipient_name
            ? `${invitation.recipient_name}, you're invited`
            : "you're invited"}
        </h1>

        {/* note from sender */}
        {invitation.note && (
          <div className="border-l-2 border-red-600 pl-6 mb-12">
            <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
              {invitation.note}
            </p>
          </div>
        )}

        {/* the pitch */}
        <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed mb-12">
          <p>
            destroysaas is building the protocol layer that replaces saas
            subscriptions. small businesses collectively fund, own, and control
            the software they depend on &mdash; through legally enforceable
            cooperative structures, not promises.
          </p>
          <p>
            you&apos;ve been invited to join the{" "}
            <span className="text-[var(--text-primary)] font-medium">
              {invitation.group_names.join(", ")}
            </span>{" "}
            &mdash; an inner circle with early access to platform metrics,
            strategy, and the work behind the work.
          </p>
        </div>

        {/* what you'll see */}
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            what&apos;s inside
          </h2>
          <div className="space-y-3 text-sm">
            {[
              "live platform metrics — users, ideas, pledges, cells",
              "honest state of the union — what's built, what's not, what's next",
              "the bizops playbook — legal formation, financial rails, customer discovery",
              "open business questions — the decisions that need answers before we scale",
            ].map((item) => (
              <div key={item} className="flex gap-2">
                <span className="text-red-600 shrink-0">&bull;</span>
                <span className="text-[var(--text-secondary)]">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* why this matters */}
        <section className="mb-12">
          <div className="border-l-2 border-[var(--border-primary)] pl-6">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              ai collapsed the cost of building software but not the cost of
              maintaining it. 80% of total cost of ownership is maintenance,
              updates, hosting, support. that&apos;s the part saas vendors use to
              extract from businesses indefinitely. we&apos;re building the
              alternative &mdash; collective ownership through LCA/DAO hybrids
              with real legal teeth.
            </p>
          </div>
        </section>

        {/* CTA */}
        {isAccepted ? (
          <div className="border border-green-600/40 rounded-lg p-6 text-center">
            <p className="text-green-500 font-semibold mb-2">
              invitation accepted
            </p>
            <a
              href={invitation.redirect_path}
              className="text-sm text-red-600 hover:text-red-500 transition-colors"
            >
              go to {invitation.redirect_path} &rarr;
            </a>
          </div>
        ) : user ? (
          <a
            href={acceptUrl}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            accept invitation &rarr;
          </a>
        ) : (
          <div className="space-y-3">
            <a
              href={authUrl}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded transition-colors"
            >
              sign up to accept &rarr;
            </a>
            <p className="text-sm text-[var(--text-muted)]">
              already have an account?{" "}
              <a
                href={authUrl}
                className="text-red-600 hover:text-red-500 transition-colors"
              >
                sign in
              </a>
            </p>
          </div>
        )}

        {/* learn more */}
        <div className="border-t border-[var(--border-primary)] pt-8 mt-16">
          <p className="text-sm text-[var(--text-muted)] mb-4">
            want to learn more before committing?
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="/about"
              className="text-red-600 hover:text-red-500 transition-colors"
            >
              about destroysaas
            </a>
            <a
              href="/about/legal"
              className="text-red-600 hover:text-red-500 transition-colors"
            >
              the legal model
            </a>
            <a
              href="/about/money"
              className="text-red-600 hover:text-red-500 transition-colors"
            >
              the financial model
            </a>
            <a
              href="/about/authors"
              className="text-red-600 hover:text-red-500 transition-colors"
            >
              the authors
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
