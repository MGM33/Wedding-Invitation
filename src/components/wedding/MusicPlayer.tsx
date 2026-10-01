import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";

export type MusicHandle = { start: () => void };

export const MusicPlayer = forwardRef<MusicHandle, { visible: boolean }>(function MusicPlayer({ visible }, ref) {
  const { t } = useLang();
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const fadeTo = useCallback((target: number, ms = 2500) => {
    const a = audio.current;
    if (!a) return;
    const start = a.volume;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      a.volume = start + (target - start) * p;
      if (p < 1) requestAnimationFrame(step);
      else if (target === 0) a.pause();
    };
    requestAnimationFrame(step);
  }, []);

  const play = useCallback(() => {
    const a = audio.current;
    if (!a) return;
    a.volume = 0;
    a.play()
      .then(() => {
        setPlaying(true);
        fadeTo(wedding.music.volume);
      })
      .catch(() => setPlaying(false)); // missing file or blocked — fail silently
  }, [fadeTo]);

  useImperativeHandle(ref, () => ({
    start: () => {
      if (sessionStorage.getItem("music") === "off") return;
      play();
    },
  }));

  const toggle = () => {
    if (playing) {
      fadeTo(0, 700);
      setPlaying(false);
      sessionStorage.setItem("music", "off");
    } else {
      sessionStorage.setItem("music", "on");
      play();
    }
  };

  useEffect(() => () => audio.current?.pause(), []);

  return (
    <>
      <audio ref={audio} src={wedding.music.src} loop preload="metadata" />
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={toggle}
          aria-label={playing ? t.musicOn : t.musicOff}
          aria-pressed={playing}
          className="fixed z-40 grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-pearl/85 backdrop-blur-sm text-gold-deep shadow-print"
          style={{ bottom: "calc(env(safe-area-inset-bottom) + 1rem)", insetInlineEnd: "1rem" }}
        >
          <span className="flex h-4 items-end gap-[3px]" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-[2px] origin-bottom bg-current"
                style={{
                  height: "100%",
                  transform: playing ? undefined : "scaleY(0.25)",
                  animation: playing ? `sound-bar ${0.9 + i * 0.15}s ease-in-out ${i * 0.12}s infinite` : "none",
                }}
              />
            ))}
          </span>
        </motion.button>
      )}
    </>
  );
});
