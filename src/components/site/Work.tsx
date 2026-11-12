import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, X, Instagram } from "lucide-react";
import { categories, projects, signatureIds, contact, type Category } from "@/data/content";
import { GlassButton, SectionHead } from "./Glass";
import { reduced } from "./Effects";
import { cn } from "@/lib/utils";
import { imgFallback } from "@/lib/img";
import { BeforeAfter } from "./BeforeAfter";

const spans = ["md:col-span-2 md:row-span-2", "md:row-span-2", "", "", "md:col-span-2", "md:col-span-2"];

export function Work() {
  const [cat, setCat] = useState<Category>("All");
  const [idx, setIdx] = useState<number | null>(null);
  const list = projects.filter((p) => cat === "All" || p.category === cat);
  const slides = list.flatMap((p) => p.gallery.map((src, n) => ({ ...p, src, n, total: p.gallery.length })));
  const open = (id: number) => setIdx(slides.findIndex((s) => s.id === id));
  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + slides.length) % slides.length)), [slides.length]);

  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [idx, go]);

  return (
    <section id="work" className="px-4 pt-24 md:px-8 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead title="Recent work." sub="Exteriors, interiors and paint work from around Union City." className="mb-0 md:mb-0" />
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {categories.filter((c) => c === "All" || projects.some((p) => p.category === c)).map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={cn("sheen relative min-h-11 rounded-full px-5 text-sm font-semibold transition", cat === c ? "glass-red" : "glass text-foreground")}>{c}</button>
            ))}
          </div>
        </div>
        <BeforeAfter />
        <motion.div layout className="mt-12 grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[260px] md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, k) => (
              <motion.button layout key={p.id} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.45 }}
                onClick={() => open(p.id)} className={cn("group relative overflow-hidden rounded-[28px] text-left", cat === "All" && spans[k])} aria-label={`Open ${p.title}`}>
                <img src={p.image} alt={p.title} loading="lazy" onError={imgFallback} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="glass absolute inset-x-3 bottom-3 translate-y-2 rounded-2xl px-4 py-3 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <strong className="block text-foreground">{p.title}</strong>
                  <span className="text-sm text-primary">{p.category}{p.gallery.length > 1 && ` · ${p.gallery.length} photos`}</span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="mt-10 flex justify-center">
          <GlassButton href={contact.instagram} external><Instagram className="size-4" /> See more on Instagram</GlassButton>
        </div>
      </div>
      <Signature />

      <AnimatePresence>
        {idx !== null && slides[idx] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-lightbox className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
            role="dialog" aria-modal="true" aria-label={slides[idx].title} onClick={() => setIdx(null)}>
            <motion.figure key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}
              drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, i) => { if (i.offset.x < -60) go(1); else if (i.offset.x > 60) go(-1); }}
              onClick={(e) => e.stopPropagation()} className="max-h-full max-w-5xl">
              <img src={slides[idx].src} alt={`${slides[idx].title}, photo ${slides[idx].n + 1}`} onError={imgFallback} className="max-h-[78vh] w-auto rounded-3xl object-contain" draggable={false} />
              <figcaption className="mt-4 text-center text-on-ink">{slides[idx].title} · <span className="text-primary">{slides[idx].category}</span>{slides[idx].total > 1 && <span className="opacity-70"> · {slides[idx].n + 1}/{slides[idx].total}</span>}</figcaption>
            </motion.figure>
            <button onClick={(e) => { e.stopPropagation(); setIdx(null); }} aria-label="Close" className="glass-dark absolute right-4 top-4 grid size-12 place-items-center rounded-full"><X /></button>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous" className="glass-dark absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full"><ChevronLeft /></button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next" className="glass-dark absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full"><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Signature() {
  const sec = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const items = signatureIds.map((id) => projects.find((p) => p.id === id)!);
  useEffect(() => {
    if (reduced() || !sec.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const t = track.current!;
      gsap.to(t, {
        x: () => -(t.scrollWidth - innerWidth + 64), ease: "none",
        scrollTrigger: { trigger: sec.current, pin: true, scrub: 1, end: () => `+=${t.scrollWidth - innerWidth}`, invalidateOnRefresh: true },
      });
    });
    return () => mm.revert();
  }, []);
  return (
    <div ref={sec} className="overflow-hidden py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <h2 className="mx-auto mb-10 w-full max-w-7xl text-4xl font-bold text-foreground md:text-6xl">Signature projects.</h2>
      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 lg:overflow-visible lg:px-8">
        {items.map((p) => (
          <figure key={p.id} className="relative aspect-[4/5] w-[80vw] shrink-0 snap-center overflow-hidden rounded-[28px] sm:w-[46vw] lg:aspect-[4/3] lg:w-[42vw]">
            <img src={p.image} alt={p.title} loading="lazy" onError={imgFallback} className="h-full w-full object-cover" />
            <figcaption className="glass-dark absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm font-semibold">{p.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
