import { MessageCircle } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal, SectionTitle } from "./Ornaments";

/** RSVP via WhatsApp only — nothing is stored on the website. */
const waLink = (text: string) =>
  `https://wa.me/${wedding.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export function RSVP() {
  const { t, b } = useLang();
  return (
    <section className="px-6 py-24 md:py-36">
      <SectionTitle title={t.rsvpQ} script="kindly reply" />
      <Reveal className="mt-8 text-center">
        <p className="eyebrow">{t.rsvpBy} {b(wedding.rsvpDeadline)}</p>
        <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
          <a className="btn-solid" href={waLink(wedding.rsvp.yesMessage)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" strokeWidth={1.2} />{t.accept}
          </a>
          <a className="btn-lux" href={waLink(wedding.rsvp.noMessage)} target="_blank" rel="noopener noreferrer">
            {t.decline}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
