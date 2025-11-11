'use client'

import { motion } from 'framer-motion'
import { Zap, Heart, MessageCircle } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-foreground text-white py-12 md:py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8"
        >
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6" />
              <span className="text-xl font-bold">VOLTAMIN ELECTRIC</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Professional electrical specialist with 15 years of experience in specialized electrical services
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-bold mb-4 text-lg">Contact Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:+15551234567"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  ☎ +1-555-123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@voltaminelectric.com"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  ✉ info@voltaminelectric.com
                </a>
              </li>
              <li className="text-white/70">
                📍 New York, USA
              </li>
            </ul>
          </motion.div>

          {/* Social Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-bold mb-4 text-lg">Connect With Us</h4>
            <div className="flex gap-3">
              <a
                href="https://wa.me/+18186992255"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-600/20 hover:bg-green-600/40 rounded-lg flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-green-400" />
              </a>
              <a
                href="https://www.instagram.com/voltamin_electric/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-600/20 hover:bg-pink-600/40 rounded-lg flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <span className="text-sm font-bold">IG</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-white/70 text-sm text-center md:text-right">
              All rights reserved © {currentYear}
            </p>
            <p className="text-white/70 text-sm flex items-center justify-center gap-1">
              Built with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 fill-current text-red-500" />
              </motion.span>
              by Saeid Amini
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
