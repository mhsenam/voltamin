'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 text-2xl font-bold text-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-8 h-8" />
            <span>VOLTAMIN</span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-foreground font-medium hover:text-primary transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 origin-left" />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className="hidden md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Get a Quote
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-4 space-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 px-4 text-foreground hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-500">
              Get a Quote
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
