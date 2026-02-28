import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";
import { is_member, is_sudo } from "@/lib/groups";

export const metadata: Metadata = {
  title: "bizops — cabal — destroysaas",
};

export default async function BizOpsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const authorized =
    (await is_sudo(supabase, user)) ||
    (await is_member(supabase, user.id, "cabal"));

  if (!authorized) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/cabal" />
      {/* cabal sub-nav */}
      <div className="max-w-2xl mx-auto px-6 pt-2 flex gap-4 text-sm border-b border-red-600 pb-3">
        <a href="/cabal" className="text-[var(--text-muted)] hover:text-red-600 transition-colors">status</a>
        <a href="/cabal/bizops" className="text-red-600 font-medium">bizops</a>
      </div>

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-2">
          the work behind the work
        </h1>
        <p className="text-[var(--text-muted)] text-sm mb-16">
          bizops playbook &mdash; do things that don&apos;t scale
        </p>

        {/* philosophy */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">the philosophy</h2>
          <div className="border-l-2 border-red-600 pl-6 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the tech works. 22 features shipped in 2 days. building software is not the hard part.
              the hard part is everything that makes it a <em>business</em>: legal entities, bank accounts,
              contracts, certifications, compliance, and convincing real humans to pay real money.
            </p>
            <p>
              our approach: <span className="text-[var(--text-primary)] font-medium">mechanical turk everything first</span>.
              do it by hand. do it with spreadsheets and phone calls and pdfs. document every step.
              then automate the parts that hurt. paul graham was right &mdash; do things that don&apos;t scale.
            </p>
            <p>
              this page is the playbook for every non-code task that needs to happen to make
              destroysaas real. each section is a manual process that eventually becomes an automated one.
            </p>
          </div>
        </section>

        {/* legal formation */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">legal formation</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p className="text-[var(--text-primary)] font-medium">
              every cell needs a legal entity. every legal entity starts with paperwork.
            </p>
            <p>
              the model uses <span className="text-[var(--text-primary)] font-medium">Wyoming LCAs</span> (Limited
              Cooperative Associations). wyoming because: lowest filing fees (~$100), no state income tax,
              strong cooperative statutes, and privacy-friendly for member lists.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">manual process (now)</h3>
            <div className="space-y-3 text-sm">
              {[
                { step: "1", task: "draft operating agreement", detail: "template based on wyoming cooperative statute. defines share classes (A/B), voting rules, exit protections, cell SLA terms. need a lawyer to review the first one — then it becomes the template for every cell." },
                { step: "2", task: "file articles of organization", detail: "wyoming secretary of state. ~$100 filing fee. name reservation first ($50). registered agent required — use a $50/yr service or be your own initially." },
                { step: "3", task: "get an EIN", detail: "IRS form SS-4. free. takes 15 minutes online. needed for bank account and stripe." },
                { step: "4", task: "open a bank account", detail: "mercury or relay (startup-friendly banks). needs EIN, articles, operating agreement. this is the cell's treasury until opencollective is connected." },
                { step: "5", task: "register with opencollective", detail: "create a collective for the cell. connect bank account. set up transparent ledger. monthly contributions flow in here." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-red-600 font-bold tabular-nums shrink-0 w-6">{item.step}</span>
                  <div>
                    <p className="font-medium text-[var(--text-primary)] mb-0.5">{item.task}</p>
                    <p className="text-[var(--text-muted)] leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-semibold text-[var(--text-primary)] mt-6">automation horizon</h3>
            <p className="text-sm text-[var(--text-muted)]">
              month 6+: &ldquo;coop-in-a-box&rdquo; button. pre-filled articles from cell data, e-sign operating agreement,
              auto-file via wyoming API (if available) or paralegal service, EIN application via IRS online,
              mercury/relay API for bank account, opencollective API for collective creation.
              the first one we do by hand. the tenth one should be one click.
            </p>
          </div>
        </section>

        {/* financial rails */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">financial rails</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p className="text-[var(--text-primary)] font-medium">
              money needs to move: from pledgers to treasury, from treasury to cells.
              every step needs an entity, an account, and a paper trail.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="border-l-2 border-[var(--border-primary)] pl-6">
              <p className="font-semibold text-[var(--text-primary)] mb-1">platform entity (prerequisite)</p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                destroysaas itself needs a legal entity to receive stripe payments.
                options: LLC (simplest), or eat our own dogfood and form as an LCA.
                need: EIN, bank account, stripe account. this blocks everything.
              </p>
            </div>

            <div className="border-l-2 border-[var(--border-primary)] pl-6">
              <p className="font-semibold text-[var(--text-primary)] mb-1">stripe connect (per cell)</p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                each cell gets a stripe connected account. pledges flow: pledger &rarr; platform stripe &rarr;
                cell stripe connected account (minus platform fee). manual onboarding for first cells.
                stripe connect express handles most of the compliance. need to decide: standard vs express vs custom.
              </p>
            </div>

            <div className="border-l-2 border-[var(--border-primary)] pl-6">
              <p className="font-semibold text-[var(--text-primary)] mb-1">treasury management (manual first)</p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                for the first cell: google sheet tracking inflows and outflows. monthly: collect pledges via stripe,
                transfer to cell bank account, pay cell invoice, record in opencollective.
                automate when we understand the flow. the spreadsheet is the spec for the software.
              </p>
            </div>

            <div className="border-l-2 border-[var(--border-primary)] pl-6">
              <p className="font-semibold text-[var(--text-primary)] mb-1">cell payments</p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                cells invoice the LCA monthly. payment contingent on SLA metrics (uptime, bug resolution, delivery).
                for the first cell: manual review of metrics, manual approval of invoice, manual bank transfer.
                eventually: automated SLA monitoring, auto-approval, auto-payment via opencollective.
              </p>
            </div>
          </div>
        </section>

        {/* cell recruitment */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">cell recruitment</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the supply side. without certified cells, triggered ideas have nobody to build them.
              we need <span className="text-[var(--text-primary)] font-medium">3&ndash;5 certified cooperatives</span> before
              the first cell triggers.
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            {[
              { task: "define certification criteria", detail: "technical competence (portfolio, references), cooperative structure (actual co-op, not a consulting shop), financial responsibility (can they sustain a 6-month engagement?), communication standards." },
              { task: "find candidates", detail: "tech co-op directories, freelance cooperatives, worker-owned agencies. reach out directly. explain the model. see who's interested in guaranteed monthly revenue under an SLA vs. hustle-for-clients." },
              { task: "vet manually", detail: "video call. review portfolio. check references. review their cooperative bylaws. understand their capacity. this is a handshake deal with the first few — trust-based, not process-based." },
              { task: "white-glove onboarding", detail: "walk the first cell through the entire process: SLA terms, how the treasury works, how governance works, what happens if they miss metrics, what happens if they want to leave." },
              { task: "document everything", detail: "the vetting process becomes the certification checklist. the onboarding walkthrough becomes the cell handbook. the first one is expensive. the rest are cheap." },
            ].map((item) => (
              <div key={item.task} className="flex gap-2">
                <span className="text-red-600 shrink-0">&bull;</span>
                <div>
                  <span className="font-medium text-[var(--text-primary)]">{item.task}</span>
                  <span className="text-[var(--text-muted)]"> &mdash; {item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* first cell playbook */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">first cell playbook</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p className="text-[var(--text-primary)] font-medium">
              the first cell is the proof of concept. do it entirely by hand. document every step.
              this becomes the template for every cell after.
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            {[
              { step: "1", task: "pick the idea", detail: "the first idea that crosses $1k/mo in pledges. or — seed an idea ourselves with a known group of friendly SMBs who have a real problem." },
              { step: "2", task: "validate sponsors", detail: "call every pledger. confirm they understand the model. confirm they'll actually pay. weed out tire-kickers." },
              { step: "3", task: "file the LCA", detail: "wyoming. articles of organization. operating agreement. EIN. bank account. registered agent. 1–2 weeks." },
              { step: "4", task: "set up financial rails", detail: "stripe connected account. opencollective collective. connect bank. test a real payment end-to-end." },
              { step: "5", task: "select cell", detail: "present certified cells to the sponsor group. they vote (or we recommend). sign the SLA. transfer first month's treasury." },
              { step: "6", task: "ship v1", detail: "cell builds. sponsors test. iterate. ship. this is where the model proves itself or breaks." },
              { step: "7", task: "document the playbook", detail: "write down everything. every email, every filing, every phone call, every decision. this document becomes coop-in-a-box." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-red-600 font-bold tabular-nums shrink-0 w-6">{item.step}</span>
                <div>
                  <span className="font-medium text-[var(--text-primary)]">{item.task}</span>
                  <span className="text-[var(--text-muted)]"> &mdash; {item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* customer discovery */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">customer discovery</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the demand side. nothing matters if we can&apos;t find businesses willing to pay.
            </p>
            <p className="text-[var(--text-primary)] font-medium">
              target: 20 conversations with smb owners in the next 30 days.
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            {[
              { task: "identify the pain", detail: "which businesses are spending $500+/mo on SaaS tools they hate? which ones just got hit with a price increase? which ones lost access to their data when a vendor shut down?" },
              { task: "find them", detail: "local business groups, chambers of commerce, indie hacker communities, reddit r/smallbusiness, linkedin outreach. warm intros > cold emails." },
              { task: "have the conversation", detail: "\"what software do you depend on that you wish you owned?\" \"what would you pay monthly for a tool your group collectively controlled?\" listen more than pitch." },
              { task: "get them on the board", detail: "every conversation should end with: \"submit your idea at destroysaas.coop\" or \"pledge on this existing idea.\" track conversions." },
              { task: "pattern match", detail: "after 20 conversations, the first cell's problem will be obvious. it'll be the thing 5+ people independently described. that's the one we form around." },
            ].map((item) => (
              <div key={item.task} className="flex gap-2">
                <span className="text-red-600 shrink-0">&bull;</span>
                <div>
                  <span className="font-medium text-[var(--text-primary)]">{item.task}</span>
                  <span className="text-[var(--text-muted)]"> &mdash; {item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* automation horizon */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">the automation horizon</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              everything above starts manual. here&apos;s when it gets automated:
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            {[
              { when: "month 1", what: "stripe integration — real pledges, real subscriptions, webhook lifecycle" },
              { when: "month 2", what: "automated pledge → treasury pipeline (stripe connect per cell)" },
              { when: "month 3", what: "opencollective API — auto-create collectives, transparent ledger sync" },
              { when: "month 4", what: "cell SLA monitoring — automated uptime checks, bug resolution tracking" },
              { when: "month 5", what: "automated cell payments — SLA metrics → auto-approve → auto-pay" },
              { when: "month 6+", what: "coop-in-a-box — one-click LCA filing, operating agreement e-sign, bank account setup, full self-service cell formation" },
            ].map((item) => (
              <div key={item.when} className="flex gap-4">
                <span className="text-red-600 font-medium tabular-nums shrink-0 w-20">{item.when}</span>
                <span className="text-[var(--text-muted)]">{item.what}</span>
              </div>
            ))}
          </div>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              the rule: do it by hand until it hurts, then automate.
              the spreadsheet becomes the spec. the phone call becomes the API.
              the first cell is the most expensive. every cell after is cheaper.
              that&apos;s the business.
            </p>
          </div>
        </section>

        {/* nav */}
        <div className="border-t border-[var(--border-primary)] pt-8">
          <a
            href="/cabal"
            className="inline-block text-sm text-red-600 hover:text-red-500 transition-colors"
          >
            &larr; back to status
          </a>
        </div>
      </main>
    </div>
  );
}
