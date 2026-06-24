import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground [font-family:var(--font-display)] sm:text-5xl">
        This page slipped out of the archive
      </h1>
      <p className="mt-5 max-w-xl text-base leading-8 text-muted">
        The article you were looking for does not exist, or the link is no longer valid. You can
        head back to the homepage or browse the full archive instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-surface transition hover:opacity-90"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-border/70 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
        >
          Browse the archive
        </Link>
      </div>
    </div>
  );
}
