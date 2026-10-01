import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Monogram, Reveal } from "./Ornaments";

export function Footer() {
  const { t, b } = useLang();
  return (
    <footer className="bg-emerald px-6 pt-24 pb-[calc(env(safe-area-inset-bottom)+6rem)] text-center text-emerald-foreground">
      <Reveal>
        <p className="font-script text-5xl text-gold-soft">{t.withLove}</p>
        <p className="mt-6 font-display text-3xl sm:text-4xl break-words">
          {wedding.bride.firstName} <span className="font-script text-gold-soft">&amp;</span> {wedding.groom.firstName}
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.35em] text-gold-soft">{b(wedding.dateLabel)}</p>
        <Monogram size={46} className="mx-auto mt-12 opacity-80" />
      </Reveal>
    </footer>
  );
}
