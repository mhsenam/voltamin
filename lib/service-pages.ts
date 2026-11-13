/**
 * Content for the ten service landing pages — one per real service listed in
 * siteConfig.services. Every claim here is grounded in the business's own
 * service descriptions, its booking-profile FAQ answers, or work evidenced by
 * the archived reviews: no invented prices, response times, or credentials.
 *
 * Titles are short because the root layout appends " | Voltamin Electric".
 */
import type { ServiceSlug } from "@/lib/seo";

export type ServiceFaq = { question: string; answer: string };

export type ServicePage = {
  slug: ServiceSlug;
  /** Lucide icon name, matching siteConfig.services. */
  icon: string;
  /** H1 and Service.serviceType. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  problems: { title: string; body: string }[];
  scope: string[];
  process: { title: string; body: string }[];
  faqs: ServiceFaq[];
  related: ServiceSlug[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "electrical-panel-upgrade",
    icon: "Gauge",
    name: "Electrical Panel Upgrade",
    metaTitle: "Electrical Panel Upgrade in Orange County",
    metaDescription:
      "Licensed C-10 panel upgrades and replacements across Orange County. More capacity for EV chargers, remodels, and modern demands. Free on-site estimate — call (818) 699-2255.",
    intro: [
      "Your electrical panel decides how much your home or business can safely power. When it is undersized, worn out, or already full, everything you add — an EV charger, new appliances, a remodel — puts it under strain.",
      "Voltamin Electric upgrades and replaces electrical panels across Orange County, CA, as a licensed C-10 electrical contractor (CSLB #1159185). Every job starts with a free on-site estimate so you know the scope and price before anything begins.",
    ],
    problems: [
      {
        title: "Breakers trip and lights flicker under load",
        body: "If the main breaker trips when several appliances run together, or lights dim when big loads start, the panel or its circuits are being asked to deliver more than they can safely handle.",
      },
      {
        title: "You are adding an EV charger or major appliance",
        body: "A Level 2 EV charger, a new HVAC system, or an induction range can need more capacity than an older panel has left. An upgrade planned around the new load avoids repeated breaker problems later.",
      },
      {
        title: "The panel is outdated or a remodel is planned",
        body: "Older panels were never designed for today's electrical demands, and remodels or additions usually need new circuits a full panel cannot supply. Planning the panel work first keeps the rest of the project simple.",
      },
    ],
    scope: [
      "On-site evaluation of your existing panel, its capacity, and what you need it to support",
      "Panel upgrades and full panel replacements for increased capacity",
      "Subpanel work and dedicated circuits for new equipment",
      "Panel work prepared for EV charger installation and remodels",
      "Completed carefully and in accordance with applicable electrical codes",
      "A clear written scope and price before any work begins",
    ],
    process: [
      {
        title: "Free on-site evaluation",
        body: "We inspect the current panel, calculate the loads you need it to carry, and talk through your options in person. The visit and the estimate are free and carry no obligation.",
      },
      {
        title: "Clear scope & pricing",
        body: "You receive a specific scope covering the work, the materials, and the price. If anything changes mid-job, we discuss it with you first.",
      },
      {
        title: "Professional installation & walk-through",
        body: "The upgrade is completed cleanly, the installation is tested, and we walk the finished work with you before we leave.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my panel needs upgrading?",
        answer:
          "Common signs are breakers that trip under normal use, lights that flicker or dim when large appliances start, a panel that is already full, or an older panel that has never been evaluated against the loads a modern home places on it. The most reliable answer comes from an in-person evaluation — which is exactly what our free service call covers.",
      },
      {
        question: "Can you upgrade the panel to support an EV charger?",
        answer:
          "Yes. Panel evaluation is part of our EV charger installation work, and where the existing panel does not have the capacity, we plan the upgrade around it. See our EV charger installation page for how the two jobs fit together.",
      },
      {
        question: "Do you work on panels in older homes?",
        answer:
          "Yes. Many homes across Lake Forest and the wider Orange County area still run the panels they were built with. We evaluate what is there, explain what upgrading would involve, and give you a clear price before any work starts.",
      },
    ],
    related: ["ev-charger-installation", "circuit-breaker-replacement", "electrical-wiring"],
  },
  {
    slug: "ev-charger-installation",
    icon: "PlugZap",
    name: "EV Charger Installation",
    metaTitle: "EV Charger Installation in Orange County",
    metaDescription:
      "Level 2 EV charger installation for homes and businesses in Orange County — dedicated circuits, wiring, and panel evaluation by a licensed C-10 contractor. Free estimate: (818) 699-2255.",
    intro: [
      "Charging at home or at your business is the whole point of owning an electric vehicle — and it takes the right circuit, the right wiring, and a panel that can carry the load.",
      "Voltamin Electric installs EV chargers for homes and businesses across Orange County, CA. As a licensed C-10 electrical contractor (CSLB #1159185), we handle the dedicated circuit, the wiring, and the panel evaluation, and every job starts with a free on-site estimate.",
    ],
    problems: [
      {
        title: "There is no circuit for the charger",
        body: "Garages often have no wiring where the charger needs to go. We install the dedicated circuit and the 240V outlet or wall connector from scratch, routed cleanly through the walls with minimal damage.",
      },
      {
        title: "You are not sure the panel can take it",
        body: "A Level 2 charger is a large continuous load. We evaluate the panel first, so you know whether it can support the charger as-is or whether an upgrade should be part of the plan.",
      },
      {
        title: "You want the charging located sensibly",
        body: "Charger placement affects cable reach, parking, and the wiring route. We look at the site with you before quoting, including longer wiring runs that other quotes sometimes price separately.",
      },
    ],
    scope: [
      "Level 2 EV charger installation for homes and businesses",
      "Dedicated 240V circuits and NEMA 14-50 outlets for EV charging",
      "Wall connector installation, including Tesla and other Universal Wall Connector units",
      "Panel evaluation and electrical upgrades where capacity is needed",
      "New wiring runs through garages, drywall, and exterior walls",
      "Everything tested with you before we leave",
    ],
    process: [
      {
        title: "Free on-site evaluation",
        body: "We look at the panel, the parking spot, and the wiring route, then give you a clear estimate. The visit is free and there is no obligation to proceed.",
      },
      {
        title: "Clear scope & pricing",
        body: "The quote covers the circuit, the wiring, the outlet or wall connector install, and the price — explained before anything begins.",
      },
      {
        title: "Professional installation & testing",
        body: "We install the circuit and charger carefully and cleanly, test the installation, and walk you through how everything operates.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between a standard outlet and a Level 2 charger?",
        answer:
          "A standard household outlet charges slowly because it delivers far less power. A Level 2 charger runs on a dedicated 240-volt circuit, which is what makes overnight charging practical. We install the dedicated circuit, the outlet or wall connector, and make sure the panel can carry the load.",
      },
      {
        question: "Can my electrical panel handle an EV charger?",
        answer:
          "It depends on the panel's capacity and what else it is powering, which is why we evaluate it in person before quoting. If the panel needs an upgrade to support the charger, we include that in the plan and explain the options.",
      },
      {
        question: "Do you install EV chargers for businesses?",
        answer:
          "Yes — our EV charger installation covers both homes and businesses, including dedicated circuits and panel evaluation for commercial properties across Orange County.",
      },
    ],
    related: ["electrical-panel-upgrade", "electrical-wiring", "outlet-and-switch-installation"],
  },
  {
    slug: "electrical-troubleshooting",
    icon: "Wrench",
    name: "Electrical Troubleshooting & Repair",
    metaTitle: "Electrical Troubleshooting & Repair in Orange County",
    metaDescription:
      "Flickering lights, dead outlets, tripping breakers, power loss — diagnosed and repaired by a licensed C-10 electrician in Orange County. Free service call: (818) 699-2255.",
    intro: [
      "Electrical problems rarely announce their cause. A flickering light, an outlet that stopped working, or a breaker that keeps tripping can each trace back to several different faults — and guessing is how small problems become dangerous ones.",
      "Voltamin Electric diagnoses and repairs electrical problems across Orange County, CA. We come out, find the actual cause, explain what we found, and repair it properly. The service call is genuinely free.",
    ],
    problems: [
      {
        title: "Flickering or dimming lights",
        body: "Flickering can come from a loose connection, an overloaded circuit, a failing fixture, or a problem upstream in the panel. We trace it to the source instead of swapping parts until the symptom moves somewhere else.",
      },
      {
        title: "Dead outlets and power loss",
        body: "An outlet or a whole room losing power usually means a tripped device, a failed connection, or a circuit problem. We find where the circuit actually fails and repair it at the fault.",
      },
      {
        title: "Unsafe work left behind by others",
        body: "We regularly find live wires, wrong-gauge wiring, and switches wired with the wrong parts behind finished walls — sometimes from previous owners' DIY, sometimes from previous electricians. Finding and correcting that kind of hazard is routine troubleshooting work for us.",
      },
    ],
    scope: [
      "Diagnosis of power loss, dead outlets, and failing circuits",
      "Repair of tripping breakers and overloaded circuits",
      "Flickering light and faulty fixture repair",
      "Wiring fault diagnosis and repair, including wiring damaged or mis-wired by others",
      "Correction of unsafe conditions found during the visit",
      "A clear explanation of what caused the problem and what the repair involves",
    ],
    process: [
      {
        title: "Free on-site visit",
        body: "We come out, listen to what you have noticed, and start diagnosing in person. There is no charge for the visit and no obligation.",
      },
      {
        title: "Diagnosis & clear pricing",
        body: "Once we have found the cause, we explain it in plain language and quote the repair before touching anything else.",
      },
      {
        title: "Repair & verification",
        body: "We repair the fault, test the circuit under real use, and confirm with you that everything works before we leave.",
      },
    ],
    faqs: [
      {
        question: "Why do my lights flicker?",
        answer:
          "Flickering has several possible causes: a loose connection at the fixture or switch, an overloaded circuit, a failing component, or an issue in the panel itself. Some are minor and some are genuine safety hazards, so it is worth having the cause identified rather than ignored. We diagnose the actual cause on site.",
      },
      {
        question: "Does the diagnosis cost anything?",
        answer:
          "The service call is free. We come out, assess the problem in person, and give you a clear estimate for the repair. There is no charge for the visit and no obligation to proceed.",
      },
      {
        question: "Can you fix problems a previous electrician left behind?",
        answer:
          "Yes. A significant part of our troubleshooting work is finding and correcting unsafe or incorrect work — live wires in ceilings, wrong-gauge wiring, switches wired with the wrong parts — and putting it right.",
      },
    ],
    related: ["circuit-breaker-replacement", "electrical-wiring", "outlet-and-switch-installation"],
  },
  {
    slug: "lighting-installation",
    icon: "Lightbulb",
    name: "Lighting Installation & Upgrades",
    metaTitle: "Lighting Installation in Orange County",
    metaDescription:
      "Recessed LED lighting, chandeliers, under-cabinet lights, dimmers, and indoor & outdoor lighting across Orange County. Licensed C-10 electrician. Free estimate: (818) 699-2255.",
    intro: [
      "Good lighting is equal parts electrical work and precision. Fixture placement on a tall ceiling, clean cuts in finished drywall, even spacing across a room — that is the difference between lighting that transforms a space and lighting you have to explain to guests.",
      "Voltamin Electric installs and upgrades lighting across Orange County, CA: recessed LED and can lights, chandeliers, under-cabinet lighting, dimmers, and indoor & outdoor fixtures. We use laser levels and proper layout tools so the placement is exact and the damage to walls and ceilings is minimal.",
    ],
    problems: [
      {
        title: "Outdated or insufficient lighting",
        body: "Dark rooms, a single ceiling fixture doing all the work, or old fixtures that no longer suit the space. We design the layout with you — placement, spacing, and fixture types — then install it cleanly.",
      },
      {
        title: "High or vaulted ceilings",
        body: "Installing or replacing fixtures on high ceilings takes planning and the right equipment. We regularly work on tall and vaulted ceilings, including layouts with a dozen or more recessed lights aligned precisely across a large span.",
      },
      {
        title: "New fixtures where there is no wiring",
        body: "Adding a fixture to a room that never had one, or lighting outdoors, means new wiring as well as the fixture. We route the wiring properly and finish with a working, code-compliant installation.",
      },
    ],
    scope: [
      "Recessed LED and can light installation, including full-room layouts",
      "Chandelier and ceiling fixture installation and replacement",
      "Under-cabinet lighting and accent lighting",
      "Dimmer switches and lighting controls",
      "Indoor and outdoor lighting, including sconces and yard fixtures",
      "New wiring and electrical boxes where none exist",
    ],
    process: [
      {
        title: "Free on-site estimate",
        body: "We look at the space with you, discuss the layout and fixtures, and give you a clear quote — including any added scope you decide on during the visit.",
      },
      {
        title: "Precise layout & installation",
        body: "We lay out the work with laser tools, protect the work area, keep dust and mess down, and install the fixtures and wiring carefully.",
      },
      {
        title: "Testing & clean-up",
        body: "Every fixture is tested with you, and the work area is left clean — often cleaner than we found it.",
      },
    ],
    faqs: [
      {
        question: "Can you install recessed lighting on a high or vaulted ceiling?",
        answer:
          "Yes. Tall and vaulted ceilings are a regular part of our lighting work — we plan the access, lay the positions out with laser levels, and align the fixtures precisely across the span.",
      },
      {
        question: "Can you replace existing light fixtures?",
        answer:
          "Yes. Replacing an existing fixture — a chandelier, a ceiling light, outdoor fixtures — is straightforward when the wiring is sound, and we check it while we are there. We can also move or add fixtures where new wiring is needed.",
      },
      {
        question: "Do you install outdoor lighting?",
        answer:
          "Yes — outdoor fixtures, sconces, yard lights, and driveway lighting, including running new wiring outdoors where none exists.",
      },
    ],
    related: ["ceiling-fan-installation", "smart-home-electrical", "electrical-wiring"],
  },
  {
    slug: "electrical-wiring",
    icon: "Cable",
    name: "Electrical Wiring & Rewiring",
    metaTitle: "Electrical Wiring & Rewiring in Orange County",
    metaDescription:
      "Wiring and rewiring for remodels, additions, new circuits, and damaged wiring — by a licensed C-10 electrical contractor in Orange County. Free estimate: (818) 699-2255.",
    intro: [
      "Wiring is the part of the electrical system you never see, which is exactly why it has to be done properly the first time. New circuits for a remodel, power for an addition, a dedicated circuit for heavy equipment, or old wiring that needs replacing — the routing, sizing, and connections all determine how safely the system runs for decades.",
      "Voltamin Electric handles wiring and rewiring across Orange County, CA as a licensed C-10 electrical contractor (CSLB #1159185), planned around your property and finished with minimal damage to walls and ceilings.",
    ],
    problems: [
      {
        title: "A remodel or addition needs power",
        body: "New rooms, converted spaces, and additions all need circuits planned into the build. We wire remodels and additions, coordinating the routing with the work already underway.",
      },
      {
        title: "Damaged or incorrect wiring",
        body: "Wrong-gauge wiring, damaged runs, and improvised connections are genuine fire and shock risks. We find and replace damaged or incorrect wiring so the system is safe behind the walls.",
      },
      {
        title: "Equipment that needs its own circuit",
        body: "Heavy appliances, shop equipment, EV chargers, and HVAC gear each need a dedicated circuit sized for the load. We run new dedicated circuits from the panel to where the equipment lives.",
      },
    ],
    scope: [
      "Wiring and rewiring for remodels and additions",
      "New circuits and dedicated circuits from the panel",
      "Repair and replacement of damaged or incorrect wiring",
      "Electrical system upgrades supporting other work",
      "Routing planned around your property to minimize wall and ceiling damage",
      "Work completed in accordance with applicable electrical codes",
    ],
    process: [
      {
        title: "Free on-site walk-through",
        body: "We walk the property with you, look at the panel and the routing options, and give you a clear estimate for the wiring work.",
      },
      {
        title: "Planned installation",
        body: "Circuits are sized and routed deliberately, with minimal cutting and a clean finish, and the work is explained as it progresses.",
      },
      {
        title: "Testing & walk-through",
        body: "Every new circuit is tested under load, and we walk the finished work with you before we leave.",
      },
    ],
    faqs: [
      {
        question: "Can you wire a remodel or addition?",
        answer:
          "Yes. Wiring remodels and additions is core work for us — new circuits, new outlets and switches, lighting, and coordination with the rest of the project so the electrical part is ready when the build is.",
      },
      {
        question: "What is a dedicated circuit?",
        answer:
          "A dedicated circuit serves a single piece of equipment — an EV charger, a large appliance, shop tools — so it cannot be overloaded by anything else in the building. Many heavier devices need one. We size and install dedicated circuits from the panel to the equipment.",
      },
      {
        question: "Can you repair wiring installed incorrectly?",
        answer:
          "Yes. We regularly find and correct wiring that previous owners or contractors installed with the wrong parts or the wrong gauge, and we replace it properly.",
      },
    ],
    related: ["electrical-panel-upgrade", "ev-charger-installation", "electrical-troubleshooting"],
  },
  {
    slug: "outlet-and-switch-installation",
    icon: "ToggleRight",
    name: "Outlets, Switches & GFCI/AFCI",
    metaTitle: "Outlet & Switch Installation in Orange County",
    metaDescription:
      "Outlet, switch, GFCI/AFCI, USB, and dedicated circuit installation and repair in Orange County. Licensed C-10 electrician, free service call: (818) 699-2255.",
    intro: [
      "Outlets and switches are the parts of your electrical system you touch every day, and the small ones hide the big faults: an outlet that lost its ground, a switch wired with the wrong part, a kitchen or bathroom outlet without modern protection.",
      "Voltamin Electric installs, replaces, and repairs outlets and switches across Orange County, CA — including GFCI/AFCI protection, USB and smart outlets, dedicated circuits, and devices indoors and out.",
    ],
    problems: [
      {
        title: "Outlets that are loose, dead, or warm",
        body: "A receptacle that will not hold a plug, has stopped working, or feels warm is telling you the connection behind it is failing. We replace the device and check the wiring feeding it.",
      },
      {
        title: "No protection in wet locations",
        body: "Kitchens, bathrooms, garages, and outdoors are the places GFCI protection matters most. We install and replace GFCI and AFCI protection where it belongs and test that it actually trips.",
      },
      {
        title: "You need power somewhere new",
        body: "A USB charging outlet, a smart switch, an outdoor receptacle, or a dedicated circuit for specific equipment — we add outlets and switches where you need them, wired properly rather than improvised.",
      },
    ],
    scope: [
      "Outlet and receptacle installation, replacement, and repair",
      "Switch installation, replacement, and repair",
      "GFCI and AFCI protection installation and testing",
      "USB outlets and smart outlets",
      "Dedicated circuits and new wiring for new devices",
      "Indoor and outdoor devices, including garages and exterior walls",
    ],
    process: [
      {
        title: "Free on-site visit",
        body: "We look at what needs installing or replacing, talk through device options, and give you a clear estimate. The visit is free with no obligation.",
      },
      {
        title: "Clean installation",
        body: "Devices are installed properly with sound connections, plates aligned, and walls left clean.",
      },
      {
        title: "Testing before we leave",
        body: "Every device is tested — including GFCI trip testing — and anything we noticed during the visit is pointed out to you.",
      },
    ],
    faqs: [
      {
        question: "Where is GFCI protection needed?",
        answer:
          "GFCI protection belongs wherever electricity and water can meet — kitchens, bathrooms, laundry areas, garages, and outdoors are the common ones. If your home still has standard outlets in those locations, we can replace them with properly protected ones and verify the protection works.",
      },
      {
        question: "Can you upgrade an outlet to a higher capacity?",
        answer:
          "Where the circuit and wiring support it, we install higher-capacity receptacles and the dedicated circuits they need. We check the circuit first — the outlet is only as safe as the wiring behind it.",
      },
      {
        question: "Can you install USB and smart outlets?",
        answer:
          "Yes. USB-charging outlets and smart outlets and switches are routine installations, including setting up and pairing smart devices with your phone so they work before we leave.",
      },
    ],
    related: ["smart-home-electrical", "electrical-wiring", "circuit-breaker-replacement"],
  },
  {
    slug: "ceiling-fan-installation",
    icon: "Fan",
    name: "Ceiling Fan Installation",
    metaTitle: "Ceiling Fan Installation in Orange County",
    metaDescription:
      "Ceiling fan installation and replacement across Orange County — new wiring, braced fan boxes, remote controls, and bath exhaust fans. Free estimate: (818) 699-2255.",
    intro: [
      "A ceiling fan is only as good as what holds it up. A properly braced electrical box, solid wiring, and balanced mounting are what separate a fan that runs quietly for years from one that wobbles, hums, or works itself loose.",
      "Voltamin Electric installs and replaces ceiling fans across Orange County, CA — including new wiring and braced fan-rated boxes where none exist, remote controls, and bathroom exhaust fans.",
    ],
    problems: [
      {
        title: "Replacing an old or wobbly fan",
        body: "We remove the old fan, check the box and wiring behind it, and mount the new fan properly — including fans on standard and high ceilings.",
      },
      {
        title: "There is no fixture or wiring in the room",
        body: "A fan needs a fan-rated, braced electrical box and a switched power source. We install the wiring and the braced box, then mount and wire the fan.",
      },
      {
        title: "The bathroom fan needs replacing",
        body: "Bath exhaust fans fail quietly — the motor slows, the fan gets loud, or moisture stops clearing. We replace bath exhaust fans and their wiring.",
      },
    ],
    scope: [
      "Ceiling fan installation and replacement",
      "New wiring and fan-rated braced electrical boxes",
      "Remote control and wall control setup",
      "Installation on standard and high ceilings",
      "Bath exhaust fan replacement",
      "Testing and balance checked before we leave",
    ],
    process: [
      {
        title: "Free on-site estimate",
        body: "We look at the room, the ceiling, and any existing fixture, then give you a clear price for the installation.",
      },
      {
        title: "Proper mounting",
        body: "The fan gets a correctly braced box and solid wiring — the parts that keep a fan quiet and stable for years.",
      },
      {
        title: "Testing & controls walk-through",
        body: "We test the fan at all speeds, set up remotes or wall controls, and show you how everything works.",
      },
    ],
    faqs: [
      {
        question: "Can you replace an existing ceiling fan?",
        answer:
          "Yes. Where a fan or light fixture already exists, we remove the old unit, check the electrical box and wiring, and install the new fan on the existing location — upgrading the box if it is not fan-rated.",
      },
      {
        question: "What if there is no existing wiring?",
        answer:
          "Then we run it: a new switched circuit, a fan-rated braced electrical box, and the mounting hardware. The quote covers the whole job, including the wiring.",
      },
      {
        question: "Do you install bathroom exhaust fans?",
        answer:
          "Yes — bath exhaust fan replacement is part of our fan installation work, including the wiring and controls.",
      },
    ],
    related: ["lighting-installation", "electrical-wiring", "outlet-and-switch-installation"],
  },
  {
    slug: "circuit-breaker-replacement",
    icon: "Zap",
    name: "Circuit Breaker Installation & Replacement",
    metaTitle: "Circuit Breaker Replacement in Orange County",
    metaDescription:
      "Tripping, overloaded, damaged, or outdated breakers replaced by a licensed C-10 electrician in Orange County. Free on-site evaluation: (818) 699-2255.",
    intro: [
      "Circuit breakers are the safety devices that stand between a fault and a fire. When one trips repeatedly, fails to reset, or is simply worn out, it is either doing its job because something downstream is wrong — or it is no longer protecting the circuit at all.",
      "Voltamin Electric installs, replaces, and troubleshoots circuit breakers across Orange County, CA, working out what the breaker is telling you before replacing parts blindly.",
    ],
    problems: [
      {
        title: "A breaker that keeps tripping",
        body: "Repeated tripping usually means an overloaded circuit, a fault on the wiring, or a device drawing more than it should. We find the reason first — replacing the breaker without fixing the cause just resets the countdown.",
      },
      {
        title: "A breaker that will not reset or feels hot",
        body: "A breaker that refuses to reset, buzzes, or is warm to the touch may have failed internally or be protecting a live fault. Both need attention promptly.",
      },
      {
        title: "Outdated or damaged breakers",
        body: "Old panels collect a mix of mismatched and aged breakers. We replace damaged and outdated breakers and assess the panel they live in.",
      },
    ],
    scope: [
      "Circuit breaker replacement for overloaded, tripping, or failed breakers",
      "New breaker installation for added circuits",
      "Troubleshooting of the circuits a breaker protects",
      "Assessment of the panel as part of the work",
      "Correct breaker sizing and type for the circuit",
      "Testing under real load before we leave",
    ],
    process: [
      {
        title: "Free on-site evaluation",
        body: "We inspect the panel, the breaker, and the circuit it protects, then explain what is actually happening and quote the fix.",
      },
      {
        title: "Correct repair",
        body: "We replace failed breakers with the right type and rating for the circuit, and fix the downstream cause where the tripping has one.",
      },
      {
        title: "Testing & walk-through",
        body: "The circuit is tested under real use with you before we leave.",
      },
    ],
    faqs: [
      {
        question: "Why does my breaker keep tripping?",
        answer:
          "The common causes are an overloaded circuit, a short or ground fault somewhere on the wiring or a device plugged into it, or a breaker that has weakened with age. The pattern — what is running when it trips — points to the cause, and we diagnose it on site before replacing anything.",
      },
      {
        question: "Can a single breaker be replaced?",
        answer:
          "Yes, where the breaker itself is the problem. We match the correct type and rating for your panel and test the circuit afterwards. If the real problem is the circuit or the panel, we will tell you that instead.",
      },
      {
        question: "Do you also work on the panel itself?",
        answer:
          "Yes. Breaker work and panel work go together — see our electrical panel upgrade page where the panel itself needs replacing or more capacity.",
      },
    ],
    related: ["electrical-panel-upgrade", "electrical-troubleshooting", "electrical-wiring"],
  },
  {
    slug: "smart-home-electrical",
    icon: "Home",
    name: "Smart Home & Electrical Automation",
    metaTitle: "Smart Home Electrical Work in Orange County",
    metaDescription:
      "Smart switches, dimmers, timers, sensors, and lighting controls installed and set up by a licensed C-10 electrician in Orange County. Free estimate: (818) 699-2255.",
    intro: [
      "Smart devices promise automation, but behind every reliable smart switch or sensor is ordinary electrical work done properly: sound wiring, a neutral where the device needs one, and a setup that does not fall apart when the Wi-Fi does.",
      "Voltamin Electric installs and upgrades smart switches, dimmers, timers, sensors, and lighting controls across Orange County, CA — wired correctly and paired and demonstrated with you before we leave.",
    ],
    problems: [
      {
        title: "Smart devices that will not behave",
        body: "Switches that drop off the network, dimmers that buzz, devices that need a neutral wire the box does not have. We install compatible devices on wiring that supports them — and show you the setup working.",
      },
      {
        title: "Lighting you want on a schedule",
        body: "Timers, sensors, and automated lighting controls for rooms, exteriors, and holiday or security lighting — installed and configured to the schedule you actually want.",
      },
      {
        title: "Old wiring behind new devices",
        body: "Many smart devices assume wiring newer homes have and older ones do not. We evaluate what is in the wall, add wiring where needed, and install devices that will work reliably.",
      },
    ],
    scope: [
      "Smart switch and smart dimmer installation",
      "Timers, motion sensors, and lighting controls",
      "Smart device setup, pairing, and demonstration",
      "Wiring and neutral additions where devices need them",
      "Home automation upgrades for lighting and electrical devices",
      "Everything tested with you on your own phone or controller",
    ],
    process: [
      {
        title: "Free on-site estimate",
        body: "We look at the devices and locations you want automated, check the wiring behind them, and give you a clear quote.",
      },
      {
        title: "Installation & configuration",
        body: "Devices are installed on sound wiring, configured to your preferences, and paired with your phone or controller.",
      },
      {
        title: "Walk-through",
        body: "We walk you through how everything works — schedules, scenes, controls — so it is usable from day one.",
      },
    ],
    faqs: [
      {
        question: "Can you install smart switches and dimmers?",
        answer:
          "Yes. We install smart switches, dimmers, and lighting controls, including checking the wiring behind the wall — some smart devices need a neutral wire that older homes do not have at the switch box, and we add wiring where a device needs it.",
      },
      {
        question: "Do you help set up and pair the devices?",
        answer:
          "Yes. Pairing devices with your phone and confirming the automation works is part of the installation — one of our recent customers put it as going 'beyond the call of duty' for helping set up the pairing of their smart switches.",
      },
      {
        question: "Can outdoor or security lighting be automated?",
        answer:
          "Yes. Timers, sensors, and smart controls work for outdoor and security lighting too — see our security camera installation page for camera and doorbell work.",
      },
    ],
    related: ["outlet-and-switch-installation", "lighting-installation", "security-camera-installation"],
  },
  {
    slug: "security-camera-installation",
    icon: "Camera",
    name: "Security Cameras & Smart Doorbells",
    metaTitle: "Security Camera Installation in Orange County",
    metaDescription:
      "Security camera, video doorbell, and low-voltage wiring installation in Orange County by a licensed C-10 electrical contractor. Free estimate: (818) 699-2255.",
    intro: [
      "A security camera that drops offline, a doorbell with a dying battery, or a cable run stapled along the wall — the difference between security devices that work and ones you fight with is usually the wiring and the power behind them.",
      "Voltamin Electric installs and wires security cameras, video doorbells, smart doorbells, and related low-voltage devices across Orange County, CA, with the power supplies and wiring done properly and concealed.",
    ],
    problems: [
      {
        title: "Battery-powered devices that keep dying",
        body: "Doorbells and cameras on batteries need constant recharging. We wire devices to continuous power where the installation allows it, so they record when you need them to.",
      },
      {
        title: "No wiring where the camera should go",
        body: "Cameras and doorbells need power at the mounting point. We route low-voltage wiring and power supplies cleanly through walls and eaves — no visible cables.",
      },
      {
        title: "Devices you cannot get working reliably",
        body: "Poor power, bad connections, and improvised wiring cause dropouts. We install the power and wiring correctly so the device itself can do its job.",
      },
    ],
    scope: [
      "Security camera installation and wiring",
      "Video doorbell and smart doorbell installation",
      "Power supplies and continuous power wiring for devices",
      "Low-voltage wiring routed and concealed properly",
      "Related low-voltage devices and accessories",
      "Devices tested and demonstrated before we leave",
    ],
    process: [
      {
        title: "Free on-site estimate",
        body: "We look at where the devices should go, how power reaches them, and give you a clear quote for the installation.",
      },
      {
        title: "Clean installation",
        body: "Wiring and power supplies are installed properly and concealed, with devices mounted at sensible positions and angles.",
      },
      {
        title: "Testing & demonstration",
        body: "We test the devices, confirm the feeds and alerts work, and walk you through the setup.",
      },
    ],
    faqs: [
      {
        question: "Do you install the cameras themselves or just the wiring?",
        answer:
          "We install and wire the devices — cameras, video doorbells, smart doorbells, power supplies, and the related low-voltage wiring — so the whole installation works as one job.",
      },
      {
        question: "Can you install a video doorbell where there is no existing wiring?",
        answer:
          "In most cases yes — we route low-voltage wiring to the doorbell position and connect it to continuous power, which also removes the recharging cycle that battery-only units need.",
      },
      {
        question: "Do you also install the electrical side of smart home devices?",
        answer:
          "Yes — see our smart home electrical page for smart switches, controls, and automation work that pairs naturally with cameras and doorbells.",
      },
    ],
    related: ["smart-home-electrical", "lighting-installation", "outlet-and-switch-installation"],
  },
];

export const serviceBySlug = (slug: string): ServicePage | undefined =>
  servicePages.find((page) => page.slug === slug);
