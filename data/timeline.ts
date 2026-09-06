export interface TimelineItem {
  year: string;
  phase: string;
  title: string;
  description: string;
  tags: string[];
  achievements: string[];
  metrics: string;
}

export const timelineData: TimelineItem[] = [
  {
    year: "2026",
    phase: "PHASE 04",
    title: "AI Engineering & Autonomous Products",
    description: "Architecting autonomous multi-agent systems, sub-second generative AI orchestration runtimes, and enterprise-grade intelligent SaaS applications.",
    tags: ["Autonomous Agents", "Vector Databases", "Distributed Inference", "vLLM", "Full-Stack AI"],
    achievements: [
      "Engineered NeuroFlow: graph execution engine for recursive multi-agent collaboration",
      "Built low-latency model gateway reducing inference costs by 37% with adaptive routing",
      "Deployed end-to-end full-stack AI SaaS with automated continuous evaluation"
    ],
    metrics: "Production-ready autonomous systems"
  },
  {
    year: "2025",
    phase: "PHASE 03",
    title: "Applied Machine Learning & Deep Neural Nets",
    description: "Deepened research in transformer architectures, computer vision, PyTorch model fine-tuning, and hybrid vector RAG systems.",
    tags: ["PyTorch", "Transformers", "Computer Vision", "YOLOv8", "RAG Systems", "HuggingFace"],
    achievements: [
      "Trained quantized edge vision models achieving 60 FPS on lightweight hardware",
      "Implemented enterprise RAG search engine with 99.1% factual citation fidelity",
      "Conducted 50+ deep learning experiments across multimodal embedding alignments"
    ],
    metrics: "50+ experimental runs & fine-tunes"
  },
  {
    year: "2024",
    phase: "PHASE 02",
    title: "Modern Full-Stack Engineering & Cloud Systems",
    description: "Mastered modern reactive web architectures, high-concurrency microservices, TypeScript ecosystems, and performant databases.",
    tags: ["Next.js", "TypeScript", "React", "Node.js", "MongoDB", "Tailwind CSS", "Docker"],
    achievements: [
      "Engineered resilient Next.js full-stack platforms with dynamic SSR and edge caching",
      "Developed high-throughput REST & WebSocket services handling concurrent real-time state",
      "Containerized distributed multi-service backends using Docker and CI/CD automation"
    ],
    metrics: "10+ web applications & microservices"
  },
  {
    year: "2023",
    phase: "PHASE 01",
    title: "Programming Foundations & Algorithmic Rigor",
    description: "Built deep computational intuition through core systems programming, data structures, algorithm optimization, and mathematics.",
    tags: ["C++", "Python", "Data Structures", "Algorithms", "Linear Algebra", "Linux"],
    achievements: [
      "Solved 400+ algorithmic and data structure problems with strict time/space complexity",
      "Wrote low-level C++ computational routines and memory-optimized algorithms",
      "Formulated mathematical intuition for vector spaces, calculus, and matrix transformations"
    ],
    metrics: "400+ algorithmic problems solved"
  }
];
