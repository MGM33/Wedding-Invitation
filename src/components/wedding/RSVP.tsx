import { useState } from "react";
import { Content, Overlay } from "@radix-ui/react-dialog";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogDescription, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { Divider, Reveal, SectionTitle, Sprig } from "./Ornaments";

/** One tap opens a welcome window. Nothing is sent or stored. */
export function RSVP() {
  const { t, b } = useLang();
  const [confirmed, setConfirmed] = useState(false);
  const c = wedding.rsvp.confirmation;
  const location = wedding[wedding.rsvp.location];

  return (
    <section className="px-6 py-24 md:py-36">
      <SectionTitle title={t.rsvpQ} script="kindly reply" />
      <Dialog open={confirmed} onOpenChange={setConfirmed}>
        <Reveal className="mt-8 text-center">
          <p className="mx-auto max-w-md font-display text-2xl italic leading-snug text-muted-foreground">{t.rsvpInvite}</p>
          <div className="mt-10 flex justify-center">
            <Button type="button" className="btn-solid h-auto rounded-none whitespace-normal font-normal" onClick={() => setConfirmed(true)}>
              {t.accept}
            </Button>
          </div>
        </Reveal>
        <DialogPortal>
          <Overlay className="fixed inset-0 z-[70] bg-emerald/70 backdrop-blur-sm" />
          <Content dir={t.close === "إغلاق" ? "rtl" : "ltr"} className="paper-texture shadow-print fixed left-1/2 top-1/2 z-[71] max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain px-7 pt-6 pb-8 text-center sm:px-8 sm:pb-12">
            <div className="foil-frame pointer-events-none absolute inset-3" aria-hidden />
            <Sprig className="pointer-events-none absolute bottom-4 -left-1 h-28 w-14 text-gold/45" />
            <Sprig className="pointer-events-none absolute bottom-4 -right-1 h-28 w-14 text-gold/45" flip />
            <div className="relative mb-1 flex justify-end">
              <DialogClose asChild>
                <Button type="button" variant="ghost" size="icon" aria-label={t.close} className="h-9 w-9 shrink-0 text-muted-foreground hover:text-gold-deep">
                  <X className="h-4 w-4" strokeWidth={1.2} />
                </Button>
              </DialogClose>
            </div>
            <p className="font-script text-3xl text-gold-deep sm:text-4xl">{b(c.script)}</p>
            <DialogTitle className="mt-2 font-display text-3xl leading-[1.08] text-foreground sm:text-5xl">{b(c.headline)}</DialogTitle>
            <Divider className="mt-4 sm:mt-6" />
            <DialogDescription className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground sm:mt-6">{b(c.line)}</DialogDescription>
            <div className="mt-6 space-y-5 sm:mt-10 sm:space-y-7">
              <div>
                <p className="eyebrow mb-2">{t.confirmedWhen}</p>
                <p className="font-display text-2xl leading-snug">{b(wedding.dateLabel)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{b(wedding.startTime)} · {b(wedding.city)}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">{t.confirmedWhere}</p>
                <p className="font-display text-xl leading-snug break-words">{b(location.venue)}</p>
                <Button asChild variant="outline" className="btn-lux mt-4 h-auto rounded-none whitespace-normal font-normal sm:mt-6">
                  <a href={location.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin className="h-4 w-4" strokeWidth={1.2} />{t.viewMap}</a>
                </Button>
              </div>
            </div>
            <DialogClose asChild>
              <Button type="button" className="btn-solid mt-6 h-auto rounded-none whitespace-normal font-normal sm:mt-10">{t.close}</Button>
            </DialogClose>
          </Content>
        </DialogPortal>
      </Dialog>
    </section>
  );
}
