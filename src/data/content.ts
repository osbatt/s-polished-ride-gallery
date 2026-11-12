// All editable site content lives here.
// Images: only real DetailsByPat job photos/videos, all in /public/work.
import scrollVideoAsset from "@/assets/scroll-video.mp4.asset.json";

export const brand = {
  name: "DetailsByPat",
  owner: "Patrick Moralde",
  tagline: "Attention to detail, every time.",
};

export const contact = {
  // No phone or email yet. Rows using these only render when filled in.
  email: "",
  phone: "",
  instagram: "https://www.instagram.com/detailsbypat",
  instagramHandle: "@detailsbypat",
  dm: "https://ig.me/m/detailsbypat",
  threads: "https://www.threads.net/@detailsbypat",
  threadsHandle: "@detailsbypat",
  location: "Union City, CA (Mobile service)",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];


export const marquee = ["Exterior Detailing", "Interior Detailing", "Paint Correction", "Ceramic Coating", "Mobile Service", "Union City, CA"];

// Scroll video section. The real video is hosted; to use another file, change scrollVideo.src
// (e.g. put a file at /public/scroll-video.mp4 and set src: "/scroll-video.mp4").
export const scrollVideo = {
  src: scrollVideoAsset.url,
  poster: "/work/scroll-poster.webp",
  // Opening screen shown over the first frames of the video.
  intro: {
    line1: "Every Detail.",
    line2: "Every Time.",
    subline: "Premium mobile auto detailing in Union City, CA. We come to you.",
    chips: ["Mobile Service", "Union City, CA", "DM to Book"],
  },
  stages: [
    { start: 0, end: 0.15, label: "", title: "", subtitle: "" },
    { start: 0.15, end: 0.4, label: "01 / Wash", title: "Wash.", subtitle: "A careful hand wash lifts dirt without a single swirl." },
    { start: 0.4, end: 0.62, label: "02 / Polish", title: "Polish.", subtitle: "Paint is refined until every reflection is sharp." },
    { start: 0.62, end: 0.82, label: "03 / Protect", title: "Protect.", subtitle: "Long-lasting protection that keeps the shine locked in." },
    { start: 0.82, end: 1, label: "04 / Shine", title: "Shine.", subtitle: "Attention to detail, every time. Booked by DM, done at your door." },
  ],
};

export type ServiceItem = { name: string; desc: string; icon: string };
// CONFIRM WITH CLIENT: service names and descriptions are editable defaults.
export const serviceLib: Record<string, ServiceItem> = {
  wash: { name: "Exterior Wash & Detail", desc: "Foam pre-wash, safe hand wash and a streak-free dry.", icon: "Droplets" },
  wheels: { name: "Wheels & Tires", desc: "Barrels, faces and calipers cleaned, tires dressed.", icon: "CircleDot" },
  trim: { name: "Trim Restoration", desc: "Faded plastics brought back to a deep, even finish.", icon: "Sparkles" },
  interior: { name: "Interior Deep Clean", desc: "Vacuum, wipe-down and steam on every surface.", icon: "Wind" },
  seats: { name: "Seats & Carpets", desc: "Fabric shampooed, leather cleaned and conditioned.", icon: "Armchair" },
  dash: { name: "Dash & Console", desc: "Vents, screens and cupholders detailed by hand.", icon: "Gauge" },
  correction: { name: "Paint Correction", desc: "Swirls and light scratches machine-polished out.", icon: "Wand2" },
  polish: { name: "Polishing", desc: "Refined paint for sharper, clearer reflections.", icon: "Sun" },
  gloss: { name: "Gloss Enhancement", desc: "A single-step polish for a quick visible lift.", icon: "Star" },
  ceramic: { name: "Ceramic Coating", desc: "Durable protection that beads water and resists grime.", icon: "ShieldCheck" },
  sealant: { name: "Sealants", desc: "Easy-to-maintain protection between details.", icon: "Shield" },
  maintenance: { name: "Maintenance Washes", desc: "Regular safe washes to keep the finish looking new.", icon: "CalendarCheck" },
};

// CONFIRM WITH CLIENT: the four main service cards. No prices — DM for a quote.
export const services = [
  { id: "exterior", title: "Exterior Detailing", blurb: "A deep, safe clean that leaves paint, glass and wheels spotless.", image: "/work/jetta-exterior.webp", items: ["wash", "wheels", "trim"] },
  { id: "interior", title: "Interior Detailing", blurb: "Every seat, seam and vent cleaned so the cabin feels new again.", image: "/work/jetta-console.webp", items: ["interior", "seats", "dash"] },
  { id: "paint", title: "Paint Correction", blurb: "Swirls polished away to bring back a sharp, glossy finish.", image: "/work/trx-wheel-after.webp", items: ["correction", "polish", "gloss"] },
  { id: "protection", title: "Protection", blurb: "Coatings and sealants that keep the shine locked in for longer.", image: "/work/tesla-foam.webp", items: ["ceramic", "sealant", "maintenance"] },
];

