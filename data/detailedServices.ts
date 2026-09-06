export interface ToolItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "marketing" | "ai" | "design" | "cloud";
  categoryLabel: string;
  role: string;
  description: string;
  badge: string;
  proficiency: string;
  accent: string;
}

export interface DetailedService {
  id: string;
  badge: string;
  category: string;
  title: string;
  tagline: string;
  summary: string;
  accent: string;
  turnaround: string;
  roiMetric: string;
  
  // What we provide (Kon Kon Se Services Provide Karwayenge)
  deliverables: {
    title: string;
    description: string;
  }[];

  // Which tools we use (Kispe Konsa Tool Use Karte H)
  toolsUsed: {
    name: string;
    role: string;
    whyWeUseIt: string;
  }[];

  // How we do it (Kaise Karte Hain - Step by step process)
  workflow: {
    step: string;
    title: string;
    description: string;
    timeline: string;
  }[];

  // Concrete client guarantees
  guarantees: string[];
}

export const detailedServicesList: DetailedService[] = [
  {
    id: "web-development",
    badge: "ENGINEERING // PERFORMANCE",
    category: "Full-Stack Web & App Development",
    title: "Custom High-Speed Websites & Web Applications",
    tagline: "Engineered with Next.js 15, React 19 & TypeScript for sub-second speeds and maximum conversion.",
    summary: "I don't build generic cookie-cutter templates. I build bespoke, high-performance web products, SaaS applications, custom e-commerce stores, and conversion-focused landing pages engineered to load under 1 second and rank effortlessly on Google.",
    accent: "#FF6B00",
    turnaround: "1 to 3 Weeks",
    roiMetric: "100/100 Lighthouse Speed & 3x Visitor Engagement",
    
    deliverables: [
      {
        title: "Bespoke Next.js & React Web Applications",
        description: "Full-stack apps with server-side rendering (SSR), static generation (SSG), and edge API routes for unparalleled speed and SEO."
      },
      {
        title: "High-Converting Sales Landing Pages",
        description: "Landing pages with psychological wireframing, trust badges, lightning speed, and optimized call-to-action funnels."
      },
      {
        title: "Custom E-Commerce & Payment Gateways",
        description: "Stripe, Razorpay, and PayPal checkouts with inventory sync, automated invoices, and zero-cart-abandonment architecture."
      },
      {
        title: "Client Portals, Admin Dashboards & CRMs",
        description: "Secure role-based authentication, real-time data visualizers, analytics charts, and internal operations workflows."
      },
      {
        title: "Progressive Web Apps (PWA) & Mobile-First UX",
        description: "Installable web apps that feel and perform like native mobile applications across iOS, Android, and Desktop."
      }
    ],

    toolsUsed: [
      {
        name: "Next.js 15 (App Router)",
        role: "Full-Stack React Framework",
        whyWeUseIt: "Provides lightning-fast Server Components, dynamic streaming, automatic image optimization, and superior SEO indexing."
      },
      {
        name: "TypeScript",
        role: "Type-Safe Architecture",
        whyWeUseIt: "Eliminates runtime errors, ensures bulletproof code maintainability, and makes scaling enterprise codebases easy."
      },
      {
        name: "Tailwind CSS & Framer Motion",
        role: "UI & Fluid Micro-Interactions",
        whyWeUseIt: "Enables pixel-perfect responsive designs, zero bloated CSS bundles, and engaging 60fps animations."
      },
      {
        name: "Node.js & Python FastAPI",
        role: "Backend & RESTful/GraphQL APIs",
        whyWeUseIt: "High-throughput asynchronous backends capable of processing thousands of concurrent requests seamlessly."
      },
      {
        name: "PostgreSQL & Supabase",
        role: "Relational Database & Real-Time Sync",
        whyWeUseIt: "Rock-solid relational data integrity, row-level security (RLS), instant real-time websocket subscriptions, and fast queries."
      },
      {
        name: "Vercel & AWS Cloud",
        role: "Global CDN & Edge Infrastructure",
        whyWeUseIt: "Zero-downtime CI/CD deployments, automatic SSL certificates, and edge caching in 300+ cities worldwide."
      }
    ],

    workflow: [
      {
        step: "01",
        title: "Architecture & Wireframe Blueprint",
        description: "We map out your business objectives, technical requirements (SRS), database schema, user journeys, and responsive wireframes.",
        timeline: "Day 1 – 3"
      },
      {
        step: "02",
        title: "High-Fidelity UI & Frontend Slicing",
        description: "Transforming wireframes into interactive, accessible, and responsive components using Next.js and modern CSS.",
        timeline: "Day 4 – 8"
      },
      {
        step: "03",
        title: "Backend, Database & Third-Party APIs",
        description: "Implementing authentication, payment gateways, CRM integrations, email notifications, and database migrations.",
        timeline: "Day 9 – 14"
      },
      {
        step: "04",
        title: "Stress Testing, Security & 99+ Speed Audit",
        description: "Rigorous testing across Safari, Chrome, iOS, and Android; automated Lighthouse performance and OWASP security checks.",
        timeline: "Day 15 – 17"
      },
      {
        step: "05",
        title: "Production Launch & 30-Day Free Warranty",
        description: "Domain configuration, SSL provisioning, Google Search Console indexing, complete source code handover, and post-launch support.",
        timeline: "Day 18+"
      }
    ],

    guarantees: [
      "100% Full Source Code Ownership & GitHub Access",
      "95+ Google PageSpeed Score on Both Mobile & Desktop",
      "Zero-Lock-In: Clean, documented code that any developer can maintain",
      "30 Days of Free Bug-Fixing & Post-Launch Support"
    ]
  },

  {
    id: "digital-marketing",
    badge: "GROWTH // ROI-DRIVEN",
    category: "Performance Digital Marketing & SEO",
    title: "Data-Driven Marketing, Technical SEO & Paid Ad Funnels",
    tagline: "Drive high-intent traffic, rank #1 on Google, and acquire qualified paying customers at scale.",
    summary: "A beautiful website is useless if nobody finds it. I engineer full-funnel digital marketing campaigns: technical on-page SEO that outranks your competitors, hyper-targeted Google and Meta ad campaigns with positive ROAS, and conversion rate optimization (CRO) that turns clicks into cash.",
    accent: "#F97316",
    turnaround: "Ongoing / Retainer & Sprint",
    roiMetric: "Average 4x – 8x Return On Ad Spend (ROAS)",

    deliverables: [
      {
        title: "Technical & On-Page SEO Domination",
        description: "Complete site structure overhaul, schema markup (JSON-LD), speed optimization, Core Web Vitals fixes, and strategic keyword placement."
      },
      {
        title: "High-ROAS Google Ads (Search, Performance Max)",
        description: "Targeting high-buyer-intent keywords with negative keyword filtering, dynamic headlines, and conversion-optimized ad copies."
      },
      {
        title: "Meta Ads (Instagram & Facebook Paid Funnels)",
        description: "Scroll-stopping video and image creatives, lookalike audiences, retargeting funnels, and Meta Pixel CAPI tracking setup."
      },
      {
        title: "Conversion Rate Optimization (CRO) & Funnel Audits",
        description: "Heatmap analysis, user journey tracking, A/B landing page testing, and copy refinement to maximize conversion percentage."
      },
      {
        title: "Local SEO & Google Business Profile Domination",
        description: "Local citation building, review generation funnels, and localized keyword optimization to capture nearby high-value inquiries."
      }
    ],

    toolsUsed: [
      {
        name: "Google Search Console & GA4",
        role: "Traffic & User Behavior Analytics",
        whyWeUseIt: "Direct insights into what queries bring users to your site, bounce rates, session durations, and user acquisition channels."
      },
      {
        name: "Ahrefs & SEMrush",
        role: "Keyword & Competitor Intelligence",
        whyWeUseIt: "Uncovers competitor backlinks, profitable low-competition keywords, search volume trends, and content gap opportunities."
      },
      {
        name: "Meta Ads Manager & Google Ads",
        role: "Paid Acquisition & Performance Marketing",
        whyWeUseIt: "Deploying laser-targeted campaigns with automated bid strategies, custom lookalike audiences, and high-converting retargeting."
      },
      {
        name: "Hotjar & Microsoft Clarity",
        role: "Heatmaps & User Session Recording",
        whyWeUseIt: "Watching real users navigate your website to identify friction points, drop-offs, and design bottlenecks."
      },
      {
        name: "Google Tag Manager (GTM)",
        role: "Advanced Event & Conversion Tracking",
        whyWeUseIt: "Accurately tracking button clicks, form submissions, purchases, and WhatsApp click-to-chats without messy hardcoding."
      },
      {
        name: "Screaming Frog SEO Spider",
        role: "Deep Technical SEO Crawling",
        whyWeUseIt: "Detecting broken links, redirect chains, missing meta tags, canonical errors, and duplicate content at scale."
      }
    ],

    workflow: [
      {
        step: "01",
        title: "Audit, Competitor Recon & Keyword Discovery",
        description: "We analyze your existing website, dissect your top 3 competitors, and build a master list of high-intent buying keywords.",
        timeline: "Week 1"
      },
      {
        step: "02",
        title: "Technical SEO Fixes & Tracking Infrastructure",
        description: "Deploy GA4, GTM, Meta Pixel, and fix all Core Web Vitals, schema markup, metadata, and indexing errors.",
        timeline: "Week 1 – 2"
      },
      {
        step: "03",
        title: "Content Optimization & High-Converting Landing Pages",
        description: "Write and optimize landing pages with persuasive sales copy, FAQ schema, and strategic call-to-action placements.",
        timeline: "Week 2 – 3"
      },
      {
        step: "04",
        title: "Paid Campaign Launch & Precision Retargeting",
        description: "Deploy hyper-targeted Google and Meta campaigns; test 3-5 creative variations and ad angles with automated budget pacing.",
        timeline: "Week 3+"
      },
      {
        step: "05",
        title: "Weekly Optimization & Transparent ROI Reports",
        description: "Scale winning ads, cut losing ad sets, continuously optimize keyword bid prices, and deliver clear weekly video reports.",
        timeline: "Ongoing"
      }
    ],

    guarantees: [
      "100% Transparent Ad Spend: You pay ad platforms directly with zero hidden markups",
      "Live 24/7 Looker Studio Reporting Dashboard with real-time lead numbers",
      "No long-term lock-in contracts: Earned trust month over month",
      "Actionable insights and weekly video walk-throughs of campaign performance"
    ]
  },

  {
    id: "ai-automation",
    badge: "AUTOMATION // NEXT-GEN",
    category: "AI Chatbots, Custom Agents & Workflow Automation",
    title: "Autonomous AI Agents, Smart Chatbots & Business Automation",
    tagline: "Automate repetitive customer support, lead qualification, and internal ops using state-of-the-art LLMs.",
    summary: "Stop wasting hours on manual data entry, answering repetitive customer questions, or missing late-night leads. I build custom 24/7 AI agents that understand your company documents, reply naturally on WhatsApp/Website, qualify leads automatically, and sync directly with your CRM.",
    accent: "#EA580C",
    turnaround: "5 to 14 Days",
    roiMetric: "Saves 15–25 Hours/Week & Instant 24/7 Response Time",

    deliverables: [
      {
        title: "24/7 AI Customer Support & Sales Chatbots",
        description: "Custom conversational agents trained specifically on your product manuals, pricing, FAQs, and brand tone."
      },
      {
        title: "RAG Knowledge Base & Enterprise Doc Search",
        description: "Connect your PDFs, Notion docs, Google Drive, or database into a secure private vector store for instant, accurate Q&A."
      },
      {
        title: "Automated Lead Qualification & CRM Sync",
        description: "The AI chats with website visitors, asks qualification questions, extracts phone/email, and pushes the lead to HubSpot, Airtable, or Slack."
      },
      {
        title: "End-to-End Workflow Automations (Make / n8n / Zapier)",
        description: "Connecting disparate apps so when a lead comes in, contracts are generated, calendar invites sent, and invoices drafted automatically."
      },
      {
        title: "Multi-Channel Bots (WhatsApp, Web, Telegram, Slack)",
        description: "Deploy your intelligent agent across WhatsApp Business API, Telegram, Slack workspace, or embed it on your web application."
      }
    ],

    toolsUsed: [
      {
        name: "OpenAI GPT-4o & Claude 3.5 Sonnet",
        role: "State-of-the-art Foundation LLMs",
        whyWeUseIt: "Delivers human-like reasoning, deep context comprehension, multilingual support, and reliable tool/function calling."
      },
      {
        name: "LangChain & LlamaIndex",
        role: "Agentic Frameworks & RAG Pipelines",
        whyWeUseIt: "Structures complex multi-step reasoning, dynamic document retrieval, memory persistence, and tool execution."
      },
      {
        name: "Pinecone & Supabase pgvector",
        role: "High-Performance Vector Databases",
        whyWeUseIt: "Millisecond semantic similarity search for custom company knowledge bases with zero data leakage."
      },
      {
        name: "n8n & Make.com",
        role: "Enterprise Workflow Automation Platforms",
        whyWeUseIt: "Visual, resilient webhook workflows connecting hundreds of APIs (Slack, HubSpot, Gmail, Google Sheets) effortlessly."
      },
      {
        name: "FastAPI & Python",
        role: "High-Speed AI Microservices",
        whyWeUseIt: "Asynchronous backend endpoints serving AI inferences, token streaming, and data sanitation with sub-100ms latency."
      },
      {
        name: "WhatsApp Cloud API",
        role: "Direct Messaging Channel",
        whyWeUseIt: "Allowing customers to interact with your AI agent right where they spend most of their time: WhatsApp."
      }
    ],

    workflow: [
      {
        step: "01",
        title: "Bottleneck Analysis & Use-Case Mapping",
        description: "We identify which manual tasks drain the most time: customer support inquiries, lead scoring, or internal knowledge lookup.",
        timeline: "Day 1 – 2"
      },
      {
        step: "02",
        title: "Knowledge Curation & Vector Ingestion",
        description: "We clean, chunk, and embed your company documents, FAQs, and product catalogs into a dedicated vector database.",
        timeline: "Day 3 – 5"
      },
      {
        step: "03",
        title: "Prompt Engineering & Strict Guardrails",
        description: "We program the agent's personality, conversation rules, fallback responses, and anti-hallucination guardrails.",
        timeline: "Day 6 – 8"
      },
      {
        step: "04",
        title: "API Connections & Channel Integration",
        description: "Connecting the agent to your website widget, WhatsApp API, CRM (HubSpot/Notion), and team Slack notifications.",
        timeline: "Day 9 – 11"
      },
      {
        step: "05",
        title: "Live Testing, Staff Training & Handover",
        description: "Rigorous stress testing with real questions, monitoring conversation logs, training your team, and full handover.",
        timeline: "Day 12 – 14"
      }
    ],

    guarantees: [
      "Zero Hallucination Guardrails: Agent only answers based on verified company data",
      "Human Fallback Protocol: Automatically transfers complex inquiries to your team",
      "100% Private & Secure: Your enterprise data is never used to train public models",
      "Full Training Session & Video Documentation for your team"
    ]
  },

  {
    id: "uiux-design",
    badge: "CREATIVE // CONVERSION",
    category: "UI/UX Design, Wireframing & Brand Identity",
    title: "Modern UI/UX Design, Design Systems & Clickable Prototypes",
    tagline: "Intuitive, clean, and conversion-engineered interfaces designed in Figma before writing a single line of code.",
    summary: "Great software starts with great design. I craft sleek, user-friendly digital experiences that look visually stunning and feel intuitive to use. From wireframing and clickable Figma prototypes to complete design systems and brand style guides.",
    accent: "#F59E0B",
    turnaround: "4 to 10 Days",
    roiMetric: "Eliminates 90% of Development Rework & Maximizes UX Usability",

    deliverables: [
      {
        title: "Pixel-Perfect Responsive Figma Designs",
        description: "Mobile, tablet, and desktop UI mockups with autolayout, fluid typography, and clean grid systems."
      },
      {
        title: "Interactive Clickable Prototypes",
        description: "Experience your application before development begins: clickable user flows, dropdowns, modals, and screen transitions."
      },
      {
        title: "Reusable Design Systems & UI Kits",
        description: "Comprehensive component libraries including buttons, inputs, cards, color tokens, and typography scales."
      },
      {
        title: "UX Audit & Conversion Redesign",
        description: "Analyzing existing websites to identify usability flaws, visual clutter, and conversion blockers, then redesigning for maximum sales."
      }
    ],

    toolsUsed: [
      {
        name: "Figma",
        role: "Primary Collaborative Design Tool",
        whyWeUseIt: "Industry-standard vector prototyping, interactive component states, design tokens, and smooth developer handoff."
      },
      {
        name: "Adobe Creative Cloud",
        role: "Vector Graphics & Image Manipulation",
        whyWeUseIt: "Crafting custom icons, branded badges, high-resolution vector illustrations, and photo assets."
      },
      {
        name: "Spline 3D",
        role: "Web 3D Interactive Assets",
        whyWeUseIt: "Creating lightweight interactive 3D assets that render directly in the browser via WebGL."
      },
      {
        name: "Tailwind UI & Shadcn/UI Patterns",
        role: "Design-to-Code Alignment",
        whyWeUseIt: "Ensuring every designed component maps 1:1 with modern code architecture, saving hundreds of engineering hours."
      }
    ],

    workflow: [
      {
        step: "01",
        title: "User Journey & Low-Fi Wireframing",
        description: "Mapping the user flow, information architecture, and core screen layouts to validate usability first.",
        timeline: "Day 1 – 3"
      },
      {
        step: "02",
        title: "Moodboard & Visual Direction",
        description: "Selecting curated color palettes, typography pairings, iconography styles, and aesthetic references.",
        timeline: "Day 4 – 5"
      },
      {
        step: "03",
        title: "High-Fidelity Component & Screen Design",
        description: "Designing all pages with complete responsive variants (Mobile, Tablet, Desktop) in Figma.",
        timeline: "Day 6 – 8"
      },
      {
        step: "04",
        title: "Interactive Prototyping & Client Review",
        description: "Wiring screens into a live clickable prototype for client testing, feedback rounds, and design polish.",
        timeline: "Day 9 – 10"
      }
    ],

    guarantees: [
      "100% Editable Figma Source Files with Full Autolayout",
      "Unlimited Revisions during the Wireframing & Concept Phase",
      "Developer-Ready Design Specs with CSS variables and token exports",
      "Clean asset exports (SVG, PNG, WebP) organized in folders"
    ]
  }
];

