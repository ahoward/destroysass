import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { is_sudo, is_member } from "@/lib/groups";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/models");
  return {
    title: meta.title as string,
    description: meta.description as string,
  };
}

interface LabeledItem {
  label: string;
  text: string;
}

interface MoneyFlow {
  subtitle: string;
  lines: string[];
}

interface Details {
  subtitle: string;
  items: LabeledItem[];
  vibe: string;
}

interface Safeguards {
  subtitle: string;
  items: string[];
}

export default async function ModelsPage() {
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

  const page = await ro.page("pages/models");
  const meta = page.meta as Record<string, unknown>;
  const moneyFlow = page.data["money-flow"] as MoneyFlow;
  const moneyIn = page.data["money-in"] as { subtitle: string; items: LabeledItem[] };
  const moneyOut = page.data["money-out"] as { subtitle: string; items: LabeledItem[] };
  const details = page.data["details"] as Details;
  const safeguards = page.data["safeguards"] as Safeguards;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/models" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          {meta.heading as string}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-4">
          {meta.subheading as string}
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-16">
          {meta.intro as string}
        </p>

        {/* money flow */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
            overview
          </h2>
          <h3 className="text-2xl font-bold tracking-tight lowercase mb-1">
            money flow
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            {moneyFlow.subtitle}
          </p>

          <div className="border border-[var(--border-primary)] rounded-lg p-5 mb-6 bg-[var(--bg-secondary)]">
            <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">
              how it moves
            </p>
            <div className="space-y-1 font-mono text-sm">
              {moneyFlow.lines.map((line: string) => (
                <p key={line} className="text-[var(--text-secondary)]">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* money in */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
            revenue
          </h2>
          <h3 className="text-2xl font-bold tracking-tight lowercase mb-1">
            money in
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            {moneyIn.subtitle}
          </p>

          <div className="space-y-4 mb-6">
            {moneyIn.items.map((item: LabeledItem) => (
              <div key={item.label} className="flex gap-4">
                <span className="text-red-600 font-bold text-sm uppercase shrink-0 w-24 pt-0.5">
                  {item.label}
                </span>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* money out */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
            expenses
          </h2>
          <h3 className="text-2xl font-bold tracking-tight lowercase mb-1">
            money out
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            {moneyOut.subtitle}
          </p>

          <div className="space-y-4 mb-6">
            {moneyOut.items.map((item: LabeledItem) => (
              <div key={item.label} className="flex gap-4">
                <span className="text-red-600 font-bold text-sm uppercase shrink-0 w-24 pt-0.5">
                  {item.label}
                </span>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* details */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
            details
          </h2>
          <h3 className="text-2xl font-bold tracking-tight lowercase mb-1">
            how it works
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            {details.subtitle}
          </p>

          <div className="space-y-4 mb-6">
            {details.items.map((detail: LabeledItem) => (
              <div key={detail.label} className="flex gap-4">
                <span className="text-red-600 font-bold text-sm uppercase shrink-0 w-24 pt-0.5">
                  {detail.label}
                </span>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {detail.text}
                </p>
              </div>
            ))}
          </div>

          {/* vibe */}
          <div className="border-l-2 border-red-600 pl-6 mb-6">
            <p className="text-[var(--text-primary)] font-medium text-sm">
              {details.vibe}
            </p>
          </div>
        </section>

        {/* safeguards */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
            accountability
          </h2>
          <h3 className="text-2xl font-bold tracking-tight lowercase mb-1">
            what prevents abuse
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            {safeguards.subtitle}
          </p>

          <ul className="space-y-1">
            {safeguards.items.map((item: string) => (
              <li
                key={item}
                className="text-sm text-[var(--text-secondary)] leading-relaxed"
              >
                + {item}
              </li>
            ))}
          </ul>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <ROMarkdown
              raw={page.sections["bottom-line"].raw}
              images={page.images}
              className="text-[var(--text-primary)] font-medium leading-relaxed [&>p]:m-0"
            />
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">
            see how the numbers work in practice
          </p>
          <a
            href="/about/math"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            the math →
          </a>
          <a
            href="/about/money"
            className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mt-3 sm:mt-0"
          >
            current financial model →
          </a>
        </div>
      </main>
    </div>
  );
}
