import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { wedding } from "@/config/wedding";
import { useLang } from "@/i18n/LanguageContext";
import { rsvpService } from "@/services/rsvpService";
import { Monogram, Reveal, SectionTitle } from "./Ornaments";

export function RSVP({ guestName, token }: { guestName?: string | null | undefined; token?: string | undefined }) {
  const { t, b } = useLang();
  const [open, setOpen] = useState<null | boolean>(null); // initial attending choice
  return (
    <section className="px-6 py-24 md:py-36">
      <SectionTitle title={t.rsvpQ} script="kindly reply" />
      <Reveal className="mt-8 text-center">
        <p className="eyebrow">{t.rsvpBy} {b(wedding.rsvpDeadline)}</p>
        <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
          <button className="btn-solid" onClick={() => setOpen(true)}>{t.accept}</button>
          <button className="btn-lux" onClick={() => setOpen(false)}>{t.decline}</button>
        </div>
      </Reveal>
      <AnimatePresence>
        {open !== null && <RsvpSheet initialAttending={open} guestName={guestName} token={token} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}

function RsvpSheet({ initialAttending, guestName, token, onClose }: { initialAttending: boolean; guestName?: string | null | undefined; token?: string | undefined; onClose: () => void }) {
  const { t } = useLang();
  const id = useId();
  const [name, setName] = useState(guestName ?? "");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState(initialAttending);
  const [count, setCount] = useState(1);
  const [guestNames, setGuestNames] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLElement>("input")?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (name.trim().length < 2) errs.name = t.errName;
    if (!/^[+\d][\d\s-]{6,}$/.test(phone.trim())) errs.phone = t.errPhone;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    const res = await rsvpService.submit({
      token, name: name.trim(), phone: phone.trim(), attending,
      attendingCount: attending ? count : 0,
      guestNames: attending ? guestNames.trim() || undefined : undefined,
      message: message.trim() || undefined,
    });
    setStatus(res.ok ? "done" : "idle");
  };

  const wa = `https://wa.me/${wedding.contactPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi! ${name} here — RSVP: ${attending ? `attending (${count})` : "unable to attend"}.`)}`;

  return (
    <motion.div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-foreground/50" onClick={onClose} aria-hidden />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-t`}
        className="paper-texture relative max-h-[92dvh] w-full overflow-y-auto px-6 pt-10 pb-[calc(env(safe-area-inset-bottom)+2rem)] sm:max-w-lg sm:px-10"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <button onClick={onClose} aria-label={t.close} className="absolute end-3 top-3 grid h-11 w-11 place-items-center text-muted-foreground"><X strokeWidth={1.2} /></button>

        {status === "done" ? (
          <div className="py-10 text-center">
            <Monogram size={60} className="mx-auto" />
            <p className="mt-8 font-script text-5xl text-gold-deep">{t.thankYou}{attending ? `, ${name.split(" ")[0]}` : ""}</p>
            <p className="mx-auto mt-5 max-w-xs font-display text-2xl leading-snug">{attending ? t.thanksYes : t.thanksNo}</p>
            {wedding.rsvp.whatsappFollowUp && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 hover:underline">
                <MessageCircle className="h-4 w-4" strokeWidth={1.2} />{t.whatsapp}
              </a>
            )}
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-7">
            <h3 id={`${id}-t`} className="text-center font-display text-3xl">{t.rsvpQ}</h3>
            <Field id={`${id}-n`} label={t.name} error={errors.name}>
              <input id={`${id}-n`} className="field-lux" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={!!errors.name} />
            </Field>
            <Field id={`${id}-p`} label={t.phone} error={errors.phone}>
              <input id={`${id}-p`} className="field-lux" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" aria-invalid={!!errors.phone} />
            </Field>
            <fieldset>
              <legend className="eyebrow mb-3">{t.attend}</legend>
              <div className="grid grid-cols-2 gap-3">
                {[true, false].map((v) => (
                  <button type="button" key={String(v)} onClick={() => setAttending(v)} aria-pressed={attending === v}
                    className={`min-h-12 border text-xs uppercase tracking-[0.18em] transition-colors duration-500 ${attending === v ? "border-emerald bg-emerald text-emerald-foreground" : "border-input text-foreground"}`}>
                    {v ? t.yes : t.no}
                  </button>
                ))}
              </div>
            </fieldset>
            <AnimatePresence initial={false}>
              {attending && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-7 overflow-hidden">
                  <fieldset>
                    <legend className="eyebrow mb-3">{t.count}</legend>
                    <div className="flex items-center justify-center gap-6">
                      <button type="button" onClick={() => setCount((c) => Math.max(1, c - 1))} aria-label="Fewer guests" className="h-12 w-12 border border-input font-display text-2xl">−</button>
                      <span className="w-10 text-center font-display text-4xl tabular" aria-live="polite">{count}</span>
                      <button type="button" onClick={() => setCount((c) => Math.min(wedding.rsvp.maxGuestsDefault, c + 1))} aria-label="More guests" className="h-12 w-12 border border-input font-display text-2xl">+</button>
                    </div>
                  </fieldset>
                  {count > 1 && (
                    <Field id={`${id}-g`} label={t.guestNames}>
                      <input id={`${id}-g`} className="field-lux" value={guestNames} onChange={(e) => setGuestNames(e.target.value)} />
                    </Field>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <Field id={`${id}-m`} label={t.message}>
              <textarea id={`${id}-m`} rows={3} className="field-lux resize-none" value={message} onChange={(e) => setMessage(e.target.value)} />
            </Field>
            <button type="submit" className="btn-solid w-full" disabled={status === "sending"}>
              {status === "sending" ? t.sending : t.send}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block">{label}</label>
      {children}
      {error && <p className="mt-2 text-sm italic text-destructive" role="alert">{error}</p>}
    </div>
  );
}