export const allToolsCatalog: ToolItem[] = [
  // Frontend
  {
    id: "nextjs",
    name: "Next.js 15",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    role: "Production React Framework",
    description: "Used for lightning-fast Server Components, Server-Side Rendering (SSR), automatic SEO routing, and edge rendering.",
    badge: "CORE STACK",
    proficiency: "Expert / Daily",
    accent: "#FF6B00"
  },
  {
    id: "react",
    name: "React 19",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    role: "UI Library",
    description: "Component-based reactive user interfaces with optimized concurrent rendering and hooks.",
    badge: "UI CORE",
    proficiency: "Expert / Daily",
    accent: "#06B6D4"
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    role: "Type Safety",
    description: "Provides compile-time safety, preventing 99% of frontend runtime bugs and ensuring robust codebases.",
    badge: "ENTERPRISE",
    proficiency: "Advanced",
    accent: "#3178C6"
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    role: "Utility Styling",
    description: "Custom design systems, fluid responsive breakpoints, and zero CSS runtime overhead.",
    badge: "SPEED",
    proficiency: "Expert / Daily",
    accent: "#38BDF8"
  },
  {
    id: "framermotion",
    name: "Framer Motion",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    role: "Animation Engine",
    description: "Used for smooth 60fps micro-animations, layout morphing, parallax, and scroll-triggered physics.",
    badge: "MOTION",
    proficiency: "Advanced",
    accent: "#F43F5E"
  },

  // Backend & DB
  {
    id: "nodejs",
    name: "Node.js & Express",
    category: "backend",
    categoryLabel: "Backend & Database",
    role: "Backend Runtime",
    description: "High-throughput asynchronous REST APIs, webhook listeners, authentication servers, and serverless edge functions.",
    badge: "BACKEND",
    proficiency: "Advanced",
    accent: "#22C55E"
  },
  {
    id: "fastapi",
    name: "Python FastAPI",
    category: "backend",
    categoryLabel: "Backend & Database",
    role: "AI & High-Speed Microservices",
    description: "Ultra-fast asynchronous Python framework for AI agent backend endpoints and data processing pipelines.",
    badge: "AI BACKEND",
    proficiency: "Advanced",
    accent: "#059669"
  },
  {
    id: "postgresql",
    name: "PostgreSQL & Supabase",
    category: "backend",
    categoryLabel: "Backend & Database",
    role: "Relational Database",
    description: "Battle-tested SQL database with Row-Level Security (RLS), real-time WebSockets, and ACID compliance.",
    badge: "DATABASE",
    proficiency: "Advanced",
    accent: "#336791"
  },
  {
    id: "redis",
    name: "Redis",
    category: "backend",
    categoryLabel: "Backend & Database",
    role: "In-Memory Cache & Rate Limiting",
    description: "Sub-millisecond data caching, session management, and API rate limiting under heavy traffic loads.",
    badge: "PERFORMANCE",
    proficiency: "Proficient",
    accent: "#DC2626"
  },

  // Digital Marketing & SEO
  {
    id: "ahrefs",
    name: "Ahrefs & SEMrush",
    category: "marketing",
    categoryLabel: "Digital Marketing & SEO",
    role: "SEO & Competitor Recon",
    description: "Dissecting competitors' search rankings, keyword opportunities, backlink profiles, and domain authority gaps.",
    badge: "SEO INTELLIGENCE",
    proficiency: "Advanced",
    accent: "#FF5722"
  },
  {
    id: "ga4",
    name: "Google Analytics 4 & GTM",
    category: "marketing",
    categoryLabel: "Digital Marketing & SEO",
    role: "User Tracking & Attribution",
    description: "Setting up custom conversion funnels, event tracking, UTM attribution, and lead acquisition reports.",
    badge: "ANALYTICS",
    proficiency: "Expert",
    accent: "#F59E0B"
  },
  {
    id: "metaads",
    name: "Meta Ads Manager",
    category: "marketing",
    categoryLabel: "Digital Marketing & SEO",
    role: "Paid Social Media Advertising",
    description: "Deploying high-converting Facebook and Instagram ad campaigns, lookalike audiences, and retargeting funnels.",
    badge: "PAID ACQUISITION",
    proficiency: "Advanced",
    accent: "#1877F2"
  },
  {
    id: "googleads",
    name: "Google Ads",
    category: "marketing",
    categoryLabel: "Digital Marketing & SEO",
    role: "Search & Intent-Based PPC",
    description: "Capturing users actively searching to buy your product or service right now with negative keyword filtering.",
    badge: "SEARCH ADS",
    proficiency: "Advanced",
    accent: "#4285F4"
  },
  {
    id: "hotjar",
    name: "Hotjar & Clarity",
    category: "marketing",
    categoryLabel: "Digital Marketing & SEO",
    role: "Heatmaps & User Behavior",
    description: "Visual heatmaps and recorded user sessions to pinpoint exactly where visitors click, scroll, or drop off.",
    badge: "CRO TOOLS",
    proficiency: "Advanced",
    accent: "#FD3A13"
  },

  // AI & Automation
  {
    id: "openai",
    name: "OpenAI GPT-4o & Claude 3.5",
    category: "ai",
    categoryLabel: "AI & Automation",
    role: "Foundation AI Models",
    description: "Powering smart customer assistants, lead qualification bots, document reasoning, and programmatic content.",
    badge: "CORE AI",
    proficiency: "Expert",
    accent: "#10A37F"
  },
  {
    id: "langchain",
    name: "LangChain & LlamaIndex",
    category: "ai",
    categoryLabel: "AI & Automation",
    role: "Agentic & RAG Frameworks",
    description: "Connecting LLMs to private databases, PDFs, and custom APIs with deterministic guardrails.",
    badge: "RAG / AGENTS",
    proficiency: "Advanced",
    accent: "#F97316"
  },
  {
    id: "pinecone",
    name: "Pinecone & Qdrant",
    category: "ai",
    categoryLabel: "AI & Automation",
    role: "Vector Database",
    description: "Storing high-dimensional embeddings for sub-second semantic retrieval across thousands of company documents.",
    badge: "VECTOR STORAGE",
    proficiency: "Advanced",
    accent: "#6366F1"
  },
  {
    id: "n8n",
    name: "n8n & Make.com",
    category: "ai",
    categoryLabel: "AI & Automation",
    role: "Visual Workflow Automation",
    description: "Building automated logic that routes leads, updates CRMs, sends Slack alerts, and triggers invoices with zero human touch.",
    badge: "AUTOMATION",
    proficiency: "Expert",
    accent: "#EC4899"
  },

  // Design & Cloud
  {
    id: "figma",
    name: "Figma",
    category: "design",
    categoryLabel: "Design & Prototyping",
    role: "UI/UX & Design Systems",
    description: "Designing clickable interactive prototypes, mobile/desktop screens, and complete design component libraries.",
    badge: "DESIGN CORE",
    proficiency: "Expert",
    accent: "#A259FF"
  },
  {
    id: "vercel",
    name: "Vercel & AWS Edge",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    role: "Global Edge Infrastructure",
    description: "Automated continuous deployment (CI/CD), global serverless functions, instant rollbacks, and 99.99% uptime.",
    badge: "DEPLOYMENT",
    proficiency: "Advanced",
    accent: "#000000"
  },
  {
    id: "docker",
    name: "Docker",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    role: "Containerization",
    description: "Packaging backend services, AI models, and database dependencies for reliable deployment across any server.",
    badge: "DEVOPS",
    proficiency: "Proficient",
    accent: "#2496ED"
  }
];

