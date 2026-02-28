import type { Metadata } from "next";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "ara t. howard — authors — destroysaas",
  description:
    "ruby hero. 481M+ gem downloads. founded a worker-owned LCA. open-sourced the bylaws. now building the infrastructure for collective software ownership.",
};

export default async function AraHowardPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/authors" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <div className="mb-8">
          <a
            href="/about/authors"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            &larr; all authors
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-2">
          ara t. howard
        </h1>
        <p className="text-red-600 text-sm uppercase tracking-widest mb-4">
          founder
        </p>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          didn&apos;t theorize about cooperative software ownership. built and operated one.
        </p>

        {/* the short version */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              ara howard has shipped{" "}
              <span className="text-[var(--text-primary)] font-medium">
                102 rubygems with 481 million+ total downloads
              </span>
              , won the{" "}
              <span className="text-[var(--text-primary)] font-medium">
                ruby hero award
              </span>
              , founded a{" "}
              <span className="text-[var(--text-primary)] font-medium">
                B-Corp certified worker-owned cooperative
              </span>
              , and{" "}
              <span className="text-[var(--text-primary)] font-medium">
                open-sourced its legal bylaws
              </span>{" "}
              so anyone could follow. destroysaas is the productization of
              everything he learned doing it the hard way first.
            </p>
          </div>
        </section>

        {/* technical credibility */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            technical credibility
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the open source record speaks for itself:
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {[
              {
                label: "102 published rubygems",
                value: "481M+ total downloads",
                desc: "infrastructure-grade open source used by millions of developers worldwide. open4 (138M), systemu (102M), require_all (86M), macaddr (71M).",
              },
              {
                label: "ruby hero award",
                value: "railsconf 2014",
                desc: "recognized for sustained, prolific contribution to the ruby ecosystem. ~150 gems at the time of the award.",
              },
              {
                label: "188 public github repos",
                value: "516 followers",
                desc: "decades of open source work spanning systems programming, web infrastructure, scientific computing, and developer tooling.",
              },
              {
                label: "CIRES / NOAA",
                value: "scientific computing",
                desc: "built data pipelines and distributed systems at the cooperative institute for research in environmental sciences. unix, systems programming, and computational science before devops was a word.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="border-l-2 border-[var(--border-primary)] pl-6"
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <p className="font-semibold text-[var(--text-primary)]">
                    {item.label}
                  </p>
                  <p className="text-red-600 font-bold text-sm">{item.value}</p>
                </div>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* the cooperative experience */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            the cooperative experience
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              this is the part that matters most. most people who talk about
              cooperative software ownership have never actually operated a
              cooperative.{" "}
              <span className="text-[var(--text-primary)] font-medium">
                ara has
              </span>.
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {[
              {
                label: "founded dojo4",
                desc: "a software consultancy in boulder, colorado (2009) that became a worker-owned limited cooperative association (LCA). not a marketing label — a real legal entity with real cooperative governance.",
              },
              {
                label: "B-Corp certified",
                desc: "dojo4 was certified by B Lab and voted Best for the World (workers category) multiple years running. verified social and environmental performance, public transparency, legal accountability.",
              },
              {
                label: "LLC → LCA conversion",
                desc: "converted dojo4 from a standard LLC to a limited cooperative association — the exact same legal structure destroysaas proposes for every cell. filed the articles. wrote the operating agreement. lived the governance. this isn't theory.",
              },
              {
                label: "open-sourced the bylaws",
                desc: "published dojo4's LCA bylaws, cooperative conversion documents, and policy templates on github (dojo4/policy). the legal templates for destroysaas cells aren't hypothetical — they're based on documents ara already wrote, used, and published for anyone to fork.",
              },
              {
                label: "social impact clients",
                desc: "dojo4 built technology for greenpeace, girl effect, UNICEF, and other organizations where the work matters more than the margin. the ethos isn't new.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="border-l-2 border-[var(--border-primary)] pl-6"
              >
                <p className="font-semibold text-[var(--text-primary)] mb-1">
                  {item.label}
                </p>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* why this combination is rare */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            why this combination is rare
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              most people who advocate for cooperative software fall into one of
              two camps:
            </p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="border-l-2 border-[var(--border-primary)] pl-6">
              <p className="font-semibold text-[var(--text-primary)] mb-1">
                technologists
              </p>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                can build the platform but have never operated a cooperative,
                filed an LCA, or dealt with the legal and financial plumbing of
                collective ownership.
              </p>
            </div>
            <div className="border-l-2 border-[var(--border-primary)] pl-6">
              <p className="font-semibold text-[var(--text-primary)] mb-1">
                cooperative advocates
              </p>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                understand the legal model and the mission but can&apos;t build
                the technology themselves.
              </p>
            </div>
          </div>
          <div className="mt-6 border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              ara is in neither camp. he&apos;s in both. 481 million gem downloads
              and a real LCA with open-sourced bylaws. the &ldquo;coop-in-a-box&rdquo;
              automation destroysaas is building for cells is a productization of
              his own experience converting a company to cooperative ownership.
            </p>
          </div>
        </section>

        {/* the through-line */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            the through-line
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              scientific computing at CIRES/NOAA taught him how to build
              systems. 102 rubygems taught him how to ship. dojo4 taught him
              how cooperatives actually work — the filings, the governance, the
              arguments, the operating agreements, the lawyer calls.
            </p>
            <p>
              destroysaas is the thesis:{" "}
              <span className="text-[var(--text-primary)] font-medium">
                AI collapsed the cost of building software but not the cost of
                maintaining it
              </span>
              . small businesses need collective ownership, not more subscriptions.
              the legal structure exists (LCAs). the governance tooling exists
              (DAOs). the development model exists (cooperative contracting under
              SLAs). someone just needs to wire it all together.
            </p>
            <p>
              that someone should probably be the person who already did it once.
            </p>
          </div>
        </section>

        {/* links */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            links
          </h2>
          <div className="space-y-3 text-sm">
            {[
              {
                label: "github",
                href: "https://github.com/ahoward",
                detail: "188 repos, 516 followers",
              },
              {
                label: "rubygems",
                href: "https://rubygems.org/profiles/ahoward",
                detail: "102 gems, 481M+ downloads",
              },
              {
                label: "dojo4 cooperative bylaws",
                href: "https://github.com/dojo4/policy/tree/master/co-op",
                detail: "open-sourced LCA conversion documents",
              },
            ].map((link) => (
              <div key={link.label} className="flex gap-2">
                <span className="text-red-600 shrink-0">&bull;</span>
                <div>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-500 transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                  <span className="text-[var(--text-muted)]">
                    {" "}
                    &mdash; {link.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              the bottom line: ara didn&apos;t read about cooperative ownership in a
              book. he filed the articles, wrote the operating agreement, ran the
              governance, open-sourced the bylaws, and shipped infrastructure used
              by hundreds of millions. destroysaas is what happens when someone
              who&apos;s done it before decides to make it possible for everyone else.
            </p>
          </div>
        </section>

        {/* nav */}
        <div className="border-t border-[var(--border-primary)] pt-8 flex justify-between">
          <a
            href="/about/authors"
            className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            &larr; all authors
          </a>
          <a
            href="/about"
            className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            about &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
