export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>Paperclip Journal is a quiet place for thoughtful product and engineering writing.</p>
        <p>© {new Date().getFullYear()} Mina Hart. Built with Next.js.</p>
      </div>
    </footer>
  );
}
