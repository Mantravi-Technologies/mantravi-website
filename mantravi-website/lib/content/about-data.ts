export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  company?: string;
  type: "client" | "employee";
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Mantravi designed and built our e-commerce store from the ground up. The site runs smoothly across devices, checkout is fast, and the team stayed responsive as we scaled our catalog.",
    name: "Mobile Case Hub",
    title: "Founder",
    type: "client",
  },
  {
    id: "2",
    quote:
      "Mantravi built the Plantropan app, a garden care platform where users book trusted gardeners on demand. The booking flow is simple, the experience feels polished, and the app runs reliably for our customers.",
    name: "Vikash Srivastva",
    title: "Founder",
    company: "Plantropan",
    type: "client",
  },
  {
    id: "3",
    quote:
      "For Ameyru, Mantravi helped us shape a kidswear brand experience that feels trustworthy to parents and easy to shop. From storefront to performance, the team cared about the details that matter for a clothing brand.",
    name: "Shambhavi",
    title: "Founder",
    company: "Ameyru, Kid Clothing Brand",
    type: "client",
  },
];

export const aboutHero = {
  eyebrow: "About Mantravi",
  title: "Engineering AI-Native Digital Experiences",
  subtitle:
    "We are a team of senior engineers, architects, and product minds who care deeply about building fast, resilient, and scalable digital systems, not just shipping screens.",
};

export const aboutStats = [
  {
    value: 50,
    suffix: "+",
    label: "Production Deployments",
    sub: "Systems shipped and running in real environments",
  },
  {
    value: 25,
    suffix: "+",
    label: "Engineers & Specialists",
    sub: "Senior talent across engineering, design, and delivery",
  },
  {
    value: 4,
    suffix: "",
    label: "Core Service Areas",
    sub: "Web, mobile, digital marketing, and QA under one roof",
  },
];

export const aboutStory = {
  title: "Our Engineering Story",
  description:
    "How Mantravi grew from shipping products in the field to building the studio we always wished we had.",
  paragraphs: [
    "Mantravi was started by engineers who spent years shipping products, fixing broken architectures, and scaling systems under real-world load. We built the studio we always wished we had on previous projects: opinionated about quality, obsessed with performance, and pragmatic about delivery.",
    "Our work is grounded in solid engineering principles: clean architecture, predictable deployments, strong observability, and security by design. From modern frontends to cloud-native backends and AI integrations, we focus on building systems that are easy to evolve, easy to monitor, and hard to break.",
  ],
};

export const partnershipHighlights = [
  {
    title: "Partnership Model",
    description:
      "We collaborate with experts across disciplines so every engagement gets the right skills at the right time.",
  },
  {
    title: "Specialized Expertise",
    description:
      "Best-in-class talent for each project, from architecture and UX to QA, DevOps, and AI integration.",
  },
  {
    title: "Flexible & Scalable",
    description:
      "Teams and scope adapt to your stage, whether you need an MVP squad or long-term engineering support.",
  },
];

export const engineeringPractices = [
  {
    title: "Modern Engineering Stack",
    description:
      "TypeScript-first development, component-driven UI, cloud-native backends, and CI/CD baked into every engagement, with no legacy-by-default choices.",
  },
  {
    title: "Performance & Efficiency",
    description:
      "Lighthouse, Core Web Vitals, and profiling are not afterthoughts. We design for low latency, low overhead, and high conversion from day one.",
  },
  {
    title: "Scalable Architectures",
    description:
      "Modular architectures, clean separation of concerns, and API contracts that make it easy to plug in new channels, markets, or features.",
  },
  {
    title: "Observability & Monitoring",
    description:
      "Logs, metrics, traces, and alerts wired from day zero so issues are visible before users feel them, with dashboards your team can actually read.",
  },
  {
    title: "Automation Everywhere",
    description:
      "Infrastructure as code, repeatable environments, and automated checks so shipping often does not mean shipping risky.",
  },
  {
    title: "Security by Design",
    description:
      "Authentication, authorization, and data protection from the first commit, following industry standards and compliance-friendly patterns.",
  },
  {
    title: "Architecture First",
    description:
      "Serious time on system design, data modeling, and integration boundaries so your product can grow without constant rewrites.",
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Analytics, experiment frameworks, and reporting connected so you validate assumptions with data instead of opinions.",
  },
  {
    title: "Continuous Improvement",
    description:
      "Release cycles, feedback loops, and technical retros keep your product improving instead of stagnating after launch.",
  },
];

