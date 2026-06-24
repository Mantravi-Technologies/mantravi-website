import type { CityPage, CitySlug } from "./location-types";
import {
  marketingCapabilities,
  marketingDifferentiators,
  marketingProcess,
  marketingTechStack,
} from "./location-page-fragments";

type MarketingCityConfig = {
  slug: CitySlug;
  cityName: string;
  stateName: string;
  alternateNames?: string[];
  areasServed: string[];
  industries: string[];
  clientSectors: string[];
  extraKeywords: string[];
  marketInsight: string;
  intro: string;
  introExtended: string;
  outcomes: string[];
  localDiff: string;
  hasLocalOffice?: boolean;
};

const cityConfigs: MarketingCityConfig[] = [
  {
    slug: "lucknow",
    cityName: "Lucknow",
    stateName: "Uttar Pradesh",
    alternateNames: ["LKO"],
    areasServed: [
      "Gomti Nagar",
      "Hazratganj",
      "Aliganj",
      "Indira Nagar",
      "Kanpur Road",
      "Alambagh",
      "Barabanki",
      "Greater Lucknow",
    ],
    industries: [
      "Real Estate & Builders",
      "Jewelry & Showrooms",
      "Healthcare & Hospitals",
      "Coaching & EdTech",
      "Restaurants & Cafés",
      "Retail & D2C",
      "Law & CA Firms",
    ],
    clientSectors: [
      "Real Estate",
      "Jewelry",
      "Healthcare",
      "Education",
      "Food & Beverage",
      "E-commerce",
      "Professional Services",
    ],
    extraKeywords: [
      "SEO company Lucknow",
      "Google Ads agency Lucknow",
      "social media marketing Lucknow",
      "local SEO Lucknow",
    ],
    marketInsight:
      "Lucknow's local search is competitive in real estate, coaching, clinics, and retail — with strong demand for Hindi–English SEO, Google Business Profile optimization, and lead-focused Google Ads across Gomti Nagar and Hazratganj.",
    intro:
      "Lucknow businesses need digital marketing that generates calls and enquiries — not reports full of impressions with no leads.",
    introExtended:
      "Mantravi helps Lucknow brands rank locally, run profitable Google and Meta ads, and convert website traffic into customers. We work with real estate developers, jewelry showrooms, hospitals, coaching institutes, restaurants, and D2C brands across UP — combining local SEO, content, paid media, and landing pages built to perform in tier-2 markets.",
    outcomes: [
      "Local SEO for Lucknow and neighbourhood keywords",
      "Google Ads and Meta campaigns tied to lead tracking",
      "SEO content for real estate, healthcare, and coaching",
      "Monthly reporting on rankings, spend, and conversions",
    ],
    localDiff:
      "We know Lucknow search behaviour — Hindi–English keywords, UPI-led landing pages, Gomti Nagar competition, and what converts for UP buyers.",
    hasLocalOffice: true,
  },
  {
    slug: "varanasi",
    cityName: "Varanasi",
    stateName: "Uttar Pradesh",
    alternateNames: ["Banaras", "Kashi"],
    areasServed: [
      "Assi Ghat",
      "Dashashwamedh",
      "BHU / Lanka",
      "Sigra",
      "Cantt",
      "Chandauli",
      "Mirzapur",
      "Greater Banaras",
    ],
    industries: [
      "Hotels & Homestays",
      "Tour & Travel Operators",
      "Banarasi Silk & Handicrafts",
      "Restaurants & Street Food",
      "Coaching Institutes",
      "Jewelry & Ethnic Wear",
      "Healthcare Clinics",
    ],
    clientSectors: [
      "Tourism",
      "Hospitality",
      "Handicrafts",
      "Food & Beverage",
      "Education",
      "Retail",
      "Healthcare",
    ],
    extraKeywords: [
      "SEO company Varanasi",
      "hotel marketing Banaras",
      "tourism digital marketing Varanasi",
      "Google Ads Varanasi",
    ],
    marketInsight:
      "Varanasi marketing peaks around tourism seasons — hotels, tour operators, silk exporters, and restaurants compete fiercely for 'near me' and pilgrimage-related searches across Banaras and the Kashi corridor.",
    intro:
      "In Banaras, visibility on Google and social channels directly drives bookings, footfall, and export enquiries.",
    introExtended:
      "Mantravi builds tourism-ready SEO, Google Ads, and social campaigns for Varanasi hotels, travel operators, handicraft sellers, coaching centres, and restaurants. We optimize for seasonal spikes, multilingual audiences, and local map rankings so you capture intent before competitors.",
    outcomes: [
      "Tourism and hotel SEO for peak-season keywords",
      "Google Ads for bookings and package enquiries",
      "Social content for silk, crafts, and food brands",
      "Review and reputation management on Google",
    ],
    localDiff:
      "We plan for Banaras seasonality — pilgrimage peaks, multilingual tourists, and handicraft buyers searching from India and abroad.",
  },
  {
    slug: "bhopal",
    cityName: "Bhopal",
    stateName: "Madhya Pradesh",
    alternateNames: ["City of Lakes"],
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
    industries: [
      "Real Estate & Township",
      "Healthcare & Diagnostics",
      "Coaching & Schools",
      "Agri & Input Dealers",
      "Government Contractors",
      "Restaurants & QSR",
      "Retail & Furniture",
    ],
    clientSectors: [
      "Real Estate",
      "Healthcare",
      "Education",
      "Agri-Business",
      "Government",
      "Food & Beverage",
      "Retail",
    ],
    extraKeywords: [
      "digital marketing company Bhopal",
      "SEO agency Bhopal",
      "social media marketing MP",
      "Google Ads Bhopal",
    ],
    marketInsight:
      "Bhopal businesses increasingly compete online for real estate leads, clinic appointments, and coaching admissions — with many expanding SEO and ads to Indore and statewide after validating locally.",
    intro:
      "MP businesses need affordable digital marketing that still delivers measurable leads — not metro-priced retainers with vague results.",
    introExtended:
      "Mantravi helps Bhopal companies grow through local SEO, Google Ads, content marketing, and social campaigns. We serve real estate developers, clinics, coaching institutes, restaurants, and SMEs across Madhya Pradesh with strategies priced for tier-2 markets and reporting tied to calls and form fills.",
    outcomes: [
      "Local SEO for Bhopal and MP keywords",
      "Lead-gen Google Ads with call tracking",
      "Content for real estate, health, and education",
      "Campaigns scalable to Indore and statewide",
    ],
    localDiff:
      "We understand MP's market — tier-2 budgets, agri and government adjacency, and expansion paths from Bhopal to Indore.",
  },
  {
    slug: "indore",
    cityName: "Indore",
    stateName: "Madhya Pradesh",
    areasServed: [
      "Vijay Nagar",
      "Palasia",
      "Super Corridor",
      "Bhawarkuan",
      "Scheme 54",
      "Pithampur",
      "Dewas",
      "Greater Indore",
    ],
    industries: [
      "Real Estate & Developers",
      "Restaurants & Food Brands",
      "Retail & D2C",
      "Coaching & EdTech",
      "Healthcare & Dental",
      "Jewelry & Fashion",
      "CA & Legal Firms",
    ],
    clientSectors: [
      "Real Estate",
      "Food Tech",
      "E-commerce",
      "Education",
      "Healthcare",
      "Retail",
      "Professional Services",
    ],
    extraKeywords: [
      "digital marketing agency Indore",
      "SEO company Indore",
      "social media marketing Indore",
      "Google Ads Indore",
    ],
    marketInsight:
      "Indore's hyperlocal competition is intense in food delivery, coaching, real estate, and retail — making Google map rankings, review velocity, and conversion-focused ad landing pages critical for Vijay Nagar and Palasia businesses.",
    intro:
      "Indore's fastest-growing brands win on local search, social proof, and ads that convert — not generic nationwide campaigns.",
    introExtended:
      "Mantravi drives leads for Indore real estate projects, restaurants, D2C brands, coaching institutes, clinics, and jewelry stores through local SEO, Google and Meta ads, and landing pages optimized for MP's mobile-first shoppers.",
    outcomes: [
      "Hyperlocal SEO for Indore neighbourhoods",
      "Performance ads for food, retail, and real estate",
      "Social media for D2C and restaurant brands",
      "CRO on websites and campaign landing pages",
    ],
    localDiff:
      "We optimize for Indore's hyperlocal market — food brands, Super Corridor real estate, and MP-wide scaling from one agency partner.",
  },
  {
    slug: "jaipur",
    cityName: "Jaipur",
    stateName: "Rajasthan",
    alternateNames: ["Pink City"],
    areasServed: [
      "Malviya Nagar",
      "Vaishali Nagar",
      "C-Scheme",
      "Mansarovar",
      "Raja Park",
      "Ajmer Road",
      "Tonk Road",
      "Greater Jaipur",
    ],
    industries: [
      "Jewelry Stores & Showrooms",
      "Real Estate & Builders",
      "Hotels & Wedding Venues",
      "Coaching & Institutes",
      "Handicrafts & Ethnic Wear",
      "Hospitals & Clinics",
      "Restaurants & Cafés",
    ],
    clientSectors: [
      "Jewelry",
      "Real Estate",
      "Tourism",
      "Education",
      "Handicrafts",
      "Healthcare",
      "Hospitality",
    ],
    extraKeywords: [
      "digital marketing company Jaipur",
      "SEO for jewelry store Jaipur",
      "real estate marketing Jaipur",
      "Google Ads Jaipur",
    ],
    marketInsight:
      "Jaipur's highest-value search categories include jewelry, real estate, wedding venues, and tourism — where organic rankings, Google Ads, and Instagram reels directly influence showroom visits and NRI buyer enquiries.",
    intro:
      "Pink City businesses in jewelry, real estate, and tourism need marketing that brings qualified buyers — not just likes.",
    introExtended:
      "Mantravi helps Jaipur jewelry showrooms, builders, hotels, coaching centres, and handicraft brands rank on Google, run profitable ads, and build social presence that converts. We combine local SEO, content, paid media, and landing pages tuned for Rajasthan buyers and NRI audiences.",
    outcomes: [
      "SEO for jewelry, real estate, and tourism keywords",
      "Google and Meta ads for leads and showroom visits",
      "Social content for wedding and craft brands",
      "Landing pages for project launches and sales",
    ],
    localDiff:
      "We specialize in Jaipur sectors — jewelry SEO, wedding-season campaigns, and tourism keywords that peak through the year.",
  },
  {
    slug: "chandigarh",
    cityName: "Chandigarh",
    stateName: "Chandigarh",
    alternateNames: ["Tricity"],
    areasServed: [
      "Sector 17",
      "Sector 34",
      "Sector 22",
      "Mohali",
      "Panchkula",
      "Zirakpur",
      "Kharar",
      "Greater Tricity",
    ],
    industries: [
      "Clinics & Hospitals",
      "Coaching & IELTS Centres",
      "Real Estate & Realtors",
      "Salons & Spas",
      "Restaurants & Cloud Kitchens",
      "CA & Law Firms",
      "Retail & Boutiques",
    ],
    clientSectors: [
      "Healthcare",
      "Education",
      "Real Estate",
      "Beauty & Wellness",
      "Food & Beverage",
      "Professional Services",
      "Retail",
    ],
    extraKeywords: [
      "digital marketing agency Chandigarh",
      "SEO company Mohali",
      "Google Ads Tricity",
      "social media marketing Panchkula",
    ],
    marketInsight:
      "Tricity search competition is fierce for clinics, coaching, real estate, and professional services — with high CPC on Google Ads and strong reliance on reviews and local map pack visibility across Sectors 17, 34, and Mohali.",
    intro:
      "Chandigarh Tricity clients expect premium positioning, fast lead response, and marketing that matches high local competition.",
    introExtended:
      "Mantravi delivers local SEO, Google Ads, Meta campaigns, and content for Tricity clinics, coaching institutes, real estate brokers, salons, restaurants, and professional firms — with reporting tied to calls, appointments, and qualified leads.",
    outcomes: [
      "Local SEO across Chandigarh, Mohali, and Panchkula",
      "Healthcare and coaching lead-gen campaigns",
      "Real estate project and broker marketing",
      "Review generation and reputation management",
    ],
    localDiff:
      "We understand Tricity competition — premium UX, health and education compliance in ads, and Punjabi–Hindi–English audience targeting.",
  },
  {
    slug: "nagpur",
    cityName: "Nagpur",
    stateName: "Maharashtra",
    alternateNames: ["Orange City"],
    areasServed: [
      "Dharampeth",
      "Sadar",
      "MIHAN",
      "Hingna",
      "Civil Lines",
      "Wardha",
      "Amravati",
      "Greater Nagpur",
    ],
    industries: [
      "Real Estate & Developers",
      "Logistics & Transport",
      "Manufacturing & SMEs",
      "Coaching Institutes",
      "Hospitals & Diagnostics",
      "Orange & Agri Traders",
      "Retail & Showrooms",
    ],
    clientSectors: [
      "Real Estate",
      "Logistics",
      "Manufacturing",
      "Education",
      "Healthcare",
      "Agri-Trade",
      "Retail",
    ],
    extraKeywords: [
      "digital marketing company Nagpur",
      "SEO agency Nagpur",
      "Google Ads Nagpur",
      "local SEO Vidarbha",
    ],
    marketInsight:
      "Nagpur's B2B and local service sectors — logistics, manufacturing, real estate, and coaching — increasingly rely on Google search and Justdial-style discovery, making local SEO and lead-focused ads essential across Vidarbha.",
    intro:
      "Central India businesses need digital marketing that generates enquiries from Nagpur and across Vidarbha.",
    introExtended:
      "Mantravi helps Nagpur real estate developers, logistics firms, manufacturers, coaching centres, and clinics grow through SEO, Google Ads, social media, and landing pages built for B2B and local service lead generation.",
    outcomes: [
      "Local SEO for Nagpur and Vidarbha keywords",
      "B2B lead campaigns for logistics and manufacturing",
      "Real estate and coaching admission marketing",
      "Monthly performance dashboards",
    ],
    localDiff:
      "We know Nagpur's mix of B2B logistics, manufacturing credibility marketing, and local service competition in Vidarbha.",
  },
  {
    slug: "coimbatore",
    cityName: "Coimbatore",
    stateName: "Tamil Nadu",
    alternateNames: ["Kovai"],
    areasServed: [
      "RS Puram",
      "Peelamedu",
      "Saravanampatti",
      "Gandhipuram",
      "Race Course",
      "Tiruppur",
      "Erode",
      "Greater Coimbatore",
    ],
    industries: [
      "Manufacturing & Engineering",
      "Textile & Garment Exporters",
      "Hospitals & Multi-Specialty",
      "Coaching & Colleges",
      "Real Estate & Builders",
      "Retail & Jewelry",
      "IT & SaaS Startups",
    ],
    clientSectors: [
      "Manufacturing",
      "Textiles",
      "Healthcare",
      "Education",
      "Real Estate",
      "Retail",
      "Technology",
    ],
    extraKeywords: [
      "digital marketing company Coimbatore",
      "SEO agency Kovai",
      "B2B marketing Coimbatore",
      "Google Ads Tamil Nadu",
    ],
    marketInsight:
      "Coimbatore's manufacturers, textile exporters, and hospitals compete for domestic and export leads online — where SEO, LinkedIn, and Google Ads support long B2B sales cycles alongside local clinic and coaching search.",
    intro:
      "Kovai businesses need marketing that wins both local appointments and B2B export enquiries.",
    introExtended:
      "Mantravi supports Coimbatore manufacturers, textile companies, hospitals, coaching institutes, and real estate firms with SEO, Google Ads, content marketing, and landing pages — including Tamil–English content and B2B lead funnels for industrial buyers.",
    outcomes: [
      "B2B SEO for manufacturing and textile keywords",
      "Local SEO for clinics, coaching, and retail",
      "Google Ads with export and domestic lead tracking",
      "Content and case studies for industrial credibility",
    ],
    localDiff:
      "We build for Coimbatore's industrial base — export-facing SEO, factory credibility content, and Tamil Nadu local search.",
  },
  {
    slug: "ghaziabad",
    cityName: "Ghaziabad",
    stateName: "Uttar Pradesh",
    alternateNames: ["NCR East", "GZB"],
    areasServed: [
      "Gaur City",
      "Crossing Republik",
      "Indirapuram",
      "Vaishali",
      "Raj Nagar Extension",
      "Kaushambi",
      "Sahibabad",
      "Greater Noida West",
    ],
    industries: [
      "Real Estate & Builders",
      "Jewelry Stores & Showrooms",
      "Coaching & IIT-JEE Centres",
      "Hospitals & Diagnostics",
      "Restaurants & Cloud Kitchens",
      "Furniture & Interior Design",
      "CA, Legal & Tax Firms",
    ],
    clientSectors: [
      "Real Estate",
      "Jewelry",
      "Education",
      "Healthcare",
      "Food & Beverage",
      "Home & Interior",
      "Professional Services",
    ],
    extraKeywords: [
      "digital marketing Gaur City",
      "SEO Crossing Republik",
      "digital marketing company Ghaziabad",
      "Google Ads Indirapuram",
      "real estate marketing Ghaziabad",
    ],
    marketInsight:
      "Ghaziabad and NCR East — especially Gaur City, Crossing Republik, and Indirapuram — are among India's most competitive corridors for real estate, coaching, jewelry, and healthcare local search, with high ad costs and intense Google map pack competition.",
    intro:
      "Ghaziabad businesses in Gaur City, Crossing Republik, and Indirapuram need marketing that wins local search and turns ad spend into site visits and calls.",
    introExtended:
      "Mantravi helps Ghaziabad real estate builders, jewelry showrooms, coaching institutes, hospitals, restaurants, and interior firms dominate local SEO, run profitable Google and Meta ads, and build landing pages for project launches across NCR East. We target high-intent keywords in Gaur City, Crossing Republik, Vaishali, Raj Nagar Extension, and Greater Noida West.",
    outcomes: [
      "Local SEO for Gaur City, Crossing Republik & Indirapuram",
      "Real estate and jewelry lead-generation campaigns",
      "Google Ads with call and form conversion tracking",
      "Social media for coaching, food, and retail brands",
    ],
    localDiff:
      "We specialize in NCR East — Gaur City and Crossing Republik real estate SEO, jewelry showroom marketing, and coaching lead funnels in hypercompetitive Ghaziabad search.",
  },
];

