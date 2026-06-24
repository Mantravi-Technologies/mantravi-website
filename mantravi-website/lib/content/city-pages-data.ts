import type { ServiceSeoContent } from "./service-seo-extensions";
import { tier2MobileCityPages } from "./tier2-location-pages";
import { websiteCityPages } from "./website-location-pages";
import type {
  CityPage,
  CitySlug,
  LocationPageType,
} from "./location-types";
import { getLocationPagePath } from "./location-types";
import type {
  ServiceCapability,
  ServiceDifferentiator,
  ServiceFAQ,
  ServiceProcessStep,
  ServiceTrustMetric,
  TechStackCategory,
} from "./services-data";

export type { CityPage, CitySlug, LocationPageType } from "./location-types";
export { getLocationPagePath } from "./location-types";

export function getCityPagePath(slug: CitySlug) {
  return getLocationPagePath("mobile-app-development-company", slug);
}

const defaultProcess: ServiceProcessStep[] = [
  {
    num: "01",
    title: "Discovery",
    description:
      "Map business goals, users, compliance needs, and success metrics before design or development begins.",
  },
  {
    num: "02",
    title: "UX & Architecture",
    description:
      "Wireframes, technical architecture, and sprint plans aligned to your budget and go-live timeline.",
  },
  {
    num: "03",
    title: "Agile Build",
    description:
      "Two-week sprints with demos, QA checkpoints, and transparent backlog visibility.",
  },
  {
    num: "04",
    title: "Launch",
    description:
      "App Store and Play Store submission, performance tuning, and analytics setup.",
  },
  {
    num: "05",
    title: "Grow",
    description:
      "Post-launch support, feature rollouts, and optimization based on real user data.",
  },
];

const mobileCapabilities: ServiceCapability[] = [
  {
    id: "ios",
    title: "iOS App Development",
    description:
      "Swift and SwiftUI apps optimized for iPhone and iPad with App Store-ready releases.",
  },
  {
    id: "android",
    title: "Android App Development",
    description:
      "Kotlin and Jetpack Compose builds for India's diverse Android device landscape.",
  },
  {
    id: "flutter",
    title: "Flutter Development",
    description:
      "Single codebase for iOS and Android — ideal for MVPs and fast market validation.",
  },
  {
    id: "react-native",
    title: "React Native Development",
    description:
      "Cross-platform apps with shared logic, rapid iteration, and enterprise API integration.",
  },
  {
    id: "pwa",
    title: "PWA & Web Apps",
    description:
      "Installable progressive web apps that work on low-bandwidth connections common in tier-2 cities.",
  },
  {
    id: "ai",
    title: "AI-Powered Features",
    description:
      "Chatbots, personalization, OCR, and intelligent automation built into your mobile product.",
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description:
      "Scalable Node.js and cloud backends with UPI, SMS, and third-party integrations.",
  },
  {
    id: "mvp",
    title: "MVP Development",
    description:
      "Focused 8–12 week builds for founders validating ideas in local and regional markets.",
  },
];