export const whatWeDo = [
  {
    title: "Web Development",
    description:
      "Custom websites, web applications, and e-commerce solutions built with modern technologies for performance and user experience.",
    bullets: [
      "React & Next.js applications",
      "E-commerce platforms",
      "WordPress development",
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that engage users and support business growth across iOS and Android.",
    bullets: [
      "Native iOS & Android apps",
      "Cross-platform solutions",
      "App store optimization",
    ],
  },
  {
    title: "Digital Marketing",
    description:
      "SEO, content strategy, and campaign management to strengthen your online presence and drive measurable growth.",
    bullets: [
      "SEO & content strategy",
      "Social media management",
      "Paid advertising campaigns",
    ],
  },
  {
    title: "QA & Support",
    description:
      "Quality assurance, testing, and ongoing support so your applications run reliably and securely in production.",
    bullets: [
      "Automated testing",
      "Performance optimization",
      "24/7 technical support",
    ],
  },
];

export const engineeringPrinciples = [
  {
    title: "Problem First, Tech Second",
    description:
      "We invest in understanding the problem space, constraints, and edge cases so technical decisions support business outcomes.",
  },
  {
    title: "Robust Engineering",
    description:
      "Clean code, automated tests, code reviews, and documented decisions. We optimize for long-term maintainability, not just first delivery.",
  },
  {
    title: "Reliability & Support",
    description:
      "We care about uptime, incident response, and smooth releases. The less you have to think about infrastructure, the better we have done our job.",
  },
];

export const whyChooseMantravi = [
  {
    title: "Expert Network",
    description:
      "Access to 25+ specialized professionals across engineering, design, marketing, QA, and AI.",
  },
  {
    title: "Specialized Focus",
    description:
      "Each expert brings deep knowledge in their domain, so work is led by people who have shipped in that space before.",
  },
  {
    title: "Flexible Scaling",
    description:
      "Scale your team up or down based on project needs, from focused MVPs to ongoing product engineering.",
  },
  {
    title: "Personal Partnership",
    description:
      "A direct relationship with dedicated project leads who keep communication clear and delivery predictable.",
  },
];

export type FAQ = { question: string; answer: string };

export const faqs: FAQ[] = [
  {
    question: "What kind of company is Mantravi?",
    answer:
      "Mantravi is an AI-native digital product studio. We help startups and growing businesses design, build, and scale web apps, mobile products, marketing systems, and QA pipelines with senior engineering talent and production-grade practices.",
  },
  {
    question: "What makes Mantravi different from a typical dev agency?",
    answer:
      "We think like an engineering team of record: architecture first, observability from day one, and a bias toward systems that stay fast and maintainable after launch. You get senior talent and modern practices, not throwaway prototypes.",
  },
  {
    question: "What services does Mantravi offer?",
    answer:
      "We provide web development, mobile app development, digital marketing and SEO, and QA and IT support. Many clients work with us across more than one area so product, growth, and quality stay aligned.",
  },
  {
    question: "How does Mantravi approach AI in product development?",
    answer:
      "We integrate AI where it creates real business value: grounded assistants, workflow automation, smart analytics, and production pipelines with guardrails. AI is part of the architecture conversation, not a bolt-on feature.",
  },
  {
    question: "How do I start a project with Mantravi?",
    answer:
      "Share your goals through our contact form or email hello@mantravi.com. We respond with scope options, a realistic timeline, and a clear plan for how we would partner on your product or platform.",
  },
  {
    question: "Does Mantravi provide ongoing support after launch?",
    answer:
      "Yes. We offer monitoring, performance tuning, security updates, and QA retainers so your platform stays reliable as usage and requirements grow.",
  },
  {
    question: "Can Mantravi work with our existing team or codebase?",
    answer:
      "Absolutely. We often embed alongside in-house teams, audit existing systems, and help stabilize or extend products that are already in market.",
  },
  {
    question: "Which industries has Mantravi worked with?",
    answer:
      "We have delivered for D2C and e-commerce, EdTech, healthcare, hospitality, SaaS, and other sectors where performance, trust, and clear UX matter.",
  },
];
