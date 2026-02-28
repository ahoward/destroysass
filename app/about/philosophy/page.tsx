import type { Metadata } from "next";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "philosophy — destroysaas",
  description:
    "from stallman to credit unions — why collective ownership of software is the only path to financial freedom for small business.",
};

export default async function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/philosophy" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          the philosophy
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          why ownership is the only thing that matters.
        </p>

        {/* stallman was right */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">stallman was right</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              in 1985, richard stallman published the gnu manifesto. his argument was simple:{" "}
              <span className="text-[var(--text-primary)] font-medium">
                software freedom is a precondition for human freedom
              </span>.
              if you can&apos;t read, modify, and share the code that runs your life, you don&apos;t control your life.
            </p>
            <p>
              forty years later, he was more right than even he predicted. five companies control
              the infrastructure of modern business. they set the prices. they change the terms.
              they own your data. and you have zero legal recourse when they decide your plan is
              &ldquo;legacy&rdquo; and your price just doubled.
            </p>
            <p>
              but the free software movement stopped at code. stallman gave us the right to read
              and modify source code. he didn&apos;t solve the harder problem:{" "}
              <span className="text-[var(--text-primary)] font-medium">
                who pays to keep it running?
              </span>
            </p>
            <p>
              destroysaas extends the free software movement to the business layer &mdash; the
              hosting, the maintenance, the governance, the legal standing. free code without
              funded maintenance is a tire without a car. we&apos;re building the car.
            </p>
          </div>
        </section>

        {/* the credit union model */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">the credit union model</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              before credit unions, banks extracted freely from depositors. your money sat in
              their vaults, earned them interest, and they charged you for the privilege.
              there was no alternative. that was just how banking worked.
            </p>
            <p>
              then a simple idea changed everything:{" "}
              <span className="text-[var(--text-primary)] font-medium">
                what if the depositors owned the bank?
              </span>
            </p>
            <p>
              credit unions proved that member-owned institutions could deliver the same
              services &mdash; checking, savings, loans, mortgages &mdash; with radically different
              economics. lower fees. better rates. profits returned to members. no shareholders
              extracting value from every transaction.
            </p>
            <p>
              destroysaas does the same thing for software. your monthly payment doesn&apos;t go
              to shareholders &mdash; it goes to a{" "}
              <span className="text-[var(--text-primary)] font-medium">
                treasury you control
              </span>,
              paying developers who are accountable to you. same tools. same functionality.
              radically different ownership.
            </p>
            <p className="text-[var(--text-primary)] font-medium">
              you already bank at a credit union because it makes obvious sense.
              the same logic applies to every piece of software your business runs.
            </p>
          </div>
        </section>

        {/* why ownership = financial freedom */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">why ownership = financial freedom</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              saas costs compound. a typical small business pays{" "}
              <span className="text-[var(--text-primary)] font-medium">$1,100/month</span> across
              five or six tools &mdash; CRM, project management, bookkeeping, scheduling, email
              marketing, inventory. that&apos;s{" "}
              <span className="text-[var(--text-primary)] font-medium">$13,200 a year</span>.
              over ten years, $132,000. with zero equity. zero ownership. zero voting rights.
            </p>
            <p>
              if any of those vendors raises prices, gets acquired, or shuts down, you start
              over. migration costs. retraining. lost data. the switching cost is the trap &mdash;
              and every vendor knows it.
            </p>
            <p>
              with destroysaas, that same money buys you{" "}
              <span className="text-[var(--text-primary)] font-medium">co-ownership</span> of the
              tools you use. voting rights on the roadmap. legal standing if things go wrong.
              fork freedom if you want to leave. your payments build equity, not someone
              else&apos;s valuation.
            </p>
            <p className="text-[var(--text-primary)] font-medium">
              renting makes landlords rich. owning builds your wealth. this is true for
              real estate, true for banking, and true for software.
            </p>
          </div>
        </section>

        {/* code is free, maintenance is not */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">code is free. maintenance is not.</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              ai collapsed the cost of writing code. a phd student can vibe-code a medication
              monitor overnight. a solo developer can ship an MVP in a weekend. the initial build
              is approaching free.
            </p>
            <p>
              but they can&apos;t maintain it when the api landscape shifts under their feet every
              90 days. they can&apos;t patch the security vulnerability that drops on a friday night.
              they can&apos;t keep it running when the cloud provider changes their pricing tier.
            </p>
            <p>
              <span className="text-[var(--text-primary)] font-medium">
                80% of total cost of ownership is maintenance
              </span>{" "}
              &mdash; security patches, integration updates, hosting, support, evolution. that&apos;s
              what the collective pays for. that&apos;s the real cost of software. and that&apos;s what
              saas vendors use to extract from you indefinitely.
            </p>
            <p>
              in the destroysaas model, certified product cooperatives compete by shipping
              working MVPs &mdash; product thinking, design, and code. the initial build is
              their audition. the collective picks the best one and contracts that cell for
              the hard part:{" "}
              <span className="text-[var(--text-primary)] font-medium">
                keeping it alive, secure, and evolving for years
              </span>.
            </p>
          </div>
        </section>

        {/* the middle path */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">the middle path</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the internet was built on the backs of open-source contributors who gave away
              millions of hours of labor to democratize power. 98% of the web servers in the
              world still run on open-source software.
            </p>
            <p>
              but two traps have emerged. mega-corporations are internalizing ai-driven
              development into{" "}
              <span className="text-[var(--text-primary)] font-medium">walled gardens</span> &mdash;
              proprietary systems that lock you in tighter than any saas product ever did.
              meanwhile, the &ldquo;app factory&rdquo; evangelists promise one-click software that{" "}
              <span className="text-[var(--text-primary)] font-medium">they will own</span>,
              handing you a compiled binary while keeping the source code.
            </p>
            <p>
              we need the middle path. not one massive service with a million users. not app
              factories that steal your ip.{" "}
              <span className="text-[var(--text-primary)] font-medium">
                community-scale software
              </span>{" "}
              &mdash; tools designed for dozens or hundreds of users, built for specific
              needs, sustained through legal cooperatives that pool resources and share costs.
            </p>
            <p className="text-[var(--text-primary)] font-medium">
              by pooling resources, ordinary businesses can finally afford the true cost of
              software maintenance &mdash; and retain absolute ownership of the source code.
            </p>
          </div>
        </section>

        {/* monocultures fail */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">monocultures fail</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              five companies control the software infrastructure of american business.
              they set the prices. they write the terms. they own the data. thirty million
              small businesses run on tools controlled by boardrooms they will never enter
              and shareholders they will never meet.
            </p>
            <p>
              this is a{" "}
              <span className="text-[var(--text-primary)] font-medium">monoculture</span>.
              biology has a word for what happens to monocultures: collapse. when every farm
              plants the same crop, one disease wipes out the food supply. when every business
              runs on the same five platforms, one pricing change, one acquisition, one policy
              decision ripples through the entire economy.
            </p>
            <p>
              and monocultures don&apos;t just fail on their own &mdash; they{" "}
              <span className="text-[var(--text-primary)] font-medium">
                concentrate power in the hands of the few
              </span>.
              when the tools you depend on are controlled by someone else, your autonomy is
              an illusion. you make decisions within boundaries someone else drew. your data
              feeds algorithms you can&apos;t inspect. your business model is one terms-of-service
              update away from irrelevance.
            </p>
            <p>
              the internet was supposed to decentralize power. instead, it centralized it
              faster than any technology in history. the answer isn&apos;t to build a better
              monopoly. it&apos;s to{" "}
              <span className="text-[var(--text-primary)] font-medium">
                make monopoly structurally impossible
              </span>.
            </p>
          </div>
        </section>

        {/* decentralization is democracy */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">decentralization is democracy</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              there are 33 million small businesses in america. each one makes independent
              decisions about what to sell, who to hire, how to serve their community.
              that&apos;s not a market statistic &mdash; that&apos;s the{" "}
              <span className="text-[var(--text-primary)] font-medium">
                largest decentralized economy on earth
              </span>.
            </p>
            <p>
              but if every one of those businesses runs on the same five vendors&apos; software,
              the decisions aren&apos;t really independent anymore. the platforms shape what&apos;s
              possible. the algorithms decide who gets seen. the pricing tiers determine
              who survives. the independence is aesthetic. the control is structural.
            </p>
            <p>
              history is unambiguous about what happens when economic power concentrates
              into fewer and fewer hands while ordinary people lose their autonomy, their
              voice, and their ability to organize independently.{" "}
              <span className="text-[var(--text-primary)] font-medium">
                every democratic society that has failed, failed this way
              </span>.
            </p>
            <p>
              destroysaas isn&apos;t a software company. it&apos;s an{" "}
              <span className="text-[var(--text-primary)] font-medium">
                economic infrastructure project
              </span>.
              every cell that forms is a pocket of genuine independence &mdash; businesses
              that own their tools, control their data, and govern their own roadmap.
              no single point of failure. no single point of control.
            </p>
            <p className="text-[var(--text-primary)] font-medium">
              when small businesses own their own infrastructure, they can&apos;t be captured.
              that&apos;s not a feature. that&apos;s the point.
            </p>
          </div>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              stallman gave us the right to read the code. credit unions gave us the model
              for member ownership. destroysaas combines both &mdash; free code, funded maintenance,
              collective governance, and legal standing. not because it&apos;s idealistic.
              because concentrated power is the oldest threat in human history, and
              ownership is the oldest defense.
            </p>
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">see how the model works in practice</p>
          <a
            href="/about/legal"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            the legal model &rarr;
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
