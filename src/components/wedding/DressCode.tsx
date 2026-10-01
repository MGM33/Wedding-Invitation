import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal, SectionTitle } from "./Ornaments";

export function DressCode() {
  const { t, b } = useLang();
  const dc = wedding.dressCode;
  if (!dc.enabled) return null;
  return (
    <section className="px-6 py-24 md:py-32">
      <SectionTitle title={t.dress} />
      <Reveal className="mx-auto mt-10 max-w-xl text-center">
        <p className="eyebrow !text-foreground !tracking-[0.35em]">{b(dc.title)}</p>
        <p className="mt-4 font-display text-xl italic text-muted-foreground">{b(dc.note)}</p>
        <ul className="mt-12 flex flex-wrap justify-center gap-5 sm:gap-7">
          {dc.swatches.map((s) => (
            <li key={s.name} className="flex flex-col items-center gap-3">
              <span className="h-14 w-14 rounded-full border border-gold/50 shadow-print sm:h-16 sm:w-16" style={{ background: s.color }} aria-hidden />
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{s.name}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
