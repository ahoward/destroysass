import type { Metadata } from "next";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "legal model — destroysaas",
  description:
    "how destroysaas gives you real legal standing over the software you fund. LCA/DAO hybrid, enforceable contracts, fork freedom.",
};

export default async function LegalPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/legal" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          the legal model
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          you have more rights here than you&apos;ve ever had as a saas customer.
        </p>

        {/* what you own */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">what you own</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              when a cell forms, it creates a{" "}
              <span className="text-[var(--text-primary)] font-medium">Limited Cooperative Association (LCA)</span> —
              a real legal entity recognized by state law. you&apos;re not a &ldquo;user.&rdquo;
              you&apos;re a <span className="text-[var(--text-primary)] font-medium">member-owner</span> with
              equity shares, voting rights, and enforceable contracts.
            </p>
            <p>
              this is the core difference. a saas vendor can change terms, raise prices, get acquired, or shut down —
              and your only recourse is to cancel. an LCA member can{" "}
              <span className="text-[var(--text-primary)] font-medium">vote, sue, and enforce</span>.
              you have standing in court. you have a seat at the table. the software answers to you, not shareholders.
            </p>
          </div>
        </section>

        {/* governance */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">governance</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              governance has two phases. during the{" "}
              <span className="text-[var(--text-primary)] font-medium">genesis phase (months 0&ndash;18)</span>,
              voting is weighted by share class — founders and early sponsors have more say while the cell
              is finding its footing. this prevents late joiners from overriding the people who took the initial risk.
            </p>
            <p>
              after month 18, governance shifts to{" "}
              <span className="text-[var(--text-primary)] font-medium">one-member-one-vote</span>.
              the cell is now mature. every paying member has equal say regardless of when they joined or how
              many shares they hold.
            </p>
            <p>
              a DAO layer handles the mechanics — proposals, voting records, treasury transparency.
              the LCA handles the law — contracts, disputes, liability. together they give you{" "}
              <span className="text-[var(--text-primary)] font-medium">
                both on-chain transparency and real-world legal teeth
              </span>.
            </p>
          </div>
        </section>

        {/* fork freedom */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">fork freedom</h2>
          <div className="border-l-2 border-red-600 pl-6 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              all code produced by a cell is open-source under AGPL or MIT.
              your data belongs to you. if you want to leave, you take{" "}
              <span className="text-[var(--text-primary)] font-medium">everything</span> — the code,
              your data, and the right to run it yourself.
            </p>
            <p>
              this isn&apos;t a marketing promise. it&apos;s a legal obligation baked into the LCA operating
              agreement. fork freedom is the default, not a feature.
            </p>
          </div>
        </section>

        {/* cell contracts */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">cell contracts</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              product cooperatives design, build, and operate your software, but they don&apos;t govern it.
              they&apos;re <span className="text-[var(--text-primary)] font-medium">contractors, not owners</span>.
              think of it like hiring an architect and builder for your house &mdash; they handle the
              design and construction, you own the result.
            </p>
            <p>
              cells own the full product lifecycle &mdash; product direction, design, engineering,
              hosting, and support. they&apos;re bound by a{" "}
              <span className="text-[var(--text-primary)] font-medium">strict SLA</span> covering uptime,
              bug resolution, and delivery timelines. they draw from the cell&apos;s treasury monthly,
              contingent on hitting those metrics. all intellectual property belongs to the LCA, not the cell.
            </p>
            <p>
              if a cell underperforms, abandons the project, or breaches the SLA, the collective votes
              to sever the contract and route to a new certified cell.{" "}
              <span className="text-[var(--text-primary)] font-medium">
                the software survives the cell
              </span>. always.
            </p>
          </div>
        </section>

        {/* dispute resolution */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">dispute resolution</h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "direct communication",
                desc: "members and cells resolve issues through direct conversation first. most things get handled here.",
              },
              {
                step: "2",
                title: "cooperative governance",
                desc: "if direct communication fails, the issue goes to a member vote. the DAO records the proposal, the LCA enforces the outcome.",
              },
              {
                step: "3",
                title: "legal recourse",
                desc: "if governance fails, you have standing to enforce your rights in court. you're a co-owner of a legal entity, not a customer clicking \"I agree.\"",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-red-600 font-bold text-lg tabular-nums shrink-0 w-6">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold mb-1">{item.title}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              the bottom line: you own equity in a legal entity that owns the software, the data,
              and the contracts. you can vote, sue, fork, and leave. try doing that with salesforce.
            </p>
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">see how the money works</p>
          <a
            href="/about/money"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            the financial model &rarr;
          </a>
          <a
            href="/about"
            className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mt-3 sm:mt-0"
          >
            back to about &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
