/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — edit everything here.
 *  Components read only from this file; no personal details live elsewhere.
 * ─────────────────────────────────────────────────────────────
 */
import flowers from "@/assets/white-roses-still-life.jpg";

export type Bilingual = { en: string; ar: string };

export const wedding = {
  bride: { firstName: "Meriham", initial: "M" },
  groom: { firstName: "Peter", initial: "P" },

  /** Real ISO date-time used for countdown, calendar & .ics. Local time of the venue. */
  dateISO: "2026-10-17T18:00:00+03:00",
  dateLabel: { en: "17 October 2026", ar: "١٧ أكتوبر ٢٠٢٦" } as Bilingual,
  startTime: { en: "6:00 PM", ar: "٦:٠٠ مساءً" } as Bilingual,
  city: { en: "Ismailia", ar: "الإسماعيلية" } as Bilingual,


  church: {
    venue: { en: "St. Anba Bishoy Church", ar: "كنيسة الأنبا بيشوي" } as Bilingual,
    mapUrl: "https://maps.app.goo.gl/NRQLWFqKXJstjLiK6",
  },
  hall: {
    venue: { en: "Solitaire Wedding Hall at Tolip EL Forsan Resort", ar: "قاعة سوليتير في منتجع توليب الفرسان" } as Bilingual,
    mapUrl: "https://maps.app.goo.gl/bvhaBB6V7jVS5Uzb6?g_st=iw",
  },

  images: {
    hero: "/images/peter-meriham.jpg",
    music: "/audio/perfect.mp3",
    heroSecondary: flowers,
  },




  rsvp: {
    /** Shown in the on-screen window after a guest accepts. Edit the wording freely. */
    confirmation: {
      script: { en: "with joy", ar: "بكل فرح" } as Bilingual,
      headline: { en: "We're waiting for you", ar: "في انتظارك" } as Bilingual,
      line: {
        en: "Thank you from the bottom of our hearts — your presence is the greatest gift. Save the date and come celebrate with us.",
        ar: "شكراً من قلوبنا — حضورك هو أغلى هدية. احفظ الموعد وتعالَ نحتفل معاً.",
      } as Bilingual,
    },
  },
};

export type WeddingConfig = typeof wedding;
