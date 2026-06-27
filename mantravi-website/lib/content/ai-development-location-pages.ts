import type { CityPage, CitySlug } from "./location-types";
import type {
  ServiceCapability,
  ServiceDifferentiator,
  ServiceFAQ,
  ServiceProcessStep,
  ServiceTrustMetric,
  TechStackCategory,
} from "./services-data";

type AiCityConfig = {
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
  localUseCase: string;
  hasLocalOffice?: boolean;
};

const aiCapabilities: ServiceCapability[] = [
  {
    id: "llm",
    title: "Custom LLM Applications",
    description:
      "Production chat, search, and workflow tools built on OpenAI, Gemini, and open models with your data boundaries in place.",
  },
  {
    id: "rag",
    title: "RAG & Knowledge Bases",
    description:
      "Turn PDFs, SOPs, product docs, and support history into answers your team and customers can trust.",
  },
  {
    id: "agents",
    title: "AI Agents & Automation",
    description:
      "Agents that draft emails, route tickets, summarize calls, and trigger actions inside CRMs and internal tools.",
  },
  {
    id: "doc-ai",
    title: "Document Intelligence",
    description:
      "OCR, invoice parsing, KYC checks, and form extraction tuned for Indian documents and mixed Hindi English inputs.",
  },
  {
    id: "vision",
    title: "Computer Vision",
    description:
      "Quality checks, inventory counting, and visual search for retail, manufacturing, and field operations.",
  },
  {
    id: "predict",
    title: "Predictive Analytics",
    description:
      "Demand forecasting, lead scoring, and churn models using your sales, CRM, and product usage data.",
  },
  {
    id: "embed",
    title: "AI Inside Your Product",
    description:
      "Copilots, smart search, and personalization embedded in the web and mobile apps you already ship.",
  },
  {
    id: "mlops",
    title: "MLOps & Monitoring",
    description:
      "Deployment pipelines, cost controls, eval suites, and drift alerts so models stay reliable after launch.",
  },
];

const aiProcess: ServiceProcessStep[] = [
  {
    num: "01",
    title: "Use Case Discovery",
    description:
      "We map where AI saves time, cuts cost, or unlocks revenue before writing a single prompt or training run.",
  },
  {
    num: "02",
    title: "Data & Guardrails",
    description:
      "Access rules, PII handling, eval criteria, and fallback flows are defined early so pilots stay safe.",
  },
  {
    num: "03",
    title: "Prototype Sprint",
    description:
      "A working demo in two to four weeks with real data samples, human review loops, and clear success metrics.",
  },
  {
    num: "04",
    title: "Production Build",
    description:
      "APIs, admin panels, logging, and integrations wired into your stack with staging and rollout plans.",
  },
  {
    num: "05",
    title: "Monitor & Improve",
    description:
      "Usage analytics, quality reviews, and model updates based on what your team sees in the field.",
  },
];

const aiDifferentiators: ServiceDifferentiator[] = [
  {
    num: "01",
    title: "Engineering, not slide decks",
    description:
      "We ship working software. Strategy docs are useful, but our deliverables are APIs, dashboards, and features your users touch.",
  },
  {
    num: "02",
    title: "India ready by default",
    description:
      "Hindi English inputs, UPI adjacent flows, low bandwidth UX, and compliance aware handling for sensitive business data.",
  },
  {
    num: "03",
    title: "Model agnostic builds",
    description:
      "OpenAI, Gemini, Claude, or open weights. We pick models for cost, latency, and accuracy per task, not vendor hype.",
  },
];

const aiTechStack: TechStackCategory[] = [
  {
    category: "Models & APIs",
    description: "Commercial and open models chosen per workload.",
    items: ["OpenAI", "Gemini", "Claude", "Llama", "Mistral"],
  },
  {
    category: "Orchestration",
    description: "Frameworks for RAG, agents, and eval pipelines.",
    items: ["LangChain", "LangGraph", "LlamaIndex", "Python", "Node.js"],
  },
  {
    category: "Data & Vectors",
    description: "Storage and retrieval for production knowledge systems.",
    items: ["PostgreSQL", "Pinecone", "Weaviate", "Redis", "BigQuery"],
  },
  {
    category: "Deploy & Ops",
    description: "Cloud native delivery with observability built in.",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "Datadog"],
  },
];

