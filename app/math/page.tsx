import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import Calculator from "./calculator";

export const metadata: Metadata = {
  title: "the math — destroysaas",
  description:
    "the economics of SaaS don't work for small business. here's the math on collective software ownership.",
};

const COMPARISON = [
  {
    label: "monthly cost",
    saas: "$200\u2013$500 across 5\u20138 tools",
    ds: "$50/month per collective you join",
  },
  {
    label: "10-year cost",
    saas: "$24,000\u2013$60,000",
    ds: "$6,000\u2013$12,000",
  },
  {
    label: "who owns the code",
    saas: "the vendor",
    ds: "you do \u2014 open-source, always",
  },
  {
    label: "who owns your data",
    saas: "the vendor",
    ds: "you do \u2014 legally enforceable",
  },
  {
    label: "vendor raises prices",
    saas: "you pay or you leave",
    ds: "the collective votes on the budget",
  },
  {
    label: "vendor shuts down",
    saas: "you start over",
    ds: "the code is yours. hire a new cell",
  },
  {
    label: "legal rights",
    saas: "a terms of service you didn\u2019t read",
    ds: "equity shares, voting rights, enforceable contracts",
  },
  {
    label: "can you leave",
    saas: "yes, but you lose everything",
    ds: "yes, and you take the code + your data",
  },
];

