import { useRef, useState } from "react";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { InvitationIntro } from "./InvitationIntro";
import { MusicPlayer, type MusicHandle } from "./MusicPlayer";
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
    <div className="fixed z-40 flex items-center gap-2 bg-pearl/80 px-3 py-2 text-[0.7rem] tracking-[0.2em] backdrop-blur-sm"
      style={{ top: "calc(env(safe-area-inset-top) + 0.75rem)", insetInlineEnd: "0.75rem" }}>
      <button onClick={() => setLang("en")} aria-pressed={lang === "en"} className={`min-h-8 px-1 ${lang === "en" ? "text-gold-deep" : "text-muted-foreground"}`}>EN</button>
      <span className="text-gold/60" aria-hidden>|</span>
      <button onClick={() => setLang("ar")} aria-pressed={lang === "ar"} className={`min-h-8 px-1 ${lang === "ar" ? "text-gold-deep" : "text-muted-foreground"}`}>AR</button>
    </div>
  );
}

function Inner() {
  const [opened, setOpened] = useState(false);
  const music = useRef<MusicHandle>(null);

  const open = () => {
    music.current?.start();
    setTimeout(() => setOpened(true), 1900);
  };

  return (
    <>
      <InvitationIntro open={opened} onOpen={open} />
      <MusicPlayer ref={music} visible={opened} />
      {opened && <Petals />}
      <LangSwitch />
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
