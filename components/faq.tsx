'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What should the customer know about your pricing (e.g., discounts, fees)?",
      answer: "We offer competitive pricing without compromising on quality, ensuring you get excellent value for your investment. There are no hidden fees—what you see in the estimate is what you pay.",
    },
    {
      question: "What is your typical process for working with a new customer?",
      answer: "1. Free Service Call & Consultation: I start with a free visit to assess your needs and provide a clear, detailed estimate.\n2. No Upfront Charge: There's no charge for the initial visit or consultation. If you agree with the estimate, we'll proceed with the work.\n3. Scheduling: We'll set up a convenient time to start the project once you're comfortable with the plan.\n4. Professional Execution: I use advanced tools and methods to ensure top-quality, clean work with minimal disruption.\n5. Final Review: After completion, we'll review everything together to ensure you're fully satisfied.",
    },
    {
      question: "What education and/or training do you have that relates to your work?",
      answer: "• Bachelor's degree in Computer Hardware with related courses in electrical and electronic circuits\n• Certification of Proficiency as an Electrician (IVC College)\n• Certificate of Completion as Electrician 1: Fundamentals\n• Certificate of Completion as Electrician 2: Wiring and Codes\n• Certificate of Completion HVAC 1, HVAC 2, and HVAC 3\n• Electrician Trainee Card Holder\n• OSHA Certification",
    },
    {
      question: "How did you get started doing this type of work?",
      answer: "I started my electrical career as an apprentice working alongside Certified Electricians and Licensed Contractors, including a Specialty C-10 Licensed Electrician and a General B Contractor. Through hands-on experience and mentorship, I gained practical skills and deep knowledge in both residential and commercial electrical work, which laid the foundation for the high-quality service I now provide through Voltamin Electric.",
    },
    {
      question: "What types of customers have you worked with?",
      answer: "I have worked with a wide range of customers, including:\n• Residential homeowners – single-family homes, condos, and remodels\n• Commercial clients – offices, retail spaces, restaurants, and tenant improvements\n• Industrial clients – small facilities and maintenance support for light industrial systems\n\nThis diverse experience allows me to adapt to different project needs while maintaining quality and safety on every job.",
    },
    {
      question: "Describe a recent project you are fond of. How long did it take?",
      answer: "To get a better understanding and comprehensive view of recent projects, check out my reviews. They showcase the variety of projects I've completed and feedback from my clients. These reviews highlight not only my professional behavior and competitive pricing but also my use of high-tech tools. I keep clients informed every step of the way, ensuring a smooth and transparent process. Their reviews reflect satisfaction with both the quality of work and the overall experience.",
    },
    {
      question: "What advice would you give a customer looking to hire a provider in your area of work?",
      answer: "When hiring an electrician, don't choose based on the lowest price alone. Make sure the provider is knowledgeable, responsive, and uses high-quality, high-tech tools. Check if they utilize laser levels, digital cameras, and other advanced equipment to ensure precision and minimize unnecessary cuts or damage. Additionally, verify their qualifications and certifications. An educated electrician with the right training and credentials ensures the job is done safely and up to code. By choosing a professional who invests in top-tier tools and has a solid educational background, you ensure a smoother, more efficient process with outstanding results.",
    },
    {
      question: "What questions should customers think through before talking to professionals about their project?",
      answer: "Before reaching out to an electrician, customers should consider:\n• What exactly needs to be done? (e.g., outlet installation, panel upgrade, lighting design)\n• Is there existing wiring or will new wiring be required?\n• Where is the work located? (indoors, garage, exterior, etc.)\n• What's your budget range or flexibility?\n• Do you have a deadline or preferred timeframe for the project?\n• Will access to the area be clear and safe for the electrician?",
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
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services and process
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4" />
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            variants={containerVariants}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg md:rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <h3 className="font-semibold text-foreground text-sm md:text-base pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-primary" />
                  </motion.div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 md:px-6 py-3 md:py-4 bg-white border-t border-gray-200">
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

