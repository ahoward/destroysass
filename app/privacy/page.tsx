import type { Metadata } from "next";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "privacy policy — destroysaas",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/privacy" />

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          privacy policy
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-10">
          last updated: february 2026
        </p>

        <div className="prose-invert space-y-8 text-sm text-[var(--text-secondary)] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              1. data we collect
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>account data:</strong> email address (used for
                authentication and notifications)
              </li>
              <li>
                <strong>ideas:</strong> title, description, problem statement,
                monthly ask amount
              </li>
              <li>
                <strong>pledges:</strong> which ideas you&apos;ve pledged to and
                the monthly amount
              </li>
              <li>
                <strong>comments:</strong> discussion content and display name
              </li>
              <li>
                <strong>upvotes:</strong> which ideas you&apos;ve upvoted
              </li>
              <li>
                <strong>cell applications:</strong> organization name,
                description, skills, contact email
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              2. how we use your data
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                operate and maintain the platform
              </li>
              <li>
                send notifications about ideas you&apos;ve pledged to (new
                pledges, status changes, cell formation)
              </li>
              <li>
                display aggregate statistics (total pledged, pledge counts) on
                the public idea board
              </li>
              <li>
                communicate important platform updates
              </li>
            </ul>
            <p className="mt-2">
              we do not sell your data. we do not use your data for advertising.
              we do not share your data with third parties for their marketing
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              3. third-party services
            </h2>
            <p>we use the following services to operate the platform:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <strong>supabase</strong> — database hosting and authentication
                (stores your account and platform data)
              </li>
              <li>
                <strong>vercel</strong> — application hosting and CDN (serves
                the website)
              </li>
              <li>
                <strong>resend</strong> — transactional email delivery
                (sends notification emails)
              </li>
            </ul>
            <p className="mt-2">
              each service has its own privacy policy governing how they handle
              data processed on our behalf.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              4. cookies
            </h2>
            <p>
              we use session cookies strictly for authentication (supabase auth
              tokens). we do not use tracking cookies, analytics cookies, or
              advertising cookies. there is no cookie banner because there is
              nothing to consent to beyond essential functionality.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              5. data retention
            </h2>
            <p>
              your data is retained as long as your account is active. ideas,
              pledges, and comments remain on the platform as part of the
              community record. if you delete your account, your personal data
              is removed but contributions to ideas and discussions may be
              retained in anonymized form.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              6. your rights
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>access:</strong> you can view all your data on your
                dashboard
              </li>
              <li>
                <strong>deletion:</strong> contact us to delete your account and
                associated data
              </li>
              <li>
                <strong>withdrawal:</strong> you can withdraw pledges at any
                time before cell formation
              </li>
              <li>
                <strong>correction:</strong> contact us to correct any
                inaccurate personal data
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              7. security
            </h2>
            <p>
              we use row-level security on all database tables, HTTPS for all
              connections, and server-side authentication checks on every
              request. passwords are handled by supabase auth and never stored
              in plaintext.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              8. changes to this policy
            </h2>
            <p>
              we may update this policy from time to time. significant changes
              will be communicated via email. the &ldquo;last updated&rdquo;
              date at the top reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              9. contact
            </h2>
            <p>
              privacy questions? reach out at{" "}
              <a
                href="mailto:ara.t.howard@gmail.com"
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                ara.t.howard@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
