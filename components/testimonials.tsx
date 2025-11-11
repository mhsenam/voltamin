"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Michael T.",
      date: "Sep 22, 2025",
      rating: 5,
      text: "I couldn't be happier with Sam's work installing six recessed lights and a dimmer switch. Our vaulted ceiling added an extra layer of complexity, but he handled it flawlessly and the finished result looks perfect. Throughout the project, Sam provided helpful options and recommendations, arrived right on time, and kept the workspace spotless. His professionalism and attention to detail were outstanding. I highly recommend Sam for any electrical work and will definitely be hiring him again for future projects.",
      service: "New lighting installation • 2-4 lights • Over 14 feet (lofty ceiling)",
    },
    {
      name: "Mark N.",
      date: "Jul 13, 2025",
      rating: 5,
      text: "Very glad we hired him to install recessed lights. Very skilled and diligent. I will definitely hire him again, and recommend him to anyone.",
      service: "Install EV charger • 1 switch or outlet • Garage",
    },
    {
      name: "Reza I.",
      date: "3 weeks ago",
      rating: 5,
      text: "I want to start by saying that the whole experience with Sam was genuinely pleasant from beginning to end. He responded to my initial inquiry very quickly and showed up soon after to take a look at what turned out to be a pretty complex situation with installing a 30-amp outlet. He took the time to understand everything before starting the work, which I really appreciated. The installation itself was done with great care and professionalism — the kind of work that gives you confidence it's been done right. On top of that, Sam noticed and fixed a few other issues in our home's electrical setup that could've become safety concerns down the line. His prices were also very reasonable, especially considering the quality of work and the extra steps he took to make sure everything was safe and up to code. I'd definitely call Sam again for any electrical needs and wouldn't hesitate to recommend him to others.",
      service: "Install EV charger • 1 switch or outlet • Garage",
    },
    {
      name: "Jenny K.",
      date: "3 weeks ago",
      rating: 5,
      text: "Sam and his partner showed up on time and installed the EV charger as we wanted. They asked us about different options a few times, and did it right in the long run. We appreciated their service and that they worked very hard! Would use them again.",
      service: "Install EV charger • 1 switch or outlet • Garage",
    },
    {
      name: "Kim B.",
      date: "3 weeks ago",
      rating: 5,
      text: "Sam came over next day and did a fantastic job fixing a mess that a so called electrician made. I purchased this chandelier and needed it installed correctly with care. Sam was very knowledgeable and precise when fixing and installing my new chandelier. He identified the problem, fixed the problem and installed the new chandelier. I am thrilled I was able to find him and he was available. I highly recommend Sam!",
      service: "1 switch or outlet • Chandelier installation",
    },
  ];

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied clients who have experienced our exceptional service.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4" />
        </motion.div>

        {/* Infinite Scroll Container */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-4 md:gap-6 w-max"
            animate={{ x: ["0px", "-2400px"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 md:w-96"
              >
                <Card className="h-full bg-white border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 p-6 flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4 flex-grow line-clamp-4">
                    &quot;{testimonial.text}&quot;
                  </p>

                  {/* Service Details */}
                  <p className="text-xs text-muted-foreground mb-4 pb-4 border-b border-gray-200 line-clamp-2">
                    {testimonial.service}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.date}
                      </p>
                    </div>
                    <div className="text-xs bg-blue-100 text-primary px-3 py-1 rounded-full font-semibold">
                      ★★★★★
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </motion.div>

          {/* Fade Overlay Left */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-blue-50 to-transparent pointer-events-none z-10" />
          {/* Fade Overlay Right */}
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-muted-foreground mb-4">
            Join hundreds of satisfied customers who trust VOLTAMIN ELECTRIC
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get Your Free Service Call Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