const cityConfigs: AiCityConfig[] = [
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
      "Healthcare & Hospitals",
      "Coaching & EdTech",
      "Real Estate",
      "Retail & D2C",
      "Government & PSU",
      "Legal & CA Firms",
      "Food & Hospitality",
    ],
    clientSectors: [
      "Healthcare",
      "Education",
      "Real Estate",
      "Retail",
      "Government",
      "Professional Services",
      "Hospitality",
    ],
    extraKeywords: [
      "AI company Lucknow",
      "machine learning development Lucknow",
      "LLM integration Lucknow",
      "AI chatbot development Lucknow",
    ],
    marketInsight:
      "Lucknow teams in healthcare, coaching, and real estate are adopting AI for patient triage chat, admission counselling bots, and sales copilots. Demand is strongest in Gomti Nagar and Hazratganj where digital competition already runs high.",
    intro:
      "Lucknow businesses want AI that handles real work: answering patient queries, summarizing leads, or drafting reports. Not experiments that never leave a demo.",
    introExtended:
      "Mantravi builds production AI for Lucknow startups, hospital groups, coaching brands, and real estate teams across Uttar Pradesh. We design LLM apps, RAG knowledge bases, and automation agents that fit Hindi English workflows, UPI led customer journeys, and the compliance expectations of UP enterprises.",
    outcomes: [
      "AI chat and voice assistants for clinics and coaching brands",
      "RAG search over policies, brochures, and course material",
      "Lead scoring and CRM copilots for real estate sales teams",
      "Document AI for invoices, KYC, and admission forms",
    ],
    localDiff:
      "Our Lucknow studio understands UP buyer behaviour, bilingual UX, and how local teams actually review AI output before it goes live.",
    localUseCase:
      "A Gomti Nagar hospital group wanted after hours appointment routing. We built a Hindi English assistant that checks doctor schedules, captures symptoms, and logs enquiries into their existing CRM.",
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
      "Tour & Travel",
      "Handicrafts & Silk",
      "Restaurants",
      "Coaching Institutes",
      "Healthcare Clinics",
      "Retail",
    ],
    clientSectors: [
      "Tourism",
      "Hospitality",
      "Handicrafts",
      "Food & Beverage",
      "Education",
      "Healthcare",
      "Retail",
    ],
    extraKeywords: [
      "AI development Varanasi",
      "AI chatbot Banaras",
      "machine learning company Varanasi",
    ],
    marketInsight:
      "Tourism and craft exporters in Banaras use AI for multilingual guest support, catalog search, and export document prep. Seasonal spikes make reliable automation especially valuable.",
    intro:
      "Varanasi runs on seasons, languages, and trust. AI here has to help guests book faster and help staff respond without losing the human touch.",
    introExtended:
      "Mantravi builds AI tools for Varanasi hotels, tour operators, silk traders, restaurants, and coaching centres. Think booking assistants in Hindi and English, visual search for handicraft catalogs, and internal copilots that draft guest replies from your own policies.",
    outcomes: [
      "Multilingual guest chat for hotels and homestays",
      "Product search and recommendations for craft catalogs",
      "AI drafted replies for WhatsApp and email support",
      "Document extraction for export and vendor paperwork",
    ],
    localDiff:
      "We plan for Banaras seasonality, pilgrimage peaks, and buyers searching from India and abroad.",
    localUseCase:
      "A Sigra hotel team needed 24/7 booking answers in Hindi and English. We shipped a site embedded assistant that pulls live room availability and hands complex requests to staff with full context.",
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
      "Healthcare & Diagnostics",
      "Real Estate",
      "Coaching & Schools",
      "Agri & Input Dealers",
      "Government Contractors",
      "Retail",
      "Manufacturing SMEs",
    ],
    clientSectors: [
      "Healthcare",
      "Real Estate",
      "Education",
      "Agri-Business",
      "Government",
      "Retail",
      "Manufacturing",
    ],
    extraKeywords: [
      "AI company Bhopal",
      "AI development Madhya Pradesh",
      "machine learning Bhopal",
    ],
    marketInsight:
      "Bhopal firms adopt AI for clinic triage, agri dealer support, and tender document review. Many pilot locally then scale workflows to Indore and statewide operations.",
    intro:
      "MP businesses need practical AI priced for tier 2 markets: fewer buzzwords, more hours saved each week.",
    introExtended:
      "Mantravi helps Bhopal clinics, coaching institutes, real estate developers, and agri businesses deploy AI assistants, internal search, and automation that respects MP budgets and data sensitivity.",
    outcomes: [
      "Patient FAQ and appointment bots for clinics",
      "Internal search over SOPs and tender documents",
      "Sales copilots for real estate and agri dealer teams",
      "Analytics models for inventory and demand planning",
    ],
    localDiff:
      "We know MP procurement cycles, agri seasonality, and how Bhopal teams prefer staged rollouts before statewide expansion.",
    localUseCase:
      "An Arera Colony diagnostics chain wanted consistent test prep instructions. We built a RAG assistant trained on their lab SOPs that nurses verify before answers go to patients.",
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
      "Food & D2C Brands",
      "Retail & E-commerce",
      "Real Estate",
      "Coaching & EdTech",
      "Healthcare & Dental",
      "Logistics",
      "Jewelry & Fashion",
    ],
    clientSectors: [
      "Food Tech",
      "E-commerce",
      "Real Estate",
      "Education",
      "Healthcare",
      "Logistics",
      "Retail",
    ],
    extraKeywords: [
      "AI development company Indore",
      "AI startup Indore",
      "LLM development Indore",
    ],
    marketInsight:
      "Indore consumer brands and Super Corridor real estate teams use AI for support automation, catalog intelligence, and inside sales copilots. Hyperlocal competition pushes fast iteration.",
    intro:
      "Indore founders move quickly. They need AI features that ship in weeks and show up in daily operations, not quarter long research projects.",
    introExtended:
      "Mantravi builds AI for Indore D2C brands, restaurants, coaching institutes, and real estate developers. From WhatsApp order assistants to CRM copilots for broker teams, we focus on measurable lift in response time and conversion.",
    outcomes: [
      "Support bots for food and retail brands",
      "Visual search and recommendations for catalogs",
      "Broker copilots that summarize leads and draft follow ups",
      "Forecasting for inventory and campaign spend",
    ],
    localDiff:
      "We optimize for Indore mobile first shoppers, hyperlocal offers, and MP wide scaling from a single codebase.",
    localUseCase:
      "A Vijay Nagar D2C snack brand needed order status answers without hiring a night shift team. We integrated a WhatsApp ready bot with their OMS and escalation rules for refunds.",
  },
  {
    slug: "jaipur",
    cityName: "Jaipur",
    stateName: "Rajasthan",
    alternateNames: ["Pink City"],
    areasServed: [
      "Malviya Nagar",
      "Vaishali Nagar",
      "C Scheme",
      "Mansarovar",
      "Raja Park",
      "Ajmer Road",
      "Tonk Road",
      "Greater Jaipur",
    ],
    industries: [
      "Jewelry & Showrooms",
      "Real Estate",
      "Hotels & Wedding Venues",
      "Handicrafts",
      "Coaching Institutes",
      "Healthcare",
      "Tourism",
    ],
    clientSectors: [
      "Jewelry",
      "Real Estate",
      "Tourism",
      "Handicrafts",
      "Education",
      "Healthcare",
      "Hospitality",
    ],
    extraKeywords: [
      "AI company Jaipur",
      "AI for jewelry business Jaipur",
      "machine learning Jaipur",
    ],
    marketInsight:
      "Jaipur jewelry and wedding venues use AI for catalog discovery, NRI buyer support, and design customization previews. Real estate teams want copilots that handle Hindi English buyer questions at scale.",
    intro:
      "Pink City buyers ask detailed questions. AI should help your team respond with accurate specs, availability, and pricing context without copy pasting from spreadsheets.",
    introExtended:
      "Mantravi builds AI for Jaipur jewelry showrooms, builders, hotels, and handicraft exporters. We combine visual search, multilingual chat, and internal knowledge tools tuned for bridal season traffic and NRI enquiries.",
    outcomes: [
      "Catalog search and recommendation for jewelry SKUs",
      "Multilingual buyer chat for tourism and hospitality",
      "CRM copilots for real estate pre sales teams",
      "Document AI for export invoices and customs paperwork",
    ],
    localDiff:
      "We understand bridal season peaks, showroom visit intent, and how Rajasthan brands sell to local and overseas buyers.",
    localUseCase:
      "A Malviya Nagar jewelry showroom wanted faster answers on customization options. We deployed visual search plus a RAG assistant trained on their design catalog and pricing rules.",
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
      "Coaching & IELTS",
      "Real Estate",
      "Salons & Spas",
      "Restaurants",
      "CA & Law Firms",
      "Retail",
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
      "AI development Chandigarh",
      "AI company Mohali",
      "machine learning Tricity",
    ],
    marketInsight:
      "Tricity clinics and coaching centres adopt AI for appointment routing, course counselling, and content personalization. Professional firms want secure internal search over client files.",
    intro:
      "Chandigarh clients expect polished UX and careful data handling. AI projects here need guardrails that match healthcare and education compliance expectations.",
    introExtended:
      "Mantravi delivers AI for Tricity clinics, coaching institutes, real estate brokers, and professional firms across Mohali and Panchkula. We build bilingual assistants, secure document search, and workflow automation with audit friendly logging.",
    outcomes: [
      "Appointment and counselling bots for clinics and coaching",
      "Secure internal search for CA and legal teams",
      "Lead summarization for real estate brokers",
      "Review response drafts for salons and restaurants",
    ],
    localDiff:
      "We design for Punjabi Hindi English audiences and the higher service standards Tricity buyers expect.",
    localUseCase:
      "A Sector 34 coaching institute needed admission counselling at scale. We built an assistant that answers syllabus and fee questions and routes serious leads to counsellors with chat history attached.",
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
      "Logistics & Transport",
      "Manufacturing SMEs",
      "Real Estate",
      "Coaching Institutes",
      "Healthcare",
      "Agri Trade",
      "Retail",
    ],
    clientSectors: [
      "Logistics",
      "Manufacturing",
      "Real Estate",
      "Education",
      "Healthcare",
      "Agri-Trade",
      "Retail",
    ],
    extraKeywords: [
      "AI company Nagpur",
      "AI for manufacturing Nagpur",
      "machine learning Vidarbha",
    ],
    marketInsight:
      "Nagpur logistics and manufacturing firms use AI for shipment tracking queries, quality checks, and B2B lead qualification. Coaching and healthcare follow with patient and student facing tools.",
    intro:
      "Central India businesses want AI that supports long B2B cycles and daily ops teams, not consumer gimmicks.",
    introExtended:
      "Mantravi builds AI for Nagpur logistics providers, manufacturers, real estate developers, and coaching centres across Vidarbha. We focus on shipment status bots, document extraction, and copilots that integrate with ERPs and CRMs you already use.",
    outcomes: [
      "B2B support bots for logistics and manufacturing clients",
      "Quality vision checks on production lines",
      "Internal search over contracts and SOP libraries",
      "Lead scoring for real estate and coaching admissions",
    ],
    localDiff:
      "We understand Vidarbha industrial credibility needs and practical field team workflows.",
    localUseCase:
      "A MIHAN logistics firm wanted fewer calls asking for shipment status. We connected a WhatsApp assistant to their TMS so clients get live updates and only escalate exceptions to staff.",
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
      "Textile & Garment",
      "Hospitals",
      "Coaching & Colleges",
      "Real Estate",
      "IT & SaaS",
      "Retail",
    ],
    clientSectors: [
      "Manufacturing",
      "Textiles",
      "Healthcare",
      "Education",
      "Real Estate",
      "Technology",
      "Retail",
    ],
    extraKeywords: [
      "AI development Coimbatore",
      "AI company Kovai",
      "machine learning Tamil Nadu",
    ],
    marketInsight:
      "Coimbatore manufacturers and textile exporters adopt AI for technical documentation search, defect detection, and export documentation. Hospitals and SaaS startups add patient and user facing assistants.",
    intro:
      "Kovai teams build for precision. AI here should reduce manual review time on factory floors and in back offices without compromising quality standards.",
    introExtended:
      "Mantravi builds AI for Coimbatore manufacturers, textile exporters, hospitals, and SaaS startups. We deliver Tamil English capable assistants, technical RAG over manuals, and vision models for production and QC workflows.",
    outcomes: [
      "Technical manual search for factory and engineering teams",
      "Defect detection and visual QC on lines",
      "Export document extraction and validation",
      "Patient FAQ bots for hospitals and clinics",
    ],
    localDiff:
      "We account for export facing documentation, industrial buyers, and Tamil Nadu bilingual support needs.",
    localUseCase:
      "A Peelamedu textile exporter needed faster answers from long spec sheets. We indexed their technical library with RAG so sales engineers pull accurate fiber and compliance details in seconds.",
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
      "Jewelry Showrooms",
      "Coaching & IIT-JEE",
      "Hospitals & Diagnostics",
      "Restaurants & Cloud Kitchens",
      "Interior & Furniture",
      "CA & Legal Firms",
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
      "AI company Ghaziabad",
      "AI development Gaur City",
      "machine learning NCR East",
    ],
    marketInsight:
      "NCR East real estate and coaching brands face intense lead volume from Gaur City, Crossing Republik, and Indirapuram. AI copilots for broker teams and admission counsellors are high ROI starting points.",
    intro:
      "Ghaziabad teams drown in leads and repeat questions. AI should qualify buyers, answer project FAQs, and prep staff before every call.",
    introExtended:
      "Mantravi builds AI for Ghaziabad builders, jewelry showrooms, coaching institutes, and hospitals across NCR East. We ship project FAQ bots, broker copilots, and document automation tuned for high volume Delhi NCR sales cycles.",
    outcomes: [
      "Project FAQ bots for real estate launches",
      "Broker copilots that summarize site visit history",
      "Admission assistants for coaching brands",
      "Lab report and appointment routing for diagnostics chains",
    ],
    localDiff:
      "We specialize in NCR East competition: fast lead response, locality aware answers, and integrations with CRMs brokers already run.",
    localUseCase:
      "A Crossing Republik builder needed instant answers on payment plans and possession timelines. We trained a RAG assistant on their project corpus and wired it to capture qualified leads in their CRM.",
  },
];

