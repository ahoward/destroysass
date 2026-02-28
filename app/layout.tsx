import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Footer from "@/app/components/footer";
import ThemeToggle from "@/app/components/theme_toggle";
import GhostBanner from "@/app/components/ghost_banner";

export const metadata: Metadata = {
  title: "destroysaas — own the software you use",
  description:
    "small businesses collectively fund, own, and control the software they depend on. no more saas rent. propose ideas, pledge monthly, and own what gets built.",
  metadataBase: new URL("https://destroysaas.coop"),
  openGraph: {
    title: "destroysaas — own the software you use",
    description:
      "small businesses collectively fund, own, and control the software they depend on. no more saas rent.",
    url: "https://destroysaas.coop",
    type: "website",
    siteName: "destroysaas",
  },
  twitter: {
    card: "summary_large_image",
    title: "destroysaas — own the software you use",
    description:
      "small businesses collectively fund, own, and control the software they depend on. no more saas rent.",
  },
};

const THEME_SCRIPT = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <GhostBanner />
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
