import type { Metadata } from "next";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "financial model — destroysass",
  description:
    "how cells get funded, where the money goes, and how equity works. transparent economics for collective software ownership.",
};

export default async function MoneyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/money" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          the financial model
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          here&apos;s exactly where the money goes. no hidden fees. no investor-first economics.
        </p>

        {/* how cells get funded */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">how cells get funded</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              a business submits an idea for software they need and names what they&apos;d pay monthly.
              other businesses with the same problem pledge their own monthly commitment —{" "}
              <span className="text-[var(--text-primary)] font-medium">$25 to $500 per month</span>, whatever
              they can afford.
            </p>
            <p>
              pledges are held until total monthly commitments hit the{" "}
              <span className="text-[var(--text-primary)] font-medium">$1,000/month threshold</span>.
              at that point, pledges lock and convert into monthly treasury contributions.
              a legal entity forms. certified cells compete by shipping working MVPs &mdash;
              product vision, design, and code. the collective selects the best one, and that
              cell earns the contract to design, build, and operate it long-term.
            </p>
            <p>
              if the threshold is never reached, nobody pays anything. there&apos;s no risk in pledging —
              only in <em>not</em> pledging for software you actually need.
            </p>
          </div>
        </section>

        {/* inventor equity */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">inventor equity</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the person who submits the original idea takes real risk — they&apos;re putting a concept
              out there and rallying others around it. that should be rewarded.
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {[
              {
                label: "founding grant",
                value: "200,000 class A shares",
                desc: "the idea submitter receives these at cell formation. sweat equity for taking the first step.",
              },
              {
                label: "co-sponsor shares",
                value: "10,000 class B shares",
                desc: "every business that pledges receives class B shares when the cell forms. skin in the game = seat at the table.",
              },
              {
                label: "recruitment bounty",
                value: "+2,000 class A per recruit",
                desc: "the founder earns bonus shares for the first 10 co-sponsors they bring in. growth should reward the grower.",
              },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-[var(--border-primary)] pl-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <p className="font-semibold text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-red-600 font-bold text-sm">{item.value}</p>
                </div>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* voting weight */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">voting weight</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              during the <span className="text-[var(--text-primary)] font-medium">genesis phase (months 0&ndash;18)</span>,
              voting power is weighted by shares. founders and early sponsors have more influence while the cell
              is getting off the ground. this protects the people who took the initial bet.
            </p>
            <p>
              after month 18, the cell shifts to{" "}
              <span className="text-[var(--text-primary)] font-medium">one-member-one-vote</span>.
              every paying member has equal say. the cell is now a mature cooperative, governed democratically.
            </p>
          </div>
        </section>

        {/* treasury mechanics */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">treasury mechanics</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              each cell&apos;s treasury is managed through{" "}
              <span className="text-[var(--text-primary)] font-medium">OpenCollective</span> — fully
              transparent, every transaction visible to every member. monthly contributions from
              co-sponsors flow in. cell payments flow out.
            </p>
            <p>
              the cell draws from the treasury monthly,{" "}
              <span className="text-[var(--text-primary)] font-medium">contingent on hitting their SLA metrics</span>.
              uptime, bug resolution, delivery cadence, product responsiveness &mdash; if they miss,
              they don&apos;t get paid in full. accountability is baked into the payment structure, not left to trust.
            </p>
          </div>
        </section>

        {/* platform economics */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">platform economics</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              destroysass is the infrastructure that makes cells possible. the platform earns revenue through:
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {[
              {
                label: "cell formation fee",
                desc: "one-time fee for LCA creation, DAO initialization, and OpenCollective onboarding. you pay once to set up the legal and financial rails.",
              },
              {
                label: "platform take-rate",
                desc: "5\u201310% of each cell\u2019s monthly treasury. this funds platform development, support, and the certification infrastructure that keeps cells accountable.",
              },
              {
                label: "cell certification",
                desc: "product cooperatives pay to get vetted and listed. this covers product capability review, technical assessment, cooperative structure verification, and ongoing compliance.",
              },
              {
                label: "inter-cell routing",
                desc: "as cells mature and interoperate, micro-transaction fees on cross-cell API calls. this is the long-term network revenue — every cell that connects increases the value of every other cell.",
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="text-red-600 font-bold text-sm shrink-0 w-2 pt-1">&bull;</span>
                <div>
                  <p className="font-semibold mb-1">{item.label}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* exit protections */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">exit protections</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the system is designed so{" "}
              <span className="text-[var(--text-primary)] font-medium">nobody gets screwed on the way out</span>:
            </p>
            <div className="border-l-2 border-[var(--border-primary)] pl-6 space-y-3 mt-4">
              <p>
                <span className="text-[var(--text-primary)] font-medium">right of first refusal</span> —
                the LCA can buy back shares at 24x MRR before any external sale. the collective gets first
                dibs, always.
              </p>
              <p>
                <span className="text-[var(--text-primary)] font-medium">no external sales</span> —
                shares can&apos;t be sold to outside parties without collective approval. this prevents
                hostile takeovers and ensures the cell stays in the hands of the people who use it.
              </p>
              <p>
                <span className="text-[var(--text-primary)] font-medium">class B freeze</span> —
                if a member stops paying, their class B shares freeze after a 60-day grace period.
                you can&apos;t stop contributing and keep voting. skin in the game is continuous.
              </p>
              <p>
                <span className="text-[var(--text-primary)] font-medium">fork freedom</span> —
                if you leave, you take the code and your data. the software is open-source.
                you lose governance rights, not access.
              </p>
            </div>
          </div>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              the bottom line: every dollar is visible. every payment is earned. every member has equity.
              and if you leave, you leave with everything except the governance rights you chose to walk away from.
            </p>
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">see how your rights are protected</p>
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
