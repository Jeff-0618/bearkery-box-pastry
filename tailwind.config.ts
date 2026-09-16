import type { Config } from "tailwindcss";

/**
 * BEARKERY — warm Japanese storybook bakery.
 *
 * Direction: soft kraft paper, milk tea, morning light. Rounded everything.
 * Reference points are a neighbourhood Japanese bakery and a children's
 * picture book — NOT Scandinavian minimal, which reads cold for this brand.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Driven by CSS variables so the Mid-Autumn theme can repaint the
        // whole site without touching a single component.
        milk: "var(--c-milk)",
        cream: "var(--c-cream)",
        surface: "var(--c-surface)",
        cocoa: "var(--c-cocoa)",
        taupe: "var(--c-taupe)",
        teddy: "var(--c-teddy)",
        caramel: "var(--c-caramel)",
        peach: "var(--c-peach)",
        line: "var(--c-line)",
        // Fixed, theme-independent
        kraft: "#EFDCC4",
        blush: "#F0CFC6",
        matcha: "#A9BE9C",
      },
      fontFamily: {
        // Rounded Japanese-friendly display + friendly geometric body
        display: ["var(--font-zen)", "system-ui", "sans-serif"],
        body: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        soft: "1.5rem",
        blob: "2.25rem",
        pill: "999px",
      },
      boxShadow: {
        // Paper resting on a table, not a UI card
        paper: "0 1px 2px rgba(75,58,47,0.05), 0 8px 24px -12px rgba(75,58,47,0.18)",
        lifted: "0 4px 10px -4px rgba(75,58,47,0.10), 0 20px 44px -20px rgba(75,58,47,0.26)",
        stamp: "0 2px 0 rgba(198,127,67,0.25)",
      },
      backgroundImage: {
        sunlight:
          "radial-gradient(130% 100% at 50% -20%, rgba(255,249,238,0.98) 0%, rgba(253,246,236,0) 62%)",
        dusk:
          "radial-gradient(130% 100% at 50% -20%, rgba(255,238,214,0.98) 0%, rgba(253,246,236,0) 62%)",
        night:
          "radial-gradient(130% 100% at 50% -20%, rgba(247,231,209,0.95) 0%, rgba(250,240,228,0) 62%)",
      },
      transitionTimingFunction: {
        gentle: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        pop: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        breathe: { "0%,100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.018)" } },
        sway: { "0%,100%": { transform: "rotate(-2deg)" }, "50%": { transform: "rotate(2deg)" } },
        wave: {
          "0%, 70%, 100%": { transform: "rotate(0deg)" },
          "80%": { transform: "rotate(-13deg)" },
          "90%": { transform: "rotate(-6deg)" },
        },
        driftLight: {
          "0%,100%": { opacity: "0.8", transform: "translate3d(0,0,0)" },
          "50%": { opacity: "1", transform: "translate3d(1.5%,1%,0)" },
        },
        softIn: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popIn: {
          "0%": { transform: "scale(0.7)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        stampDown: {
          "0%": { transform: "scale(1.6) rotate(-12deg)", opacity: "0" },
          "60%": { transform: "scale(0.94) rotate(-6deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-6deg)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        breathe: "breathe 5s ease-in-out infinite",
        sway: "sway 6s ease-in-out infinite",
        wave: "wave 4.5s ease-in-out infinite",
        driftLight: "driftLight 20s ease-in-out infinite",
        softIn: "softIn 0.8s cubic-bezier(0.22,0.61,0.36,1) forwards",
        popIn: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
        stampDown: "stampDown 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
        shimmer: "shimmer 1.8s infinite linear",
      },
    },
  },
  plugins: [],
};

export default config;
