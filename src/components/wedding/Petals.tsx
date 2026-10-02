import { useEffect, useState } from "react";

/** Sparse CSS-only falling petals. Off for reduced motion & low-power devices. */
export function Petals() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
    if (reduce) return;
    setCount(lowPower ? 5 : window.innerWidth < 640 ? 8 : 12);
  }, []);
  if (!count) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const tones = ["bg-blush", "bg-gold-soft", "bg-pearl"];
        return (
          <span
            key={i}
            className={`absolute top-0 block ${tones[i % 3]}`}
            style={{
              left: `${(i * 61) % 100}%`,
              width: 9 + (i % 3) * 3,
              height: 12 + (i % 3) * 3,
              borderRadius: "80% 0 80% 0",
              ["--o" as string]: 0.35 + (i % 3) * 0.1,
              ["--dx" as string]: `${(i % 2 ? 1 : -1) * (40 + (i % 4) * 30)}px`,
              ["--rot" as string]: `${200 + i * 30}deg`,
              animation: `petal-fall ${14 + (i % 5) * 3}s linear ${i * 2.3}s infinite both`,
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}
