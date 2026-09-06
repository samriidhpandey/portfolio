export interface FreelanceService {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  featured: boolean;
  accent: string;
  deliverables: string[];
  metrics: string;
  tags: string[];
}

export const freelanceServicesData: FreelanceService[] = [
  {
    id: "web-development",
    category: "DEVELOPMENT // DESIGN",
    title: "High-Converting Websites & Web Apps",
    shortDesc: "Custom, ultra-fast websites and web applications engineered to convert visitors into paying clients.",
    fullDesc: "I design and develop responsive, modern websites using Next.js, React, and Tailwind CSS. Every project is built for blazing speed (95+ Google PageSpeed), modern SEO, intuitive mobile-first UX, and seamless lead capture.",
    iconName: "Globe",
    featured: true,
    accent: "#FF6B00",
    deliverables: [
      "Custom Business & Portfolio Websites",
      "High-Converting Landing Pages & Funnels",
      "Next.js / React Full-Stack Web Apps",
      "E-Commerce & Payment Gateway Integration",
      "100/100 Mobile & Desktop PageSpeed Optimization"
    ],
    metrics: "Average 3x increase in visitor engagement",
    tags: ["Next.js", "React", "Tailwind CSS", "UI/UX", "SEO-Ready", "Fast Load"]
  },
  {
    id: "digital-marketing",
    category: "GROWTH // MARKETING",
    title: "Digital Marketing & Performance Growth",
    shortDesc: "Data-driven marketing campaigns, SEO, and paid advertising designed to generate qualified leads and revenue.",
    fullDesc: "From search engine domination to high-ROI paid ad funnels, I help businesses acquire customers predictably. Combining technical SEO, conversion rate optimization (CRO), and targeted Meta & Google ads campaigns.",
    iconName: "TrendingUp",
    featured: true,
    accent: "#F97316",
    deliverables: [
      "Technical & On-Page SEO (Search Engine Domination)",
      "Google Search & Display PPC Ad Campaigns",
      "Meta (Instagram & Facebook) High-ROI Ads",
      "Conversion Rate Optimization (CRO) & A/B Testing",
      "Lead Generation & Automated Sales Funnels"
    ],
    metrics: "Measurable 4x-10x Return on Ad Spend (ROAS)",
    tags: ["SEO", "Google Ads", "Meta Ads", "Lead Generation", "Analytics", "Growth"]
  },
  {
    id: "ai-automation",
    category: "AI // AUTOMATION",
    title: "AI Chatbots & Intelligent Automation",
    shortDesc: "Automate customer support, lead qualification, and manual business workflows with cutting-edge AI.",
    fullDesc: "Leverage artificial intelligence to scale your operations without expanding headcount. I build custom 24/7 AI agents, smart knowledge-base bots, and API automation pipelines connecting your website directly to your CRM.",
    iconName: "Bot",
    featured: true,
    accent: "#EA580C",
    deliverables: [
      "24/7 AI Customer Support & Sales Chatbots",
      "Automated Lead Capture & CRM Sync",
      "Custom LLM & Knowledge Base Assistants",
      "Workflow Automation (Zapier, Make, Custom APIs)",
      "Email Marketing & Follow-up Automation"
    ],
    metrics: "Saves 15+ hours/week in manual customer ops",
    tags: ["AI Agents", "Chatbots", "CRM Sync", "Automation", "OpenAI", "Workflows"]
  }
];

export const freelanceGuarantees = [
  {
    title: "Direct 1-on-1 Communication",
    desc: "No middlemen or account managers. You speak directly to the engineer & marketer executing your project."
  },
  {
    title: "Fast Turnaround & Delivery",
    desc: "Rapid agile delivery with regular preview links, feedback loops, and transparent milestones."
  },
  {
    title: "Business ROI-Obsessed",
    desc: "Clean code and pretty design are only half the job. Every website and campaign is engineered to generate revenue."
  },
  {
    title: "Post-Launch Support & Warranty",
    desc: "Comprehensive onboarding, 30 days of post-launch technical support, and dedicated scaling guidance."
  }
];
