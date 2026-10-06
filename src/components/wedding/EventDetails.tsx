import { MapPin } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal, SectionTitle } from "./Ornaments";

export function EventDetails({ showHall = true }: { showHall?: boolean }) {
  const { t, b } = useLang();
  const events = [
    { label: t.church, ...wedding.church },
    ...(showHall ? [{ label: t.hall, ...wedding.hall }] : []),
  ];
  return (
    <section className="bg-pearl px-6 py-24 md:py-36">
      <SectionTitle title={t.celebration} />
      <div className={`mx-auto mt-16 grid max-w-5xl auto-rows-fr gap-10 ${events.length > 1 ? "md:grid-cols-2" : "max-w-xl"}`}>
        {events.map((e, i) => (
          <Reveal key={e.label} delay={i * 0.15} className="h-full min-w-0">
            <article className="paper-texture relative flex h-full flex-col items-center px-8 py-14 text-center">
              <div className="foil-frame pointer-events-none absolute inset-3" aria-hidden />
              <p className="font-script text-4xl text-gold-deep">{e.label}</p>
              <h3 className="mt-4 font-display text-3xl break-words">{b(e.venue)}</h3>
              <p className="mt-4 mb-8 font-display text-xl text-gold-deep">{b(e.startTime)}</p>
              <a href={e.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-lux mt-auto">
                <MapPin className="h-4 w-4" strokeWidth={1.2} />{t.viewMap}
              </a>
            </article>
          </Reveal>
        ))}
      </div>

    </section>
  );
}
