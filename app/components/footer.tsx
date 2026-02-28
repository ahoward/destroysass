export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-faint)] bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-8 flex justify-between items-center">
        <p className="text-xs text-[var(--text-separator)] italic">
          the code is free. the network is the value.
        </p>
        <div className="flex gap-4 text-xs text-[var(--text-separator)]">
          <a href="/" className="hover:text-[var(--text-secondary)] transition-colors">home</a>
          <a href="/ideas" className="hover:text-[var(--text-secondary)] transition-colors">ideas</a>
          <a href="/about" className="hover:text-[var(--text-secondary)] transition-colors">about</a>
          <a href="/cells" className="hover:text-[var(--text-secondary)] transition-colors">cells</a>
          <a href="/terms" className="hover:text-[var(--text-secondary)] transition-colors">terms</a>
          <a href="/privacy" className="hover:text-[var(--text-secondary)] transition-colors">privacy</a>
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
