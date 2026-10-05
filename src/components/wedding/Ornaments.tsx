import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { wedding } from "@/config/wedding";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Monogram({ size = 72, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`relative grid place-items-center ${className}`} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-gold">
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.3" />
        <path d="M50 2 v6 M50 92 v6 M2 50 h6 M92 50 h6" stroke="currentColor" strokeWidth="0.6" />
      </svg>
      <span className="font-display text-foil" style={{ fontSize: size * 0.32 }}>
        {wedding.groom.initial} {wedding.bride.initial}
      </span>
    </div>
  );
}

/** Fine botanical line-art sprig */
export function Sprig({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 120 220" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round">
      <path d="M60 218 C 58 160, 66 110, 58 4" />
      {[30, 55, 80, 105, 130, 155, 180].map((y, i) => (
        <g key={y}>
          <path d={`M${60 - (i % 2) * 2} ${y + 10} C 40 ${y}, 26 ${y - 4}, 18 ${y - 14} C 34 ${y - 14}, 50 ${y - 6}, ${60 - (i % 2) * 2} ${y + 10}`} />
          <path d={`M${61} ${y + 22} C 80 ${y + 12}, 94 ${y + 8}, 102 ${y - 2} C 86 ${y - 2}, 70 ${y + 6}, 61 ${y + 22}`} />
        </g>
      ))}
      <circle cx="58" cy="6" r="2.5" />
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-gold ${className}`} aria-hidden>
      <span className="h-px w-12 bg-gold/60" />
      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z" fill="currentColor" /></svg>
      <span className="h-px w-12 bg-gold/60" />
    </div>
  );
}

export function SectionTitle({ eyebrow, title, script }: { eyebrow?: string; title: string; script?: string }) {
  return (
    <Reveal className="text-center">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      {script && <p className="font-script text-gold-deep text-3xl -mb-2">{script}</p>}
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-foreground">{title}</h2>
      <Divider className="mt-6" />
    </Reveal>
  );
}
