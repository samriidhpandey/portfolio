export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  category: "Full Stack" | "AI / ML" | "Cloud & DevOps" | "Data Science";
  skills: string[];
  description: string;
  accentColor: string;
  badge: string;
}

export const certificatesData: CertificateItem[] = [
  {
    id: "cert-1",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI & Coursera",
    issueDate: "2024",
    credentialId: "DL-AI-849204",
    verifyUrl: "https://coursera.org",
    category: "AI / ML",
    skills: ["Neural Networks", "CNNs", "RNNs", "Transformers", "PyTorch"],
    description: "Mastery of neural network architectures, hyperparameter tuning, sequence models, and attention mechanisms taught by Andrew Ng.",
    accentColor: "#FF6B00",
    badge: "Specialization"
  },
  {
    id: "cert-2",
    title: "Meta Professional Full-Stack Engineer",
    issuer: "Meta",
    issueDate: "2024",
    credentialId: "META-FS-91283",
    verifyUrl: "https://coursera.org",
    category: "Full Stack",
    skills: ["React 19", "Next.js", "Node.js", "Django", "SQL & REST APIs"],
    description: "Industry-standard full-stack web application development, responsive UI design, databases, security, and CI/CD pipelines.",
    accentColor: "#0284C7",
    badge: "Professional Certificate"
  },
  {
    id: "cert-3",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2023",
    credentialId: "AWS-SA-77219",
    verifyUrl: "https://aws.amazon.com/verification",
    category: "Cloud & DevOps",
    skills: ["Cloud Architecture", "EC2 & S3", "Lambda", "Docker", "Security"],
    description: "Architecting secure, cost-optimized, resilient, and high-performance cloud infrastructure for distributed web and AI applications.",
    accentColor: "#F59E0B",
    badge: "Associate Certification"
  },
  {
    id: "cert-4",
    title: "Machine Learning Engineering for Production (MLOps)",
    issuer: "DeepLearning.AI",
    issueDate: "2024",
    credentialId: "MLOPS-PR-33104",
    verifyUrl: "https://coursera.org",
    category: "AI / ML",
    skills: ["Model Serving", "Data Pipelines", "Drift Detection", "FastAPI"],
    description: "Deploying machine learning models to production, continuous training pipelines, feature stores, and automated model monitoring.",
    accentColor: "#EA580C",
    badge: "Production MLOps"
  },
  {
    id: "cert-5",
    title: "Google Cloud Machine Learning Engineer",
    issuer: "Google Cloud",
    issueDate: "2023",
    credentialId: "GCP-ML-49201",
    verifyUrl: "https://cloud.google.com",
    category: "Cloud & DevOps",
    skills: ["Vertex AI", "BigQuery", "TensorFlow", "Kubeflow", "ML Pipelines"],
    description: "Designing, building, and operationalizing machine learning models and scalable cloud infrastructure on Google Cloud Platform.",
    accentColor: "#10B981",
    badge: "Professional Track"
  },
  {
    id: "cert-6",
    title: "Advanced Data Structures & Algorithms in C++",
    issuer: "Stanford Online / AlgoExpert",
    issueDate: "2023",
    credentialId: "DSA-CP-10293",
    verifyUrl: "https://stanford.edu",
    category: "Full Stack",
    skills: ["Graph Algorithms", "Dynamic Programming", "Memory Safety", "C++20"],
    description: "Rigorous computational problem-solving, asymptotic complexity optimization, and deterministic low-level algorithmic design.",
    accentColor: "#8B5CF6",
    badge: "Algorithmic Rigor"
  }
];
