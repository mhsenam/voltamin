'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Award, User, Zap } from 'lucide-react'

export const About = () => {
  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Latest Technology',
      description: 'Using state-of-the-art tools and equipment from around the world',
    },
    {
      icon: <User className="w-6 h-6" />,
      title: 'Solo Professional',
      description: 'Direct service from an experienced specialist with personal attention to detail',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Speed & Quality',
      description: 'Fast execution with the highest quality standards',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Complete Warranty',
      description: 'Full warranty on all services provided',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto" />
          </motion.div>

          {/* Special Offer */}
          <motion.div
            className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-amber-900 mb-3">✨ Special Offer – FREE SERVICE CALL!</h3>
            <p className="text-amber-800 leading-relaxed">
              A &quot;FREE&quot; Service Call is an exclusive offer only available at Voltamin Electric — you won&apos;t find it anywhere else! 
              We&apos;ll come to your location, assess the project in person, and provide a precise, no-obligation estimate. 
              This ensures full transparency before any work begins.
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8"
            variants={itemVariants}
          >
            Hello! I&apos;m Saeid Amini and I have been working in the field of electrical engineering. 
            With 5 years in business, I&apos;ve been hired 34 times by satisfied customers (background checked).
            My expertise includes installation and repair of electrical systems, lighting, control systems, and related services.
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-muted-foreground leading-relaxed mb-12"
            variants={itemVariants}
          >
            Customer satisfaction and work quality are my top priorities. I perform every project with precision, expertise, and responsibility. 
            We accept multiple payment methods including Cash, Check, Credit Card, Venmo, and Zelle for your convenience.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Expertise Tags */}
          <motion.div className="mt-12 pt-8 border-t border-gray-200" variants={itemVariants}>
            <h3 className="font-bold text-foreground mb-6">Areas of Expertise:</h3>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={containerVariants}
            >
              {[
                'Installation & Repair',
                'Lighting Systems',
                'Industrial Control',
                'Solar Energy',
                'Security Systems',
                'Energy Efficiency',
              ].map((skill) => (
                <motion.div
                  key={skill}
                  className="px-4 py-2 bg-blue-100 text-primary rounded-full font-medium text-sm"
                  whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