const mobileTechStack: TechStackCategory[] = [
  {
    category: "Mobile",
    description:
      "Native and cross-platform frameworks chosen for performance, hiring, and long-term maintainability.",
    items: ["Flutter", "React Native", "Swift", "Kotlin"],
  },
  {
    category: "Frontend & Web",
    description:
      "High-performance web apps and PWAs that complement your mobile product.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    description:
      "REST and GraphQL APIs, databases, and payment or notification integrations.",
    items: ["Node.js", "Python", "PostgreSQL", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    description:
      "Deployments on AWS, GCP, or Azure with CI/CD and monitoring from day one.",
    items: ["AWS", "GCP", "Docker", "GitHub Actions"],
  },
];

const defaultDifferentiators: ServiceDifferentiator[] = [
  {
    num: "01",
    title: "Local Market Understanding",
    description:
      "We design for Hindi–English bilingual UX, UPI-first payments, and the connectivity patterns common across Uttar Pradesh and Madhya Pradesh.",
  },
  {
    num: "02",
    title: "Startup to Enterprise",
    description:
      "From founder MVPs to government and healthcare platforms — one accountable squad from discovery through launch.",
  },
  {
    num: "03",
    title: "Transparent Delivery",
    description:
      "Sprint demos, shared backlogs, and milestone-based billing so you always know where the project stands.",
  },
  {
    num: "04",
    title: "Post-Launch Partnership",
    description:
      "Bug fixes, store updates, analytics reviews, and feature roadmaps after go-live — not a handoff and goodbye.",
  },
];

export const mobileAppCityPages: CityPage[] = [
  {
    pageType: "mobile-app-development-company",
    slug: "lucknow",
    cityName: "Lucknow",
    stateName: "Uttar Pradesh",
    alternateNames: ["LKO"],
    title: "Mobile App Development Company in Lucknow",
    seoTitle: "Mobile App Development Company in Lucknow | Mantravi",
    metaDescription:
      "Hire a mobile app development company in Lucknow. Mantravi builds iOS, Android & Flutter apps for UP startups and enterprises. Free consultation — local studio.",
    focusKeywords: [
      "mobile app development company Lucknow",
      "app developers in Lucknow",
      "Android app development Lucknow",
      "iOS app development Lucknow",
      "Flutter app development Lucknow",
    ],
    heroSubtitle:
      "As a product engineering partner with a Lucknow studio, we build secure, scalable mobile apps for startups, enterprises, and public-sector teams across Uttar Pradesh — from MVPs to production-grade platforms.",
    intro:
      "Lucknow is rapidly becoming one of North India's most active digital markets — with growing demand for mobile apps in healthcare, education, retail, and government services.",
    introExtended:
      "Mantravi helps Lucknow-based founders and enterprises ship iOS, Android, and cross-platform apps with clear timelines and measurable outcomes. Whether you are launching a consumer app in Gomti Nagar, digitizing operations for a hospital chain, or building an e-governance platform for UP, our team combines local context with enterprise-grade engineering — React Native, Flutter, Node.js, and cloud-native backends tuned for India's mobile-first users.",
    outcomes: [
      "MVPs delivered in focused 8–12 week sprints",
      "Bilingual Hindi–English UX for broader UP adoption",
      "UPI, Razorpay, and SMS gateway integrations built in",
      "App Store and Play Store submission handled end-to-end",
    ],
    localMarketInsight:
      "Lucknow's IT corridor, startup incubators, and UP government's push for digital governance create strong demand for mobile products. With institutions like IIM Lucknow, IIIT Lucknow, and major hospital networks in the city, sectors like EdTech, HealthTech, and GovTech are leading adoption — while retail, real estate, and food delivery apps continue to grow across the metro.",
    industries: [
      "Healthcare & Hospitals",
      "Education & EdTech",
      "Government & E-Governance",
      "Retail & D2C",
      "Real Estate",
      "Food & Delivery",
      "Logistics & Fleet",
    ],
    areasServed: [
      "Gomti Nagar",
      "Hazratganj",
      "Aliganj",
      "Kanpur",
      "Barabanki",
      "Sitapur",
      "Unnao",
      "Greater Lucknow",
    ],
    capabilities: mobileCapabilities,
    capabilitiesHeading: "Mobile App Development Services in Lucknow",
    capabilitiesDescription:
      "Full-spectrum iOS, Android, and cross-platform development for businesses that need apps built for UP's mobile-first audience.",
    processSteps: defaultProcess,
    processHeading: "Our App Development Process",
    processDescription:
      "A structured, agile process designed for Lucknow startups and enterprises that need predictable delivery without sacrificing quality.",
    differentiators: [
      {
        ...defaultDifferentiators[0],
        description:
          "With a Lucknow studio, we understand local user behavior — Hindi–English interfaces, UPI payments, and low-bandwidth optimization for tier-2 connectivity.",
      },
      ...defaultDifferentiators.slice(1),
    ],
    trustMetrics: [
      { value: "50+", label: "Products Shipped" },
      { value: "8–12", label: "Week MVP Cycles" },
      { value: "2", label: "Studios in UP" },
      { value: "24/7", label: "Support Available" },
    ],
    techStack: mobileTechStack,
    techSection: {
      title: "Mobile development stack",
      description:
        "Frameworks and platforms we use for Lucknow projects — chosen per product, not forced from a template.",
      variant: "light",
    },
    seoContent: {
      whoItsFor: [
        "Lucknow founders validating an MVP who need one team for design, mobile engineering, and launch.",
        "UP-based enterprises digitizing field operations, patient intake, or dealer networks via mobile apps.",
        "Government and PSU teams building citizen-facing apps aligned with Digital India and state e-governance goals.",
        "Healthcare and education organizations in Lucknow needing HIPAA-aware or student-friendly mobile platforms.",
      ],
      whenToEngage: [
        "You have an app idea but no in-house mobile team and need a Lucknow-accessible engineering partner.",
        "Your current app has poor ratings, crashes, or slow performance blocking growth in the UP market.",
        "You need to integrate UPI payments, Aadhaar verification, or SMS OTP flows for Indian users.",
        "You are expanding from Lucknow to Kanpur, Prayagraj, or other UP cities and need a scalable architecture.",
      ],
      deliverables: [
        "Production-ready iOS and Android apps with documented APIs",
        "UI/UX design, clickable prototypes, and optional design system",
        "CI/CD setup, cloud deployment, and App Store / Play Store submission",
        "Analytics dashboards and post-launch support plan",
      ],
      industries: [
        "Healthcare",
        "EdTech",
        "GovTech",
        "E-commerce",
        "Real Estate",
        "Food Tech",
      ],
    },
    faqs: [
      {
        question: "How much does mobile app development cost in Lucknow?",
        answer:
          "A focused MVP typically starts in the ₹8–15 lakh range for a cross-platform app with core features, auth, and one payment integration. Enterprise apps with complex backends, compliance, or multi-role access are scoped in phases after discovery. We share a transparent estimate once we understand your features, integrations, and timeline.",
      },
      {
        question: "How long does it take to build a mobile app in Lucknow?",
        answer:
          "MVPs and simple apps: 8–12 weeks. Mid-complexity apps with admin panels and integrations: 4–6 months. Large enterprise or government platforms: 6–12+ months in phased releases. We align sprints to your business milestones, not arbitrary deadlines.",
      },
      {
        question: "Do you offer Flutter and React Native development in Lucknow?",
        answer:
          "Yes. We build cross-platform apps with Flutter and React Native so you can reach both iOS and Android users from a single codebase — ideal for Lucknow startups that need speed and cost efficiency without sacrificing UX quality.",
      },
      {
        question: "Does Mantravi have an office in Lucknow?",
        answer:
          "Yes. Mantravi operates a studio in Lucknow alongside our Noida headquarters, making it easy for UP-based clients to meet in person, run workshops, and stay close to delivery throughout the project.",
      },
      {
        question: "Can you build apps for government and public-sector projects in UP?",
        answer:
          "We have experience building secure, accessible apps for citizen services, internal operations, and data collection — with role-based access, audit logs, and deployment options that meet government IT requirements.",
      },
      {
        question: "Do you handle App Store and Play Store submission?",
        answer:
          "Yes. We manage end-to-end store submission including screenshots, descriptions, privacy policies, and compliance review — so your Lucknow-built app goes live without store rejection delays.",
      },
      {
        question: "Do you sign NDAs before discussing our app idea?",
        answer:
          "Absolutely. We sign NDAs as standard practice. Your idea, designs, and code remain your intellectual property under agreed contract terms.",
      },
      {
        question: "What industries do you serve in Lucknow?",
        answer:
          "We work with healthcare providers, EdTech platforms, retail and D2C brands, real estate developers, logistics companies, food delivery startups, and government teams across Lucknow and greater Uttar Pradesh.",
      },
    ],
    faqHeading: "Mobile App Development FAQs — Lucknow",
    faqDescription:
      "Common questions about cost, timelines, and working with Mantravi on app projects in Lucknow and UP.",
    hasLocalOffice: true,
  },
  {
    pageType: "mobile-app-development-company",
    slug: "varanasi",
    cityName: "Varanasi",
    stateName: "Uttar Pradesh",
    alternateNames: ["Banaras", "Kashi"],
    title: "Mobile App Development Company in Varanasi",
    seoTitle: "Mobile App Development Company in Varanasi | Mantravi",
    metaDescription:
      "Mobile app development company in Varanasi (Banaras). Tourism, EdTech & e-commerce apps for iOS & Android. Mantravi — free consultation for Eastern UP businesses.",
    focusKeywords: [
      "mobile app development company Varanasi",
      "app developers in Banaras",
      "Android app development Varanasi",
      "tourism app development Varanasi",
      "Flutter app development Banaras",
    ],
    heroSubtitle:
      "We build mobile apps for Varanasi's tourism, education, handicraft, and local commerce sectors — helping Banaras businesses reach pilgrims, students, and customers through fast, reliable iOS and Android products.",
    intro:
      "Varanasi blends centuries of culture with a fast-growing digital economy — creating unique opportunities for tourism, hospitality, education, and artisan e-commerce apps.",
    introExtended:
      "Mantravi partners with Varanasi-based businesses to design and ship mobile apps that serve pilgrims and tourists, connect handloom artisans to global buyers, and digitize education and local services across Banaras and Eastern UP. From temple darshan booking platforms to BHU-adjacent EdTech products and street-food delivery apps, we engineer for low-bandwidth environments, multilingual users, and the seasonal traffic spikes that define Kashi's market.",
    outcomes: [
      "Tourism and booking apps optimized for peak pilgrimage seasons",
      "Multilingual Hindi–English interfaces for diverse user bases",
      "Offline-first features for areas with variable connectivity",
      "E-commerce apps connecting Banarasi silk and handicraft sellers to buyers",
    ],
    localMarketInsight:
      "Varanasi's economy is anchored by spiritual tourism, hospitality, education (BHU and affiliated institutions), and traditional handicrafts — especially Banarasi silk and brassware. The UP government's focus on the Kashi Vishwanath Corridor and spiritual tourism circuit has accelerated demand for booking, guide, and local commerce apps. EdTech and student services around Lanka and BHU campus add a steady year-round market beyond seasonal tourism.",
    industries: [
      "Tourism & Hospitality",
      "Spiritual & Religious Services",
      "Handicrafts & Textiles",
      "Education & EdTech",
      "Food & Street Commerce",
      "Healthcare",
      "Local Services & On-Demand",
    ],
    areasServed: [
      "Assi Ghat",
      "Dashashwamedh Ghat",
      "BHU Campus",
      "Lanka",
      "Sigra",
      "Chandauli",
      "Mirzapur",
      "Ghazipur",
    ],
    capabilities: mobileCapabilities,
    capabilitiesHeading: "Mobile App Development Services in Varanasi",
    capabilitiesDescription:
      "iOS, Android, and cross-platform apps built for Banaras businesses — tourism, education, retail, and local services.",
    processSteps: defaultProcess,
    processHeading: "Our App Development Process",
    processDescription:
      "Agile delivery tailored for Varanasi's seasonal tourism peaks and year-round education and commerce markets.",
    differentiators: [
      {
        ...defaultDifferentiators[0],
        description:
          "We build for Varanasi's unique rhythms — peak pilgrimage traffic, multilingual pilgrims, offline maps, and low-data UX for ghats and old-city areas.",
      },
      ...defaultDifferentiators.slice(1),
    ],
    trustMetrics: [
      { value: "50+", label: "Products Shipped" },
      { value: "8–12", label: "Week MVP Cycles" },
      { value: "UP", label: "Regional Expertise" },
      { value: "24/7", label: "Support Available" },
    ],
    techStack: mobileTechStack,
    techSection: {
      title: "Mobile development stack",
      description:
        "Technologies we use for Varanasi projects — optimized for performance on mid-range Android devices common in Eastern UP.",
      variant: "light",
    },
    seoContent: {
      whoItsFor: [
        "Tourism and hospitality businesses in Varanasi needing booking, guide, or itinerary apps for pilgrims and visitors.",
        "Handicraft exporters and Banarasi silk sellers building e-commerce and catalog apps for domestic and NRI buyers.",
        "EdTech founders and coaching institutes around BHU targeting students across Eastern UP.",
        "Local service providers — food delivery, home services, transport — digitizing operations in Banaras.",
      ],
      whenToEngage: [
        "You want to launch before the next tourism season and need a reliable mobile partner, not freelancers.",
        "Your existing app cannot handle peak-season traffic or lacks offline functionality for old-city areas.",
        "You need a bilingual app with Hindi content, UPI payments, and WhatsApp integration for local customers.",
        "You are expanding from Varanasi to Prayagraj, Ayodhya, or other spiritual tourism corridors.",
      ],
      deliverables: [
        "Tourism, booking, or commerce apps for iOS and Android",
        "Admin dashboards for inventory, bookings, and analytics",
        "Payment gateway, SMS, and push notification integrations",
        "SEO-optimized web companion and app store assets",
      ],
      industries: [
        "Tourism",
        "Hospitality",
        "Handicrafts",
        "EdTech",
        "Food Tech",
        "Healthcare",
      ],
    },
    faqs: [
      {
        question: "How much does app development cost in Varanasi?",
        answer:
          "Tourism and booking MVPs typically start around ₹6–12 lakh for cross-platform apps with core flows. E-commerce and EdTech platforms with admin panels and payment integrations are quoted in phases. We provide a detailed estimate after a discovery call focused on your Varanasi market and feature set.",
      },
      {
        question: "Can you build tourism and pilgrimage booking apps for Varanasi?",
        answer:
          "Yes. We build darshan booking, hotel and homestay, guide, and itinerary apps designed for peak-season load, multilingual users, and integration with local payment methods including UPI.",
      },
      {
        question: "Do you develop e-commerce apps for Banarasi silk and handicrafts?",
        answer:
          "We help artisans and exporters launch catalog, ordering, and payment apps — with product photography workflows, inventory management, and shipping integrations for domestic and international buyers.",
      },
      {
        question: "How long does mobile app development take in Banaras?",
        answer:
          "Simple tourism or booking MVPs: 8–12 weeks. EdTech or e-commerce platforms with admin tools: 4–6 months. We can align delivery to tourism seasons so your app is live before peak pilgrim months.",
      },
      {
        question: "Do you build apps that work offline in Varanasi's old city?",
        answer:
          "Yes. We implement offline-first patterns — cached content, offline maps, and queued actions — for areas where connectivity is inconsistent, which is common around ghats and narrow lanes.",
      },
      {
        question: "Can Mantravi support apps in Hindi and English?",
        answer:
          "Bilingual and multilingual UX is standard for our UP projects. We design interfaces, notifications, and content flows in Hindi and English to reach both local residents and visiting pilgrims.",
      },
      {
        question: "Do you sign NDAs for app ideas in Varanasi?",
        answer:
          "Yes. We protect your intellectual property with NDAs before detailed discussions. You retain ownership of custom code and assets per contract terms.",
      },
      {
        question: "Which areas near Varanasi do you serve?",
        answer:
          "Beyond Banaras city, we work with clients in Chandauli, Mirzapur, Ghazipur, and the broader Eastern UP region — and can support remote collaboration from our Lucknow and Noida studios.",
      },
    ],
    faqHeading: "Mobile App Development FAQs — Varanasi",
    faqDescription:
      "Answers about app costs, tourism apps, and working with Mantravi in Banaras and Eastern UP.",
  },
  {
    pageType: "mobile-app-development-company",
    slug: "bhopal",
    cityName: "Bhopal",
    stateName: "Madhya Pradesh",
    alternateNames: ["City of Lakes"],
    title: "Mobile App Development Company in Bhopal",
    seoTitle: "Mobile App Development Company in Bhopal | Mantravi",
    metaDescription:
      "Mobile app development company in Bhopal, MP. iOS, Android & Flutter apps for startups, agri-tech & enterprises. Book a free consultation with Mantravi today.",
    focusKeywords: [
      "mobile app development company Bhopal",
      "app developers in Bhopal",
      "Android app development Bhopal",
      "Flutter app development Bhopal",
      "mobile app development Madhya Pradesh",
    ],
    heroSubtitle:
      "Mantravi builds mobile apps for Bhopal's startups, SMEs, and public-sector teams — from MVPs for MP's growing tech scene to enterprise apps for healthcare, education, and agriculture across Central India.",
    intro:
      "Bhopal, the capital of Madhya Pradesh, is emerging as a Central India hub for digital services — with rising demand for mobile apps in government, education, healthcare, and SME digitization.",
    introExtended:
      "We help Bhopal-based businesses ship production-grade iOS, Android, and cross-platform apps with predictable timelines and transparent delivery. Whether you are a startup near MP Nagar, an agri-tech company serving farmers across MP, or a healthcare provider digitizing patient workflows, Mantravi brings AI-ready engineering, UPI-native payments, and cloud backends built for India's tier-2 markets — with easy access from our North India studios.",
    outcomes: [
      "MVPs scoped for MP's cost-conscious startup ecosystem",
      "Agri-tech and field-force apps with offline data capture",
      "Government and PSU apps with role-based security",
      "Scalable architecture ready for Indore and statewide expansion",
    ],
    localMarketInsight:
      "Bhopal benefits from its role as MP's administrative capital, a growing pool of engineering talent from MANIT and other institutes, and the state's push for IT investment and smart city infrastructure. Key growth sectors include government e-services, education, healthcare, agriculture technology, and manufacturing SME digitization — with many Bhopal companies also targeting the larger Indore market as they scale.",
    industries: [
      "Government & Public Sector",
      "Education & EdTech",
      "Healthcare & Clinics",
      "Agriculture & Agri-Tech",
      "Manufacturing & SMEs",
      "Retail & E-commerce",
      "Tourism & Hospitality",
    ],
    areasServed: [
      "MP Nagar",
      "Arera Colony",
      "Hoshangabad Road",
      "Kolar Road",
      "Indore",
      "Raisen",
      "Vidisha",
      "Greater Bhopal",
    ],
    capabilities: mobileCapabilities,
    capabilitiesHeading: "Mobile App Development Services in Bhopal",
    capabilitiesDescription:
      "End-to-end mobile development for Bhopal startups and enterprises — native, cross-platform, and AI-enabled apps.",
    processSteps: defaultProcess,
    processHeading: "Our App Development Process",
    processDescription:
      "Structured agile delivery for Bhopal teams that need reliable engineering partners without metro-level agency overhead.",
    differentiators: [
      {
        ...defaultDifferentiators[0],
        description:
          "We understand MP's market — tier-2 pricing expectations, agri-field workflows, government compliance, and expansion paths to Indore and statewide rollout.",
      },
      ...defaultDifferentiators.slice(1),
    ],
    trustMetrics: [
      { value: "50+", label: "Products Shipped" },
      { value: "8–12", label: "Week MVP Cycles" },
      { value: "MP", label: "Central India Focus" },
      { value: "24/7", label: "Support Available" },
    ],
    techStack: mobileTechStack,
    techSection: {
      title: "Mobile development stack",
      description:
        "Production-ready frameworks for Bhopal projects — Flutter, React Native, Node.js, and cloud platforms.",
      variant: "light",
    },
    seoContent: {
      whoItsFor: [
        "Bhopal startups building MVPs for MP's growing digital economy who need one accountable engineering team.",
        "Agri-tech and field-service companies digitizing farmer outreach, crop data, and supply chain across Madhya Pradesh.",
        "Healthcare clinics and diagnostic chains in Bhopal needing appointment, report, and telemedicine apps.",
        "Government and PSU teams in MP building citizen-facing or internal mobile platforms.",
      ],
      whenToEngage: [
        "You need a mobile app but want a partner with tier-2 pricing and enterprise-quality delivery.",
        "Your current vendor missed deadlines or delivered an unstable app blocking your MP market launch.",
        "You need offline-capable field apps for agriculture, surveys, or rural outreach programs.",
        "You are scaling from Bhopal to Indore, Jabalpur, or statewide and need architecture that grows with you.",
      ],
      deliverables: [
        "iOS and Android apps with admin panels and analytics",
        "Offline-first field apps with sync for rural MP connectivity",
        "Cloud backends, APIs, and third-party integrations",
        "Store submission, documentation, and post-launch support",
      ],
      industries: [
        "GovTech",
        "Agri-Tech",
        "Healthcare",
        "EdTech",
        "Manufacturing",
        "E-commerce",
      ],
    },
    faqs: [
      {
        question: "How much does mobile app development cost in Bhopal?",
        answer:
          "Focused MVPs for Bhopal startups typically range from ₹6–14 lakh depending on features, integrations, and platforms. Agri-tech and government apps with offline sync and role-based access are scoped in phases. We provide transparent estimates after understanding your requirements.",
      },
      {
        question: "How long does it take to develop an app in Bhopal?",
        answer:
          "Simple MVPs: 8–12 weeks. Apps with admin dashboards, payments, and integrations: 4–6 months. Large government or enterprise platforms: phased delivery over 6–12 months with milestone-based releases.",
      },
      {
        question: "Do you build agriculture and field-force apps for MP?",
        answer:
          "Yes. We build offline-capable field apps for crop surveys, farmer outreach, input distribution, and supply chain — with data sync when connectivity returns, designed for rural Madhya Pradesh conditions.",
      },
      {
        question: "Can you help Bhopal startups expand to Indore and other MP cities?",
        answer:
          "We architect apps for statewide scale from day one — shared backends, regional content, and analytics that support expansion from Bhopal to Indore, Jabalpur, Gwalior, and beyond.",
      },
      {
        question: "Do you work with government and PSU teams in Madhya Pradesh?",
        answer:
          "We build secure apps for citizen services, internal operations, and data collection with role-based access, audit trails, and deployment options aligned with government IT standards.",
      },
      {
        question: "Which technologies do you use for Bhopal app projects?",
        answer:
          "We typically use Flutter or React Native for cross-platform apps, Swift/Kotlin for native when needed, and Node.js with PostgreSQL for backends — deployed on AWS or GCP with CI/CD pipelines.",
      },
      {
        question: "Do you offer post-launch support for Bhopal clients?",
        answer:
          "Yes. We provide bug fixes, OS updates, feature rollouts, performance monitoring, and analytics reviews — so your app keeps improving after launch.",
      },
      {
        question: "Do you sign NDAs before project discussions?",
        answer:
          "Yes. NDAs are standard. Your app concept, designs, and source code remain your property under agreed contract terms.",
      },
    ],
    faqHeading: "Mobile App Development FAQs — Bhopal",
    faqDescription:
      "Common questions about app development cost, timelines, and working with Mantravi in Bhopal and Madhya Pradesh.",
  },
  ...tier2MobileCityPages,
];

export const locationPages: CityPage[] = [
  ...mobileAppCityPages,
  ...websiteCityPages,
];

export function getAllCitySlugs(): CitySlug[] {
  return [
    "lucknow",
    "varanasi",
    "bhopal",
    "indore",
    "jaipur",
    "chandigarh",
    "nagpur",
    "coimbatore",
  ];
}

export function getAllLocationPageEntries(): {
  pageType: LocationPageType;
  slug: CitySlug;
}[] {
  return locationPages.map((p) => ({
    pageType: p.pageType,
    slug: p.slug,
  }));
}

export function getLocationPage(
  pageType: LocationPageType,
  slug: string,
): CityPage | undefined {
  return locationPages.find(
    (p) => p.pageType === pageType && p.slug === slug,
  );
}

export function getCityBySlug(slug: string): CityPage | undefined {
  return getLocationPage("mobile-app-development-company", slug);
}

export function getOtherLocationPages(
  pageType: LocationPageType,
  currentSlug: CitySlug,
): CityPage[] {
  return locationPages.filter(
    (p) => p.pageType === pageType && p.slug !== currentSlug,
  );
}

export function getOtherCities(currentSlug: CitySlug): CityPage[] {
  return getOtherLocationPages("mobile-app-development-company", currentSlug);
}

export function getCompanionLocationPage(
  page: CityPage,
): CityPage | undefined {
  const companionType: LocationPageType =
    page.pageType === "mobile-app-development-company"
      ? "website-development-company"
      : "mobile-app-development-company";
  return getLocationPage(companionType, page.slug);
}