export const categories = ["All", "Exterior", "Interior", "Paint & Coating"] as const;
export type Category = (typeof categories)[number];

// Portfolio (real photos in /public/work). "image" is the cover; "gallery" is shown in the lightbox
// (.mp4 entries play as video). "video" makes the grid tile a looping clip.
export type Project = { id: number; title: string; category: Exclude<Category, "All">; image: string; video?: string; gallery: string[] };
export const projects: Project[] = [
  { id: 7, title: "Mazda 3 Pet Hair Removal", category: "Interior", image: "/work/mazda-seats-after.webp", gallery: ["/work/mazda-seats-after.webp", "/work/mazda-seats-before.webp"] },
  { id: 8, title: "RAM TRX Interior Reset", category: "Interior", image: "/work/trx-console-after.webp", gallery: ["/work/trx-console-after.webp", "/work/trx-console-before.webp"] },
  { id: 9, title: "RAM TRX Clay & Seal", category: "Paint & Coating", image: "/work/trx-wheel-after.webp", gallery: ["/work/trx-wheel-after.webp", "/work/trx-wheel-before.webp"] },
  { id: 10, title: "VW Jetta Premium Detail", category: "Exterior", image: "/work/jetta-exterior.webp", gallery: ["/work/jetta-exterior.webp", "/work/jetta-foam.mp4"] },
  { id: 11, title: "VW Jetta Snow Foam Wash", category: "Exterior", image: "/work/jetta-foam-poster.webp", video: "/work/jetta-foam.mp4", gallery: ["/work/jetta-foam.mp4"] },
  { id: 12, title: "Tesla Model 3 Foam Wash", category: "Exterior", image: "/work/tesla-foam.webp", gallery: ["/work/tesla-foam.webp", "/work/tesla-interior.mp4"] },
  { id: 13, title: "Tesla Model 3 Interior", category: "Interior", image: "/work/tesla-interior-poster.webp", video: "/work/tesla-interior.mp4", gallery: ["/work/tesla-interior.mp4"] },
  { id: 14, title: "VW Jetta Console Detail", category: "Interior", image: "/work/jetta-console.webp", gallery: ["/work/jetta-console.webp", "/work/jetta-console.mp4"] },
  { id: 15, title: "VW Jetta Carpet Reset", category: "Interior", image: "/work/jetta-carpet-after.webp", gallery: ["/work/jetta-carpet-after.webp", "/work/jetta-carpet-before.webp"] },
];
export const signatureIds = [7, 9, 12, 10, 8, 14];

// Real before & after photos from Pat's jobs (in /public/work).
export const beforeAfter = [
  { id: "mazda", title: "Mazda 3 — Pet Hair Removal", before: "/work/mazda-seats-before.webp", after: "/work/mazda-seats-after.webp" },
  { id: "trx-console", title: "RAM TRX — Interior Reset", before: "/work/trx-console-before.webp", after: "/work/trx-console-after.webp" },
  { id: "trx-wheel", title: "RAM TRX — Clay & Seal", before: "/work/trx-wheel-before.webp", after: "/work/trx-wheel-after.webp" },
  { id: "jetta-carpet", title: "VW Jetta — Carpet Reset", before: "/work/jetta-carpet-before.webp", after: "/work/jetta-carpet-after.webp" },
];

export const process = [
  { title: "Send a DM to Book", text: "Message us on Instagram with your car and what you'd like done.", icon: "MessageCircle" },
  { title: "Choose Your Service", text: "We'll recommend the right detail and agree a time that suits you.", icon: "ListChecks" },
  { title: "We Come to You", text: "Mobile service at your home or work, with everything we need on board.", icon: "MapPin" },
  { title: "Drive Away with a Showroom Shine", text: "Every panel and surface checked before we hand back the keys.", icon: "Sparkles" },
];

export const why = [
  { title: "Attention to Detail", text: "The small things are the job: seams, vents, badges and wheel barrels." },
  { title: "We Come to You", text: "Fully mobile, so your car gets detailed while you get on with your day." },
  { title: "Premium Care", text: "Safe wash methods and quality products chosen for each surface." },
  { title: "Friendly Local Service", text: "A Union City detailer who treats every car like his own." },
  { title: "Easy Booking by DM", text: "No forms or phone tag. Send a message on Instagram and you're booked." },
];

// PLACEHOLDER reviews — replace with real customer reviews before launch.
export const testimonials = [
  { name: "Placeholder review", area: "Union City, CA", text: "Replace with a real review about an exterior detail or wash." },
  { name: "Placeholder review", area: "Union City, CA", text: "Replace with a real review about an interior deep clean." },
  { name: "Placeholder review", area: "Union City, CA", text: "Replace with a real review about paint correction or a ceramic coating." },
];

export const aboutImage = "/work/mazda-seats-after.webp";
export const contactImage = "/work/jetta-exterior.webp";
