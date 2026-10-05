import { useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { MusicButton } from "./MusicButton";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { InvitationIntro } from "./InvitationIntro";
import { Petals } from "./Petals";
import { Hero } from "./Hero";
import { InvitationMessage } from "./InvitationMessage";
import { Countdown } from "./Countdown";
import { WeddingCalendar } from "./WeddingCalendar";
import { EventDetails } from "./EventDetails";
import { RSVP } from "./RSVP";
import { Footer } from "./Footer";


export function InvitationPage() {
  return (
    <LanguageProvider>
      <Inner />
    </LanguageProvider>
  );
}

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="fixed z-[60] flex items-center gap-2 bg-pearl/80 px-3 py-2 text-[0.7rem] tracking-[0.2em] backdrop-blur-sm"
      style={{ top: "calc(env(safe-area-inset-top) + 0.75rem)", insetInlineEnd: "0.75rem" }}>
      <button onClick={() => setLang("en")} aria-pressed={lang === "en"} className={`min-h-8 px-1 ${lang === "en" ? "text-gold-deep" : "text-muted-foreground"}`}>EN</button>
      <span className="text-gold/60" aria-hidden>|</span>
      <button onClick={() => setLang("ar")} aria-pressed={lang === "ar"} className={`min-h-8 px-1 ${lang === "ar" ? "text-gold-deep" : "text-muted-foreground"}`}>AR</button>
    </div>
  );
}

function fadeTo(a: HTMLAudioElement, target: number, ms = 2500) {
  const start = a.volume;
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / ms);
    a.volume = start + (target - start) * p;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function Inner() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    a.play().then(() => { setPlaying(true); fadeTo(a, 0.6); }).catch(() => setPlaying(false));
  };
  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) play();
    else { a.pause(); setPlaying(false); }
  };
  const open = () => {
    play();
    setTimeout(() => setOpened(true), 1900);
  };

  return (
    <>
      <audio ref={audioRef} src={wedding.images.music} loop preload="auto" />
      <InvitationIntro open={opened} onOpen={open} />
      {opened && <Petals />}
      <LangSwitch />
      {opened && <MusicButton playing={playing} onToggle={toggle} />}
      <main aria-hidden={!opened} className={opened ? "" : "h-dvh overflow-hidden"}>
        <Hero ready={opened} />
        <InvitationMessage />
        <Countdown />
        <WeddingCalendar />
        <EventDetails />
        <RSVP />
        <Footer />
      </main>
    </>
  );
}
