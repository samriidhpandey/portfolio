export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ActivityStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  repositoriesCount: number;
  projectsCount: number;
  technologiesCount: number;
  languages: {
    name: string;
    percentage: number;
    color: string;
  }[];
  recentCommits: {
    repo: string;
    message: string;
    branch: string;
    timeAgo: string;
    hash: string;
  }[];
}

// Generate an authentic 52-week contribution matrix pattern (364 days)
export function generateContributionMatrix(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const now = new Date();
  
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    
    // Seed dynamic but reproducible engineering rhythm
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseProb = isWeekend ? 0.35 : 0.85;
    
    // Weighted activity count
    const seed = (d.getFullYear() * 1000 + (d.getMonth() + 1) * 50 + d.getDate()) % 17;
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (seed / 17 < baseProb) {
      if (seed > 13) {
        count = 10 + (seed % 6);
        level = 4;
      } else if (seed > 9) {
        count = 6 + (seed % 4);
        level = 3;
      } else if (seed > 4) {
        count = 3 + (seed % 3);
        level = 2;
      } else {
        count = 1 + (seed % 2);
        level = 1;
      }
    }

    days.push({
      date: dateStr,
      count,
      level
    });
  }

  return days;
}

export const githubActivityData: ActivityStats = {
  totalContributions: 1428,
  currentStreak: 48,
  longestStreak: 84,
  repositoriesCount: 38,
  projectsCount: 16,
  technologiesCount: 24,
  languages: [
    { name: "Python", percentage: 46.2, color: "#EA580C" },
    { name: "TypeScript", percentage: 32.5, color: "#F97316" },
    { name: "C++", percentage: 11.8, color: "#F59E0B" },
    { name: "HTML / CSS / WebGL", percentage: 6.5, color: "#FB923C" },
    { name: "Shell & Dockerfile", percentage: 3.0, color: "#71717A" }
  ],
  recentCommits: [
    {
      repo: "neuroflow",
      message: "feat(runtime): optimize DAG reflection cycle and reduce token overhead",
      branch: "main",
      timeAgo: "2 hours ago",
      hash: "7f4c91a"
    },
    {
      repo: "auravision",
      message: "perf(quantize): benchmark INT8 tensorrt kernel against stereo depth stream",
      branch: "feat/tensorrt",
      timeAgo: "1 day ago",
      hash: "82a90ee"
    },
    {
      repo: "omnirag-enterprise",
      message: "fix(eval): enforce strict citation metadata schema in hybrid reranker",
      branch: "main",
      timeAgo: "3 days ago",
      hash: "b103e5c"
    },
    {
      repo: "synapse-cloud",
      message: "refactor(stream): zero-copy telemetry buffers for canvas metric rendering",
      branch: "main",
      timeAgo: "5 days ago",
      hash: "c45f201"
    }
  ]
};
