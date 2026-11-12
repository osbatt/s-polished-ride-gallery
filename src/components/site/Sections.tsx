import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as Icons from "lucide-react";
import { ChevronDown, Quote } from "lucide-react";
import { marquee, services, serviceLib, process, why, aboutImage, testimonials, contact } from "@/data/content";
import { imgFallback } from "@/lib/img";
import { GlassButton, GlassCard, SectionHead } from "./Glass";
import { reduced } from "./Effects";

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const C = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Hammer;
  return <C className={className} strokeWidth={1.6} />;
};

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden bg-ink py-6 text-on-ink" aria-label={marquee.join(", ")}>
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden>
            {row.map((w, j) => (
              <span key={j} className="flex items-center font-display text-3xl font-bold tracking-tight md:text-5xl">
                <span className={j % 2 ? "text-primary" : ""}>{w}</span>
                <span className="mx-6 size-3 rounded-full bg-primary md:mx-10" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ s }: { s: (typeof services)[number] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const tilt = (e: MouseEvent) => {
    if (!ref.current || reduced() || matchMedia("(pointer: coarse)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };
  return (
    <div ref={ref} onMouseMove={tilt} onMouseLeave={() => ref.current && (ref.current.style.transform = "")} className="transition-transform duration-300 ease-out">
      <GlassCard className="h-full">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] m-2">
          <img src={s.image} alt={`${s.title} by DetailsByPat`} loading="lazy" onError={imgFallback} className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
          <h3 className="absolute bottom-4 left-5 text-4xl font-bold uppercase text-on-ink md:text-5xl">{s.title}</h3>
        </div>
        <div className="p-6 pt-3">
          <p className="text-foreground/80">{s.blurb}</p>
          <button onClick={() => setOpen(!open)} aria-expanded={open} className="mt-4 flex min-h-11 w-full items-center justify-between text-left font-semibold text-foreground">
            {s.items.length} services
            <ChevronDown className={`size-5 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }} className="overflow-hidden">
                {s.items.map((k) => {
                  const it = serviceLib[k]!;
                  return (
                    <li key={k} className="flex gap-3 py-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-primary"><Icon name={it.icon} className="size-4" /></span>
                      <span><strong className="block text-sm text-foreground">{it.name}</strong><span className="text-sm text-muted-foreground">{it.desc}</span></span>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
          <GlassButton href={contact.dm} external variant="red" className="mt-4">DM for a quote</GlassButton>
        </div>
      </GlassCard>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden px-4 py-24 md:px-8 md:py-36">
      <div className="glow-blob -left-40 top-20 size-[520px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHead title="Four ways to bring back the shine." sub="Exterior, interior, paint correction and protection. Open a card to see what each one includes." />
        <div className="reveal grid gap-6 md:grid-cols-2" data-stagger>
          {services.map((s) => <ServiceCard key={s.id} s={s} />)}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const wrap = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced() || !wrap.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(line.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top 60%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".step").forEach((el) =>
        gsap.from(el, { opacity: 0, x: 40, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 75%", once: true } }));
    }, wrap);
    return () => ctx.revert();
  }, []);
  return (
    <section className="bg-soft px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1.3fr]">
        <div className="md:sticky md:top-32 md:self-start">
          <SectionHead title="Booking is simple." sub="Four steps from a quick DM to a showroom finish on your driveway." className="mb-0" />
        </div>
        <div ref={wrap} className="relative pl-14">
          <div className="absolute bottom-0 left-5 top-0 w-0.5 bg-border" />
          <div ref={line} className="absolute bottom-0 left-5 top-0 w-0.5 origin-top bg-primary" />
          {process.map((p, k) => (
            <div key={p.title} className="step relative pb-16 last:pb-0">
              <span className="absolute -left-14 top-0 grid size-10 place-items-center rounded-full border-2 border-primary bg-background text-primary">
                <Icon name={p.icon} className="size-5" />
              </span>
              <p className="font-display text-sm font-semibold text-primary">Step {k + 1}</p>
              <h3 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">{p.title}</h3>
              <p className="mt-3 max-w-md text-foreground/80">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why() {
  const spans = ["md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-3", "md:col-span-3"];
  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-8 md:py-36">
      <div className="glow-blob -right-40 bottom-0 size-[520px]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHead title="Why people choose DetailsByPat." />
        <div className="reveal grid auto-rows-[minmax(180px,auto)] gap-5 md:grid-cols-6" data-stagger>
          {why.map((w, k) => (
            <GlassCard key={w.title} className={spans[k] ?? ""}>
              <div className="flex h-full flex-col justify-end p-7">
                <Icons.Check className="mb-auto size-8 text-primary" />
                <h3 className="mt-10 text-2xl font-bold text-foreground">{w.title}</h3>
                <p className="mt-2 text-foreground/75">{w.text}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="bg-soft px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[32px]">
            <img src={aboutImage} alt="Hand finishing glossy black paint with a red microfibre towel" loading="lazy" onError={imgFallback} data-parallax="-8" className="h-[115%] w-full object-cover" />
          </div>
          <span className="glass absolute bottom-6 left-6 rounded-full px-5 py-3 text-sm font-semibold text-foreground">Union City, CA</span>
          <span className="glass absolute right-6 top-6 rounded-full px-5 py-3 text-sm font-semibold text-foreground">Mobile service</span>
        </div>
        <div className="reveal" data-stagger>
          <h2 className="text-4xl font-bold leading-[1.02] text-foreground md:text-6xl">Meet Patrick, the detailer who sweats the small stuff.</h2>
          <p className="mt-6 text-lg text-foreground/80">DetailsByPat is run by Patrick Moralde, an auto detailer based in Union City, CA. The service is fully mobile, so he brings everything to you.</p>
          <p className="mt-4 text-lg text-foreground/80">The focus is simple: attention to detail, every time. Careful washing, honest advice on what your car needs, and a finish he'd be proud to drive himself.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GlassButton href={contact.dm} external variant="red">Send a DM</GlassButton>
            <GlassButton href="#work">See the work</GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const row = [...testimonials, ...testimonials];
  return (
    <section className="overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8"><SectionHead title="What customers say." sub="Reviews below are placeholders until real customer reviews are added." /></div>
      <div className="flex w-max gap-5 marquee-track [animation-duration:45s] hover:[animation-play-state:paused]">
        {[...row, ...row].map((t, k) => (
          <GlassCard key={k} className="w-[320px] shrink-0 md:w-[420px]" spotlight={false}>
            <div className="p-7">
              <Quote className="size-7 text-primary" />
              <p className="mt-4 text-lg text-foreground">{t.text}</p>
              <p className="mt-6 text-sm font-semibold text-foreground">{t.name} <span className="font-normal text-muted-foreground">· {t.area}</span></p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
