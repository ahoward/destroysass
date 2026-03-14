import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

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

  const page = await ro.page("pages/home");
  const steps = page.data["how-it-works"] as Array<{ number: number; title: string; text: string }>;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">

      <Nav currentPath="/" />

      {/* hero */}
      <main className="max-w-2xl mx-auto px-6 pt-20 pb-32">
        <ROMarkdown raw={page.sections.hero.raw} images={page.images} className={PROSE_CLASSES + " [&>h1]:text-4xl [&>h1]:sm:text-5xl [&>h1]:font-bold [&>h1]:leading-tight [&>h1]:tracking-tight [&>h1]:lowercase [&>h1]:mb-6 [&>p:nth-of-type(1)]:text-xl [&>p:nth-of-type(1)]:text-[var(--text-secondary)] [&>p:nth-of-type(1)]:mb-2 [&>p:nth-of-type(2)]:text-sm [&>p:nth-of-type(2)]:text-[var(--text-muted)] [&>p:nth-of-type(2)]:mb-16"} />

        {/* problem */}
        <div className="border-l-2 border-[var(--border-primary)] pl-6 mb-16">
          <ROMarkdown raw={page.sections.problem.raw} images={page.images} className={PROSE_CLASSES + " space-y-4"} />
        </div>

        {/* the saaspocalypse */}
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-6">
            the saaspocalypse
          </h2>
          <ROMarkdown raw={page.sections.saaspocalypse.raw} images={page.images} className={PROSE_CLASSES + " space-y-4"} />
        </div>

        {/* 3 steps */}
        <div className="mb-16 space-y-8">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-6">
            how it works
          </h2>

          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <span className="text-red-600 font-bold text-lg tabular-nums shrink-0 w-6">
                {step.number}
              </span>
              <div>
                <p className="font-semibold mb-1">{step.title}</p>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* credit union analogy */}
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-6">
            think of it like a credit union
          </h2>
          <ROMarkdown raw={page.sections["credit-union"].raw} images={page.images} className={PROSE_CLASSES + " space-y-4"} />
        </div>

        {/* stats */}
        {(idea_count ?? 0) > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 border border-[var(--border-primary)] rounded-lg p-6">
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
            <ROMarkdown raw={page.sections["for-business-owners"].raw} images={page.images} className={PROSE_CLASSES + " [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:lowercase [&>h2]:mb-4 space-y-4"} />
            <div className="flex flex-wrap gap-6 mt-4">
              <a
                href="/auth"
                className="text-sm text-red-600 hover:text-red-500 transition-colors"
              >
                join and propose what your business needs →
              </a>
              <a
                href="/about/math"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                see the math →
              </a>
              <a
                href="/about/legal"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                read the legal model →
              </a>
            </div>
          </section>

          {/* cells */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-6">
              for cells
            </h2>
            <ROMarkdown raw={page.sections["for-cells"].raw} images={page.images} className={PROSE_CLASSES + " [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:lowercase [&>h2]:mb-4 space-y-4"} />
            <a
              href="/cells"
              className="inline-block mt-4 text-sm text-red-600 hover:text-red-500 transition-colors"
            >
              apply as a cell →
            </a>
          </section>

          {/* investors */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-6">
              for investors
            </h2>
            <ROMarkdown raw={page.sections["for-investors"].raw} images={page.images} className={PROSE_CLASSES + " [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:lowercase [&>h2]:mb-4 space-y-4"} />
            <a
              href="/about/money"
              className="inline-block mt-4 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              see the full financial model →
            </a>
          </section>

        </div>

        {/* cta */}
        <div className="mb-24 border-t border-[var(--border-primary)] pt-12">
          <a
            href="/auth"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            join destroysaas →
          </a>
          <a
            href="/ideas"
            className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mt-3 sm:mt-0"
          >
            or browse existing ideas →
          </a>
        </div>

      </main>
    </div>
  );
}
