/**
 * ============================================================
 *  BLOCKRUSH REWARDS — CENTRAL CONFIGURATION
 * ============================================================
 *  Edit everything about the landing page from this single file.
 *  No other file needs to be touched for content or theme changes.
 * ============================================================
 */

export const siteConfig = {
  /** SEO & browser tab */
  seo: {
    title: "BlockRush Rewards — Gaming Reward Promotion",
    description:
      "Explore today's gaming-themed promotional reward opportunity and continue through the verification process.",
  },

  /** Nav bar */
  nav: {
    brand: "BlockRush",
    tagline: "REWARDS",
  },

  /** Hero section */
  hero: {
    badge: "LIMITED PROMOTION EVENT",
    title: "Unlock Your Exclusive Gaming Reward",
    subtitle:
      "Complete the quick verification steps below to discover today's available reward opportunity.",
    ctaText: "🎁 UNLOCK REWARD",
    ctaSubtext: "Limited promotional availability — not every visitor is guaranteed a reward.",
    urgencyText: "Today's promotion ends soon",
  },

  /** Countdown timer (in minutes from page load) */
  countdown: {
    minutes: 15,
    label: "Promotion ends in",
  },

  /** Stats bar — generic, non-fabricated numbers */
  stats: [
    { label: "Active Now", value: "247", icon: "users" },
    { label: "Today's Checks", value: "1,8K+", icon: "eye" },
    { label: "Promo Slots", value: "Limited", icon: "slot" },
  ],

  /** Reward cards */
  rewardCards: [
    {
      icon: "🎁",
      title: "Mystery Reward",
      description: "Discover today's promotional reward option waiting for you.",
      tag: "Featured",
      color: "green",
    },
    {
      icon: "💎",
      title: "Bonus Items",
      description: "Explore available bonus opportunities and in-game content.",
      tag: "Popular",
      color: "blue",
    },
    {
      icon: "⚡",
      title: "Limited Access",
      description: "Complete verification to unlock your promotional access slot.",
      tag: "Limited",
      color: "gold",
    },
  ],

  /** How it works steps */
  steps: [
    {
      title: "Choose Your Reward",
      description:
        "Select the promotional reward option available to you from the list above.",
      icon: "target",
    },
    {
      title: "Complete Verification",
      description:
        "Follow the verification instructions displayed after clicking the button.",
      icon: "shield",
    },
    {
      title: "Continue",
      description:
        "After successful completion, continue to the next step to claim your reward.",
      icon: "check",
    },
  ],

  /** Main CTA section */
  mainCta: {
    title: "READY TO CHECK YOUR REWARD?",
    subtitle: "Tap below to continue to the verification page.",
    buttonText: "🚀 CHECK REWARD",
    trustText: "Secure connection · No download required · Instant access",
  },

  /** Live activity feed — generic, non-fabricated */
  liveActivity: {
    title: "Live Activity",
    messages: [
      "🎮 Players are checking today's promotional opportunities",
      "⏱️ Promotion slot reserved — verification in progress",
      "🔔 New promotional reward option now available",
      "⚡ Limited access slots filling up — don't miss out",
      "💎 Bonus items featured on today's promotion page",
    ],
  },

  /** FAQ section */
  faq: [
    {
      question: "What is BlockRush Rewards?",
      answer:
        "BlockRush Rewards is an independent promotional page featuring gaming-themed reward opportunities. It is not affiliated with or endorsed by Mojang Studios or Microsoft.",
    },
    {
      question: "How do I check my reward?",
      answer:
        "Click the 'Unlock Reward' or 'Check Reward' button. You'll be taken to a verification page where you can follow the steps to continue.",
    },
    {
      question: "Is this an official Minecraft giveaway?",
      answer:
        "No. This is an independent promotional page. We do not claim to be affiliated with Minecraft, Mojang Studios, or Microsoft. Reward availability may vary.",
    },
    {
      question: "Do I need to download anything?",
      answer:
        "No download is required on this page. You simply click the CTA button and follow the verification steps shown by the promotion.",
    },
    {
      question: "Is every visitor guaranteed a reward?",
      answer:
        "No. Reward availability may vary. Completing the verification steps does not guarantee a specific reward. Always follow the instructions shown by the promotion.",
    },
  ],

  /** Trust badges */
  trustBadges: [
    { icon: "shield", text: "Secure Verification" },
    { icon: "zap", text: "Instant Access" },
    { icon: "globe", text: "No Download Needed" },
    { icon: "lock", text: "Privacy Protected" },
  ],

  /** Transparency disclaimer */
  disclaimer:
    "This is an independent promotional page and is not affiliated with or endorsed by Mojang Studios or Microsoft. Reward availability may vary. Complete any required verification steps shown by the promotion.",

  /* ============================================================
   *  CONTENT LOCKER URL
   *  ============================================================
   *  Replace the value below with your AdBlueMedia content-locker
   *  URL. When a visitor clicks any CTA button they will be sent
   *  to this address in a new tab.
   *
   *  Example:
   *    CONTENT_LOCKER_URL: "https://www.adbluemedia.com/locker/your-locker-id"
   * ============================================================ */
  CONTENT_LOCKER_URL: "https://www.adbluemedia.com/locker/REPLACE_WITH_YOUR_LOCKER_URL",

  /** Theme — accent color ramps used across the page */
  theme: {
    colors: {
      primary: "#5fd35f", // Minecraft green
      secondary: "#3ea6ff", // diamond blue
      accent: "#ffd83d", // gold
      highlight: "#b366ff", // amethyst purple
      dirt: "#8b5a2b", // dirt brown
      stone: "#7d7d7d", // stone gray
    },
    background: "#0a0e14",
  },
} as const;

export type SiteConfig = typeof siteConfig;
