import { whatsappLink } from "./business";

/**
 * THE SEASONAL SLOT
 *
 * One block on the homepage that changes with the month or the festival.
 * Everything it shows lives here, so updating it is editing this file — no
 * layout or component work.
 *
 * To change it: edit `CURRENT`. To hide it entirely: set `active: false`.
 *
 * Deliberately no products or prices here. Festive items are arranged by
 * conversation, so the block invites a message rather than inventing a
 * catalogue item that doesn't exist.
 */

export interface SeasonalCampaign {
  active: boolean;
  /** Small label above the heading, e.g. "Mid-Autumn · 25 September". */
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  /** Message pre-filled into WhatsApp when the button is tapped. */
  ctaMessage: string;
  /** Optional closing line under the button. */
  footnote?: string;
  /** Renders the soft moon motif. Turn off for non-lunar campaigns. */
  moon?: boolean;
}

export const CURRENT: SeasonalCampaign = {
  active: true,
  eyebrow: "Mid-Autumn · 25 September",
  heading: "Under the same full moon",
  body:
    "Mid-Autumn is a night for being together — and a night that's felt most by the ones who are far from home. If you're gathering people around a table this year, or sending something to a table you can't reach, tell us who it's for and we'll help you put the box together.",
  ctaLabel: "Plan a Mid-Autumn box",
  ctaMessage:
    "Hi Bearkery Box Pastry! I'd like to ask about a Mid-Autumn gift box.",
  footnote: "Festive boxes are arranged personally — order early, we bake to order.",
  moon: true,
};

export const seasonalCtaLink = () => whatsappLink(CURRENT.ctaMessage);

/**
 * Ideas for the months ahead — copy one into CURRENT when the time comes.
 *
 * Christmas:
 *   eyebrow: "Christmas · 25 December"
 *   heading: "Something warm to carry over"
 *   body:    "..." ctaLabel: "Plan a Christmas box"  moon: false
 *
 * Lunar New Year:
 *   eyebrow: "Lunar New Year"
 *   heading: "For the reunion table"
 *   moon: false
 *
 * Mother's Day / Father's Day / Hari Raya — same shape.
 */
