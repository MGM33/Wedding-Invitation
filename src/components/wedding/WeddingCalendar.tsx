import { CalendarPlus } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { downloadIcs } from "@/lib/ics";
import { Reveal, SectionTitle } from "./Ornaments";

export function WeddingCalendar() {
  const { t, lang } = useLang();
  const date = new Date(wedding.dateISO);
  const locale = lang === "ar" ? "ar-EG" : "en-GB";
  const y = date.getFullYear();
  const m = date.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, 7 + i).toLocaleDateString(locale, { weekday: "narrow" }),
  );
  const monthName = date.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const dayName = date.toLocaleDateString(locale, { weekday: "long" });
  const time = date.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });

  return (
    <section className="px-6 py-24 md:py-32">
      <SectionTitle eyebrow={t.saveDate} title={monthName} />
      <Reveal className="mx-auto mt-14 max-w-md">
        <div className="grid grid-cols-7 gap-y-3 text-center">
          {weekdays.map((w, i) => (
            <div key={i} className="eyebrow !tracking-[0.15em]">{w}</div>
          ))}
          {cells.map((d, i) => (
            <div key={i} className="grid h-11 place-items-center">
              {d && (
                <span className={`relative grid h-10 w-10 place-items-center font-display text-lg tabular ${d === date.getDate() ? "text-gold-deep" : "text-foreground/80"}`}>
                  {d === date.getDate() && (
                    <>
                      <span className="absolute inset-0 rounded-full border border-gold" aria-hidden />
                      <span className="absolute -inset-1 rounded-full border border-gold/40" aria-hidden />
                    </>
                  )}
                  {d}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-3 border-y border-gold/40 py-5 text-center">
          <div><p className="eyebrow">Day</p><p className="mt-1 font-display text-xl">{dayName}</p></div>
          <div className="border-x border-gold/40"><p className="eyebrow">Date</p><p className="mt-1 font-display text-xl tabular">{date.toLocaleDateString(locale, { day: "numeric", month: "short" })}</p></div>
          <div><p className="eyebrow">Time</p><p className="mt-1 font-display text-xl tabular">{time}</p></div>
        </div>
        <div className="mt-10 text-center">
          <button onClick={downloadIcs} className="btn-lux"><CalendarPlus className="h-4 w-4" strokeWidth={1.2} />{t.addCal}</button>
        </div>
      </Reveal>
    </section>
  );
}
