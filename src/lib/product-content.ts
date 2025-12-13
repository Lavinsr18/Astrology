import {
  Sparkles,
  Zap,
  HeartHandshake,
  ShieldCheck,
  Users,
  Brain,
  Moon,
  Sun,
  Gem,
  Eye,
  Compass,
} from "lucide-react";

export const PRODUCT_CONTENT: Record<
  string,
  {
    benefits: { icon: any; text: string }[];
    why: string;
    who: string[];
  }
> = {
  // ================= WEALTH =================
  "dhan-yog": {
    benefits: [
      { icon: Zap, text: "Activates wealth-attracting energies and financial growth" },
      { icon: Sun, text: "Enhances confidence, leadership & decision making" },
      { icon: ShieldCheck, text: "Protects from financial instability & losses" },
      { icon: Sparkles, text: "Balances money-related karma and abundance flow" },
    ],
    why:
      "Dhan Yog Bracelet combines powerful wealth stones like Citrine, Green Aventurine and Tiger Eye. These crystals work together to remove financial blockages, enhance opportunities and stabilize income sources.",
    who: [
      "Business owners & entrepreneurs",
      "People facing financial instability",
      "Professionals seeking career growth",
      "Anyone starting a new financial journey",
    ],
  },

  // ================= LOVE =================
  "love-attraction": {
    benefits: [
      { icon: HeartHandshake, text: "Attracts love, harmony & emotional bonding" },
      { icon: Sparkles, text: "Heals emotional wounds & past heartbreaks" },
      { icon: Users, text: "Improves relationships & self-love" },
      { icon: ShieldCheck, text: "Creates emotional calm & inner peace" },
    ],
    why:
      "Rose Quartz is known as the stone of unconditional love. It opens the heart chakra, allowing positive love energy to flow freely while dissolving emotional negativity.",
    who: [
      "People seeking love or marriage",
      "Those healing from emotional pain",
      "Couples wanting deeper bonding",
      "Anyone wanting self-love & peace",
    ],
  },

  // ================= HEALTH =================
  amethyst: {
    benefits: [
      { icon: Brain, text: "Relieves stress, anxiety & overthinking" },
      { icon: Moon, text: "Improves sleep quality & mental calmness" },
      { icon: ShieldCheck, text: "Protects aura from negative energies" },
      { icon: Sparkles, text: "Enhances spiritual awareness & clarity" },
    ],
    why:
      "Amethyst is a powerful calming crystal that stabilizes emotions and clears mental clutter. It is widely used for stress relief, meditation and emotional balance.",
    who: [
      "People suffering from stress or anxiety",
      "Students & professionals under pressure",
      "Those facing sleep disorders",
      "Meditation & spiritual seekers",
    ],
  },

  // ================= CHAKRA =================
  "7-chakra": {
    benefits: [
      { icon: Compass, text: "Balances all 7 chakras for complete harmony" },
      { icon: Sparkles, text: "Aligns mind, body & spirit" },
      { icon: Eye, text: "Enhances focus, clarity & inner awareness" },
      { icon: ShieldCheck, text: "Removes negative energy blockages" },
    ],
    why:
      "The 7 Chakra Bracelet uses carefully selected stones aligned with each chakra. When worn together, they restore energetic balance, emotional stability and spiritual flow.",
    who: [
      "People feeling emotionally or mentally imbalanced",
      "Yoga & meditation practitioners",
      "Spiritual seekers",
      "Anyone wanting holistic energy healing",
    ],
  },

  // ================= ZODIAC =================
  aries: {
    benefits: [
      { icon: Zap, text: "Boosts confidence & courage" },
      { icon: Sun, text: "Enhances leadership qualities" },
    ],
    why:
      "Carnelian resonates strongly with Aries energy, increasing motivation, courage and decisive action.",
    who: ["Aries zodiac natives", "Leaders & action-oriented people"],
  },

  taurus: {
    benefits: [
      { icon: HeartHandshake, text: "Attracts love & emotional stability" },
      { icon: ShieldCheck, text: "Creates calm & patience" },
    ],
    why:
      "Rose Quartz supports Taurus’ need for love, stability and emotional comfort.",
    who: ["Taurus zodiac natives", "People seeking emotional balance"],
  },

  gemini: {
    benefits: [
      { icon: Brain, text: "Improves focus & communication" },
      { icon: Sparkles, text: "Balances dual nature of mind" },
    ],
    why:
      "Agate stabilizes Gemini’s mental energy and improves concentration.",
    who: ["Gemini zodiac natives", "Students & communicators"],
  },

  cancer: {
    benefits: [
      { icon: Moon, text: "Soothes emotional stress" },
      { icon: ShieldCheck, text: "Provides emotional protection" },
    ],
    why:
      "Howlite calms Cancer’s emotional sensitivity and anxiety.",
    who: ["Cancer zodiac natives", "Emotionally sensitive individuals"],
  },

  leo: {
    benefits: [
      { icon: Sun, text: "Boosts confidence & charisma" },
      { icon: Zap, text: "Enhances leadership & success" },
    ],
    why:
      "Citrine aligns with Leo’s solar energy and confidence.",
    who: ["Leo zodiac natives", "Public speakers & leaders"],
  },

  virgo: {
    benefits: [
      { icon: Brain, text: "Reduces overthinking" },
      { icon: Sparkles, text: "Brings mental clarity" },
    ],
    why:
      "Amazonite calms Virgo’s analytical mind and stress.",
    who: ["Virgo zodiac natives", "People under mental pressure"],
  },

  libra: {
    benefits: [
      { icon: Compass, text: "Improves wisdom & balance" },
      { icon: Sparkles, text: "Enhances decision making" },
    ],
    why:
      "Lapis Lazuli supports Libra’s need for balance and clarity.",
    who: ["Libra zodiac natives", "Decision-makers"],
  },

  scorpio: {
    benefits: [
      { icon: ShieldCheck, text: "Strong protection from negativity" },
      { icon: Eye, text: "Enhances intuition & awareness" },
    ],
    why:
      "Obsidian protects Scorpio’s intense energy and removes negativity.",
    who: ["Scorpio zodiac natives", "Energy-sensitive people"],
  },

  sagittarius: {
    benefits: [
      { icon: Sparkles, text: "Calms restless mind" },
      { icon: ShieldCheck, text: "Brings emotional peace" },
    ],
    why:
      "Turquoise stabilizes Sagittarius’ adventurous energy.",
    who: ["Sagittarius zodiac natives", "Travelers & explorers"],
  },

  capricorn: {
    benefits: [
      { icon: ShieldCheck, text: "Provides grounding & stability" },
      { icon: Zap, text: "Strengthens discipline & focus" },
    ],
    why:
      "Black Tourmaline grounds Capricorn’s hardworking nature.",
    who: ["Capricorn zodiac natives", "Professionals"],
  },

  aquarius: {
    benefits: [
      { icon: Brain, text: "Enhances visionary thinking" },
      { icon: Sparkles, text: "Improves creativity" },
    ],
    why:
      "Amethyst enhances Aquarius’ innovative mindset.",
    who: ["Aquarius zodiac natives", "Creative thinkers"],
  },

  pisces: {
    benefits: [
      { icon: Gem, text: "Attracts luck & prosperity" },
      { icon: HeartHandshake, text: "Brings emotional peace" },
    ],
    why:
      "Green Jade harmonizes Pisces’ emotional and spiritual nature.",
    who: ["Pisces zodiac natives", "Spiritual seekers"],
  },
};


