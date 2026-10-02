/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — edit everything here.
 *  Components read only from this file; no personal details live elsewhere.
 * ─────────────────────────────────────────────────────────────
 */
import hero from "@/assets/hero.jpg";
import couple01 from "@/assets/couple-01.jpg";
import couple02 from "@/assets/couple-02.jpg";
import couple03 from "@/assets/couple-03.jpg";

export type Bilingual = { en: string; ar: string };

export const wedding = {
  bride: { firstName: "[BRIDE_NAME]", initial: "B" },
  groom: { firstName: "[GROOM_NAME]", initial: "G" },

  /** Real ISO date-time used for countdown, calendar & .ics. Local time of the venue. */
  dateISO: "2027-06-12T19:00:00", // [WEDDING_DATE_AND_TIME]
  /** Duration of the event in hours (for the calendar file). */
  durationHours: 6,
  /** Display strings — replace freely. */
  dateLabel: { en: "[WEDDING_DATE]", ar: "[تاريخ_الزفاف]" } as Bilingual,
  city: { en: "[WEDDING_CITY]", ar: "[المدينة]" } as Bilingual,
  rsvpDeadline: { en: "[RSVP_DEADLINE]", ar: "[آخر_موعد_للرد]" } as Bilingual,

  whatsappNumber: "[WHATSAPP_NUMBER]", // digits only with country code, e.g. "201001234567"

  ceremony: {
    venue: { en: "[CEREMONY_VENUE]", ar: "[مكان_الإكليل]" } as Bilingual,
    time: "[CEREMONY_TIME]",
    address: { en: "[CEREMONY_ADDRESS]", ar: "[عنوان_الإكليل]" } as Bilingual,
    mapUrl: "[CEREMONY_GOOGLE_MAPS_LINK]",
  },
  reception: {
    venue: { en: "[RECEPTION_VENUE]", ar: "[مكان_الحفل]" } as Bilingual,
    time: "[RECEPTION_TIME]",
    address: { en: "[RECEPTION_ADDRESS]", ar: "[عنوان_الحفل]" } as Bilingual,
    mapUrl: "[RECEPTION_GOOGLE_MAPS_LINK]",
  },

  schedule: [
    { time: "6:00 PM", label: { en: "Guest Arrival", ar: "وصول الضيوف" } },
    { time: "7:00 PM", label: { en: "Ceremony", ar: "المراسم" } },
    { time: "8:30 PM", label: { en: "Reception", ar: "الاستقبال" } },
    { time: "9:00 PM", label: { en: "Dinner & Celebration", ar: "العشاء والاحتفال" } },
  ],

  /** Background music. Put the file in /public/audio/ and set the path. */
  music: { src: "/audio/[BACKGROUND_MUSIC].mp3", volume: 0.55 },

  images: {
    hero: hero, // [HERO_PHOTO]
    heroSecondary: couple02, // [COUPLE_PHOTO_02]
    social: "[SOCIAL_PREVIEW_IMAGE]", // absolute https URL, 1200×630
  },

  story: {
    enabled: true,
    moments: [
      { date: "[STORY_MOMENT_01_DATE]", title: { en: "The Day We Met", ar: "يوم لقائنا" }, description: { en: "[STORY_MOMENT_01_DESCRIPTION] — a few lines about how it all began.", ar: "[وصف_اللحظة_الأولى]" }, image: couple01 },
      { date: "[STORY_MOMENT_02_DATE]", title: { en: "Our First Adventure", ar: "مغامرتنا الأولى" }, description: { en: "[STORY_MOMENT_02_DESCRIPTION] — a place, a feeling, a memory.", ar: "[وصف_اللحظة_الثانية]" }, image: couple03 },
      { date: "[STORY_MOMENT_03_DATE]", title: { en: "She Said Yes", ar: "قالت نعم" }, description: { en: "[STORY_MOMENT_03_DESCRIPTION] — the question, the answer.", ar: "[وصف_اللحظة_الثالثة]" }, image: couple02 },
      { date: "[WEDDING_DATE]", title: { en: "Forever Begins", ar: "يبدأ الأبد" }, description: { en: "And now, we'd love for you to be there.", ar: "والآن، نتمنى أن تكونوا معنا." }, image: hero },
    ],
  },

  gallery: {
    enabled: true,
    photos: [
      { src: couple01, alt: "The couple walking hand in hand along a seaside terrace", w: 896, h: 1152 },
      { src: couple03, alt: "Candlelit reception table with white flowers at dusk", w: 1152, h: 864 },
      { src: couple02, alt: "Bride's hand with engagement ring holding white roses", w: 1024, h: 1024 },
      { src: hero, alt: "The couple embracing beneath an olive tree", w: 1024, h: 1408 },
    ],
  },

  dressCode: {
    enabled: true,
    title: { en: "Formal · Black Tie Optional", ar: "رسمي · بدلة سوداء اختيارية" } as Bilingual,
    note: { en: "We'd love to see you in soft, timeless tones.", ar: "يسعدنا أن نراكم بألوان هادئة وراقية." } as Bilingual,
    swatches: [
      { name: "Ivory", color: "oklch(0.96 0.015 85)" },
      { name: "Champagne", color: "oklch(0.86 0.05 80)" },
      { name: "Sage", color: "oklch(0.72 0.04 145)" },
      { name: "Emerald", color: "oklch(0.38 0.06 160)" },
      { name: "Charcoal", color: "oklch(0.3 0.01 60)" },
    ],
  },

  rsvp: {
    yesMessage: "Hello ❤️\nThank you for the invitation.\nI would be happy to attend the wedding.",
    noMessage: "Hello ❤️\nThank you so much for the invitation.\nUnfortunately, I will not be able to attend the wedding.",
  },
};

export type WeddingConfig = typeof wedding;
