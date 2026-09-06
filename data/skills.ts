export interface SkillNode {
  id: string;
  name: string;
  category: "Languages" | "AI / ML" | "Web" | "Backend" | "Tools";
  level: number; // 0-100
  role: string;
  experience: string;
  highlight: string;
  connectedTo: string[];
}

export const skillCategories = [
  "All",
  "Languages",
  "AI / ML",
  "Web",
  "Backend",
  "Tools"
] as const;

export const skillsData: SkillNode[] = [
  // Languages
  {
    id: "python",
    name: "Python",
    category: "Languages",
    level: 95,
    role: "Primary AI/ML Language & Core Backend",
    experience: "4+ years",
    highlight: "High-performance vector operations, asynchronous services, and neural model engineering",
    connectedTo: ["pytorch", "tensorflow", "scikit-learn", "docker"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Languages",
    level: 92,
    role: "Type-Safe Full-Stack & Systems",
    experience: "3+ years",
    highlight: "Strict typing for complex distributed data schemas, React architectures, and API contracts",
    connectedTo: ["nextjs", "react", "nodejs", "javascript"]
  },
  {
    id: "cpp",
    name: "C++",
    category: "Languages",
    level: 84,
    role: "High-Performance Systems & Tensor Ops",
    experience: "3 years",
    highlight: "Low-level memory management, custom CUDA tensor kernels, and edge model inference runtimes",
    connectedTo: ["python", "pytorch", "git"]
  },
  {
    id: "javascript",
    name: "JavaScript (ESNext)",
    category: "Languages",
    level: 94,
    role: "Modern Client Execution Runtime",
    experience: "4 years",
    highlight: "Event loop concurrency, WebGL integration, and asynchronous browser streams",
    connectedTo: ["typescript", "react", "nodejs"]
  },

  // AI / ML
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI / ML",
    level: 93,
    role: "Deep Learning & Neural Architectures",
    experience: "3 years",
    highlight: "Custom training loops, multi-GPU DDP training, Transformer attention fine-tuning, and ONNX export",
    connectedTo: ["python", "cpp", "docker", "tensorflow"]
  },
  {
    id: "tensorflow",
    name: "TensorFlow / Keras",
    category: "AI / ML",
    level: 86,
    role: "Model Deployment & Quantization",
    experience: "2+ years",
    highlight: "Production serving pipelines, TF-Lite mobile/edge deployment, and computational graphs",
    connectedTo: ["python", "pytorch", "docker"]
  },
  {
    id: "scikit-learn",
    name: "Scikit-Learn",
    category: "AI / ML",
    level: 92,
    role: "Classical Machine Learning & Feature Engineering",
    experience: "3+ years",
    highlight: "Ensemble learning (XGBoost/LightGBM), dimensional reduction, and statistical cross-validation",
    connectedTo: ["python", "pytorch"]
  },
  {
    id: "python-ml-eco",
    name: "Python ML Ecosystem",
    category: "AI / ML",
    level: 96,
    role: "NumPy, Pandas, SciPy, HuggingFace",
    experience: "4 years",
    highlight: "Vectorized SIMD computing, high-scale dataframe transformations, and tokenizers",
    connectedTo: ["python", "pytorch", "scikit-learn"]
  },

  // Web
  {
    id: "nextjs",
    name: "Next.js (App Router)",
    category: "Web",
    level: 94,
    role: "Modern Full-Stack SSR/SSG Framework",
    experience: "3 years",
    highlight: "Server Actions, Streaming SSR, Edge Middleware, and Turbopack optimization",
    connectedTo: ["react", "typescript", "nodejs"]
  },
  {
    id: "react",
    name: "React 19",
    category: "Web",
    level: 95,
    role: "Component Architecture & Reactive UI",
    experience: "3+ years",
    highlight: "Custom hooks, concurrent rendering, Three.js canvas integration, and state atomics",
    connectedTo: ["nextjs", "typescript", "javascript"]
  },
  {
    id: "threejs",
    name: "Three.js / R3F",
    category: "Web",
    level: 88,
    role: "Interactive 3D WebGL Experiences",
    experience: "2 years",
    highlight: "Custom GLSL vertex/fragment shaders, procedural mesh generation, and particle compute",
    connectedTo: ["react", "javascript", "typescript"]
  },

  // Backend
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    level: 90,
    role: "Event-Driven Microservices & Gateways",
    experience: "3+ years",
    highlight: "Non-blocking I/O streaming, WebSocket backplanes, and low-latency API handlers",
    connectedTo: ["typescript", "javascript", "mongodb", "docker"]
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Backend",
    level: 88,
    role: "Document Storage & Vector Search",
    experience: "3 years",
    highlight: "Aggregation pipelines, replica sets, vector search embeddings, and schema indexing",
    connectedTo: ["nodejs", "python", "docker"]
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend",
    level: 94,
    role: "Asynchronous High-Throughput Model APIs",
    experience: "3 years",
    highlight: "ASGI concurrency, Pydantic type validation, and direct CUDA inference endpoints",
    connectedTo: ["python", "pytorch", "docker"]
  },

  // Tools
  {
    id: "docker",
    name: "Docker",
    category: "Tools",
    level: 90,
    role: "Containerization & Reproducible Environments",
    experience: "3+ years",
    highlight: "Multi-stage production builds, NVIDIA CUDA container toolkit, and microservice orchestration",
    connectedTo: ["python", "nodejs", "git"]
  },
  {
    id: "git",
    name: "Git & CI/CD",
    category: "Tools",
    level: 92,
    role: "Version Control & Automated Deployment",
    experience: "4 years",
    highlight: "Trunk-based branch workflows, GitHub Actions pipelines, and automated testing",
    connectedTo: ["docker", "cpp", "typescript"]
  }
];
