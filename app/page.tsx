import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

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

      {/* nav */}
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <span className="text-red-600 font-bold text-lg tracking-tight">
          destroysass
        </span>
        <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
          <a href="/ideas" className="hover:text-[var(--text-primary)] transition-colors">ideas</a>
          <a href="/dev-cells" className="hover:text-[var(--text-primary)] transition-colors">dev cells</a>
          <a href="/about" className="hover:text-[var(--text-primary)] transition-colors">about</a>
          {user ? (
            <>
              <a href="/dashboard" className="hover:text-[var(--text-primary)] transition-colors">dashboard</a>
              <form action={signOut}>
                <button type="submit" className="hover:text-[var(--text-primary)] transition-colors">sign out</button>
              </form>
            </>
          ) : (
            <a href="/auth" className="hover:text-[var(--text-primary)] transition-colors">sign in</a>
          )}
        </div>
      </nav>

      {/* hero */}
      <main className="max-w-2xl mx-auto px-6 pt-20 pb-32">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight lowercase mb-6">
          the place where small businesses
          <br />
          <span className="text-red-600">stop renting software</span>
          <br />
          and start owning it.
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-16">
          saas is dead. we&apos;re building what comes next.
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
                a vetted developer cooperative builds it under contract to your
                collective. the code is open-source. the hosting is yours. you
                have legal standing.
              </p>
            </div>
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
                destroysass makes you a <span className="text-[var(--text-primary)] font-medium">co-owner</span>, not a customer.
                you fund software collectively with other businesses who need the same thing. a vetted developer
                cooperative builds it under contract <em>to you</em>. the code is open-source. the data is yours.
                the legal entity gives you voting rights and enforceable contracts.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                if your vendor disappeared tomorrow, would your business survive? with destroysass, the answer is always yes.
              </p>
            </div>
            <div className="flex gap-6 mt-4">
              <a
                href="/ideas/new"
                className="text-sm text-red-600 hover:text-red-500 transition-colors"
              >
                propose what your business needs &rarr;
              </a>
              <a
                href="/about/legal"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                read the legal model &rarr;
              </a>
            </div>
          </section>

          {/* developers */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-6">
              for developers
            </h2>
            <h3 className="text-2xl font-bold tracking-tight lowercase mb-4">
              build software people actually pay for. no vc. no boss. no bullshit.
            </h3>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                the dev cell model is simple: form a cooperative, get certified, and bid on cells that hit threshold.
                you build real software for real businesses under a real contract — not spec work, not exposure,
                not &ldquo;equity&rdquo; in someone else&apos;s startup.
              </p>
              <p>
                you ship on your terms. the treasury pays monthly, contingent on hitting your SLA.
                all code is open-source. if you do great work, your reputation compounds and more cells come to you.
                if you walk away, the collective replaces you. <span className="text-[var(--text-primary)] font-medium">no one is trapped</span> — not
                the businesses, not you.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                this is contract work that scales like a product, without giving up ownership of your labor.
              </p>
            </div>
            <a
              href="/dev-cells"
              className="inline-block mt-4 text-sm text-red-600 hover:text-red-500 transition-colors"
            >
              apply as a dev cell &rarr;
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
                destroysass is a platform that spawns self-sustaining micro-cooperatives. each cell funds its own
                development, governs its own roadmap, and pays platform fees for infrastructure. the code is free.
                the network, legal rails, and treasury infrastructure are the value.
              </p>
              <p>
                revenue model: cell formation fees, platform take-rate (5&ndash;10% of each cell&apos;s treasury),
                dev cell certification, and inter-cell API routing fees at scale.
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
            href="/ideas/new"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            submit an idea &rarr;
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
