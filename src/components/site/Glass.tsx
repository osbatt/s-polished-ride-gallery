import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "red" | "clear" | "dark";
  className?: string;
  magnetic?: boolean;
  type?: "button" | "submit";
  external?: boolean;
  ariaLabel?: string;
};

export function GlassButton({ children, href, onClick, variant = "clear", className, magnetic, type = "button", external, ariaLabel }: BtnProps) {
  const ref = useRef<HTMLElement>(null);
  const move = (e: MouseEvent) => {
    if (!magnetic || !ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const leave = () => ref.current && (ref.current.style.transform = "");
  const cls = cn(
    "sheen relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-[transform,box-shadow] duration-300 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    variant === "red" ? "glass-red hover:shadow-[0_14px_40px_-10px_var(--glow)]" : variant === "dark" ? "glass-dark" : "glass text-foreground",
    className,
  );
  if (href)
    return (
      <a ref={ref as never} href={href} className={cls} onMouseMove={move} onMouseLeave={leave} aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  return (
    <button ref={ref as never} type={type} onClick={onClick} className={cls} onMouseMove={move} onMouseLeave={leave} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

export function GlassCard({ children, className, spotlight = true }: { children: ReactNode; className?: string; spotlight?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: MouseEvent) => {
    if (!spotlight || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={move} className={cn("glass relative group/card overflow-hidden rounded-[28px]", className)}>
      {spotlight && (
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ background: "radial-gradient(360px circle at var(--mx) var(--my), var(--glow), transparent 70%)" }} />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

export function SectionHead({ title, sub, className }: { title: string; sub?: string; className?: string }) {
  return (
    <div className={cn("reveal mb-12 max-w-2xl md:mb-16", className)}>
      <h2 className="text-4xl font-bold leading-[1.02] text-foreground md:text-6xl">{title}</h2>
      {sub && <p className="mt-5 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}
