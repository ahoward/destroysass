import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "terms of service — destroysass",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] font-sans">
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <a
          href="/"
          className="text-red-600 font-bold text-lg tracking-tight hover:text-red-500 transition-colors"
        >
          destroysass
        </a>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <a href="/ideas" className="hover:text-white transition-colors">
            ideas
          </a>
          <a href="/about" className="hover:text-white transition-colors">
            about
          </a>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          terms of service
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          last updated: february 2026
        </p>

        <div className="prose-invert space-y-8 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              1. platform purpose
            </h2>
            <p>
              destroysass is a platform where small businesses collectively
              fund, own, and control the software they depend on. we facilitate
              the process of proposing software ideas, gathering financial
              commitments (pledges), and forming development cooperatives (dev
              cells) to build and maintain that software.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              2. pledges and commitments
            </h2>
            <p>
              pledges made on the platform are non-binding expressions of
              interest and willingness to contribute a monthly amount toward a
              software idea. pledges do not constitute charges, contracts, or
              payment obligations.
            </p>
            <p className="mt-2">
              when an idea reaches its funding threshold and a dev cell is
              formed, participating pledgers will be invited to enter into a
              binding cooperative agreement. only at that point do financial
              obligations begin. you may withdraw your pledge at any time before
              cell formation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              3. cell formation and obligations
            </h2>
            <p>
              cell formation creates a cooperative structure among pledgers and
              the assigned dev cell. upon cell formation, participants agree to
              their stated monthly contributions for an initial commitment
              period. the specific terms of each cooperative are defined at
              formation time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              4. fork freedom
            </h2>
            <p>
              all software built through destroysass is open source. any
              participant may fork, modify, and independently deploy the
              software at any time. leaving a cooperative does not revoke your
              right to use the software — it revokes your right to the
              cooperative&apos;s hosted, maintained instance and ongoing
              development.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              5. user responsibilities
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>provide accurate information when creating your account</li>
              <li>
                do not submit spam, abusive content, or fraudulent ideas
              </li>
              <li>
                do not impersonate other users or organizations
              </li>
              <li>
                pledge amounts you can realistically commit to if the idea
                reaches threshold
              </li>
              <li>
                respect other community members in comments and discussions
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              6. admin rights
            </h2>
            <p>
              platform administrators reserve the right to moderate content,
              remove ideas or comments that violate these terms, approve or
              reject dev cell applications, and trigger cell formation when
              appropriate. admin actions are taken in the interest of platform
              health and community trust.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              7. dispute resolution
            </h2>
            <p>
              disputes between cooperative members are resolved first through
              direct communication, then through the cooperative&apos;s
              governance process. disputes involving the platform itself should
              be directed to the platform administrators. we aim to resolve all
              disputes informally and in good faith.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              8. limitation of liability
            </h2>
            <p>
              destroysass provides this platform &ldquo;as is&rdquo; without
              warranty of any kind. we are not liable for the quality, delivery,
              or maintenance of software built by dev cells. we are not a party
              to cooperative agreements formed through the platform. our
              liability is limited to the direct fees paid to the platform, if
              any.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              9. changes to terms
            </h2>
            <p>
              we may update these terms from time to time. significant changes
              will be communicated via email to registered users. continued use
              of the platform after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              10. contact
            </h2>
            <p>
              questions about these terms? reach out at{" "}
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
