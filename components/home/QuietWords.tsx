import Reveal from "@/components/shared/Reveal";

/**
 * Replaces the old three-card testimonial grid — that pattern reads as a
 * generic ecommerce template. Instead: one line, given a lot of quiet space.
 * No star ratings, no avatars, no cards. It should feel overheard rather
 * than advertised.
 *
 * NOTE: placeholder wording until the client supplies a real customer line.
 * Swap the text below for something a real customer actually wrote.
 */
export default function QuietWords() {
  return (
    <section className="section bg-milk">
      <div className="container-bx">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-2xl leading-[1.55] text-cocoa sm:text-3xl">
            “It arrived still a little warm, and we ate it standing in the
            kitchen before anyone thought to get plates.”
          </p>
          <p className="t-caption mt-6">A note from a customer</p>
        </Reveal>
      </div>
    </section>
  );
}
