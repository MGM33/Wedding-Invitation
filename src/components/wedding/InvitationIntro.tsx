import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Monogram, Sprig } from "./Ornaments";

export function InvitationIntro({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const { t, b } = useLang();
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  const handle = () => {
    if (opening) return;
    setOpening(true);
    onOpen(); // starts music inside user gesture
  };

  const dust = Array.from({ length: reduce ? 0 : 26 });

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="intro"
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background safe-pad px-5"
          exit={{ opacity: 0, transition: { duration: 1.4, ease: "easeInOut" } }}
        >
          {/* ambient particles */}
          {!reduce &&
            Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-gold"
                style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animation: `drift ${6 + (i % 5)}s ease-in-out ${i * 0.4}s infinite` }}
                aria-hidden
              />
            ))}

          <motion.div
            className="relative w-full max-w-[380px]"
            initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
            animate={opening ? { scale: 1.08, opacity: 0, y: -20 } : { opacity: 1, y: 0, scale: 1 }}
            transition={opening ? { duration: 1.3, delay: 0.9, ease: [0.65, 0, 0.35, 1] } : { duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="paper-texture shadow-paper relative px-8 pt-12 pb-16 text-center">
              <div className="foil-frame pointer-events-none absolute inset-3" aria-hidden />
              <Sprig className="absolute -left-2 top-6 h-40 text-gold/50" />
              <Sprig className="absolute -right-2 bottom-6 h-40 rotate-180 text-gold/50" />

              <Monogram size={64} className="mx-auto" />
              <p className="eyebrow mt-8">{t.together}</p>
              <h1 className="mt-6 font-display text-[2.6rem] leading-none text-foreground break-words">{wedding.bride.firstName}</h1>
              <p className="font-script text-gold-deep text-4xl my-1">&amp;</p>
              <h1 className="font-display text-[2.6rem] leading-none text-foreground break-words">{wedding.groom.firstName}</h1>
              <p className="mt-6 eyebrow tracking-[0.4em]">{b(wedding.dateLabel)}</p>

              {/* wax seal */}
              <motion.button
                onClick={handle}
                aria-label={t.open}
                className="absolute left-1/2 -bottom-10 grid h-20 w-20 -translate-x-1/2 place-items-center rounded-full bg-emerald text-emerald-foreground shadow-print"
                animate={opening ? { scale: [1, 1.15, 0], rotate: [0, -8, 20], opacity: [1, 1, 0] } : { scale: 1 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                whileHover={reduce ? {} : { scale: 1.05 }}
              >
                <span className="absolute inset-1.5 rounded-full border border-gold/60" aria-hidden />
                <span className="font-display text-xl text-gold-soft">
                  {wedding.bride.initial}<span className="font-script text-base mx-0.5">&amp;</span>{wedding.groom.initial}
                </span>
              </motion.button>
            </div>

            <motion.div className="mt-16 text-center" animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: 0.5 }}>
              <button onClick={handle} className="btn-lux">{t.open}</button>
            </motion.div>

            {/* gold dust burst */}
            {opening &&
              dust.map((_, i) => {
                const a = (i / dust.length) * Math.PI * 2;
                const r = 120 + (i % 4) * 40;
                return (
                  <motion.span
                    key={i}
                    className={`absolute left-1/2 top-[78%] h-1.5 w-1.5 rounded-full ${i % 3 ? "bg-gold" : "bg-blush"}`}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: Math.cos(a) * r, y: Math.sin(a) * r - 40, opacity: 0, scale: 0.3 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    aria-hidden
                  />
                );
              })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
