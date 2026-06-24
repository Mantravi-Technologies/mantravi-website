import type { CityPage } from "./location-types";
import { tier2WebsiteCityPages } from "./tier2-location-pages";
import type {
  ServiceCapability,
  ServiceDifferentiator,
  ServiceProcessStep,
  TechStackCategory,
} from "./services-data";

const webProcess: ServiceProcessStep[] = [
  {
    num: "01",
    title: "Discovery",
    description:
      "Align on business goals, audience, SEO targets, and conversion metrics before design begins.",
  },
  {
    num: "02",
    title: "UX & Architecture",
    description:
      "Wireframes, sitemap, technical stack, and content structure planned for search and speed.",
  },
  {
    num: "03",
    title: "Agile Build",
    description:
      "Component-driven development in sprints with staging reviews and performance checks.",
  },
  {
    num: "04",
    title: "Launch",
    description:
      "Production deployment, Core Web Vitals tuning, analytics, and search console setup.",
  },
  {
    num: "05",
    title: "Grow",
    description:
      "Ongoing SEO improvements, content updates, and conversion optimization from real traffic data.",
  },
];

const webCapabilities: ServiceCapability[] = [
  {
    id: "corporate",
    title: "Business & Corporate Websites",
    description:
      "Professional sites for brands, agencies, and enterprises that need credibility and lead generation.",
  },
  {
    id: "ecommerce",
    title: "E-commerce Development",
    description:
      "Online stores with catalog, cart, UPI payments, and order management built for Indian buyers.",
  },
  {
    id: "nextjs",
    title: "Next.js & React Web Apps",
    description:
      "Fast, SEO-friendly web applications with server rendering and modern UX patterns.",
  },
  {
    id: "landing",
    title: "Landing Pages & Funnels",
    description:
      "High-converting campaign pages for product launches, ads, and regional promotions.",
  },
  {
    id: "cms",
    title: "CMS & Headless Setup",
    description:
      "Editable content systems so your team can update pages without developer dependency.",
  },
  {
    id: "seo-build",
    title: "Technical SEO Build",
    description:
      "Semantic HTML, schema markup, sitemaps, and Core Web Vitals optimization baked in from day one.",
  },
  {
    id: "saas",
    title: "Web App & SaaS Dashboards",
    description:
      "Authenticated portals, admin panels, and multi-role web platforms for growing businesses.",
  },
  {
    id: "redesign",
    title: "Website Redesign & Migration",
    description:
      "Modernize outdated sites without losing SEO equity — structured redirects and content migration.",
  },
];

