import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export const metadata: Metadata = {
  title: "about — destroysass",
};

const faqs = [
  {
    q: "what if I want to leave?",
    a: "fork freedom. the code is open-source. your data is yours. you can leave any time, take everything, and run it yourself.",
  },
  {
    q: "who builds the software?",
    a: "vetted developer cooperatives — small, skilled teams contracted by your collective. not offshore agencies. not solo freelancers. real cooperatives with skin in the game.",
  },
  {
    q: "what's the legal structure?",
    a: "an LCA/DAO hybrid. a limited cooperative association gives you real legal standing — enforceable contracts, voting rights, and the ability to sue if terms are breached. the DAO layer handles governance and transparency.",
  },
  {
    q: "can I change my pledge amount?",
    a: "yes, until the cell forms. once a cell enters formation, pledges are locked to protect the collective commitment. you can always increase after formation.",
  },
  {
    q: "what happens after cell formation?",
    a: "development begins. the cooperative ships regular updates. members vote on priorities. you get a working product maintained by people accountable to you — not shareholders.",
  },
  {
    q: "is the code really open source?",
    a: "always. that's the entire point. you're not paying for code — you're paying for hosting, maintenance, support, and the collective infrastructure that keeps it running.",
  },
  {
    q: "what if no one pledges my idea?",
    a: "it stays visible on the board. share it. rally others. there's no expiration. good ideas find their people.",
  },
  {
    q: "how is this different from open source?",
    a: "open source gives you code. destroysass gives you a funded, maintained, hosted product with legal protections and collective governance. the code is open-source, but the service is what you're buying — and you own that too.",
  },
];

export default async function AboutPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] font-sans">
      {/* nav */}
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <a href="/" className="text-red-600 font-bold text-lg tracking-tight">
          destroysass
        </a>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <a href="/ideas" className="hover:text-white transition-colors">ideas</a>
          <a href="/dev-cells" className="hover:text-white transition-colors">dev cells</a>
          <a href="/about" className="text-white">about</a>
          {user ? (
            <>
              <a href="/dashboard" className="hover:text-white transition-colors">dashboard</a>
              <form action={signOut}>
                <button type="submit" className="hover:text-white transition-colors">sign out</button>
              </form>
            </>
          ) : (
            <a href="/auth" className="hover:text-white transition-colors">sign in</a>
          )}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          why we&apos;re building this
        </h1>
        <p className="text-gray-400 text-lg mb-16">
          software should be infrastructure you own, not rent you pay forever.
        </p>

        {/* the problem */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-6">the problem</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              every month, your business sends money to software companies that can raise prices,
              change terms, get acquired, or shut down — and you have <span className="text-white font-medium">zero legal recourse</span>.
            </p>
            <p>
              ai made building software cheaper. but building was never the expensive part.{" "}
              <span className="text-white font-medium">80% of total cost of ownership is maintenance</span> —
              updates, hosting, security, support. that&apos;s the part saas vendors use to extract from you indefinitely.
            </p>
            <p>
              you don&apos;t have a software problem. you have an <span className="text-white font-medium">ownership problem</span>.
            </p>
          </div>
        </section>

        {/* the model */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-6">the model</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              destroysass flips the script. instead of renting from a vendor, businesses{" "}
              <span className="text-white font-medium">collectively fund the software they need</span>.
              a vetted developer cooperative builds and maintains it under contract to your collective.
            </p>
            <p>
              the code is open-source. the data belongs to you. the legal structure — an{" "}
              <span className="text-white font-medium">LCA/DAO hybrid</span> — gives you real enforceable rights.
              voting power. the ability to sue if terms are breached. fork freedom if you want to leave.
            </p>
            <p>
              the person who submits the original idea gets a revenue share if the cell scales.
              good ideas should be rewarded.
            </p>
          </div>
        </section>

        {/* how cells work */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-6">how cells work</h2>
          <div className="space-y-6">
            {[
              {
                step: "idea",
                desc: "someone proposes software their business needs — what it does, what they'd pay monthly.",
              },
              {
                step: "pledges",
                desc: "other businesses with the same need back it with monthly commitments. $25–$500/mo per business.",
              },
              {
                step: "threshold",
                desc: "when monthly pledges hit $1,000, the idea reaches threshold. pledges lock.",
              },
              {
                step: "cell formation",
                desc: "an admin triggers cell formation. the legal entity (LCA) is created. contracts are signed.",
              },
              {
                step: "build + own",
                desc: "a developer cooperative builds it. members vote on priorities. you own what you paid for.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-red-600 font-bold text-sm uppercase shrink-0 w-20 pt-0.5">
                  {item.step}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* faq */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-6">faq</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-l-2 border-[#222] pl-6">
                <p className="font-medium text-white mb-1">{faq.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[#1a1a1a] pt-12 text-center">
          <p className="text-gray-500 mb-6">ready to stop renting?</p>
          <a
            href="/ideas/new"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            submit an idea &rarr;
          </a>
          <a
            href="/ideas"
            className="inline-block text-sm text-gray-500 hover:text-gray-300 transition-colors mt-3 sm:mt-0"
          >
            browse ideas &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
