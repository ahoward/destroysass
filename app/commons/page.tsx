import type { Metadata } from "next";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "the commons — destroysaas",
  description:
    "join the movement. pay $25/year, get access to the best open-source tools the co-op builds. real software, not a newsletter.",
};

export default function CommonsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/commons" />

      <main className="max-w-2xl mx-auto px-6 pt-20 pb-32">
        {/* hero */}
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight lowercase mb-6">
          the commons
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-2">
          pay $25/year. get the tools.
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-16">
          every tool built on destroysaas is open source. the foundation curates
          the best ones, runs public instances, and gives every member access.
          real software &mdash; not a demo, not a trial, not a newsletter.
        </p>

        {/* how it works */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            how it works
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "businesses fund development",
                body: "small businesses collectively fund the software they need through local cooperative associations. cells (product teams) build and operate it. all code is open source.",
              },
              {
                step: "02",
                title: "the foundation curates the best tools",
                body: "not everything makes the cut. destroysaas identifies the most useful, most stable tools the ecosystem produces \u2014 the ones with broad appeal beyond the original sponsors.",
              },
              {
                step: "03",
                title: "members get access",
                body: "the foundation runs separate public instances of the curated tools. you join, you get in. same codebase, different infrastructure. no mixing with SMB data.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-red-600 font-bold text-sm shrink-0 pt-0.5">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* what you get */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            what members get
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <div className="border border-[var(--border-primary)] rounded-lg p-5">
              <p className="font-semibold text-[var(--text-primary)] mb-1">
                access to the tools
              </p>
              <p className="text-sm">
                the full product. not a limited tier, not a freemium gate. the same
                software the SMBs use, running on foundation-hosted infrastructure.
                we&apos;re a co-op, not a SaaS company with extra steps.
              </p>
            </div>
            <div className="border border-[var(--border-primary)] rounded-lg p-5">
              <p className="font-semibold text-[var(--text-primary)] mb-1">
                a vote
              </p>
              <p className="text-sm">
                governance voice on platform-level decisions. board elections, policy,
                direction. one member, one vote. not weighted by how much you pay.
              </p>
            </div>
            <div className="border border-[var(--border-primary)] rounded-lg p-5">
              <p className="font-semibold text-[var(--text-primary)] mb-1">
                full transparency
              </p>
              <p className="text-sm">
                every dollar in, every dollar out. cell performance, financials,
                decisions &mdash; all public. you see what your membership funds.
              </p>
            </div>
            <div className="border border-[var(--border-primary)] rounded-lg p-5">
              <p className="font-semibold text-[var(--text-primary)] mb-1">
                a pipeline
              </p>
              <p className="text-sm">
                if you start a business and need dedicated infrastructure, you&apos;re
                already in the ecosystem. upgrade from commons to a full SMB
                membership with a dedicated instance, SLA, and support.
              </p>
            </div>
          </div>
        </section>

        {/* the difference */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            commons vs SMB
          </h2>
          <div className="overflow-x-auto border border-[var(--border-primary)] rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-primary)]">
                  <th className="text-left p-3 font-medium text-[var(--text-muted)]" />
                  <th className="text-left p-3 font-medium text-red-600">commons</th>
                  <th className="text-left p-3 font-medium text-[var(--text-muted)]">SMB</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                {[
                  ["price", "$25/year", "$25\u2013$500/mo per tool"],
                  ["infrastructure", "shared, multi-tenant", "dedicated, single-tenant"],
                  ["SLA", "best-effort", "99% uptime, 48hr response"],
                  ["data", "shared instance", "isolated, yours"],
                  ["customization", "default config", "custom features & integrations"],
                  ["governance", "platform-level votes", "platform + LCA-level votes"],
                  ["support", "community", "direct cell support"],
                ].map(([label, commons, smb]) => (
                  <tr key={label} className="border-b border-[var(--border-faint)]">
                    <td className="p-3 font-medium text-[var(--text-primary)]">{label}</td>
                    <td className="p-3">{commons}</td>
                    <td className="p-3">{smb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-3">
            same codebase. same features. the difference is infrastructure,
            support, and guarantees &mdash; not artificial feature gates.
          </p>
        </section>

        {/* the flywheel */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            the flywheel
          </h2>
          <div className="border border-[var(--border-primary)] rounded-lg p-6 bg-[var(--bg-secondary)] font-mono text-sm space-y-1 text-[var(--text-secondary)]">
            <p>SMBs fund development</p>
            <p className="pl-4">&rarr; cells build open-source tools</p>
            <p className="pl-8">&rarr; foundation curates the best ones</p>
            <p className="pl-12">&rarr; commons members get access</p>
            <p className="pl-16">&rarr; members start businesses</p>
            <p className="pl-20">&rarr; new SMBs fund more development</p>
          </div>
        </section>

        {/* rei analogy */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              REI doesn&apos;t make you prove you&apos;re a mountaineer before you
              join. you pay $30, you&apos;re a member, you get the dividend. you
              belong.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              the commons works the same way. you don&apos;t need to be a business
              owner. you don&apos;t need to be a developer. you just need to
              believe that software should be{" "}
              <span className="text-[var(--text-primary)] font-medium">
                owned, not rented
              </span>.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="text-[var(--text-muted)] text-sm mb-4">
            the commons is coming soon. join the waitlist.
          </p>
          <a
            href="/auth?next=/commons"
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-6 py-2.5 rounded transition-colors"
          >
            join the movement
          </a>
          <p className="text-xs text-[var(--text-faint)] mt-3">
            $25/year &mdash; or $50 lifetime
          </p>
        </section>
      </main>
    </div>
  );
}
