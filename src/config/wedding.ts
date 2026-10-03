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


  /** Background music. Put the file in /public/audio/ and set the path. */
  music: { src: "/audio/[BACKGROUND_MUSIC].mp3", volume: 0.55 },

  images: {
    hero: hero, // [HERO_PHOTO]
    heroSecondary: couple02, // [COUPLE_PHOTO_02]
    social: "[SOCIAL_PREVIEW_IMAGE]", // absolute https URL, 1200×630
  },




  rsvp: {
    /** Prewritten WhatsApp message — edit freely. */
    yesMessage: "Hello ❤️\nThank you so much for the invitation.\nI would be happy to attend the wedding — can't wait to celebrate with you!",
  },
};

export type WeddingConfig = typeof wedding;
