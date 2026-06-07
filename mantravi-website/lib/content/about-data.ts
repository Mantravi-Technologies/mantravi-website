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
export type TeamMember = { name: string; title: string; bio?: string };
export const teamMembers: TeamMember[] = [
  {
    name: "Aakash Kumar Singh",
    title: "CEO & Director",
    bio: "Leads Mantravi's vision for AI-native product engineering and client partnerships.",
  },
  {
    name: "Engineering Lead",
    title: "Head of Engineering",
    bio: "Architects scalable systems across web, mobile, and cloud platforms.",
  },
  {
    name: "Design Lead",
    title: "Head of Design",
    bio: "Shapes user experiences that balance clarity, brand, and conversion.",
  },
  {
    name: "Delivery Lead",
    title: "Head of Delivery",
    bio: "Ensures projects ship on time with transparent client communication.",
  },
];
export type TimelineEvent = {
  year: number;
  title: string;
  description: string;
};
export const timeline: TimelineEvent[] = [
  {
    year: 2020,
    title: "Mantravi Founded",
    description:
      "Started as a small team focused on web development and digital marketing for local businesses in Noida.",
  },
  {
    year: 2021,
    title: "Mobile & SaaS Expansion",
    description:
      "Expanded into mobile app development and began delivering SaaS MVPs for early-stage founders.",
  },
  {
    year: 2022,
    title: "AI Integration Practice",
    description:
      "Introduced AI-assisted development workflows and smart analytics into client projects.",
  },
  {
    year: 2023,
    title: "100+ Clients Milestone",
    description:
      "Crossed 100 clients across D2C, EdTech, healthcare, and hospitality sectors.",
  },
  {
    year: 2024,
    title: "Full-Stack Digital Partner",
    description:
      "Unified development, marketing, and QA under one delivery model for end-to-end client success.",
  },
  {
    year: 2025,
    title: "Global Delivery",
    description:
      "Scaled remote delivery across time zones with dedicated teams for US and MENA clients.",
  },
];
export type FAQ = { question: string; answer: string };
export const faqs: FAQ[] = [
  {
    question: "What makes Mantravi different?",
    answer:
      "We combine AI-first development, unified marketing and engineering, and transparent communication. You get one partner from strategy through launch and ongoing support, not disconnected vendors.",
  },
  {
    question: "How do I reach Mantravi?",
    answer:
      "Use our contact form, email hello@mantravi.com, or book a free consultation. Share your goals and we'll respond with a tailored plan, timeline, and transparent pricing.",
  },
  {
    question: "Can I be involved in the development process?",
    answer:
      "Yes. We work in agile sprints with regular demos and feedback checkpoints. You stay informed and involved at every stage through shared tools and direct access to your project team.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "We offer 24/7 monitoring, security updates, performance optimization, and technical assistance. Our maintenance plans keep your platform secure and running smoothly after launch.",
  },
  {
    question: "Do you offer flexible payment plans?",
    answer:
      "Yes, typically 40% at project start, 40% after mid-phase demo, and 20% upon final delivery. For long-term support or marketing, we offer monthly retainers scaled to your needs.",
  },
  {
    question: "Are there hidden costs after project delivery?",
    answer:
      "No hidden charges for agreed scope. New features or pages are quoted separately. We recommend a maintenance plan for security patches, backups, and updates to keep your platform future-proof.",
  },
  {
    question: "How is AI implemented in your solutions?",
    answer:
      "We use AI for smart analytics, automated testing, predictive marketing, and personalisation, always tied to a clear business outcome, not added for its own sake.",
  },
  {
    question: "Which industries do you have expertise in?",
    answer:
      "D2C & E-Commerce, EdTech, Healthcare, Real Estate, Hospitality, Manufacturing, Restaurants, SaaS, and more. We've delivered across startups and growing mid-market companies.",
  },
];
