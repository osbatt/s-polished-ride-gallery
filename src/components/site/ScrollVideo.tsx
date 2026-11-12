import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, MapPin, MessageCircle, Truck } from "lucide-react";
import { reduced } from "./Effects";
import { GlassButton } from "./Glass";
import { imgFallback } from "@/lib/img";
import { contact } from "@/data/content";

type Stage = { start: number; end: number; label: string; title: string; subtitle: string };
type Intro = { line1: string; line2: string; subline: string; chips: string[] };

const ease = [0.2, 0.7, 0.2, 1] as const;
const chipIcons = [Truck, MapPin, MessageCircle];
const chipPos = ["right-[8%] top-[24%]", "right-[18%] top-[42%]", "right-[6%] top-[60%]"];

function IntroBlock({ intro }: { intro: Intro }) {
  return (
    <>
      <div className="absolute bottom-24 left-5 right-5 max-w-2xl text-on-ink md:bottom-28 md:left-12">
        <h1 className="font-display text-[clamp(2.4rem,9vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.04em]">
          <span className="block whitespace-nowrap">{intro.line1}</span>
          <span className="block whitespace-nowrap text-primary">{intro.line2}</span>
        </h1>
        <p className="mt-5 max-w-md text-base text-on-ink/85 md:text-lg">{intro.subline}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <GlassButton href={contact.dm} external variant="red" magnetic>Book Now</GlassButton>
          <GlassButton href="#work" variant="dark">View Our Work</GlassButton>
        </div>
      </div>
      {intro.chips.map((c, k) => {
        const Icon = chipIcons[k % chipIcons.length]!;
        return (
          <motion.span key={c} animate={{ y: [0, -8, 0] }} transition={{ duration: 5 + k, repeat: Infinity, ease: "easeInOut" }}
            className={`glass-dark absolute hidden items-center gap-2 rounded-full px-4 py-2 text-sm text-on-ink lg:flex ${chipPos[k % 3]}`}>
            <Icon className="size-4 text-primary" /> {c}
          </motion.span>
        );
      })}
      <span className="glass-dark absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-on-ink">
        Scroll <ArrowDown className="size-4 animate-bounce" />
      </span>
    </>
  );
}

// Video file: set `src` in content.ts (scrollVideo.src). If it's missing the poster stays visible.
export function ScrollVideo({ src, poster, stages, intro }: { src: string; poster: string; stages: Stage[]; intro: Intro }) {
  const sec = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [scrub, setScrub] = useState(true);
  const [videoOk, setVideoOk] = useState(true);

  // Tell the floating Instagram button to hide while this section is on screen.
  useEffect(() => {
    if (!sec.current) return;
    const io = new IntersectionObserver(([e]) => window.dispatchEvent(new CustomEvent("scrollvideo", { detail: e!.isIntersecting })), { threshold: 0.15 });
    io.observe(sec.current);
    return () => { io.disconnect(); window.dispatchEvent(new CustomEvent("scrollvideo", { detail: false })); };
  }, []);

  useEffect(() => {
    const simple = reduced() || matchMedia("(max-width: 767px)").matches;
    setScrub(!simple);
    const v = video.current;
    if (!sec.current) return;
    if (simple) {
      if (v) { v.loop = true; v.play().catch(() => {}); }
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    v?.pause();
    let target = 0, current = 0, raf = 0, last = -1;
    const loop = () => {
      current += (target - current) * 0.15;
      if (v?.duration && Math.abs(v.currentTime - current) > 0.01) v.currentTime = current;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const st = ScrollTrigger.create({
      trigger: sec.current, start: "top top", end: "+=500%", pin: true, scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        if (v?.duration) target = p * (v.duration - 0.05);
        if (rail.current) rail.current.style.transform = `scaleY(${p})`;
        const f = stages.findIndex((s) => p >= s.start && p < s.end);
        const idx = f === -1 ? stages.length - 1 : f;
        if (idx !== last) { last = idx; setStage(idx); }
      },
    });
    return () => { cancelAnimationFrame(raf); st.kill(); };
  }, [stages]);

  const s = stages[stage]!;
  return (
    <section id="home" ref={sec} aria-label="DetailsByPat mobile detailing" className="relative bg-background">
      <div className="relative h-[100svh] overflow-hidden bg-ink">
        <img src={poster} alt="Car being pressure washed during a detail" onError={imgFallback} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        {videoOk && (
          <video ref={video} src={src} poster={poster} muted playsInline preload="auto" autoPlay={!scrub} aria-hidden
            onError={() => setVideoOk(false)} className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

        <AnimatePresence mode="wait">
          {stage === 0 || !scrub ? (
            <motion.div key="intro" className="absolute inset-0"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30, filter: "blur(10px)" }} transition={{ duration: 0.5, ease }}>
              <IntroBlock intro={intro} />
            </motion.div>
          ) : (
            <motion.div key={stage} className="absolute bottom-8 left-5 right-5 max-w-lg md:bottom-12 md:left-12" aria-live="polite"
              initial={{ opacity: 0, y: 40, filter: "blur(10px)", clipPath: "inset(100% 0 0 0)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0% 0 0 0)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }} transition={{ duration: 0.45, ease }}>
              <div className="glass-dark rounded-[28px] p-6 md:p-8">
                <span className="glass-red inline-block rounded-full px-3 py-1 text-xs font-semibold">{s.label}</span>
                <h2 className="mt-4 text-5xl font-bold text-on-ink md:text-7xl">{s.title}</h2>
                <p className="mt-3 text-base text-on-ink/85 md:text-lg">{s.subtitle}</p>
                {stage === stages.length - 1 && (
                  <GlassButton href={contact.dm} external variant="red" className="mt-6">Book Now</GlassButton>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {scrub && (
          <div className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-3 md:right-10" aria-hidden>
            <div className="relative h-56 w-0.5 rounded-full bg-on-ink/25">
              <div ref={rail} className="absolute inset-0 origin-top scale-y-0 rounded-full bg-primary" />
            </div>
            <div className="flex h-56 flex-col justify-between">
              {stages.map((_, k) => <span key={k} className={`size-2.5 rounded-full transition ${k <= stage ? "bg-primary" : "bg-on-ink/40"}`} />)}
            </div>
          </div>
        )}
      </div>
      {!scrub && (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {stages.slice(1).map((st) => (
            <div key={st.label} className="glass rounded-[24px] p-5">
              <span className="glass-red inline-block rounded-full px-3 py-1 text-xs font-semibold">{st.label}</span>
              <h3 className="mt-3 text-3xl font-bold text-foreground">{st.title}</h3>
              <p className="mt-1 text-foreground/80">{st.subtitle}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
