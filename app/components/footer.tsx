export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a] text-[#f0f0f0] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-8 flex justify-between items-center">
        <p className="text-xs text-gray-700 italic">
          the code is free. the network is the value.
        </p>
        <div className="flex gap-4 text-xs text-gray-700">
          <a href="/" className="hover:text-gray-400 transition-colors">home</a>
          <a href="/ideas" className="hover:text-gray-400 transition-colors">ideas</a>
          <a href="/about" className="hover:text-gray-400 transition-colors">about</a>
          <a href="/dev-cells" className="hover:text-gray-400 transition-colors">dev cells</a>
          <a href="/terms" className="hover:text-gray-400 transition-colors">terms</a>
          <a href="/privacy" className="hover:text-gray-400 transition-colors">privacy</a>
          <a
            href="https://github.com/ahoward/destroysass"
            className="hover:text-gray-400 transition-colors"
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
