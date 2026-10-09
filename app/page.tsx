import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { TrustBar } from "@/components/trust-bar";
import { Services } from "@/components/services";
import { FreeServiceCall } from "@/components/free-service-call";
import { Process } from "@/components/process";
import { Clients } from "@/components/clients";
import { Work } from "@/components/work";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { Socials } from "@/components/socials";
import { ServiceArea } from "@/components/service-area";
import { FAQ } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { Animations } from "@/components/animations";
import { siteConfig } from "@/config/site.config";
import { unstable_cache } from "next/cache";
import { getGoogle, getThumbtack, mergeReviews, type Cache } from "@/lib/reviews";

// Reviews are fetched on the server and cached, so a visitor is never kept
// waiting on a scrape: they get the last result while the next one refreshes.
export const revalidate = 3600;
// Each scrape takes 25-45s, so state an explicit limit rather than rely on
// whatever the project default is.
export const maxDuration = 60;

// The Google response is over 2 MB, more than Next's fetch cache will store,
// so the parsed result is cached here instead of the raw response.
const cache: Cache = (key, seconds, run) =>
  unstable_cache(run, [key], { revalidate: seconds })();

export default async function Home() {
  const { proof, reviews, googleReviews, reviewSources } = siteConfig;
  const [thumbtackLive, googleLive] = await Promise.all([
    getThumbtack(reviewSources.thumbtackUrl, cache),
    getGoogle(reviewSources.googleSearchUrl, cache),
  ]);

  const thumbtack = {
    rating: thumbtackLive?.rating ?? proof.rating,
    count: thumbtackLive?.count ?? proof.reviewCount,
    reviews: mergeReviews(thumbtackLive?.reviews ?? [], reviews),
  };

  const google = {
    rating: googleLive?.rating ?? googleReviews.rating,
    count: googleLive?.count ?? googleReviews.count,
    reviews: mergeReviews(googleLive?.reviews ?? [], googleReviews.reviews),
  };

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Testimonials thumbtack={thumbtack} google={google} />
        <Socials />
        <Marquee />
        <TrustBar />
        <Services />
        <FreeServiceCall />
        <Process />
        <Clients />
        <Work />
        <About />
        <ServiceArea />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
      <Animations />
    </>
  );
}
