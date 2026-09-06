export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  availability: string;
  location: string;
  bio: string[];
  stats: {
    label: string;
    value: number;
    suffix: string;
    description: string;
  }[];
  socials: {
    platform: string;
    url: string;
    username: string;
    icon: string;
  }[];
  systemMetrics: {
    latency: string;
    modelAccuracy: string;
    throughput: string;
    status: string;
  };
}

export const profileData: ProfileData = {
  name: "Samridh Pandey",
  title: "Freelance Web Developer × AI Engineer × Digital Marketing Strategist",
  tagline: "I build high-converting modern websites, autonomous AI systems, and ROI-driven digital marketing campaigns to scale brands and businesses.",
  availability: "Available for Freelance Projects & Digital Marketing Contracts",
  location: "India • Available Globally for Freelance & Remote Work",
  bio: [
    "As an independent freelance engineer and digital marketer, I partner with businesses, startups, and founders to turn ideas into profitable digital assets.",
    "From designing ultra-fast Next.js websites and custom e-commerce stores to architecting AI chatbots and managing high-ROI Google/Meta advertising campaigns.",
    "My focus is simple: deliver exceptional technical execution that drives actual business revenue, qualified leads, and measurable growth."
  ],
  stats: [
    {
      label: "Websites & Projects",
      value: 28,
      suffix: "+",
      description: "Delivered for clients, businesses & startups worldwide"
    },
    {
      label: "Client ROI & Growth",
      value: 350,
      suffix: "%",
      description: "Average conversion and lead surge on client campaigns"
    },
    {
      label: "Ad Spend Managed",
      value: 50,
      suffix: "k$+",
      description: "Profitable Google & Meta Ads performance campaigns"
    },
    {
      label: "Client Satisfaction",
      value: 99,
      suffix: "%",
      description: "On-time delivery, clear updates & direct support"
    }
  ],
  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/samriidhpandey",
      username: "@samriidhpandey",
      icon: "Github"
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/samridh-pandey",
      username: "samridh-pandey",
      icon: "Linkedin"
    },
    {
      platform: "Email",
      url: "mailto:samridhpandey727@gmail.com",
      username: "samridhpandey727@gmail.com",
      icon: "Mail"
    },
    {
      platform: "Resume",
      url: "#",
      username: "Download CV",
      icon: "FileText"
    }
  ],
  systemMetrics: {
    latency: "18ms",
    modelAccuracy: "99.4%",
    throughput: "2.4k tps",
    status: "OPEN FOR CLIENTS"
  }
};
