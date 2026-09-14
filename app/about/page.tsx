import type { Metadata } from "next";
import Link from "next/link";
import LazyImage from "@/components/shared/LazyImage";
import SectionHeading from "@/components/shared/SectionHeading";
import LayeredBear from "@/components/shared/LayeredBear";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn the story behind Bearkery Box Pastry — a family bakery built on warmth, blessings, and handmade craft, with a little teddy bear at its heart.",
};

const VALUES = [
  {
    title: "Handmade, always",
    body: "Every layer, every piped message, is shaped by hand — never a machine.",
  },
  {
    title: "A blessing in every box",
    body: "We believe a cake is never just dessert. It's a small blessing passed from one hand to another.",
  },
  {
    title: "Family at the core",
    body: "Bearkery Box began in a home kitchen, and every order still feels like it's for family.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* The Story Behind Bearkery */}
      <section className="bg-warm-glow py-16">
        <div className="container-bx grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="t-eyebrow mb-4">The Story Behind Bearkery</p>
            <h1 className="text-4xl font-medium sm:text-5xl">
              Baked with warmth, <span className="italic text-teddy">shared as blessings.</span>
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-taupe">
              Bearkery Box Pastry started as a handful of cakes shared with neighbours
              during festive season. Word spread softly, the way warmth always does —
              and what began in a small kitchen grew into a little bakery devoted to
              gentle, handmade celebration.
            </p>
          </div>
          <LazyImage
            src="https://images.unsplash.com/photo-1557776959-f066eb37857f?q=80&w=1000&auto=format&fit=crop"
            alt="Baker hand-piping cream onto a soft layered cake"
            className="aspect-[4/3] w-full rounded-soft shadow-paper"
            priority
          />
        </div>
      </section>

      {/* Meet Our Teddy */}
      <section className="container-bx py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="t-eyebrow mb-4">Meet Our Teddy</p>
            <h2 className="text-3xl font-medium sm:text-4xl">
              The quiet heart of every box.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-taupe">
              He doesn't say much. He just bakes, wraps, and waits by the door for
              the next box to go out. Our teddy has been with Bearkery Box since
              the very first cake — a small, steady reminder that behind every
              order is a hand that cared enough to make it well.
            </p>
          </div>
          <div className="order-1 mx-auto h-56 w-56 md:order-2">
            <LayeredBear mood="greet" priority />
          </div>
        </div>
      </section>

      {/* Our Kitchen */}
      <section className="bg-cream py-20">
        <div className="container-bx grid items-center gap-10 md:grid-cols-2">
          <LazyImage
            src="https://images.unsplash.com/photo-1761798355863-9b77d9002648?q=80&w=1000&auto=format&fit=crop"
            alt="A small, warm home-style bakery kitchen with fresh bakes cooling"
            className="aspect-[4/3] w-full rounded-soft shadow-paper"
          />
          <div>
            <p className="t-eyebrow mb-4">Our Kitchen</p>
            <h2 className="text-3xl font-medium sm:text-4xl">
              Small batches, slow mornings.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-taupe">
              Every bake starts before sunrise, in small batches, so nothing sits
              waiting and nothing is rushed. We keep our kitchen small on purpose
              — it's the only way we know how to keep every box feeling personal.
            </p>
          </div>
        </div>
      </section>

      {/* Made With Love */}
      <section className="container-bx py-20">
        <SectionHeading
          t-eyebrow="Made With Love"
          title="Three things that guide every bake"
          align="center"
          className="mx-auto"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="paper p-6 text-center">
              <h3 className="font-display text-lg font-medium">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-taupe">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Promise */}
      <section className="container-bx pb-24">
        <div className="paper flex flex-col items-center gap-4 px-8 py-14 text-center">
          <p className="t-eyebrow">Our Promise</p>
          <h2 className="max-w-xl text-3xl font-medium sm:text-4xl">
            Every box, wrapped like it's for someone we love.
          </h2>
          <p className="max-w-lg text-taupe">
            That's the whole promise, really — nothing baked here leaves our
            kitchen until we'd be happy to hand it to our own family.
          </p>
          <Link href="/collections" className="btn-primary mt-2">
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
}
