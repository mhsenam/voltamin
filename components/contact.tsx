"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";
import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: siteConfig.personal.phone,
      href: `tel:${siteConfig.personal.phone}`,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: siteConfig.personal.email,
      href: `mailto:${siteConfig.personal.email}`,
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      value: siteConfig.personal.address,
      href: "#",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              For service requests or a free consultation, please contact me
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.div className="mb-8" variants={itemVariants}>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Contact Methods
                </h3>
              </motion.div>

              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ x: -5 }}
                >
                  <div className="p-3 bg-blue-100 rounded-lg text-primary flex-shrink-0">
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">
                      {method.title}
                    </h4>
                    <p className="text-muted-foreground">{method.value}</p>
                  </div>
                </motion.a>
              ))}

              {/* Social Links */}
              <motion.div className="pt-6" variants={itemVariants}>
                <h4 className="font-bold text-foreground mb-4">
                  Connect With Us
                </h4>
                <div className="flex gap-4">
                  <motion.a
                    href="https://wa.me/+18186992255"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-100 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/voltamin_electric/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-600 hover:text-white transition-all flex items-center justify-center font-bold"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Instagram"
                  >
                    IG
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white p-8 rounded-2xl border border-gray-200 shadow-lg"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1-555-123-4567"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </motion.div>

              {/* Status Message */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-sm font-medium ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
