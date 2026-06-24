import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About | Paperclip Journal',
  description: 'Meet the author behind Paperclip Journal.'
};

const links = [
  { href: 'https://github.com/paperclip-journal', label: 'GitHub' },
  { href: 'https://www.linkedin.com', label: 'LinkedIn' },
  { href: 'https://x.com', label: 'X / Twitter' }
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="grid gap-10 rounded-[2rem] border border-border/60 bg-surface p-6 shadow-card md:grid-cols-[280px_1fr] md:p-8">
        <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[1.75rem] border border-border/60">
          <Image
            src="/images/author/mina-hart.svg"
            alt="Portrait illustration of Mina Hart"
            fill
            sizes="280px"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">About</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground [font-family:var(--font-display)] sm:text-5xl">
            Mina Hart writes about product teams that prefer clarity over noise
          </h1>
          <div className="mt-6 space-y-5 text-base leading-8 text-muted">
            <p>
              Mina is a product-minded engineer and editor who cares about calm interfaces,
              durable front-end architecture, and publishing systems that help teams ship
              thoughtful work without ceremony.
            </p>
            <p>
              Paperclip Journal is where those interests meet. The publication focuses on
              typography, engineering restraint, content strategy, and the tiny product choices
              that make software feel trustworthy.
            </p>
            <p>
              When Mina is not writing, she is usually refining a component API, deleting a layer
              of unnecessary complexity, or taking notes on what makes digital reading feel good.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border/70 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-foreground/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
