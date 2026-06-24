import type { CityPage } from "./location-types";
import {
  mobileAppProcess,
  mobileCapabilities,
  mobileDifferentiators,
  mobileTechStack,
  webCapabilities,
  webDifferentiators,
  webProcess,
  webTechStack,
} from "./location-page-fragments";

const ghaziabadAreas = [
  "Gaur City",
  "Crossing Republik",
  "Indirapuram",
  "Vaishali",
  "Raj Nagar Extension",
  "Kaushambi",
  "Sahibabad",
  "Greater Noida West",
];

export const ghaziabadCityPages: CityPage[] = [
  {
    pageType: "mobile-app-development-company",
    slug: "ghaziabad",
    cityName: "Ghaziabad",
    stateName: "Uttar Pradesh",
    alternateNames: ["NCR East", "GZB"],
    title: "Mobile App Development Company in Ghaziabad",
    seoTitle: "Mobile App Development Company in Ghaziabad | Mantravi",
    metaDescription:
      "Mobile app development company in Ghaziabad (Gaur City, Crossing Republik). iOS, Android & Flutter apps for NCR startups. Free consultation with Mantravi.",
    focusKeywords: [
      "mobile app development company Ghaziabad",
      "app developers Gaur City",
      "Android app development Crossing Republik",
      "Flutter app development Indirapuram",
      "mobile app development NCR East",
    ],
    heroSubtitle:
      "We build mobile apps for Ghaziabad and NCR East businesses — from Gaur City startups and Crossing Republik retailers to Indirapuram enterprises shipping iOS, Android, and cross-platform products.",
    intro:
      "Ghaziabad is one of NCR's fastest-growing digital markets — with surging demand for apps in real estate, edtech, food delivery, healthcare, and retail across Gaur City and Crossing Republik.",
    introExtended:
      "Mantravi partners with Ghaziabad founders and enterprises to design and ship mobile apps with clear timelines. Whether you are a proptech startup in Gaur City, a coaching platform in Indirapuram, or a retail brand in Crossing Republik, we deliver Flutter and React Native apps with UPI payments, Hindi–English UX, and backends built for NCR's mobile-first users.",
    outcomes: [
      "MVPs for NCR East startups in 8–12 week cycles",
      "Real estate and broker apps with lead capture",
      "Food, grocery, and hyperlocal delivery apps",
      "Architecture ready for Delhi NCR expansion",
    ],
    localMarketInsight:
      "Ghaziabad's app economy is driven by NCR East townships — Gaur City, Crossing Republik, Indirapuram, and Raj Nagar Extension — with strong demand from real estate, coaching, healthcare, food tech, and D2C brands serving Delhi NCR commuters and residents.",
    industries: [
      "Real Estate & Proptech",
      "Education & Coaching",
      "Food Tech & Delivery",
      "Healthcare & Clinics",
      "Retail & D2C",
      "Jewelry & Fashion",
      "Logistics & Fleet",
    ],
    areasServed: ghaziabadAreas,
    capabilities: mobileCapabilities,
    capabilitiesHeading: "Mobile App Development Services in Ghaziabad",
    capabilitiesDescription:
      "iOS, Android, and cross-platform apps for Ghaziabad and NCR East businesses across Gaur City, Crossing Republik, and Indirapuram.",
    processSteps: mobileAppProcess,
    processHeading: "Our App Development Process",
    processDescription:
      "Agile delivery for Ghaziabad teams that need speed and quality in a competitive NCR market.",
    differentiators: [
      {
        ...mobileDifferentiators[0],
        description:
          "We understand NCR East — township users, Gaur City and Crossing Republik launch patterns, UPI-first flows, and Delhi NCR scale.",
      },
      ...mobileDifferentiators.slice(1),
    ],
    trustMetrics: [
      { value: "50+", label: "Products Shipped" },
      { value: "8–12", label: "Week MVP Cycles" },
      { value: "NCR", label: "Delhi NCR Reach" },
      { value: "24/7", label: "Support Available" },
    ],
    techStack: mobileTechStack,
    techSection: {
      title: "Mobile development stack",
      description:
        "Frameworks for Ghaziabad projects — Flutter, React Native, and cloud-native backends.",
      variant: "light",
    },
    seoContent: {
      whoItsFor: [
        "Gaur City and Crossing Republik startups building MVPs for NCR East markets.",
        "Real estate developers digitizing site visits, inventory, and broker networks.",
        "Coaching institutes in Indirapuram and Vaishali launching student apps.",
        "Food, grocery, and retail brands building ordering and loyalty apps.",
      ],
      whenToEngage: [
        "You are launching in Gaur City or Crossing Republik and need an app before competitors.",
        "Your current app loses users during peak NCR traffic hours.",
        "You need UPI, OTP, and WhatsApp integrations for Indian users.",
        "You are expanding from Ghaziabad across Delhi NCR and need scalable architecture.",
      ],
      deliverables: [
        "Production iOS and Android apps with documented APIs",
        "Admin dashboards and analytics",
        "Payment and notification integrations",
        "App Store and Play Store submission",
      ],
      industries: [
        "Real Estate",
        "EdTech",
        "Food Tech",
        "Healthcare",
        "E-commerce",
        "Retail",
      ],
    },
    faqs: [
      {
        question: "How much does app development cost in Ghaziabad?",
        answer:
          "MVPs typically start from ₹8–16 lakh for cross-platform apps. Real estate and marketplace apps with admin panels are scoped in phases after discovery.",
      },
      {
        question: "Do you serve Gaur City and Crossing Republik?",
        answer:
          "Yes. We work with clients across Gaur City, Crossing Republik, Indirapuram, Vaishali, Raj Nagar Extension, and Greater Noida West.",
      },
      {
        question: "Do you build real estate apps for Ghaziabad builders?",
        answer:
          "Yes. Project catalogs, site-visit booking, broker apps, lead CRM, and payment integrations for NCR East developers.",
      },
      {
        question: "How long does app development take in Ghaziabad?",
        answer:
          "Simple MVPs: 8–12 weeks. Apps with dashboards and integrations: 4–6 months.",
      },
      {
        question: "Do you offer Flutter development in Indirapuram and Vaishali?",
        answer:
          "Yes. Flutter and React Native are our default for NCR startups needing iOS and Android from one codebase.",
      },
      {
        question: "Do you sign NDAs?",
        answer:
          "Yes. NDAs are standard. Your IP remains yours under contract terms.",
      },
      {
        question: "Do you handle App Store submission?",
        answer:
          "Yes. End-to-end store submission including assets and compliance review.",
      },
      {
        question: "What industries do you serve in Ghaziabad?",
        answer:
          "Real estate, coaching, food delivery, healthcare, retail, jewelry, and logistics across NCR East.",
      },
    ],
    faqHeading: "Mobile App Development FAQs — Ghaziabad",
    faqDescription:
      "Common questions about app development in Ghaziabad, Gaur City, and Crossing Republik.",
  },
  {
    pageType: "website-development-company",
    slug: "ghaziabad",
    cityName: "Ghaziabad",
    stateName: "Uttar Pradesh",
    alternateNames: ["NCR East", "GZB"],
    title: "Website Development Company in Ghaziabad",
    seoTitle: "Website Development Company in Ghaziabad | Mantravi",
    metaDescription:
      "Website development company in Ghaziabad. SEO-ready sites for Gaur City, Crossing Republik & Indirapuram businesses. Free quote from Mantravi.",
    focusKeywords: [
      "website development company Ghaziabad",
      "web development Gaur City",
      "website designer Crossing Republik",
      "ecommerce website Indirapuram",
      "Next.js development Ghaziabad",
    ],
    heroSubtitle:
      "We build fast, SEO-ready websites for Ghaziabad businesses — real estate projects in Gaur City, jewelry showrooms in Crossing Republik, and coaching brands across Indirapuram and NCR East.",
    intro:
      "Ghaziabad businesses need websites that rank in local search and convert NCR traffic — especially in competitive corridors like Gaur City and Crossing Republik.",
    introExtended:
      "Mantravi creates custom websites for Ghaziabad companies using Next.js and modern CMS platforms. From real estate project sites and jewelry e-commerce to coaching portals and clinic booking pages, we combine technical SEO, speed, and conversion-focused design for NCR East audiences.",
    outcomes: [
      "SEO for Gaur City, Crossing Republik & Indirapuram keywords",
      "Real estate project sites with lead capture",
      "E-commerce with UPI for retail and jewelry",
      "Core Web Vitals optimized for mobile NCR users",
    ],
    localMarketInsight:
      "NCR East web demand is dominated by real estate launches, coaching admissions, jewelry retail, and healthcare — with intense competition for locality keywords in Gaur City, Crossing Republik, Vaishali, and Indirapuram.",
    industries: [
      "Real Estate & Builders",
      "Jewelry & Showrooms",
      "Coaching & Education",
      "Healthcare & Clinics",
      "Restaurants & Food",
      "Furniture & Interior",
      "Professional Services",
    ],
    areasServed: ghaziabadAreas,
    capabilities: webCapabilities,
    capabilitiesHeading: "Website Development Services in Ghaziabad",
    capabilitiesDescription:
      "Web design and development for Ghaziabad businesses that need local SEO visibility and measurable leads.",
    processSteps: webProcess,
    processHeading: "Our Website Development Process",
    processDescription:
      "Structured web delivery for Ghaziabad teams — SEO built in from day one.",
    differentiators: [
      {
        ...webDifferentiators[0],
        description:
          "We optimize for NCR East local SEO — Gaur City, Crossing Republik, and Indirapuram keywords with schema and fast mobile pages.",
      },
      ...webDifferentiators.slice(1),
    ],
    trustMetrics: [
      { value: "50+", label: "Websites Delivered" },
      { value: "90+", label: "Lighthouse SEO Scores" },
      { value: "NCR", label: "Delhi NCR Reach" },
      { value: "24/7", label: "Support Available" },
    ],
    techStack: webTechStack,
    techSection: {
      title: "Web development stack",
      description:
        "Next.js, React, and CMS platforms for Ghaziabad web projects.",
      variant: "light",
    },
    seoContent: {
      whoItsFor: [
        "Real estate developers launching projects in Gaur City or Crossing Republik.",
        "Jewelry and retail brands needing e-commerce with UPI.",
        "Coaching institutes competing for Indirapuram and Vaishali search terms.",
        "Clinics and hospitals needing appointment and service pages.",
      ],
      whenToEngage: [
        "Your site does not rank for Ghaziabad or township keywords.",
        "You are launching a new tower, showroom, or branch in NCR East.",
        "Your website is slow on mobile — hurting ads and SEO.",
        "You need a CMS your team can update without developers.",
      ],
      deliverables: [
        "Responsive website with technical SEO",
        "Lead forms, CRM, and WhatsApp integration",
        "CMS training and editor access",
        "Analytics and Search Console setup",
      ],
      industries: [
        "Real Estate",
        "Jewelry",
        "Education",
        "Healthcare",
        "E-commerce",
        "Professional Services",
      ],
    },
    faqs: [
      {
        question: "How much does a website cost in Ghaziabad?",
        answer:
          "Business websites typically start from ₹1.5–4 lakh. Real estate and e-commerce sites are quoted in phases after discovery.",
      },
      {
        question: "Do you build websites for Gaur City and Crossing Republik businesses?",
        answer:
          "Yes. We build SEO-ready sites targeting locality keywords across NCR East townships.",
      },
      {
        question: "Do you create real estate project websites?",
        answer:
          "Yes. Project microsites, floor plans, enquiry forms, broker portals, and SEO for launch campaigns.",
      },
      {
        question: "How long does website development take?",
        answer:
          "Corporate sites: 4–8 weeks. E-commerce or project sites: 8–16 weeks.",
      },
      {
        question: "Do you build SEO-friendly websites?",
        answer:
          "Yes. Technical SEO, schema, sitemaps, and fast Core Web Vitals are built into every Ghaziabad project.",
      },
      {
        question: "Can you build jewelry e-commerce sites?",
        answer:
          "Yes. Catalog, UPI checkout, and SEO for showroom and online buyers.",
      },
      {
        question: "Do you provide maintenance?",
        answer:
          "Yes. Security updates, content changes, and performance monitoring after launch.",
      },
      {
        question: "Do you redesign sites without losing rankings?",
        answer:
          "Yes. 301 redirects and careful migration to preserve search visibility.",
      },
    ],
    faqHeading: "Website Development FAQs — Ghaziabad",
    faqDescription:
      "Common questions about web development in Ghaziabad and NCR East.",
  },
];
