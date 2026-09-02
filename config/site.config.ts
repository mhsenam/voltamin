/**
 * Single source of truth for every piece of copy and business data on the site.
 * All figures below are taken from the live Thumbtack profile and Facebook business page.
 */

export const siteConfig = {
  business: {
    name: "Voltamin Electric",
    shortName: "Voltamin",
    owner: "Saeid Amini",
    ownerShort: "Sam",
    role: "Licensed C-10 Electrical Contractor",
    license: "1159185",
    licenseClass: "C-10",
    licenseState: "CA",
    city: "Lake Forest",
    state: "CA",
    region: "Orange County",
    phone: "(818) 699-2255",
    phoneRaw: "+18186992255",
    email: "Sam@VoltaminElectric.com",
    url: "https://voltaminelectric.com",
    priceRange: "$$",
    yearsInBusiness: 6,
    employees: 2,
    tagline:
      "Licensed & insured C-10 electrical contractor serving Orange County, CA.",
    intro:
      "Residential, commercial, and industrial electrical work — panel upgrades, EV chargers, lighting, switches and outlets, and troubleshooting. Quality workmanship, honest pricing, and a genuinely free service call.",
  },

  proof: {
    rating: 5.0,
    ratingLabel: "Exceptional",
    reviewCount: 94,
    timesHired: 72,
    photoCount: 301,
    topProYear: "2025",
    backgroundCheckDate: "Jan 30, 2025",
    breakdown: [
      { stars: 5, percent: 99 },
      { stars: 4, percent: 0 },
      { stars: 3, percent: 0 },
      { stars: 2, percent: 1 },
      { stars: 1, percent: 0 },
    ],
    // Keyword frequencies Thumbtack surfaces above the reviews
    mentions: [
      { word: "install", count: 28 },
      { word: "electric", count: 21 },
      { word: "light", count: 19 },
      { word: "electrician", count: 12 },
      { word: "ceiling", count: 10 },
      { word: "fixture", count: 5 },
      { word: "recessed", count: 4 },
      { word: "fan", count: 4 },
      { word: "chandelier", count: 2 },
    ],
  },

  social: {
    instagram: "https://www.instagram.com/voltamin_electric/",
    instagramHandle: "@voltamin_electric",
    facebook: "https://www.facebook.com/VoltaminElectric/",
    whatsapp: "https://wa.me/18186992255",
    thumbtack:
      "https://www.thumbtack.com/ca/lake-forest/interior-lighting-designer/voltamin-electric/service/452715709538287627",
  },

  payments: ["Cash", "Check", "Credit card", "Venmo", "Zelle"],

  trustBadges: [
    { label: "C-10 Licensed", detail: "CSLB Lic. #1159185" },
    { label: "Background Checked", detail: "Verified Jan 2025" },
    { label: "Thumbtack Top Pro", detail: "2025" },
    { label: "5.0 Rating", detail: "94 verified reviews" },
    { label: "Free Service Call", detail: "No obligation" },
  ],

  // The exact services listed on the Thumbtack profile
  services: [
    {
      title: "Lighting Installation",
      icon: "Lightbulb",
      description:
        "Recessed lighting, chandeliers, under-cabinet, and exterior fixtures — laid out with laser levels so the ceiling stays clean and the spacing is right the first time.",
      details: ["New installation", "Fixture replacement", "Recessed & can lights"],
    },
    {
      title: "Electrical & Wiring Repair",
      icon: "Wrench",
      description:
        "Dead outlets, flickering lights, breakers that will not hold. Full diagnosis to find the actual root cause rather than swapping parts and hoping.",
      details: ["Fault finding", "Code corrections", "Same-visit repairs"],
    },
    {
      title: "Switch & Outlet Installation",
      icon: "ToggleRight",
      description:
        "New outlets, dedicated circuits, GFCI and AFCI protection, USB and smart switches — in drywall, garages, and exterior walls.",
      details: ["New circuits", "GFCI & AFCI", "Dimmers & smart switches"],
    },
    {
      title: "Wiring Installation",
      icon: "Cable",
      description:
        "New runs for remodels, additions, home theater, and 240V equipment. Routing planned around the existing structure to keep drywall damage minimal.",
      details: ["240V circuits", "Remodel rough-in", "Home theater & low voltage"],
    },
    {
      title: "Panel & Fuse Box Repair",
      icon: "Gauge",
      description:
        "Circuit breaker replacement, sub-panel work, panel labeling, and repair of fuse boxes that are past their service life.",
      details: ["Breaker replacement", "Sub-panels", "Panel labeling"],
    },
    {
      title: "Fan Installation",
      icon: "Fan",
      description:
        "Ceiling fans, exhaust fans, and bath fan and light combinations — properly braced boxes, correct switching, and no wobble.",
      details: ["Ceiling fans", "Bath exhaust fans", "Fan & light combos"],
    },
    {
      title: "Switch & Outlet Repair",
      icon: "Zap",
      description:
        "Loose, warm, or dead devices replaced and the circuit behind them checked, so the problem does not come back next month.",
      details: ["Warm or scorched devices", "Loose connections", "Circuit testing"],
    },
  ],

  // Project options the profile exposes — useful qualifiers for the quote form
  projectOptions: {
    ceilingHeight: [
      "Under 8 feet",
      "8 – 10 feet",
      "10 – 14 feet",
      "Over 14 feet",
    ],
    constructionType: ["Existing properties", "Remodels", "New construction"],
    propertyType: ["House", "Condo / Apartment", "Townhouse", "Business"],
  },

  // Verbatim from the Thumbtack FAQ "typical process" answer
  process: [
    {
      title: "Free on-site estimate",
      body: "I come out to look at the project in person, talk through what you need, and give you a clear estimate. There is no charge and no obligation to move forward.",
    },
    {
      title: "Clear scope & pricing",
      body: "I explain the proposed work, the materials, and the price before anything begins. If something changes mid-job, we discuss it first.",
    },
    {
      title: "Scheduling",
      body: "Once you approve the estimate, we book the work at a time that suits you.",
    },
    {
      title: "Professional installation",
      body: "The work is completed carefully and cleanly, in accordance with applicable electrical codes and professional standards.",
    },
    {
      title: "Testing & final walk-through",
      body: "I test the installation and walk the finished work with you to confirm everything operates properly before I leave.",
    },
  ],

  clients: [
    {
      title: "Residential",
      body: "Single-family homes, condos, and remodels. Lighting, outlets, fans, panel work, and troubleshooting for homeowners across Orange County.",
    },
    {
      title: "Commercial",
      body: "Offices, retail spaces, restaurants, gyms, and tenant improvements — including finding and correcting unsafe work left behind by others.",
    },
    {
      title: "Industrial",
      body: "Small facilities and maintenance support for light industrial systems, adapted to each site while keeping quality and safety consistent.",
    },
  ],

  credentials: [
    "California Licensed C-10 Electrical Contractor",
    "Certification of Proficiency – Electrician, Irvine Valley College",
    "Certificate of Completion – Electrician I / Electrical Fundamentals",
    "Certificate of Completion – Electrician II / Wiring and Electrical Codes",
    "HVAC I – Certificate of Completion",
    "HVAC II – Certificate of Completion",
    "HVAC III – Certificate of Completion",
    "Electrician Trainee Program / Training",
    "OSHA Safety Training",
    "Bachelor's Degree in Computer Hardware, including electrical and electronic circuits coursework",
  ],

  serviceAreas: [
    "Lake Forest",
    "Irvine",
    "Costa Mesa",
    "Mission Viejo",
    "Laguna Niguel",
    "Laguna Beach",
    "Laguna Woods",
    "Rancho Santa Margarita",
    "San Juan Capistrano",
    "San Clemente",
  ],

  // Verbatim customer reviews from the Thumbtack profile
  reviews: [
    {
      name: "Zala K.",
      date: "Jul 10, 2026",
      rating: 5,
      service: "Wiring Installation",
      details:
        "Electrical (lighting or power) • Home theater • Install new wiring • One or more rooms • Commercial",
      body: "I highly recommend Sam! He did an amazing job and exceeded my expectations. He was professional, punctual, knowledgeable, and paid close attention to every detail. He completed everything exactly as discussed, including hiding the TV and logo wires and installing the lighting beautifully. His workmanship was clean, efficient, and the final result completely transformed the space. If you're looking for an honest electrician who takes pride in his work and delivers high-quality results, Sam is the one to call.",
      reply:
        "I'm really grateful for your kind words, Zala. It means a lot to know you're happy with my work. My client's satisfaction honestly always makes my day.",
    },
    {
      name: "Grace P.",
      date: "Apr 27, 2026",
      rating: 5,
      service: "Lighting Installation",
      details:
        "New lighting installation • 5-10 lights • 8 – 10 ft ceiling • Indoors • Remodel • Condo",
      body: "Sam did such a great job installing all of the recessed lighting in my condo. He was very responsive and, having done a lot of remodeling at another property, he was the most organized and clean contractor I have worked with. He laid out a protective covering on the counter for his tools and used laser tools to lay out his work. Even as he was cutting into the ceiling he kept the dust minimal and swept the floors as he moved from one area to the next. I was so impressed by the quality of his install and overall work ethic.",
      reply:
        "Thank you so much for your thoughtful review, Grace. I always try to treat every home with care and keep the work area as clean and protected as possible.",
    },
    {
      name: "Gabe M.",
      date: "Aug 26, 2026",
      rating: 5,
      service: "Switch and Outlet Installation",
      details:
        "No existing wiring • Install switch or outlet • 2 outlets • Garage • Drywall • House",
      body: "I needed a 240V circuit in my garage to run a table saw, plus two additional outlets, one of them outdoors. Sam showed up exactly when he said he would and started by walking the garage with me rather than guessing at what I wanted. What stood out was how he thought through the routing. He looked at the subpanel, the existing conduit, and where I actually needed power, then laid out a path that got all three outlets in with minimal damage to the walls. I was expecting to spend a weekend patching drywall afterward. There was almost nothing to fix.",
      reply:
        "Thank you, Gabe! I really appreciate the opportunity to help with your garage electrical project. Please don't hesitate to reach out anytime you need electrical work in the future.",
    },
    {
      name: "Rachael S.",
      date: "Jul 21, 2026",
      rating: 5,
      service: "Switch and Outlet Installation",
      details: "Install switch or outlet • 1 switch or outlet • Drywall • Commercial",
      body: "Sam has come out to service the outlets in my gym twice now. He is extremely responsive, professional and punctual! I originally called him out with questions about wiring to install a television in my warehouse, and he ended up finding a lot of live wires and unsafe issues in my ceiling that the previous electrician just left as a hazard. He addressed the issue quickly, he's very knowledgeable and honest, and pricing is very fair!",
      reply:
        "Thank you, Rachael! I'm glad I was able to identify and correct the safety issues and help with the outlet upgrades. I truly appreciate you calling me back for additional work.",
    },
    {
      name: "Richard W.",
      date: "Mar 16, 2026",
      rating: 5,
      service: "Switch and Outlet Installation",
      details:
        "Existing wiring • Replace switch or outlet • 6+ devices • Kitchen & bedrooms • Condo",
      body: "Sam did an amazing job installing new outlets and switches throughout my condo. He was immediate to respond, provided very fair pricing and ensured good quality work! I would highly recommend Voltamin Electric!",
      reply:
        "I truly appreciate your kind words and your trust in me for your project, Richard. I'm glad you were happy with the responsiveness, pricing, and quality.",
    },
  ],

  // Verbatim from the Thumbtack FAQ section
  faqs: [
    {
      question: "What should I know about your pricing?",
      answer:
        "Every job starts with a free on-site estimate and clear, upfront pricing before any work begins. There are no hidden fees and no obligation. My goal is high-quality electrical work at a fair, competitive price, and I always discuss any change with you before proceeding.",
    },
    {
      question: "What is your typical process for working with a new customer?",
      answer:
        "First, a free on-site estimate and consultation to evaluate the project and discuss what you need. Second, a clear scope and price covering the work, the materials, and the cost — with no obligation to proceed. Third, we schedule the project at a convenient time. Fourth, the installation is completed carefully and in accordance with applicable electrical codes. Finally, I test the installation and walk the finished work with you to make sure everything operates properly.",
    },
    {
      question: "What education and training do you have?",
      answer:
        "I hold a California C-10 Electrical Contractor license and a Certification of Proficiency in Electrician studies from Irvine Valley College, plus certificates in Electrical Fundamentals, Wiring and Electrical Codes, HVAC I through III, an Electrician Trainee program, and OSHA Safety Training. I also hold a Bachelor's Degree in Computer Hardware, which included coursework in electrical and electronic circuits.",
    },
    {
      question: "How did you get started doing this type of work?",
      answer:
        "I started my electrical career as an apprentice working alongside certified electricians and licensed contractors, including a specialty C-10 licensed electrician and a general B contractor. Through hands-on experience and mentorship I built practical skills and deep knowledge in both residential and commercial electrical work, which laid the foundation for the service I now provide through Voltamin Electric.",
    },
    {
      question: "What types of customers have you worked with?",
      answer:
        "A wide range: residential homeowners with single-family homes, condos, and remodels; commercial clients including offices, retail spaces, restaurants, and tenant improvements; and industrial clients with small facilities and maintenance support for light industrial systems. That diversity lets me adapt to different project needs while keeping quality and safety consistent on every job.",
    },
    {
      question: "What advice would you give someone hiring an electrician?",
      answer:
        "Do not choose on lowest price alone. Make sure the provider is knowledgeable, responsive, and uses high-quality tools. Check whether they use laser levels, digital cameras, and other advanced equipment to ensure precision and minimize unnecessary cuts or damage to your walls. Verify their qualifications and certifications — a properly trained electrician ensures the job is done safely and to code, which reduces repairs and touch-ups and saves you money in the long run.",
    },
    {
      question: "What should I think through before we talk?",
      answer:
        "It helps to know what exactly needs to be done (outlet installation, panel upgrade, lighting design), whether there is existing wiring or new wiring is required, where the work is located (indoors, garage, exterior), your budget range or flexibility, any deadline or preferred timeframe, and whether access to the area will be clear and safe.",
    },
    {
      question: "Which areas do you serve?",
      answer:
        "Lake Forest, Irvine, Costa Mesa, Mission Viejo, Laguna Niguel, Laguna Beach, Laguna Woods, Rancho Santa Margarita, San Juan Capistrano, San Clemente, and the surrounding Orange County communities. If you are not sure whether you are in range, call and ask.",
    },
  ],

  seo: {
    title:
      "Voltamin Electric | Licensed C-10 Electrician in Orange County, CA",
    description:
      "Licensed and insured C-10 electrical contractor serving Orange County. Lighting, outlets, wiring, panels, and fans. 5.0 rating from 94 reviews. Free service call.",
    keywords: [
      "electrician Orange County",
      "C-10 electrical contractor",
      "recessed lighting installation",
      "outlet installation Irvine",
      "panel repair Lake Forest",
      "ceiling fan installation",
      "Voltamin Electric",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
