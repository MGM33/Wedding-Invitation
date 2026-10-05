import { Music, Pause } from "lucide-react";

export function MusicButton({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Pause music" : "Play music"}
      aria-pressed={playing}
      className="fixed z-[60] grid h-11 w-11 place-items-center rounded-full bg-pearl/80 text-gold-deep shadow-print backdrop-blur-sm"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 1rem)", insetInlineEnd: "1rem" }}
    >
      {playing ? <Pause className="h-4 w-4" strokeWidth={1.4} /> : <Music className="h-4 w-4" strokeWidth={1.4} />}
    </button>
  );
}
