import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "./Ornaments";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    done: ms === 0,
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const { t } = useLang();
  const target = new Date(wedding.dateISO).getTime();
  const [v, setV] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => {
    setV(diff(target));
    const id = setInterval(() => setV(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    [v?.d, t.days],
    [v?.h, t.hours],
    [v?.m, t.minutes],
    [v?.s, t.seconds],
  ] as const;

  return (
    <section className="bg-emerald px-5 py-24 text-emerald-foreground md:py-32">
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="eyebrow text-gold-soft">{t.bigDay}</p>
        {v?.done ? (
          <p className="mt-8 font-script text-5xl text-gold-soft sm:text-6xl">{t.afterWedding}</p>
        ) : (
          <div className="mt-10 grid grid-cols-4 divide-x divide-gold/30 rtl:divide-x-reverse" role="timer" aria-live="off">
            {units.map(([n, label]) => (
              <div key={label} className="px-1">
                <div className="font-display tabular text-[2.6rem] leading-none sm:text-6xl md:text-7xl">
                  {n === undefined ? "––" : String(n).padStart(2, "0")}
                </div>
                <div className="mt-3 text-[0.6rem] tracking-[0.25em] uppercase text-gold-soft sm:text-xs">{label}</div>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
