import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}