function buildMarketingPage(config: MarketingCityConfig): CityPage {
  const { cityName, slug, stateName } = config;
  const areaSample = config.areasServed.slice(0, 3).join(", ");

  return {
    pageType: "digital-marketing-company",
    slug,
    cityName,
    stateName,
    alternateNames: config.alternateNames,
    title: `Digital Marketing Company in ${cityName}`,
    seoTitle: `Digital Marketing Company in ${cityName} | Mantravi`,
    metaDescription: `Digital marketing company in ${cityName}. Local SEO, Google Ads & social media for real estate, jewelry, coaching & clinics. Free audit — Mantravi.`,
    focusKeywords: [
      `digital marketing company ${cityName}`,
      `digital marketing agency ${cityName}`,
      `SEO company ${cityName}`,
      `social media marketing ${cityName}`,
      `Google Ads agency ${cityName}`,
      ...config.extraKeywords,
    ],
    heroSubtitle: `Mantravi is a digital marketing company in ${cityName} helping real estate developers, jewelry stores, coaching institutes, hospitals, restaurants, and local brands win on Google, social media, and paid ads — with leads you can measure.`,
    intro: config.intro,
    introExtended: config.introExtended,
    outcomes: config.outcomes,
    localMarketInsight: config.marketInsight,
    industries: config.industries,
    areasServed: config.areasServed,
    capabilities: marketingCapabilities,
    capabilitiesHeading: `Digital Marketing Services in ${cityName}`,
    capabilitiesDescription: `Local SEO, paid ads, social media, and content marketing for ${cityName} businesses that need calls, enquiries, and showroom visits — not vanity metrics.`,
    processSteps: marketingProcess,
    processHeading: "Our Digital Marketing Process",
    processDescription: `Structured growth marketing for ${cityName} teams — from audit to scalable leads across search, social, and paid channels.`,
    differentiators: [
      {
        ...marketingDifferentiators[0],
        description: config.localDiff,
      },
      ...marketingDifferentiators.slice(1),
    ],
    trustMetrics: [
      { value: "90+", label: "Lighthouse SEO Scores" },
      { value: "3×", label: "Avg. Lead Growth" },
      { value: "50+", label: "Campaigns Delivered" },
      { value: "24/7", label: "Reporting Access" },
    ],
    techStack: marketingTechStack,
    techSection: {
      title: "Marketing & SEO tools",
      description: `Platforms we use for ${cityName} campaigns — search, ads, analytics, and content.`,
      variant: "cream",
    },
    seoContent: {
      whoItsFor: [
        `Real estate developers and brokers in ${cityName} who need project leads from Google and Meta ads.`,
        `Jewelry showrooms and retail stores competing for local search and walk-in traffic.`,
        `Coaching institutes and schools targeting admissions in ${areaSample} and nearby areas.`,
        `Hospitals, clinics, and diagnostic centres needing appointment enquiries online.`,
        `Restaurants, cloud kitchens, and D2C food brands growing delivery and dine-in orders.`,
        `CA firms, lawyers, and consultants building credibility and inbound leads.`,
      ],
      whenToEngage: [
        `You rely on referrals but competitors are winning "${cityName} + your service" on Google.`,
        `Your Google Ads spend is high but leads are low quality or untracked.`,
        `Your Google Business Profile ranks poorly in ${areaSample}.`,
        `You are launching a new project, showroom, or branch and need a campaign fast.`,
        `You want one partner for SEO, ads, landing pages, and analytics.`,
      ],
      deliverables: [
        "Local SEO audit and 90-day keyword roadmap",
        "Google Business Profile optimization and review strategy",
        "Google Ads and/or Meta ad account setup with conversion tracking",
        "Monthly SEO content and landing page recommendations",
        "Analytics dashboard with rankings, spend, leads, and ROAS",
      ],
      industries: config.clientSectors,
    },
    faqs: [
      {
        question: `How much does digital marketing cost in ${cityName}?`,
        answer: `Local SEO retainers typically start from ₹15,000–40,000/month depending on competition and scope. Google Ads management is often 10–15% of ad spend or a fixed fee from ₹12,000/month. Full-funnel packages combining SEO, ads, and content are quoted after a free audit of your ${cityName} market and goals.`,
      },
      {
        question: `Do you offer SEO for real estate in ${cityName}?`,
        answer: `Yes. We build local SEO, project landing pages, schema markup, and content targeting buyers searching in ${areaSample} and surrounding areas — plus Google Ads for launch campaigns and broker lead generation.`,
      },
      {
        question: `Can you market jewelry stores and showrooms?`,
        answer: `We run local SEO, Google Ads, Instagram reels, and festive campaigns for jewelry retailers — optimized for showroom visits, bridal season, and high-intent "jewelry shop near me" searches.`,
      },
      {
        question: `How long does SEO take to show results in ${cityName}?`,
        answer: `Most local businesses see measurable ranking improvements in 8–16 weeks for less competitive keywords. Competitive categories like real estate, coaching, and healthcare in ${cityName} may take 4–6 months for top-3 map pack positions — we set realistic milestones from day one.`,
      },
      {
        question: `Do you manage Google Ads and Meta ads?`,
        answer: `Yes. We set up conversion tracking, search and Performance Max campaigns, Meta lead ads, and retargeting — with weekly optimization and transparent spend reporting.`,
      },
      {
        question: `Do you work with coaching institutes and schools?`,
        answer: `We specialize in admission-season campaigns, local SEO for coaching keywords, landing pages for courses, and call-tracking so you know which ads drive enrolments.`,
      },
      {
        question: `Which areas do you serve near ${cityName}?`,
        answer: `We serve clients across ${config.areasServed.join(", ")} — and run remote campaigns for businesses targeting ${cityName} from nearby cities.`,
      },
      {
        question: `Do you provide monthly reports?`,
        answer: `Yes. Every client gets a monthly dashboard covering keyword rankings, traffic, ad spend, leads, calls, and recommended next steps — no vanity metrics without business context.`,
      },
    ],
    faqHeading: `Digital Marketing FAQs — ${cityName}`,
    faqDescription: `Common questions about SEO, ads, cost, and results for businesses in ${cityName}.`,
    hasLocalOffice: config.hasLocalOffice,
  };
}

export const digitalMarketingCityPages: CityPage[] =
  cityConfigs.map(buildMarketingPage);
