import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/app/components/footer";
import ThemeToggle from "@/app/components/theme_toggle";
import GhostBanner from "@/app/components/ghost_banner";

export const metadata: Metadata = {
  title: "destroysass — own the software you use",
  description:
    "small businesses collectively fund, own, and control the software they depend on. no more saas rent. propose ideas, pledge monthly, and own what gets built.",
  metadataBase: new URL("https://destroysass.coop"),
  openGraph: {
    title: "destroysass — own the software you use",
    description:
      "small businesses collectively fund, own, and control the software they depend on. no more saas rent.",
    type: "website",
    siteName: "destroysass",
  },
  twitter: {
    card: "summary_large_image",
    title: "destroysass — own the software you use",
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
      </body>
    </html>
  );
}
