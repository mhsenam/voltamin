"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Services = () => {
  const services = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "New Lighting Installation",
      description:
        "Professional installation of new lighting systems tailored to your space and needs",
      color: "from-yellow-500 to-orange-500",
      options: {
        ceilingHeight: ["Under 8 feet", "8 - 10 feet", "10 - 14 feet", "Over 14 feet"],
        constructionType: ["Existing properties", "Remodels", "New construction"],
        propertyType: ["House", "Condo/Apartment", "Townhouse", "Business"],
      },
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Replacement of Lighting",
      description:
        "Expert replacement of existing lighting fixtures and systems with modern solutions",
      color: "from-orange-500 to-red-500",
      options: {
        ceilingHeight: ["Under 8 feet", "8 - 10 feet", "10 - 14 feet", "Over 14 feet"],
        constructionType: ["Existing properties", "Remodels", "New construction"],
        propertyType: ["House", "Condo/Apartment", "Townhouse", "Business"],
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              My <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A wide range of professional electrical services for your needs
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4" />
          </motion.div>

          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full p-8 bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <motion.div
                    className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${service.color} text-white mb-4 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Service Options */}
                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                    {/* Ceiling Height */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Ceiling Height</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.options.ceilingHeight.map((height, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-50 text-primary text-xs rounded-full border border-blue-200"
                          >
                            {height}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Construction Type */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Construction Type</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.options.constructionType.map((type, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Property Type */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Property Type</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.options.propertyType.map((property, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200"
                          >
                            {property}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                    whileHover={{ x: -5 }}
                  >
                    Get a Quote
                    <span>→</span>
                  </motion.button>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 p-8 md:p-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl text-center text-white"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-3xl font-bold mb-4">Need More Services?</h3>
            <p className="text-lg mb-6 opacity-90">
              For custom projects and special requirements, contact me today
            </p>
            <motion.button
              className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Free Consultation
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
