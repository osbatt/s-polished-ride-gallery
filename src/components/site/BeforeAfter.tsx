import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { MoveHorizontal } from "lucide-react";
import { beforeAfter } from "@/data/content";
import { imgFallback } from "@/lib/img";

function Slider({ title, before, after }: { title: string; before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const set = (x: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };
  const down = (e: PointerEvent) => { drag.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); set(e.clientX); };
  const move = (e: PointerEvent) => drag.current && set(e.clientX);
  const key = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
  };
  return (
    <figure>
      <div ref={box} onPointerDown={down} onPointerMove={move} onPointerUp={() => (drag.current = false)}
        className="relative aspect-[4/5] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[28px]">
        <img src={after} alt={`${title}, after`} loading="lazy" draggable={false} onError={imgFallback} className="absolute inset-0 h-full w-full object-cover" />
        <img src={before} alt={`${title}, before`} loading="lazy" draggable={false} onError={imgFallback}
          className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
        <span className="glass-dark absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold">Before</span>
        <span className="glass-dark absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold">After</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-on-ink" style={{ left: `${pos}%` }} />
        <button type="button" role="slider" aria-label={`${title} before and after`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
          onKeyDown={key} className="glass absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-foreground focus-visible:outline-2 focus-visible:outline-primary"
          style={{ left: `${pos}%` }}>
          <MoveHorizontal className="size-5" />
        </button>
      </div>
      <figcaption className="mt-3 font-semibold text-foreground">{title}</figcaption>
    </figure>
  );
}

export function BeforeAfter() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {beforeAfter.map((b) => <Slider key={b.id} {...b} />)}
    </div>
  );
}
