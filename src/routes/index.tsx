import { createFileRoute } from "@tanstack/react-router";
import { Effects } from "@/components/site/Effects";
import { Nav } from "@/components/site/Nav";
import { Marquee, Services, Process, Why, About, Testimonials } from "@/components/site/Sections";
import { Work } from "@/components/site/Work";
import { Contact, Footer } from "@/components/site/Contact";
import { ScrollVideo } from "@/components/site/ScrollVideo";
import { contact, scrollVideo } from "@/data/content";

const title = "DetailsByPat | Mobile Auto Detailing in Union City, CA";
const desc = "Premium mobile auto detailing in Union City, CA by Patrick Moralde: exterior and interior detailing, paint correction and ceramic coating. We come to you. DM to book.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "AutoDetailing", name: "DetailsByPat", image: "/logo.png",
        founder: { "@type": "Person", name: "Patrick Moralde" },
        address: { "@type": "PostalAddress", addressLocality: "Union City", addressRegion: "CA", addressCountry: "US" },
        areaServed: "Union City, CA", sameAs: [contact.instagram, contact.threads],
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Effects />
      <Nav />
      <main>
        <ScrollVideo src={scrollVideo.src} poster={scrollVideo.poster} stages={scrollVideo.stages} intro={scrollVideo.intro} />
        <Marquee />
        <Services />
        <Work />
        <Process />
        <Why />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
