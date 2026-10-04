import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Divider, Reveal, SectionTitle, Sprig } from "./Ornaments";

/**
 * RSVP: one tap opens an on-screen confirmation window with a warm welcome,
 * the date and the place. Nothing is sent anywhere and nothing is stored.
 */
export function RSVP() {
  const { t, b } = useLang();
  const reduce = useReducedMotion();
  const [confirmed, setConfirmed] = useState(false);
  const c = wedding.rsvp.confirmation;

  useEffect(() => {
    if (!confirmed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setConfirmed(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [confirmed]);

  return (
    <section className="px-6 py-24 md:py-36">
      <SectionTitle title={t.rsvpQ} script="kindly reply" />
      <Reveal className="mt-8 text-center">
        <p className="mx-auto max-w-md font-display text-2xl italic leading-snug text-muted-foreground">{t.rsvpInvite}</p>
        <div className="mt-10 flex justify-center">
          <button type="button" className="btn-solid" onClick={() => setConfirmed(true)}>
            {t.accept}
          </button>
        </div>
      </Reveal>

      <AnimatePresence>
        {confirmed && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={b(c.headline)}
            className="fixed inset-0 z-50 grid place-items-center px-5 pt-24 pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="absolute inset-0 bg-emerald/70 backdrop-blur-sm" onClick={() => setConfirmed(false)} aria-hidden />

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="paper-texture shadow-print relative max-h-full w-full max-w-md overflow-y-auto px-8 py-14 text-center"
            >
              <div className="foil-frame pointer-events-none absolute inset-3" aria-hidden />
              <Sprig className="pointer-events-none absolute bottom-4 -left-1 h-28 w-14 text-gold/45" />
              <Sprig className="pointer-events-none absolute bottom-4 -right-1 h-28 w-14 text-gold/45" flip />

              <button
                type="button"
                onClick={() => setConfirmed(false)}
                aria-label={t.close}
                className="absolute top-5 grid h-9 w-9 place-items-center text-muted-foreground transition-colors hover:text-gold-deep"
                style={{ insetInlineEnd: "1.1rem" }}
              >
                <X className="h-4 w-4" strokeWidth={1.2} />
              </button>

              <p className="font-script text-4xl text-gold-deep">{b(c.script)}</p>
              <h3 className="mt-2 font-display text-4xl leading-[1.08] text-foreground sm:text-5xl">{b(c.headline)}</h3>
              <Divider className="mt-6" />
              <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">{b(c.line)}</p>

              <div className="mt-10 space-y-7">
                <div>
                  <p className="eyebrow mb-2">{t.confirmedWhen}</p>
                  <p className="font-display text-2xl leading-snug">{b(wedding.dateLabel)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {b(wedding.startTime)} · {b(wedding.city)}
                  </p>
                </div>
                <div>
                  <p className="eyebrow mb-2">{t.confirmedWhere}</p>
                  <p className="font-display text-xl leading-snug break-words">{b(wedding.hall.venue)}</p>
                  <p className="mx-auto mt-1 max-w-xs text-sm leading-relaxed text-muted-foreground">{b(wedding.hall.location)}</p>
                  <a href={wedding.hall.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-lux mt-6">
                    <MapPin className="h-4 w-4" strokeWidth={1.2} />
                    {t.viewMap}
                  </a>
                </div>
              </div>

              <button type="button" className="btn-solid mt-10" onClick={() => setConfirmed(false)}>
                {t.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
