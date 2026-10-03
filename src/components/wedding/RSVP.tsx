import { MessageCircle } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal, SectionTitle } from "./Ornaments";

/** RSVP via WhatsApp only — one tap opens WhatsApp with a ready-made message; nothing is stored. */
const waLink = `https://wa.me/${wedding.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(wedding.rsvp.yesMessage)}`;

export function RSVP() {
  const { t, b } = useLang();
  return (
    <section className="px-6 py-24 md:py-36">
      <SectionTitle title={t.rsvpQ} script="kindly reply" />
      <Reveal className="mt-8 text-center">
        <p className="mx-auto max-w-md font-display text-2xl italic leading-snug text-muted-foreground">{t.rsvpInvite}</p>
        <p className="eyebrow mt-6">{t.rsvpBy} {b(wedding.rsvpDeadline)}</p>
        <div className="mt-10 flex justify-center">
          <a className="btn-solid" href={waLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" strokeWidth={1.2} />{t.accept}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
