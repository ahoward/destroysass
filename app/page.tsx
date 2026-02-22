import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] font-sans">

      {/* nav */}
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <span className="text-red-600 font-bold text-lg tracking-tight">
          destroysass
        </span>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <a href="/ideas" className="hover:text-white transition-colors">ideas</a>
          <a href="/dev-cells" className="hover:text-white transition-colors">dev cells</a>
          <a href="/about" className="hover:text-white transition-colors">about</a>
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

      {/* hero */}
      <main className="max-w-2xl mx-auto px-6 pt-20 pb-32">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight lowercase mb-6">
          the place where small businesses
          <br />
          <span className="text-red-600">stop renting software</span>
          <br />
          and start owning it.
        </h1>
        <p className="text-xl text-gray-400 mb-16">
          saas is dead. we&apos;re building what comes next.
        </p>

        {/* problem */}
        <div className="border-l-2 border-[#222] pl-6 mb-16">
          <p className="text-gray-400 leading-relaxed">
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
          <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-6">
            how it works
          </h2>

          <div className="flex gap-4">
            <span className="text-red-600 font-bold text-lg tabular-nums shrink-0 w-6">
              1
            </span>
            <div>
              <p className="font-semibold mb-1">propose</p>
              <p className="text-gray-500 text-sm leading-relaxed">
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
              <p className="text-gray-500 text-sm leading-relaxed">
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
              <p className="text-gray-500 text-sm leading-relaxed">
                a vetted developer cooperative builds it under contract to your
                collective. the code is open-source. the hosting is yours. you
                have legal standing.
              </p>
            </div>
          </div>
        </div>

        {/* cta */}
        <div className="mb-24">
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
            or browse existing ideas &rarr;
          </a>
        </div>

        {/* footer */}
        <footer className="border-t border-[#1a1a1a] pt-8 flex justify-between items-center">
          <p className="text-xs text-gray-700 italic">
            the code is free. the network is the value.
          </p>
          <div className="flex gap-4 text-xs text-gray-700">
            <a
              href="https://github.com/ahoward/destroysass"
              className="hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <a
              href="https://github.com/ahoward/destroysass/tree/main/docs"
              className="hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              docs
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
