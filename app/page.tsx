import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // fetch platform stats
  const { count: idea_count } = await supabase
    .from("idea_board")
    .select("*", { count: "exact", head: true });

  const { data: pledge_stats } = await supabase
    .from("pledges")
    .select("amount_monthly, user_id");

  const total_pledged = (pledge_stats ?? []).reduce(
    (sum, p) => sum + Number(p.amount_monthly),
    0
  );
  const total_sponsors = new Set((pledge_stats ?? []).map((p) => p.user_id)).size;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">

      <Nav currentPath="/" />

      {/* hero */}
      <main className="max-w-2xl mx-auto px-6 pt-20 pb-32">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight lowercase mb-6">
          the place where small businesses
          <br />
          <span className="text-red-600">stop renting software</span>
          <br />
          and start owning it.
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-2">
          saas is dead. we&apos;re building what comes next.
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-16">
          saas &mdash; &ldquo;software as a service&rdquo; &mdash; is the model where you pay
          monthly rent for software someone else owns, controls, and can take away.
        </p>

        {/* problem */}
        <div className="border-l-2 border-[var(--border-primary)] pl-6 mb-16">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            ai didn&apos;t drive software costs to zero. it shifted the
            bottleneck. the true cost of software has always been maintaining
            it &mdash; 80% of total cost of ownership is maintenance, not the
            initial build. traditional saas extracts that cost from you
            forever, gives you no ownership, and cuts off your legal recourse
            when things break.
          </p>
        </div>

        {/* 3 steps */}
        <div className="mb-16 space-y-8">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-6">
            how it works
          </h2>

          <div className="flex gap-4">
            <span className="text-red-600 font-bold text-lg tabular-nums shrink-0 w-6">
              1
            </span>
            <div>
              <p className="font-semibold mb-1">propose</p>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                submit a software concept your business needs. describe the
                problem, what you&apos;d pay per month for a maintained, hosted
                solution you actually own.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-red-600 font-bold text-lg tabular-nums shrink-0 w-6">
              2
            </span>
            <div>
              <p className="font-semibold mb-1">pledge</p>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                other businesses with the same problem back the concept with
                monthly commitments. when the threshold is reached, a cell
                forms.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-red-600 font-bold text-lg tabular-nums shrink-0 w-6">
              3
            </span>
            <div>
              <p className="font-semibold mb-1">own</p>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                certified product cooperatives compete by shipping working
                MVPs &mdash; product vision, design, and code. the collective
                picks the best one. the winning cell designs, builds, and
                operates it under contract. the code is open-source. you own it.
              </p>
            </div>
          </div>
        </div>

        {/* credit union analogy */}
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-6">
            think of it like a credit union
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              banks extract from you. credit unions are{" "}
              <span className="text-[var(--text-primary)] font-medium">owned by their members</span>.
            </p>
            <p>
              saas vendors extract from you. destroysaas collectives are{" "}
              <span className="text-[var(--text-primary)] font-medium">owned by their members</span>.
            </p>
            <p>
              same deposits. same services. radically different economics &mdash; because the
              profits go back to you, not shareholders.
            </p>
            <p className="text-[var(--text-primary)] font-medium">
              you already understand this model. you just haven&apos;t applied it to software yet.
            </p>
          </div>
        </div>

        {/* stats */}
        {(idea_count ?? 0) > 0 && (
          <div className="grid grid-cols-3 gap-6 mb-16 border border-[var(--border-primary)] rounded-lg p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{idea_count}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">ideas submitted</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">
                ${total_pledged.toLocaleString()}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">pledged / month</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{total_sponsors}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">sponsors</p>
            </div>
          </div>
        )}

        {/* stakeholder sections */}
        <div className="mb-16 space-y-16">

          {/* business owners */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-6">
              for business owners
            </h2>
            <h3 className="text-2xl font-bold tracking-tight lowercase mb-4">
              you&apos;re paying rent on tools you can&apos;t leave.
            </h3>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                your crm raises prices 20%. your project management tool gets acquired and sunsets your plan.
                your data sits on someone else&apos;s servers and you have <span className="text-[var(--text-primary)] font-medium">zero legal standing</span> to
                do anything about it.
              </p>
              <p>
                destroysaas makes you a <span className="text-[var(--text-primary)] font-medium">co-owner</span>, not a customer.
                you fund software collectively with other businesses who need the same thing. a vetted product
                cooperative designs, builds, and operates it under contract <em>to you</em>. the code is open-source.
                the data is yours. the legal entity gives you voting rights and enforceable contracts.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                if your vendor disappeared tomorrow, would your business survive? with destroysaas, the answer is always yes.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 mt-4">
              <a
                href="/auth"
                className="text-sm text-red-600 hover:text-red-500 transition-colors"
              >
                join and propose what your business needs &rarr;
              </a>
              <a
                href="/math"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                see the math &rarr;
              </a>
              <a
                href="/about/legal"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                read the legal model &rarr;
              </a>
            </div>
          </section>

          {/* cells */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-6">
              for cells
            </h2>
            <h3 className="text-2xl font-bold tracking-tight lowercase mb-4">
              own a product company without the vc. without the boss. without the bullshit.
            </h3>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                a cell is a{" "}
                <span className="text-[var(--text-primary)] font-medium">full-service product cooperative</span> &mdash;
                product management, design, engineering, and operations under one roof.
                you don&apos;t just write code. you own the whole problem: what to build, how it
                looks, how it works, and keeping it running.
              </p>
              <p>
                when an idea hits threshold, certified cells compete by shipping a working MVP.
                not a spec deck. not a slide deck.{" "}
                <span className="text-[var(--text-primary)] font-medium">a running product</span>.
                the collective picks the best one and contracts that cell for ongoing design,
                development, hosting, and evolution.
              </p>
              <p>
                your MVP is your audition. if you ship great work, you win a maintenance contract
                that pays monthly. the treasury pays contingent on hitting your SLA.
                all code is open-source. if you do great work, your reputation compounds and more
                collectives come to you. if you walk away, the collective replaces you.{" "}
                <span className="text-[var(--text-primary)] font-medium">no one is trapped</span> &mdash;
                not the businesses, not you.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                this is a product company that scales on contract revenue, without giving up ownership of your labor.
              </p>
            </div>
            <a
              href="/cells"
              className="inline-block mt-4 text-sm text-red-600 hover:text-red-500 transition-colors"
            >
              apply as a cell &rarr;
            </a>
          </section>

          {/* investors */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-6">
              for investors
            </h2>
            <h3 className="text-2xl font-bold tracking-tight lowercase mb-4">
              saas margins without saas fragility.
            </h3>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                traditional saas is a rent-seeking monoculture. one vendor, millions of customers, and a single point
                of failure. ai is collapsing that model — building software is no longer the moat. the winners of the
                next decade will own the <span className="text-[var(--text-primary)] font-medium">network</span>, not the code.
              </p>
              <p>
                destroysaas is a platform that spawns self-sustaining micro-cooperatives. each cell funds its own
                development, governs its own roadmap, and pays platform fees for infrastructure. the code is free.
                the network, legal rails, and treasury infrastructure are the value.
              </p>
              <p>
                revenue model: cell formation fees, platform take-rate (5&ndash;10% of each cell&apos;s treasury),
                cell certification, and inter-cell API routing fees at scale.
                every cell that forms <span className="text-[var(--text-primary)] font-medium">increases the network and decreases churn</span> —
                because owners don&apos;t churn the way customers do.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                this isn&apos;t a saas company. it&apos;s the protocol layer that replaces saas companies.
              </p>
            </div>
            <a
              href="/about/money"
              className="inline-block mt-4 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              see the full financial model &rarr;
            </a>
          </section>

        </div>

        {/* cta */}
        <div className="mb-24 border-t border-[var(--border-primary)] pt-12">
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
            or browse existing ideas &rarr;
          </a>
        </div>

      </main>
    </div>
  );
}