export default async function WhyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/math" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          the math doesn&apos;t work.
          <br />
          here&apos;s math that does.
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          you don&apos;t need ideology. you need a spreadsheet.
        </p>

        {/* the saas tax */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            the saas tax
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              a typical small business pays for 5&ndash;8 software tools.
              CRM, project management, invoicing, scheduling, email marketing,
              inventory, support desk. each one charges monthly rent.
            </p>
            <div className="border border-[var(--border-primary)] rounded-lg p-5 space-y-2 text-sm">
              {[
                ["CRM", "$100\u2013$150/mo"],
                ["project management", "$50\u2013$80/mo"],
                ["invoicing / bookkeeping", "$35\u2013$60/mo"],
                ["scheduling", "$30\u2013$50/mo"],
                ["email marketing", "$40\u2013$80/mo"],
                ["inventory / POS", "$40\u2013$80/mo"],
                ["support desk", "$25\u2013$50/mo"],
              ].map(([tool, cost]) => (
                <div
                  key={tool}
                  className="flex justify-between items-center"
                >
                  <span className="text-[var(--text-secondary)]">{tool}</span>
                  <span className="text-[var(--text-muted)] tabular-nums">
                    {cost}
                  </span>
                </div>
              ))}
              <div className="border-t border-[var(--border-primary)] pt-2 mt-2 flex justify-between items-center font-medium text-[var(--text-primary)]">
                <span>typical monthly total</span>
                <span className="text-red-600 tabular-nums">
                  $400&ndash;$600/mo
                </span>
              </div>
            </div>
            <p>
              that&apos;s{" "}
              <span className="text-[var(--text-primary)] font-medium">
                $5,000&ndash;$7,000 a year
              </span>
              . over ten years,{" "}
              <span className="text-[var(--text-primary)] font-medium">
                $50,000&ndash;$70,000
              </span>
              . with{" "}
              <span className="text-red-600 font-medium">
                zero equity. zero ownership. zero legal standing
              </span>
              .
            </p>
            <p>
              and that number only goes up. SaaS vendors raise prices 10&ndash;20%
              annually. they get acquired and sunset your plan. they hold your
              data hostage behind export fees. and your only recourse is to
              cancel and start over somewhere else.
            </p>
          </div>
        </section>

        {/* the destroysaas math */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            the destroysaas math
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              instead of renting from a vendor, 20 businesses who need the
              same tool{" "}
              <span className="text-[var(--text-primary)] font-medium">
                pool $50/month each
              </span>
              . that&apos;s $1,000/month &mdash; enough to fund a product cooperative
              to design, build, and operate it.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[var(--border-primary)] rounded-lg p-5 text-center">
                <p className="text-xs text-[var(--text-faint)] uppercase tracking-widest mb-2">
                  saas (10 years)
                </p>
                <p className="text-3xl font-bold text-red-600 tabular-nums">
                  $60,000
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  you own nothing
                </p>
              </div>
              <div className="border border-[var(--border-primary)] rounded-lg p-5 text-center">
                <p className="text-xs text-[var(--text-faint)] uppercase tracking-widest mb-2">
                  destroysaas (10 years)
                </p>
                <p className="text-3xl font-bold text-green-600 tabular-nums">
                  $6,000
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  you co-own everything
                </p>
              </div>
            </div>
            <p>
              same tool. same features. same uptime.{" "}
              <span className="text-[var(--text-primary)] font-medium">
                90% less cost. 100% more ownership.
              </span>
            </p>
            <p>
              and because the code is open-source and the legal entity gives
              you enforceable contracts, if anything goes wrong &mdash; you have
              standing. you can vote. you can sue. you can fork the code and
              walk away with everything.
            </p>
          </div>
        </section>

        {/* calculator */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            run your own numbers
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            enter the SaaS tools your business pays for. see what you&apos;re
            really spending &mdash; and what collective ownership looks like.
          </p>
          <Calculator />
        </section>

        {/* custom software */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            custom software used to be out of reach
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              five years ago, if your business needed custom software, the
              quote was{" "}
              <span className="text-[var(--text-primary)] font-medium">
                $150,000 and six months
              </span>
              . only enterprises could afford it. small businesses were stuck
              renting generic tools built for someone else&apos;s workflow.
            </p>
            <p>
              ai collapsed the cost of the initial build. but 80% of software
              cost is maintenance &mdash; keeping it running, secure, and
              evolving. that hasn&apos;t changed.
            </p>
            <p>
              destroysaas solves the last mile:{" "}
              <span className="text-[var(--text-primary)] font-medium">
                20 businesses splitting $1,000/month
              </span>{" "}
              can afford ongoing professional maintenance, hosting, and
              evolution. custom software is no longer out of reach for small
              business. you just need enough businesses with the same problem
              to split the cost.
            </p>
          </div>
        </section>

        {/* industry examples */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            real examples
          </h2>
          <div className="space-y-6">
            {[
              {
                industry: "landscaping company",
                tools: "Jobber ($70) + QuickBooks ($30) + Mailchimp ($20)",
                saas: "$120/mo",
                ds: "$50/mo",
                note: "scheduling, invoicing, and client comms in one tool built for landscapers, not generic businesses.",
              },
              {
                industry: "boutique retail",
                tools:
                  "Shopify ($79) + Square ($60) + Mailchimp ($20) + Homebase ($40)",
                saas: "$199/mo",
                ds: "$50/mo",
                note: "inventory, POS, email, and scheduling built for independent retail — not a platform that takes a cut of every sale.",
              },
              {
                industry: "professional services",
                tools:
                  "Asana ($125) + Harvest ($60) + FreshBooks ($35)",
                saas: "$220/mo",
                ds: "$50/mo",
                note: "project tracking, time billing, and invoicing designed for consultants and agencies — not enterprise teams of 500.",
              },
            ].map((ex) => (
              <div
                key={ex.industry}
                className="border border-[var(--border-primary)] rounded-lg p-5"
              >
                <p className="font-semibold text-[var(--text-primary)] mb-1">
                  {ex.industry}
                </p>
                <p className="text-xs text-[var(--text-muted)] mb-3">
                  {ex.tools}
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-faint)]">
                      saas:
                    </span>
                    <span className="text-red-600 font-bold tabular-nums">
                      {ex.saas}
                    </span>
                  </div>
                  <span className="text-[var(--text-faint)]">&rarr;</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-faint)]">
                      destroysaas:
                    </span>
                    <span className="text-green-600 font-bold tabular-nums">
                      {ex.ds}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  {ex.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* comparison table */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            side by side
          </h2>
          <div className="border border-[var(--border-primary)] rounded-lg overflow-hidden text-sm">
            {/* header */}
            <div className="grid grid-cols-3 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
              <div className="p-3 text-[var(--text-faint)]" />
              <div className="p-3 font-medium text-center text-red-600">
                saas
              </div>
              <div className="p-3 font-medium text-center text-green-600">
                destroysaas
              </div>
            </div>
            {/* rows */}
            {COMPARISON.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 ${
                  i < COMPARISON.length - 1
                    ? "border-b border-[var(--border-primary)]"
                    : ""
                }`}
              >
                <div className="p-3 font-medium text-[var(--text-secondary)]">
                  {row.label}
                </div>
                <div className="p-3 text-[var(--text-muted)] text-center">
                  {row.saas}
                </div>
                <div className="p-3 text-[var(--text-secondary)] text-center">
                  {row.ds}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              you&apos;re already spending the money. the only question is
              whether you own anything at the end.
            </p>
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">
            ready to stop paying rent?
          </p>
          <a
            href="/auth"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            join destroysaas &rarr;
          </a>
          <a
            href="/ideas"
            className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mt-3 sm:mt-0"
          >
            browse ideas &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
