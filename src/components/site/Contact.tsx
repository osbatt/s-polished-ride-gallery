import { type FormEvent } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Instagram, AtSign } from "lucide-react";
import { contact, serviceLib, nav, contactImage } from "@/data/content";
import { GlassButton } from "./Glass";
import { imgFallback } from "@/lib/img";

const field = "glass w-full rounded-2xl px-4 py-3 min-h-12 text-foreground placeholder:text-muted-foreground focus:outline-2 focus:outline-primary";

export function Contact() {
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Hi Pat! I'd like to book a detail.\nName: ${f.get("name")}\nVehicle: ${f.get("vehicle")}\nService: ${f.get("service") || "Not sure yet"}\nPreferred date: ${f.get("date") || "Flexible"}\n\n${f.get("message") || ""}`.trim();
    const win = window.open(contact.dm, "_blank", "noopener,noreferrer");
    try {
      await navigator.clipboard.writeText(msg);
      toast.success("Message copied, paste it in the DM");
    } catch {
      toast("Opening Instagram DM", { description: msg });
    }
    if (!win) window.location.href = contact.dm;
  };
  const rows = [
    contact.email && { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    { icon: MapPin, label: "Location", value: contact.location },
    { icon: Instagram, label: "Instagram", value: contact.instagramHandle, href: contact.instagram },
    { icon: AtSign, label: "Threads", value: contact.threadsHandle, href: contact.threads },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[];
  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 md:px-8 md:py-36">
      <div className="glow-blob left-1/2 top-1/2 size-[700px] -translate-x-1/2" />
      <div className="relative mx-auto max-w-5xl">
        <div className="reveal text-center">
          <h2 className="text-4xl font-bold text-foreground md:text-6xl">Book your detail.</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-foreground/80">Send a DM on Instagram with your car and what you need. We come to you in Union City, CA.</p>
        </div>
        <div className="mt-12 aspect-[21/9] overflow-hidden rounded-[32px]">
          <img src={contactImage} alt="Freshly detailed black sedan on a driveway at sunset" loading="lazy" onError={imgFallback} className="h-full w-full object-cover" />
        </div>
        <div className="glass relative -mt-16 mx-2 grid gap-10 rounded-[32px] bg-background/80 p-6 md:mx-10 md:grid-cols-[1fr_1.3fr] md:p-10">
          <div>
            <ul className="divide-y divide-border">
              {rows.map((r) => (
                <li key={r.label} className="flex items-center gap-4 py-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-primary"><r.icon className="size-5" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted-foreground">{r.label}</span>
                    {r.href ? <a href={r.href} className="break-all font-semibold text-foreground hover:text-primary" {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{r.value}</a> : <span className="font-semibold text-foreground">{r.value}</span>}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <GlassButton href={contact.dm} external variant="red">Book on Instagram</GlassButton>
              <GlassButton href={contact.instagram} external><Instagram className="size-4" /> Follow on Instagram</GlassButton>
              <GlassButton href={contact.threads} external><AtSign className="size-4" /> Threads</GlassButton>
            </div>
          </div>
          <form id="quote" onSubmit={submit} className="grid scroll-mt-28 gap-3">
            <label className="sr-only" htmlFor="name">Name</label>
            <input id="name" name="name" required placeholder="Your name" className={field} />
            <label className="sr-only" htmlFor="vehicle">Vehicle make/model</label>
            <input id="vehicle" name="vehicle" required placeholder="Vehicle make/model" className={field} />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="service">Service</label>
              <select id="service" name="service" defaultValue="" className={field}>
                <option value="">Which service?</option>
                {Object.values(serviceLib).map((s) => <option key={s.name}>{s.name}</option>)}
              </select>
              <label className="sr-only" htmlFor="date">Preferred date</label>
              <input id="date" name="date" type="date" aria-label="Preferred date" className={field} />
            </div>
            <label className="sr-only" htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={4} placeholder="Anything else? (pet hair, stains, swirls...)" className={field} />
            <GlassButton type="submit" variant="red" className="border-beam mt-2 py-4">Copy message &amp; open DM</GlassButton>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink px-4 pt-20 text-on-ink md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src="/logo.png" alt="DetailsByPat auto detailing logo" width={120} height={120} onError={imgFallback} className="size-28 rounded-full object-contain ring-1 ring-on-ink/20" />
          <p className="mt-5 max-w-sm text-on-ink/80">Attention to detail, every time. Union City, CA · Mobile Service</p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2">{nav.map((n) => <li key={n.href}><a href={n.href} className="text-on-ink/80 hover:text-primary">{n.label}</a></li>)}</ul>
        </nav>
        <div className="space-y-2 text-on-ink/80">
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-primary">Instagram {contact.instagramHandle}</a>
          <a href={contact.threads} target="_blank" rel="noopener noreferrer" className="block hover:text-primary">Threads {contact.threadsHandle}</a>
          <p>Union City, CA · Mobile Service</p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl text-sm text-on-ink/60">© {new Date().getFullYear()} DetailsByPat</p>
      <div aria-hidden className="mt-4 select-none whitespace-nowrap text-center font-display text-[17vw] font-bold leading-[0.75] tracking-[-0.06em] text-on-ink/10 translate-y-[18%]">DetailsByPat<span className="text-primary/60">.</span></div>
    </footer>
  );
}
