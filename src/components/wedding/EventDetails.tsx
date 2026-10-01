import { MapPin } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal, SectionTitle } from "./Ornaments";

export function EventDetails() {
  const { t, b } = useLang();
  const events = [
    { label: t.ceremony, ...wedding.ceremony },
    { label: t.reception, ...wedding.reception },
  ];
  return (
    <section className="bg-pearl px-6 py-24 md:py-36">
      <SectionTitle title={t.celebration} />
      <div className="mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-2">
        {events.map((e, i) => (
          <Reveal key={e.label} delay={i * 0.15}>
            <article className="paper-texture relative px-8 py-14 text-center">
              <div className="foil-frame pointer-events-none absolute inset-3" aria-hidden />
              <p className="font-script text-4xl text-gold-deep">{e.label}</p>
              <h3 className="mt-4 font-display text-3xl break-words">{b(e.venue)}</h3>
              <p className="mt-3 font-display text-xl tabular text-gold-deep">{e.time}</p>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{b(e.address)}</p>
              <a href={e.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-lux mt-8">
                <MapPin className="h-4 w-4" strokeWidth={1.2} />{t.viewMap}
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-24 max-w-md">
        <p className="eyebrow text-center">{t.order}</p>
        <ol className="relative mt-10 border-s border-gold/50 ms-[5.5rem]">
          {wedding.schedule.map((s) => (
            <li key={s.time} className="relative mb-9 ps-8 last:mb-0">
              <span className="absolute -start-[5px] top-2 h-2.5 w-2.5 rotate-45 bg-gold" aria-hidden />
              <span className="absolute -start-[5.5rem] top-0.5 w-[4.5rem] text-end font-display text-lg tabular text-gold-deep">{s.time}</span>
              <span className="font-display text-xl">{b(s.label)}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
