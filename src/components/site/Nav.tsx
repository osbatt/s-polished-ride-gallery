import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, contact } from "@/data/content";
import { GlassButton } from "./Glass";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [onVideo, setOnVideo] = useState(true);
  useEffect(() => {
    const f = () => {
      setScrolled(scrollY > 40);
      const h = document.getElementById("home");
      setOnVideo(h ? h.getBoundingClientRect().bottom > 80 : false);
    };
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-5">
      <motion.nav initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        className={cn(onVideo ? "glass-dark" : "glass", "mx-auto flex items-center justify-between rounded-full pl-2 pr-2 transition-all duration-500",
          scrolled ? "max-w-4xl py-1.5 backdrop-blur-2xl" : "max-w-6xl py-2")}
        aria-label="Main">
        <a href="#home" className="flex items-center rounded-full bg-background p-1">
          <img src="/logo.png" alt="DetailsByPat auto detailing logo" width={48} height={48} className={cn("object-contain transition-all", scrolled ? "size-10" : "size-12")} />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className={cn("rounded-full px-4 py-2 text-sm font-medium transition", onVideo ? "text-on-ink/85 hover:bg-on-ink/10 hover:text-on-ink" : "text-foreground/80 hover:bg-foreground/10 hover:text-foreground")}>{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <GlassButton href={contact.dm} external variant="red" className="hidden sm:inline-flex">Book Now</GlassButton>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className={cn(onVideo ? "glass-dark" : "glass text-foreground", "grid size-11 place-items-center rounded-full md:hidden")}>
            <Menu className="size-5" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            data-mobile-menu className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-6 text-on-ink backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-background p-1"><img src="/logo.png" alt="DetailsByPat auto detailing logo" width={44} height={44} className="size-11 object-contain" /></span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="glass-dark grid size-11 place-items-center rounded-full"><X className="size-5" /></button>
            </div>
            <ul className="mt-14 flex flex-col gap-2">
              {nav.map((n, i) => (
                <motion.li key={n.href} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 * i + 0.1 }}>
                  <a href={n.href} onClick={() => setOpen(false)} className="block py-2 font-display text-5xl font-bold tracking-tight">{n.label}</a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <GlassButton href={contact.dm} external variant="red" className="w-full py-4">Book Now</GlassButton>
              {contact.phone && <a href={`tel:${contact.phone}`} className="text-center text-on-ink/80">{contact.phone}</a>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