export const clientFaqs = [
  {
    question: "How long does it typically take to complete a project?",
    answer: "A standard landing page or high-converting business website takes 7 to 10 days. A full-stack web application or custom SaaS MVP typically takes 2 to 4 weeks. AI chatbot automation and technical SEO setups usually launch within 5 to 12 days. We establish clear timelines before starting and stick to them strictly."
  },
  {
    question: "What tools and assets will I need to provide?",
    answer: "To get started, you only need to share your business concept, any existing branding/logos (if available), and reference websites you like. We handle all technical setup: wireframing, copywriting guidance, tech stack selection, coding, testing, and deployment."
  },
  {
    question: "Do I get full ownership of the source code and design files?",
    answer: "Yes, 100%! Once the final milestone is reached, complete ownership of all GitHub repositories, Figma source files, database schemas, and hosting configurations is transferred directly to your accounts. You are never locked into any proprietary system."
  },
  {
    question: "How do payments and milestones work?",
    answer: "We typically work on a clear milestone basis (e.g., 40% project kickoff, 30% upon staging review/working prototype, and 30% upon final launch and handover). For ongoing digital marketing & SEO, we operate on a month-to-month retainer with zero long-term binding contracts."
  },
  {
    question: "What happens after the website or AI bot is launched?",
    answer: "Every project includes 30 days of free dedicated technical support, bug fixing, and staff onboarding. We also offer monthly care plans for continuous feature updates, SEO monitoring, and security backups."
  },
  {
    question: "Can you work with our existing team or codebase?",
    answer: "Absolutely. I frequently collaborate with existing development teams as a specialized senior full-stack/AI engineer or digital marketing strategist, adhering to your Git branching workflows, code reviews, and project management tools."
  }
];
