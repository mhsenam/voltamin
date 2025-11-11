"use client";

import { motion } from "framer-motion";
import { Zap, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            y: [0, 40, 0],
            x: [0, 40, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            y: [0, -40, 0],
            x: [0, -40, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 0.2 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-100 rounded-full text-primary mb-8 text-sm md:text-base"
          variants={itemVariants}
        >
          <Zap className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
          <span className="font-semibold">
            Electrical Specialist with 15+ Years Experience
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
          variants={itemVariants}
        >
          Hello! I&apos;m <span className="text-primary">Saeid Amini</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Professional electrical specialist with extensive experience in
          installation, repair, and maintenance of electrical systems
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 px-2"
          variants={itemVariants}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
          >
            Request Services
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
          >
            View Portfolio
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-2 md:gap-8 max-w-2xl mx-auto mb-16 px-2"
          variants={itemVariants}
        >
          <div className="p-2 md:p-4 text-center">
            <div className="text-2xl md:text-4xl font-bold text-primary">
              15+
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">
              Years Experience
            </div>
          </div>
          <div className="p-2 md:p-4 text-center">
            <div className="text-2xl md:text-4xl font-bold text-primary">
              500+
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">
              Projects Completed
            </div>
          </div>
          <div className="p-2 md:p-4 text-center">
            <div className="text-2xl md:text-4xl font-bold text-primary">
              98%
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">
              Customer Satisfaction
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator - Clickable */}
        <div className="w-full flex justify-center">
          <motion.button
            onClick={() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="relative z-20 flex items-center justify-center cursor-pointer hover:opacity-75 transition-opacity"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
