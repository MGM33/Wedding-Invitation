import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal, SectionTitle } from "./Ornaments";

export function PhotoGallery() {
  const { t } = useLang();
  const photos = wedding.gallery.photos;
  const [idx, setIdx] = useState<number | null>(null);
  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, go]);

  if (!wedding.gallery.enabled) return null;

  const spans = ["md:col-span-5 md:row-span-2", "md:col-span-7", "md:col-span-4", "md:col-span-3"];

  return (
    <section className="px-5 py-24 md:py-32">
      <SectionTitle title={t.gallery} />
      {/* mobile: swipeable; desktop: asymmetric grid */}
      <div className="mx-auto mt-14 max-w-6xl">
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:auto-rows-[260px] md:grid-cols-12 md:gap-5 md:overflow-visible md:px-0">
          {photos.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} className={`w-[78%] shrink-0 snap-center md:w-auto ${spans[i % spans.length]}`}>
              <button onClick={() => setIdx(i)} className="group block h-full w-full overflow-hidden bg-pearl" aria-label={`Open photo: ${p.alt}`}>
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" width={p.w} height={p.h} className="aspect-[4/5] h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04] md:aspect-auto" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {idx !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/95 p-4 safe-pad"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIdx(null)}
          >
            <motion.img
              key={idx}
              src={photos[idx].src}
              alt={photos[idx].alt}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-h-[85vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button autoFocus onClick={() => setIdx(null)} aria-label={t.close} className="absolute end-4 top-[calc(env(safe-area-inset-top)+1rem)] grid h-11 w-11 place-items-center text-pearl"><X strokeWidth={1.2} /></button>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photo" className="absolute start-2 grid h-12 w-12 place-items-center text-pearl"><ChevronLeft strokeWidth={1} className="rtl:rotate-180" /></button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo" className="absolute end-2 grid h-12 w-12 place-items-center text-pearl"><ChevronRight strokeWidth={1} className="rtl:rotate-180" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
