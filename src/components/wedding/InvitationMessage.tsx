import { useLang } from "@/i18n/LanguageContext";
import { Divider, Reveal, Sprig } from "./Ornaments";

export function GuestGreeting({ guestName }: { guestName?: string | null }) {
  const { t } = useLang();
  return (
    <Reveal className="text-center">
      <p className="font-script text-4xl text-gold-deep">
        {t.dear} {guestName || t.guest},
      </p>
      <p className="mt-3 font-display text-xl italic text-muted-foreground">{t.honored}</p>
    </Reveal>
  );
}

export function InvitationMessage({ guestName }: { guestName?: string | null }) {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-pearl px-6 py-24 md:py-36">
      <Sprig className="absolute -start-6 top-10 h-64 text-gold/30 hidden sm:block" />
      <Sprig className="absolute -end-6 bottom-10 h-64 rotate-180 text-gold/30 hidden sm:block" />
      <div className="mx-auto max-w-2xl">
        <GuestGreeting guestName={guestName} />
        <Divider className="my-12" />
        <Reveal className="text-center">
          <p className="eyebrow mb-6">{t.inviteKicker}</p>
          <p className="font-display text-[1.7rem] leading-snug sm:text-4xl">{t.inviteBody}</p>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-muted-foreground">{t.inviteBody2}</p>
        </Reveal>
      </div>
    </section>
  );
}