function buildAiPage(config: AiCityConfig): CityPage {
  const { cityName, slug, stateName } = config;
  const areaSample = config.areasServed.slice(0, 3).join(", ");

  return {
    pageType: "ai-development-company",
    slug,
    cityName,
    stateName,
    alternateNames: config.alternateNames,
    title: `AI Development Company in ${cityName}`,
    seoTitle: `AI Development Company in ${cityName} | Mantravi`,
    metaDescription: `AI development company in ${cityName}. Custom LLM apps, RAG, chatbots and automation for ${config.clientSectors.slice(0, 3).join(", ").toLowerCase()}. Free consult with Mantravi.`,
    focusKeywords: [
      `AI development company ${cityName}`,
      `AI company ${cityName}`,
      `artificial intelligence development ${cityName}`,
      `machine learning company ${cityName}`,
      `LLM development ${cityName}`,
      ...config.extraKeywords,
    ],
    heroSubtitle: `Mantravi is an AI development company in ${cityName} building LLM apps, knowledge search, chatbots, and automation that fit how ${stateName} teams actually work.`,
    intro: config.intro,
    introExtended: config.introExtended,
    outcomes: config.outcomes,
    localMarketInsight: config.marketInsight,
    industries: config.industries,
    areasServed: config.areasServed,
    capabilities: aiCapabilities,
    capabilitiesHeading: `AI Development Services in ${cityName}`,
    capabilitiesDescription: `Custom AI systems for ${cityName} businesses that need reliable answers, faster ops, and features customers can use today.`,
    processSteps: aiProcess,
    processHeading: "How We Build AI in Production",
    processDescription: `A clear path from idea to live AI features for teams in ${cityName} and nearby areas like ${areaSample}.`,
    differentiators: [
      { ...aiDifferentiators[0], description: config.localDiff },
      ...aiDifferentiators.slice(1),
    ],
    trustMetrics: [
      { value: "40+", label: "AI Features Shipped" },
      { value: "2 to 4", label: "Week Prototype Cycle" },
      { value: "99.9%", label: "Uptime Targets" },
      { value: "24/7", label: "Monitoring Options" },
    ] satisfies ServiceTrustMetric[],
    techStack: aiTechStack,
    techSection: {
      title: "AI Stack & Infrastructure",
      description: `Models, vector stores, and cloud tooling we use for ${cityName} deployments.`,
      variant: "dark",
    },
    seoContent: {
      whoItsFor: [
        `${cityName} healthcare and clinic groups that need patient FAQ, triage, or internal SOP search.`,
        `Coaching institutes and schools handling admission questions at scale in ${areaSample}.`,
        `Real estate and broker teams that want copilots summarizing leads and drafting follow ups.`,
        `Retail, D2C, and jewelry brands adding smart search or support automation.`,
        `Manufacturing and logistics firms automating document review and status updates.`,
        `Professional firms that need secure search across contracts, filings, and client notes.`,
      ],
      whenToEngage: [
        `Your team answers the same questions hundreds of times each week.`,
        `You have PDFs, manuals, or brochures that staff struggle to search quickly.`,
        `You want AI inside your product, not a standalone chat widget nobody uses.`,
        `You tried a generic chatbot and accuracy was too low for customer facing use.`,
        `You need Hindi English support and guardrails before going live in ${cityName}.`,
      ],
      deliverables: [
        "Use case workshop and ROI map for your first AI release",
        "Working prototype with eval metrics and human review flow",
        "Production APIs, admin tools, and integration with your CRM or app",
        "Logging, cost dashboards, and model update playbook",
        "Team training and documentation for ongoing operation",
      ],
      industries: config.clientSectors,
    },
    faqs: [
      {
        question: `How much does AI development cost in ${cityName}?`,
        answer: `Pilot chat or search projects often start from ₹2.5 to 6 lakh depending on data complexity and integrations. Full product features with monitoring and admin panels are scoped after a short discovery call. We quote fixed milestones so ${cityName} teams know spend before build starts.`,
      },
      {
        question: `How long until we see a working AI demo?`,
        answer: `Most ${cityName} clients see a functional prototype in two to four weeks once sample data and access are ready. Production hardening typically follows in four to eight weeks depending on compliance and integration depth.`,
      },
      {
        question: `Can you build Hindi English AI for ${cityName} users?`,
        answer: `Yes. We design prompts, eval sets, and fallback flows for mixed Hindi English input common across ${stateName}. Interfaces and notifications can be bilingual from day one.`,
      },
      {
        question: `Do you integrate with our existing CRM or app?`,
        answer: `We regularly connect to Salesforce, Zoho, HubSpot, custom CRMs, WhatsApp Business APIs, and in house web or mobile apps. Integration scope is mapped during discovery so data stays in systems you already trust.`,
      },
      {
        question: `Is our data safe when training or using AI?`,
        answer: `We use private deployments, access controls, and retention policies agreed upfront. Sensitive fields can stay on your infrastructure with models called via secure APIs. NDAs and DPA terms are standard for ${cityName} enterprise clients.`,
      },
      {
        question: `Which areas near ${cityName} do you serve?`,
        answer: `We work with clients across ${config.areasServed.join(", ")} and support remote delivery for teams targeting ${cityName} from other cities.`,
      },
      {
        question: `What is a real example of AI you have built?`,
        answer: config.localUseCase,
      },
    ] satisfies ServiceFAQ[],
    faqHeading: `AI Development FAQs for ${cityName}`,
    faqDescription: `Common questions about cost, timelines, language support, and data safety for AI projects in ${cityName}.`,
    hasLocalOffice: config.hasLocalOffice,
  };
}

export const aiDevelopmentCityPages: CityPage[] = cityConfigs.map(buildAiPage);

export const AI_NEURAL_HERO = {
  src: "/images/locations/ai-neural-hero.png",
  alt: "Glowing neural circuit profile representing AI development and machine learning services",
};
