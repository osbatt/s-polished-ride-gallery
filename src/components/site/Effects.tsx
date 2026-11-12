import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Effects() {
  const bar = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let lenis: Lenis | null = null;
    const tick = (t: number) => lenis?.raf(t * 1000);
    if (!reduced()) {
      lenis = new Lenis({ duration: 1.1 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
    // anchor links
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href")!);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -20 });
      else el.scrollIntoView();
    };
    document.addEventListener("click", onClick);

    // stagger reveals
    const ctx = gsap.context(() => {
      if (reduced()) return;
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        const kids = el.dataset["stagger"] ? el.children : [el];
        gsap.from(kids, { y: 28, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, { yPercent: Number(el.dataset["parallax"]), ease: "none", scrollTrigger: { trigger: el.parentElement, scrub: true } });
      });
    });

    // progress
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    };
    addEventListener("scroll", onScroll, { passive: true });

    // cursor glow
    const fine = matchMedia("(pointer: fine)").matches && !reduced();
    const onMove = (e: MouseEvent) => {
      if (cursor.current) cursor.current.style.transform = `translate(${e.clientX - 160}px, ${e.clientY - 160}px)`;
    };
    if (fine) addEventListener("mousemove", onMove);

    return () => {
      ctx.revert();
      document.removeEventListener("click", onClick);
      removeEventListener("scroll", onScroll);
      removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <div ref={bar} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-primary" />
      <div ref={cursor} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[1] hidden size-80 rounded-full opacity-60 blur-3xl transition-transform duration-300 ease-out md:block [@media(pointer:coarse)]:hidden"
        style={{ background: "radial-gradient(circle, var(--glow), transparent 65%)" }} />
    </>
  );
}
