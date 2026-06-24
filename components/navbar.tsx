import Link from 'next/link';

import { DarkModeToggle } from '@/components/dark-mode-toggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' }
];

export function Navbar() {
  return (
    <header className="border-b border-border/60 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <Link href="/" className="text-2xl font-semibold tracking-tight text-foreground">
            Paperclip Journal
          </Link>
          <p className="mt-1 text-sm text-muted">
            Essays on building products with clarity, care, and restraint.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
          <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-foreground/5 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
