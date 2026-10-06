import { wedding } from "@/config/wedding";
import { Monogram } from "./Ornaments";

/** Shown at "/" and unknown URLs: no venues, times or links to the invitations. */
export function LinkRequired() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-5 safe-pad">
      <div className="paper-texture shadow-paper relative w-full max-w-[380px] px-8 py-14 text-center">
        <div className="foil-frame pointer-events-none absolute inset-3" aria-hidden />
        <Monogram size={64} className="mx-auto" />
        <h1 className="mt-8 font-display text-[2.2rem] leading-none text-foreground break-words">
          {wedding.groom.firstName}
          <span className="block font-script text-gold-deep text-4xl my-1">&amp;</span>
          {wedding.bride.firstName}
        </h1>
        <p className="mx-auto mt-8 max-w-xs font-display text-xl italic leading-snug text-muted-foreground">
          Please open the invitation using the link you received.
        </p>
        <p dir="rtl" className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
          يرجى فتح الدعوة باستخدام الرابط الذي وصلك.
        </p>
      </div>
    </main>
  );
}
