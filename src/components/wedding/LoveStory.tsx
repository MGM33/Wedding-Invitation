import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal, SectionTitle } from "./Ornaments";

export function LoveStory() {
  const { t, b } = useLang();
  if (!wedding.story.enabled) return null;
  return (
    <section className="bg-pearl px-6 py-24 md:py-36">
      <SectionTitle title={t.story} script="once upon a time" />
      <div className="mx-auto mt-20 max-w-5xl space-y-20 md:space-y-32">
        {wedding.story.moments.map((m, i) => (
          <div key={i} className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <Reveal>
              <div className={`bg-background p-2.5 shadow-print ${i % 2 ? "md:rotate-[1.5deg]" : "md:-rotate-[1.5deg]"}`}>
                <img src={m.image} alt={b(m.title)} loading="lazy" className="aspect-[4/5] w-full object-cover md:aspect-[5/6]" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="text-center md:text-start">
              <p className="font-display text-6xl text-gold/50 tabular">0{i + 1}</p>
              <p className="eyebrow mt-2">{m.date}</p>
              <h3 className="mt-4 font-display text-4xl">{b(m.title)}</h3>
              <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground mx-auto md:mx-0">{b(m.description)}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
