export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: "AI / ML" | "Computer Vision" | "NLP" | "AI Agents" | "Full Stack" | "SaaS" | "Automation" | "Data / Analytics";
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  image?: string;
  accentColor: string;
  featured: boolean;
  metrics: {
    label: string;
    value: string;
  }[];
  architecture: {
    overview: string;
    challenge: string;
    solution: string;
    highlights: string[];
  };
}

export const projectCategories = [
  "All",
  "AI / ML",
  "AI Agents",
  "Computer Vision",
  "NLP",
  "Full Stack",
  "SaaS"
] as const;

export const projectsData: ProjectItem[] = [
  {
    id: "neuroflow-orchestrator",
    title: "NeuroFlow",
    subtitle: "Autonomous Multi-Agent Task Orchestration Engine",
    description: "A distributed graph-based execution runtime for multi-agent LLM systems with autonomous memory reflection and self-healing error recovery.",
    longDescription: "NeuroFlow enables teams to compose heterogenous LLM agents into dynamic cyclical execution graphs. Built with a custom Rust-backed task queue and TypeScript API, it reduces multi-hop reasoning latency by 42% and provides deterministic replay capabilities for probabilistic agent workflows.",
    category: "AI Agents",
    technologies: ["Python", "TypeScript", "LangChain", "FastAPI", "Redis", "Docker", "Next.js"],
    githubUrl: "https://github.com/samridhpandey/neuroflow",
    demoUrl: "https://neuroflow.demo.internal",
    image: "/projects/neuroflow.jpg",
    accentColor: "#FF6B00",
    featured: true,
    metrics: [
      { label: "Latency Reduction", value: "42%" },
      { label: "Avg Execution", value: "180ms" },
      { label: "Agent Concurrency", value: "128 Nodes" }
    ],
    architecture: {
      overview: "Hierarchical agent DAG with state snapshotting in Redis and vectorized semantic caching over Pinecone.",
      challenge: "Preventing infinite hallucination loops and handling non-deterministic failures across autonomous multi-agent reasoning chains.",
      solution: "Implemented an algorithmic verification boundary with runtime reflection, schema constraints, and automatic fallback heuristic routing.",
      highlights: [
        "Dynamic graph re-planning based on tool execution feedback",
        "Sub-20ms semantic similarity cache lookup",
        "Deterministic workflow replay & telemetry tracing"
      ]
    }
  },
  {
    id: "auravision-spatial",
    title: "AuraVision",
    subtitle: "Real-time Edge Spatial Intelligence & Detection",
    description: "Low-latency edge perception system running quantized YOLOv8 models for 3D spatial coordinate estimation and multi-object tracking.",
    longDescription: "AuraVision brings zero-cloud spatial perception to edge nodes. Utilizing ONNX Runtime and custom TensorRT quantization, it processes 60 FPS 1080p stereo video streams with depth estimation on consumer hardware without dropping frames.",
    category: "Computer Vision",
    technologies: ["PyTorch", "OpenCV", "TensorRT", "Python", "C++", "WebGL"],
    githubUrl: "https://github.com/samridhpandey/auravision",
    demoUrl: "https://auravision.demo.internal",
    image: "/projects/auravision.jpg",
    accentColor: "#F97316",
    featured: true,
    metrics: [
      { label: "Throughput", value: "62 FPS" },
      { label: "Inference Latency", value: "14.2ms" },
      { label: "mAP@0.5", value: "94.8%" }
    ],
    architecture: {
      overview: "Dual-stream pipeline fusing stereo RGB disparity with lightweight quantized neural feature extractors.",
      challenge: "Severe thermal throttling and memory bottlenecks when deploying heavy spatial transformers on edge micro-architectures.",
      solution: "Structured INT8 model quantization combined with zero-copy shared memory frame buffers between C++ driver and Python inference runtime.",
      highlights: [
        "Zero-latency WebRTC live stream telemetry broadcast",
        "3D bounding-box spatial reconstruction in WebGL viewport",
        "Sub-15ms edge inference on consumer hardware"
      ]
    }
  },
  {
    id: "omnichat-rag",
    title: "OmniRAG Enterprise",
    subtitle: "High-Precision Vectorized Knowledge Search & Synthesis",
    description: "Enterprise hybrid RAG platform combining dense embeddings, BM25 sparse keyword indices, and reranking transformers for 99% citation precision.",
    longDescription: "An end-to-end question answering engine designed for millions of unstructured enterprise documents. Employs recursive chunking, cross-encoder reranking, and dynamic prompt synthesis to ensure complete elimination of hallucinations in regulated domains.",
    category: "NLP",
    technologies: ["Python", "PyTorch", "Hugging Face", "Qdrant", "Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/samridhpandey/omnirag-enterprise",
    demoUrl: "https://omnirag.demo.internal",
    image: "/projects/omnirag.jpg",
    accentColor: "#EA580C",
    featured: true,
    metrics: [
      { label: "Retrieval Accuracy", value: "99.1%" },
      { label: "Index Scale", value: "2.5M Chunks" },
      { label: "Query Time", value: "68ms" }
    ],
    architecture: {
      overview: "Hybrid retrieval layer combining reciprocal rank fusion (RRF) with bi-encoder dense vectors and a fine-tuned cross-encoder reranker.",
      challenge: "Lost-in-the-middle context decay and irrelevant chunk injection lowering output fidelity in large corpora.",
      solution: "Engineered parent-document retrieval with semantic window compression and citation verification filters.",
      highlights: [
        "Deterministic citation attribution with exact source highlighting",
        "Incremental document ingestion with zero-downtime vector reindexing",
        "Real-time streaming token generation with markdown math support"
      ]
    }
  },
  {
    id: "synapse-cloud",
    title: "Synapse Analytics",
    subtitle: "AI-Native Predictive Observability Platform",
    description: "Full-stack predictive monitoring system that forecasts microservice infrastructure anomalies 15 minutes before incidents occur.",
    longDescription: "Synapse ingests millions of time-series log vectors, applies automated seasonal decomposition and LSTM anomaly detection, and provides engineers with an ultra-responsive Next.js visual dashboard with 60 FPS canvas charts.",
    category: "Full Stack",
    technologies: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS", "Docker"],
    githubUrl: "https://github.com/samridhpandey/synapse-cloud",
    demoUrl: "https://synapse.demo.internal",
    accentColor: "#FF6B00",
    featured: true,
    metrics: [
      { label: "Incident Prevention", value: "88%" },
      { label: "Events Ingested", value: "10M+/day" },
      { label: "Dashboard Load", value: "<100ms" }
    ],
    architecture: {
      overview: "Event-driven microservice streaming architecture coupled with an incremental time-series neural forecaster.",
      challenge: "High write throughput during traffic spikes causing database ingestion lag and slow analytical rendering.",
      solution: "Partitioned time-scale hyper-tables with Redis batching and client-side web worker metric rendering.",
      highlights: [
        "Real-time WebSocket telemetry pipeline with auto-reconnection",
        "Interactive 3D latency topology map with WebGL rendering",
        "Automated remediation webhooks triggered on anomaly confidence > 90%"
      ]
    }
  },
  {
    id: "hyperscale-ai-mesh",
    title: "HyperScale Gateway",
    subtitle: "Distributed LLM Load Balancer & Token Router",
    description: "Intelligent gateway providing adaptive semantic routing, model fallback chains, rate limiting, and cost optimization across multiple LLM providers.",
    longDescription: "Handles high-throughput AI API requests by dynamically load balancing across OpenAI, Anthropic, and self-hosted vLLM clusters based on real-time latency, provider token cost, and contextual complexity.",
    category: "AI / ML",
    technologies: ["Go", "Python", "Redis", "Docker", "Prometheus", "Grafana"],
    githubUrl: "https://github.com/samridhpandey/hyperscale-ai-mesh",
    demoUrl: "https://hyperscale.demo.internal",
    accentColor: "#A855F7",
    featured: false,
    metrics: [
      { label: "Cost Savings", value: "37%" },
      { label: "P99 Overhead", value: "3.8ms" },
      { label: "Monthly Requests", value: "5M+" }
    ],
    architecture: {
      overview: "Ultra-lean proxy pipeline with zero-allocation JSON parsing and predictive prompt complexity classification.",
      challenge: "Provider outages and rate limits causing cascading application timeouts across customer applications.",
      solution: "Implemented automated circuit breakers, semantic similarity cache clustering, and graceful token degradation.",
      highlights: [
        "Adaptive prompt routing based on task complexity classification",
        "Zero-allocation streaming proxy with SSE pass-through",
        "Live Grafana telemetry dashboards for token usage and cost metrics"
      ]
    }
  },
  {
    id: "automata-flow",
    title: "Automata Engine",
    subtitle: "Self-Reflecting Automated Browser & Workflow Agent",
    description: "Multi-modal vision and DOM agent that executes complex web workflows, extracts structured data, and validates end-to-end user journeys.",
    longDescription: "Combines vision models with accessibility tree parsing to execute resilient web actions. Unlike brittle CSS selector scrapers, Automata understands visual state and handles popups, CAPTCHAs, and dynamic layouts autonomously.",
    category: "SaaS",
    technologies: ["TypeScript", "Playwright", "Python", "PyTorch", "Next.js"],
    githubUrl: "https://github.com/samridhpandey/automata-flow",
    demoUrl: "https://automata.demo.internal",
    accentColor: "#3B82F6",
    featured: false,
    metrics: [
      { label: "Workflow Success", value: "96.4%" },
      { label: "Self-Healing Rate", value: "89%" },
      { label: "Tasks Automated", value: "45k+" }
    ],
    architecture: {
      overview: "Hybrid DOM and screenshot multimodal reasoning loop with structured JSON action execution.",
      challenge: "Dynamic SPAs with fluctuating DOM trees causing traditional selector-based automation to fail.",
      solution: "Used multimodal perception to verify visual state before and after each executed action with automatic recovery.",
      highlights: [
        "Visual change verification with perceptual hashing",
        "Deterministic schema validation for extracted tabular data",
        "Interactive browser recording playback and step debugger"
      ]
    }
  }
];
