"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      title: "City Center Commercial Complex",
      description:
        "Installation of smart LED lighting system and industrial control system for large commercial complex",
      tags: ["LED Lighting", "Control Systems", "Automation"],
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
      year: "2024",
    },
    {
      title: "Residential Tower Building",
      description:
        "Complete electrical system, lighting, and security system installation for 200 residential units",
      tags: ["Electrical Systems", "Lighting", "Security"],
      image: "bg-gradient-to-br from-green-400 to-green-600",
      year: "2024",
    },
    {
      title: "Industrial Solar Power Plant",
      description:
        "Design and installation of 50kW solar power system for energy savings and cost reduction",
      tags: ["Solar Energy", "Industrial", "Efficiency"],
      image: "bg-gradient-to-br from-yellow-400 to-orange-500",
      year: "2023",
    },
    {
      title: "Manufacturing Plant Renovation",
      description:
        "Complete electrical system renovation, industrial lighting, and production line control systems",
      tags: ["Industrial", "Lighting", "Control"],
      image: "bg-gradient-to-br from-red-400 to-pink-500",
      year: "2023",
    },
    {
      title: "Modern Smart Home",
      description:
        "Design and installation of smart home system with adaptive lighting and temperature control",
      tags: ["Smart Home", "IoT", "Automation"],
      image: "bg-gradient-to-br from-purple-400 to-indigo-600",
      year: "2023",
    },
    {
      title: "Chain Store Network (15 Locations)",
      description:
        "Installation and commissioning of lighting, heating, and control systems across all locations",
      tags: ["Commercial", "Lighting", "HVAC"],
      image: "bg-gradient-to-br from-cyan-400 to-blue-600",
      year: "2022",
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
    <section id="projects" className="py-20 bg-white">
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
              My <span className="text-primary">Portfolio</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Some of my most successful projects completed in recent years
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4" />
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  {/* Image Section */}
                  <div
                    className={`h-32 md:h-40 ${project.image} relative overflow-hidden`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <ArrowUpRight className="w-6 h-6 text-primary" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <h3 className="text-base md:text-lg font-bold text-foreground flex-1">
                        {project.title}
                      </h3>
                      <span className="text-xs font-semibold text-primary bg-blue-100 px-2 md:px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                        {project.year}
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={containerVariants}
                    >
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div className="text-center mt-12" variants={itemVariants}>
            <motion.button
              className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <ArrowUpRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
