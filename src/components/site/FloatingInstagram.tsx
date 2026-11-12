import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity, useReducedMotion } from "motion/react";

export function FloatingInstagram() {
  const still = useReducedMotion();
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { stiffness: 120, damping: 30 });
  const y = useTransform(smooth, [-3000, 0, 3000], [14, 0, -14], { clamp: true });
  const rotate = useTransform(smooth, [-3000, 0, 3000], [-8, 0, 8], { clamp: true });
  const [video, setVideo] = useState(false);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const onVid = (e: Event) => setVideo(Boolean((e as CustomEvent).detail));
    addEventListener("scrollvideo", onVid);
    const mo = new MutationObserver(() => setOverlay(Boolean(document.querySelector("[data-lightbox],[data-mobile-menu]"))));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { removeEventListener("scrollvideo", onVid); mo.disconnect(); };
  }, []);
  const hidden = video || overlay;

  return (
    <div className="pointer-events-none fixed right-5 z-40" style={{ bottom: "calc(env(safe-area-inset-bottom) + 20px)" }}>
      <motion.div style={still ? {} : { y, rotate }} animate={{ opacity: hidden ? 0 : 1 }} transition={{ duration: 0.3 }}>
        <motion.a href="https://www.instagram.com/detailsbypat/" target="_blank" rel="noopener noreferrer" aria-label="Follow DetailsByPat on Instagram"
          tabIndex={hidden ? -1 : 0}
          animate={still ? { y: 0 } : { y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`glass sheen relative grid size-12 place-items-center rounded-full text-foreground ring-1 ring-primary/60 transition-[transform,box-shadow] duration-300 hover:scale-110 hover:shadow-[0_0_30px_var(--glow)] md:size-14 ${hidden ? "pointer-events-none" : "pointer-events-auto"}`}>
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </motion.a>
      </motion.div>
    </div>
  );
}