const webTechStack: TechStackCategory[] = [
  {
    category: "Frontend",
    description:
      "React and Next.js frontends optimized for speed, accessibility, and search visibility.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "CMS",
    description:
      "Headless and traditional CMS options for marketing teams that need flexible content control.",
    items: ["Sanity", "Strapi", "WordPress", "Contentful"],
  },
  {
    category: "Backend",
    description:
      "APIs, databases, and integrations powering dynamic web experiences.",
    items: ["Node.js", "PostgreSQL", "GraphQL", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    description:
      "Production hosting on Vercel, AWS, or GCP with CI/CD and monitoring.",
    items: ["Vercel", "AWS", "Docker", "GitHub Actions"],
  },
];

const webDifferentiators: ServiceDifferentiator[] = [
  {
    num: "01",
    title: "SEO-First Engineering",
    description:
      "Technical SEO, schema markup, and fast page loads are built into the architecture — not added after launch.",
  },
  {
    num: "02",
    title: "Tier-2 Market Ready",
    description:
      "Lightweight pages, Hindi–English content support, and performance tuned for regional connectivity.",
  },
  {
    num: "03",
    title: "Transparent Delivery",
    description:
      "Staging links, sprint demos, and milestone billing so you see progress before each payment.",
  },
  {
    num: "04",
    title: "Post-Launch Growth",
    description:
      "Analytics reviews, SEO iterations, and conversion improvements after go-live.",
  },
];

export const websiteCityPages: CityPage[] = [
  {
    pageType: "website-development-company",
    slug: "lucknow",
    cityName: "Lucknow",
    stateName: "Uttar Pradesh",
    alternateNames: ["LKO"],
    title: "Website Development Company in Lucknow",
    seoTitle: "Website Development Company in Lucknow | Mantravi",
    metaDescription:
      "Website development company in Lucknow. Fast, SEO-ready business sites, e-commerce & web apps for UP brands. Get a free quote from Mantravi — local studio.",
    focusKeywords: [
      "website development company Lucknow",
      "web development company Lucknow",
      "website designer Lucknow",
      "ecommerce website development Lucknow",
      "Next.js development Lucknow",
    ],
    heroSubtitle:
      "We design and build SEO-ready websites for Lucknow businesses — corporate sites, e-commerce stores, landing pages, and web apps that load fast and rank in local search.",
    intro:
      "Lucknow businesses need websites that look credible, load quickly, and show up when customers search — not template sites that hurt your brand.",
    introExtended:
      "Mantravi builds custom websites for Lucknow startups, retailers, hospitals, and professional services using Next.js, React, and modern CMS platforms. From Gomti Nagar corporate sites to e-commerce for UP brands, we combine technical SEO, conversion-focused design, and reliable delivery — so your website becomes a growth channel, not just an online brochure.",
    outcomes: [
      "SEO-optimized sites with schema markup and fast Core Web Vitals",
      "Mobile-responsive design for UP's mobile-first audience",
      "UPI-ready e-commerce and lead capture integrations",
      "CMS setup so your team can update content independently",
    ],
    localMarketInsight:
      "Lucknow's growing digital economy — driven by UP government initiatives, healthcare chains, coaching institutes, and D2C brands — creates strong demand for professional websites. Local search competition is rising in sectors like real estate, clinics, law firms, and education, making technical SEO and page speed critical for visibility across Lucknow and greater UP.",
    industries: [
      "Healthcare & Clinics",
      "Education & Coaching",
      "Real Estate",
      "Retail & E-commerce",
      "Professional Services",
      "Government & NGOs",
      "Hospitality & Restaurants",
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
    capabilities: webCapabilities,
    capabilitiesHeading: "Website Development Services in Lucknow",
    capabilitiesDescription:
      "Full-spectrum web design and development for Lucknow businesses that need search visibility and measurable leads.",
    processSteps: webProcess,
    processHeading: "Our Website Development Process",
    processDescription:
      "Structured delivery from discovery to launch — built for Lucknow teams that need a dependable web partner.",
    differentiators: [
      {
        ...webDifferentiators[0],
        description:
          "With a Lucknow studio, we optimize for local search terms, Hindi–English content, and the page-speed expectations of UP customers.",
      },
      ...webDifferentiators.slice(1),
    ],
    trustMetrics: [
      { value: "50+", label: "Websites Delivered" },
      { value: "90+", label: "Lighthouse SEO Scores" },
      { value: "2", label: "Studios in UP" },
      { value: "24/7", label: "Support Available" },
    ],
    techStack: webTechStack,
    techSection: {
      title: "Web development stack",
      description:
        "Modern frameworks and platforms for Lucknow web projects — chosen for SEO, speed, and maintainability.",
      variant: "light",
    },
    seoContent: {
      whoItsFor: [
        "Lucknow businesses that need a professional website to generate leads and build trust online.",
        "Retailers and D2C brands launching e-commerce with UPI payments and inventory management.",
        "Clinics, coaching centers, and real estate firms competing in Lucknow local search results.",
        "Startups that need a fast MVP website or landing page before investing in a full product.",
      ],
      whenToEngage: [
        "Your current website is slow, outdated, or not ranking for Lucknow-related keywords.",
        "You are rebranding or opening a new location and need a conversion-focused site.",
        "You need e-commerce, booking, or lead forms integrated with your existing operations.",
        "You want a CMS-backed site your marketing team can update without calling a developer.",
      ],
      deliverables: [
        "Production-ready responsive website with technical SEO setup",
        "CMS configuration and editor training for your team",
        "Google Analytics, Search Console, and conversion tracking",
        "Hosting deployment with SSL, backups, and performance monitoring",
      ],
      industries: [
        "Healthcare",
        "Education",
        "Real Estate",
        "E-commerce",
        "Professional Services",
        "Hospitality",
      ],
    },
    faqs: [
      {
        question: "How much does website development cost in Lucknow?",
        answer:
          "A professional business website typically starts from ₹1.5–4 lakh depending on pages, design complexity, and integrations. E-commerce sites with catalog, payments, and admin panels are quoted in phases after discovery. We share a transparent estimate once we understand your goals and feature requirements.",
      },
      {
        question: "How long does it take to build a website in Lucknow?",
        answer:
          "Corporate or brochure sites: 4–8 weeks. E-commerce or web apps with custom features: 8–16 weeks. Larger platforms are delivered in phased milestones. We align timelines to your launch date, not arbitrary deadlines.",
      },
      {
        question: "Do you build SEO-optimized websites for Lucknow businesses?",
        answer:
          "Yes. Technical SEO is part of our build process — semantic HTML, meta tags, schema markup, sitemap, fast loading, and mobile responsiveness. We also help with local SEO structure for Lucknow and UP-focused keywords.",
      },
      {
        question: "Which platform do you use — WordPress or custom development?",
        answer:
          "We recommend based on your needs: Next.js for performance-critical and SEO-focused sites, headless CMS for marketing teams that need flexibility, or WordPress when rapid content publishing is the priority. We do not force a one-size-fits-all stack.",
      },
      {
        question: "Can you build e-commerce websites for Lucknow retailers?",
        answer:
          "Yes. We build online stores with product catalogs, cart, UPI and card payments, order management, and optional inventory sync — designed for Indian buyers and mobile-first shopping behavior.",
      },
      {
        question: "Do you provide website maintenance after launch?",
        answer:
          "Yes. We offer ongoing support for security updates, content changes, performance monitoring, and SEO improvements after your Lucknow website goes live.",
      },
      {
        question: "Will I be able to update the website myself?",
        answer:
          "We set up a CMS or admin panel and train your team to edit text, images, and blog posts without developer help for day-to-day updates.",
      },
      {
        question: "Do you redesign old websites without losing Google rankings?",
        answer:
          "Yes. We plan URL redirects, preserve SEO equity, and migrate content carefully so your Lucknow site keeps its search visibility through the redesign.",
      },
    ],
    faqHeading: "Website Development FAQs — Lucknow",
    faqDescription:
      "Common questions about web design cost, timelines, and SEO for Lucknow businesses.",
    hasLocalOffice: true,
  },
  {
    pageType: "website-development-company",
    slug: "varanasi",
    cityName: "Varanasi",
    stateName: "Uttar Pradesh",
    alternateNames: ["Banaras", "Kashi"],
    title: "Website Development Company in Varanasi",
    seoTitle: "Website Development Company in Varanasi | Mantravi",
    metaDescription:
      "Website development company in Varanasi (Banaras). SEO-ready tourism, hospitality & e-commerce sites. Mantravi builds fast web experiences — free consultation.",
    focusKeywords: [
      "website development company Varanasi",
      "web development company Banaras",
      "website designer Varanasi",
      "tourism website development Varanasi",
      "ecommerce website Banaras",
    ],
    heroSubtitle:
      "We build SEO-optimized websites for Varanasi businesses — tourism operators, hotels, handicraft exporters, coaching institutes, and local brands that need to be found online.",
    intro:
      "In Varanasi, your website is often the first impression for pilgrims, tourists, students, and buyers — it needs to be fast, trustworthy, and easy to find in search.",
    introExtended:
      "Mantravi creates custom websites for Banaras businesses using Next.js and modern CMS platforms. From hotel and homestay booking sites to Banarasi silk e-commerce and BHU-area coaching portals, we engineer for local SEO, multilingual content, and mobile users who discover you on Google before they reach the ghats.",
    outcomes: [
      "Tourism and hospitality sites optimized for seasonal search traffic",
      "E-commerce for handicrafts with catalog and payment integrations",
      "Multilingual Hindi–English content structure",
      "Fast mobile experience for visitors searching on the go",
    ],
    localMarketInsight:
      "Varanasi's digital landscape is shaped by spiritual tourism, hospitality, education around BHU, and handicraft exports. Businesses that rank for terms like 'hotels in Varanasi', 'Banarasi silk online', or 'coaching in Lanka' gain disproportionate visibility during peak seasons. A well-built, SEO-ready website is essential for capturing this intent before competitors do.",
    industries: [
      "Tourism & Hospitality",
      "Handicrafts & Textiles",
      "Education & Coaching",
      "Food & Restaurants",
      "Healthcare",
      "Local Services",
      "Religious & Cultural Organizations",
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
    capabilities: webCapabilities,
    capabilitiesHeading: "Website Development Services in Varanasi",
    capabilitiesDescription:
      "Web design and development for Banaras businesses — tourism, retail, education, and local services.",
    processSteps: webProcess,
    processHeading: "Our Website Development Process",
    processDescription:
      "Agile web delivery tailored for Varanasi's seasonal tourism peaks and year-round education markets.",
    differentiators: [
      {
        ...webDifferentiators[0],
        description:
          "We build Varanasi sites for discovery — local SEO, tourism keywords, multilingual pages, and fast mobile loads for travelers searching on the move.",
      },
      ...webDifferentiators.slice(1),
    ],
    trustMetrics: [
      { value: "50+", label: "Websites Delivered" },
      { value: "90+", label: "Lighthouse SEO Scores" },
      { value: "UP", label: "Regional Expertise" },
      { value: "24/7", label: "Support Available" },
    ],
    techStack: webTechStack,
    techSection: {
      title: "Web development stack",
      description:
        "Performance-focused technologies for Varanasi web projects on mid-range devices and variable connectivity.",
      variant: "light",
    },
    seoContent: {
      whoItsFor: [
        "Hotels, homestays, and tour operators in Varanasi needing booking-ready websites.",
        "Handicraft and silk businesses selling online to domestic and NRI customers.",
        "Coaching institutes and EdTech platforms around BHU and Lanka.",
        "Restaurants and local brands building visibility in Banaras search results.",
      ],
      whenToEngage: [
        "You rely on walk-ins or referrals but want organic search traffic from tourists and students.",
        "Your current site is not mobile-friendly or loads too slowly for travelers on 4G.",
        "You need Hindi and English pages to reach both local and visiting audiences.",
        "You are launching before peak season and need a site live with booking or inquiry forms.",
      ],
      deliverables: [
        "SEO-optimized tourism, business, or e-commerce website",
        "Booking, inquiry, or WhatsApp lead integration",
        "Google Business Profile alignment and local schema markup",
        "CMS for seasonal offers, blog posts, and gallery updates",
      ],
      industries: [
        "Tourism",
        "Hospitality",
        "Handicrafts",
        "Education",
        "Food & Beverage",
        "Healthcare",
      ],
    },
    faqs: [
      {
        question: "How much does a website cost in Varanasi?",
        answer:
          "Business and tourism websites typically start from ₹1.2–3.5 lakh. E-commerce sites for handicrafts or retail with payments and inventory are scoped separately. We provide a clear quote after understanding your Banaras market and feature needs.",
      },
      {
        question: "Can you build tourism and hotel websites for Varanasi?",
        answer:
          "Yes. We build booking-ready hospitality sites with galleries, room listings, inquiry forms, payment integration, and SEO targeting tourism keywords for Varanasi and the Kashi corridor.",
      },
      {
        question: "Do you create e-commerce sites for Banarasi silk and handicrafts?",
        answer:
          "We build catalog and checkout experiences for artisans and exporters — with product pages, UPI payments, shipping options, and SEO for craft-related search terms.",
      },
      {
        question: "How long does website development take in Banaras?",
        answer:
          "Standard business sites: 4–8 weeks. E-commerce or booking platforms: 8–14 weeks. We can prioritize delivery before peak tourism months when timelines are tight.",
      },
      {
        question: "Do you build Hindi and English websites?",
        answer:
          "Yes. Bilingual content structure is standard for our Varanasi projects — helping you reach local residents and visiting pilgrims in the language they prefer.",
      },
      {
        question: "Will my Varanasi website rank on Google?",
        answer:
          "We build the technical foundation for SEO — fast pages, proper headings, schema, sitemaps, and mobile optimization. Ongoing ranking also depends on content, reviews, and local signals, which we can advise on during and after launch.",
      },
      {
        question: "Can you redesign an old website without losing traffic?",
        answer:
          "Yes. We migrate content with 301 redirects and preserve URL structure where possible so your existing search visibility is protected through the redesign.",
      },
      {
        question: "Do you offer website maintenance for Varanasi clients?",
        answer:
          "Yes. Post-launch support includes security patches, content updates, uptime monitoring, and seasonal content changes for tourism businesses.",
      },
    ],
    faqHeading: "Website Development FAQs — Varanasi",
    faqDescription:
      "Answers about web design, tourism sites, and SEO for Banaras businesses.",
  },
  {
    pageType: "website-development-company",
    slug: "bhopal",
    cityName: "Bhopal",
    stateName: "Madhya Pradesh",
    alternateNames: ["City of Lakes"],
    title: "Website Development Company in Bhopal",
    seoTitle: "Website Development Company in Bhopal | Mantravi",
    metaDescription:
      "Website development company in Bhopal, MP. Business sites, e-commerce & web apps with technical SEO built in. Request a free quote from Mantravi today.",
    focusKeywords: [
      "website development company Bhopal",
      "web development company Bhopal",
      "website designer Bhopal",
      "ecommerce website development Bhopal",
      "website development Madhya Pradesh",
    ],
    heroSubtitle:
      "Mantravi builds fast, SEO-ready websites for Bhopal startups, SMEs, and institutions — corporate sites, e-commerce, portals, and landing pages that help you compete across Madhya Pradesh.",
    intro:
      "Bhopal businesses need websites that establish credibility, capture leads, and rank locally — especially as MP's digital adoption accelerates.",
    introExtended:
      "We develop custom websites for Bhopal companies using Next.js, React, and headless CMS platforms. From MP Nagar corporate sites to agri-tech landing pages and clinic booking portals, Mantravi combines technical SEO, clean design, and reliable delivery — priced for tier-2 markets without compromising enterprise quality.",
    outcomes: [
      "SEO-structured sites targeting Bhopal and MP local search",
      "Lead capture and CRM integrations for B2B services",
      "E-commerce with UPI for retail and D2C brands",
      "Scalable architecture ready for Indore and statewide expansion",
    ],
    localMarketInsight:
      "As Madhya Pradesh's administrative capital, Bhopal has growing demand for professional web presence across government contractors, SMEs, healthcare, education, and agri-business. With Indore as the commercial hub nearby, many Bhopal companies use their website as the first step toward statewide credibility — making technical SEO and professional design a competitive advantage in MP's tier-2 market.",
    industries: [
      "Government & Contractors",
      "Education & Coaching",
      "Healthcare & Clinics",
      "Agriculture & Agri-Business",
      "Manufacturing & SMEs",
      "Retail & E-commerce",
      "Professional Services",
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
    capabilities: webCapabilities,
    capabilitiesHeading: "Website Development Services in Bhopal",
    capabilitiesDescription:
      "End-to-end web design and development for Bhopal businesses that need visibility and measurable results.",
    processSteps: webProcess,
    processHeading: "Our Website Development Process",
    processDescription:
      "Predictable web delivery for Bhopal teams — from discovery to launch with SEO built in.",
    differentiators: [
      {
        ...webDifferentiators[0],
        description:
          "We understand MP's market — local SEO for Bhopal keywords, cost-efficient builds, and architecture that scales when you expand to Indore or statewide.",
      },
      ...webDifferentiators.slice(1),
    ],
    trustMetrics: [
      { value: "50+", label: "Websites Delivered" },
      { value: "90+", label: "Lighthouse SEO Scores" },
      { value: "MP", label: "Central India Focus" },
      { value: "24/7", label: "Support Available" },
    ],
    techStack: webTechStack,
    techSection: {
      title: "Web development stack",
      description:
        "Production-ready frameworks for Bhopal web projects — Next.js, React, Node.js, and cloud hosting.",
      variant: "light",
    },
    seoContent: {
      whoItsFor: [
        "Bhopal SMEs and startups that need a credible online presence to win local and state contracts.",
        "Clinics, diagnostic centers, and coaching institutes competing in Bhopal search results.",
        "Agri-business and field-service companies needing lead-generation landing pages.",
        "Retailers launching e-commerce to reach customers across Madhya Pradesh.",
      ],
      whenToEngage: [
        "Your business still runs on referrals and you need a website that generates inbound leads.",
        "Your current site was built years ago and hurts credibility with enterprise or government clients.",
        "You need a fast landing page for a campaign, product, or regional expansion.",
        "You are scaling from Bhopal to Indore and need a site architecture that supports growth.",
      ],
      deliverables: [
        "Responsive business or e-commerce website with technical SEO",
        "Lead forms, CRM, or WhatsApp integration",
        "CMS for blogs, case studies, and service pages",
        "Analytics, Search Console, and launch support",
      ],
      industries: [
        "SME & Manufacturing",
        "Healthcare",
        "Education",
        "Agri-Business",
        "E-commerce",
        "Professional Services",
      ],
    },
    faqs: [
      {
        question: "How much does website development cost in Bhopal?",
        answer:
          "Professional business websites typically start from ₹1.2–3.5 lakh. E-commerce and portal projects with custom features are quoted in phases. We provide transparent pricing after a discovery call focused on your Bhopal requirements.",
      },
      {
        question: "How long does it take to build a website in Bhopal?",
        answer:
          "Standard corporate sites: 4–8 weeks. E-commerce or custom web apps: 8–16 weeks. We deliver in milestones so you can review progress at each stage.",
      },
      {
        question: "Do you build SEO-friendly websites for Bhopal businesses?",
        answer:
          "Yes. Every site includes technical SEO fundamentals — fast loading, mobile responsiveness, meta tags, schema markup, and sitemap setup — plus guidance on content for Bhopal and MP-focused keywords.",
      },
      {
        question: "Can you build websites for government contractors in MP?",
        answer:
          "We build professional corporate sites with case studies, certifications, tender-ready content sections, and secure contact flows — helping Bhopal contractors present credibility to government and enterprise buyers.",
      },
      {
        question: "Do you create e-commerce websites for Bhopal retailers?",
        answer:
          "Yes. Online stores with catalog, cart, UPI payments, order notifications, and optional inventory management — built for Indian shopping behavior.",
      },
      {
        question: "Which technologies do you use for Bhopal web projects?",
        answer:
          "We primarily use Next.js and React for performance and SEO, with Node.js backends and PostgreSQL. CMS options include Sanity, Strapi, or WordPress depending on your content needs.",
      },
      {
        question: "Can you help us rank for Bhopal and Indore searches?",
        answer:
          "We build the technical and structural foundation for local SEO. Ranking also requires ongoing content, Google Business Profile optimization, and backlinks — services we can support through our brand and SEO practice.",
      },
      {
        question: "Do you provide website maintenance after launch?",
        answer:
          "Yes. We offer support plans for updates, security patches, performance monitoring, and content changes after your Bhopal site goes live.",
      },
    ],
    faqHeading: "Website Development FAQs — Bhopal",
    faqDescription:
      "Common questions about web development cost, SEO, and timelines in Bhopal and MP.",
  },
  ...tier2WebsiteCityPages,
];
