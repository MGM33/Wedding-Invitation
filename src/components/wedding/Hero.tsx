import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Monogram } from "./Ornaments";

export function Hero({ ready }: { ready: boolean }) {
  const { t, b } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);

  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.6, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pt-16 pb-24 sm:pt-24 md:pb-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-[1fr_1.05fr] md:gap-20">
        <div className="min-w-0 text-center md:text-start order-2 md:order-1">
          <motion.div {...fade(0.2)}><Monogram size={58} className="mx-auto md:mx-0" /></motion.div>
          <motion.p {...fade(0.4)} className="eyebrow mt-8">{t.gettingMarried}</motion.p>
          <motion.h1 {...fade(0.6)} className="mt-5 font-display text-[2.5rem] leading-[0.95] sm:text-7xl lg:text-8xl break-words">
            {wedding.bride.firstName}
            <span className="block font-script text-gold-deep text-5xl my-1 md:ms-16">&amp;</span>
            {wedding.groom.firstName}
          </motion.h1>
          <motion.div {...fade(1.2)} className="mt-10 flex items-center justify-center md:justify-start gap-4">
            <span className="h-px w-10 bg-gold" />
            <p className="font-display text-xl tracking-wide">{b(wedding.dateLabel)}</p>
            <span className="h-px w-10 bg-gold" />
          </motion.div>
          <motion.p {...fade(1.3)} className="eyebrow mt-3">{b(wedding.city)}</motion.p>
        </div>

        <div className="relative min-w-0 order-1 md:order-2 mx-auto w-full max-w-[420px] md:max-w-none">
          <motion.div
            style={{ y }}
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-pearl p-3 shadow-paper"
          >
            <img src={assets.hero} alt="Meriham and Peter together" width={750} height={938} className="aspect-[4/5] w-full object-cover object-top" fetchPriority="high" />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            initial={reduce ? false : { opacity: 0, rotate: 0 }}
            animate={ready ? { opacity: 1, rotate: -5 } : {}}
            transition={{ duration: 1.8, delay: 0.8 }}
            className="absolute -bottom-10 -start-4 w-[38%] bg-pearl p-2 pb-6 shadow-print sm:-start-10"
          >
            <img src={wedding.images.heroSecondary} alt="Ivory roses and plum ribbon" loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
