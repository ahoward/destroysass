export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-faint)] bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <p className="text-xs text-[var(--text-muted)] italic text-center md:text-left">
          the code is free. the network is the value.
        </p>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs text-[var(--text-muted)]">
          <a href="/" className="hover:text-[var(--text-secondary)] transition-colors">home</a>
          <a href="/ideas" className="hover:text-[var(--text-secondary)] transition-colors">ideas</a>
          <a href="/about" className="hover:text-[var(--text-secondary)] transition-colors">about</a>
          <a href="/cells" className="hover:text-[var(--text-secondary)] transition-colors">cells</a>
          <a href="/about/governance/bylaws" className="hover:text-[var(--text-secondary)] transition-colors">bylaws</a>
          <a href="/about/governance/articles" className="hover:text-[var(--text-secondary)] transition-colors">articles</a>
          <a href="/terms" className="hover:text-[var(--text-secondary)] transition-colors">terms</a>
          <a href="/privacy" className="hover:text-[var(--text-secondary)] transition-colors">privacy</a>
          <a href="mailto:ara@destroysaas.coop" className="hover:text-[var(--text-secondary)] transition-colors">contact</a>
          <a
            href="https://github.com/ahoward/destroysaas"
            className="hover:text-[var(--text-secondary)] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </div>
      </div>
    </footer>
  );
}
