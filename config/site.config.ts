/**
 * سایت کنفیگ - تمام تنظیمات سایت
 * Easily customize your portfolio site
 */

export const siteConfig = {
  // Personal Information
  personal: {
    name: "Saeid Amini",
    title: "Electrical Specialist",
    bio: "Professional electrical specialist with 5 years in business. Hired 34 times with background check verified. Offering FREE SERVICE CALLS - an exclusive offer you won't find anywhere else!",
    email: "sam@voltaminelectric.com",
    phone: "+1-818-699-2255",
    address: "Los Angeles, USA",
    yearsInBusiness: 5,
    timesHired: 34,
    employees: 2,
  },

  // Statistics
  stats: {
    experience: {
      years: 15,
      label: "Years of Experience",
    },
    projects: {
      count: 500,
      label: "Projects Completed",
    },
    satisfaction: {
      percentage: 98,
      label: "Customer Satisfaction",
    },
  },

  // Social Links
  social: {
    instagram: "https://www.instagram.com/voltamin_electric/",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourprofile",
  },

  // Services
  services: [
    {
      title: "Lighting Systems",
      description:
        "Design and installation of modern and economical lighting systems for residential and commercial buildings",
      icon: "Lightbulb",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Repair & Maintenance",
      description:
        "Periodic repair and maintenance services for all electrical equipment and systems",
      icon: "Wrench",
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Control Systems",
      description:
        "Installation and configuration of industrial control and automation systems",
      icon: "Zap",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Building Installation",
      description:
        "Precise installation of switches, outlets, and electrical devices in new and remodeled buildings",
      icon: "Home",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Smart Home Systems",
      description:
        "Design and installation of smart homes and advanced energy management systems",
      icon: "Cpu",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Solar Energy",
      description:
        "Installation and commissioning of solar power systems for cost savings and energy efficiency",
      icon: "Sun",
      color: "from-amber-500 to-yellow-500",
    },
  ],

  // Skills
  skills: [
    "Installation & Repair",
    "Lighting Systems",
    "Industrial Control",
    "Solar Energy",
    "Security Systems",
    "Energy Efficiency",
  ],

  // Projects
  projects: [
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
  ],

  // Features - Why Choose Voltamin Electric
  features: [
    {
      title: "Latest Technology",
      description:
        "Using state-of-the-art tools and equipment from around the world",
      icon: "Award",
    },
    {
      title: "Professional Team",
      description: "Working with experienced and well-trained specialists",
      icon: "Users",
    },
    {
      title: "Speed & Quality",
      description: "Fast execution with the highest quality standards",
      icon: "Zap",
    },
    {
      title: "Complete Warranty",
      description: "Full warranty on all services provided",
      icon: "CheckCircle",
    },
  ],

  // Colors
  colors: {
    primary: "#3B82F6", // Blue
    secondary: "#F3F4F6", // Gray
    accent: "#FBBF24", // Amber
    foreground: "#1F2937", // Dark
  },

  // SEO
  seo: {
    title: "VOLTAMIN ELECTRIC | Electrical Specialist",
    description:
      "Professional electrical specialist with 15 years of experience. Services include installation, repair, and maintenance of electrical systems",
    keywords: [
      "electrical specialist",
      "electrician",
      "installation",
      "repair",
      "maintenance",
      "solar energy",
      "VOLTAMIN ELECTRIC",
    ],
    author: "Saeid Amini",
    siteUrl: "https://voltaminelectric.com",
  },
};

export type SiteConfig = typeof siteConfig;
