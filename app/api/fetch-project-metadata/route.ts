import { NextRequest, NextResponse } from "next/server";

interface ExtractedMetadata {
  title: string;
  subtitle: string;
  category: "Full Stack" | "AI / ML" | "AI Agents" | "SaaS" | "Automation" | "Computer Vision" | "NLP";
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
}

// Helper to clean and format title into Title Case
function formatRepoName(repo: string): string {
  return repo
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((w) => {
      if (w.toLowerCase() === "ai") return "AI";
      if (w.toLowerCase() === "ml") return "ML";
      if (w.toLowerCase() === "ui") return "UI";
      if (w.toLowerCase() === "api") return "API";
      if (w.toLowerCase() === "saas") return "SaaS";
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ")
    .trim();
}

// Helper to determine category from keywords and tech stack
function inferCategory(text: string, tech: string[]): ExtractedMetadata["category"] {
  const lower = (text + " " + tech.join(" ")).toLowerCase();

  if (lower.includes("agent") || lower.includes("crewai") || lower.includes("langchain") || lower.includes("autogen")) {
    return "AI Agents";
  }
  if (lower.includes("machine learning") || lower.includes("deep learning") || lower.includes("pytorch") || lower.includes("tensorflow") || lower.includes("llm") || lower.includes("neural") || lower.includes("model training")) {
    return "AI / ML";
  }
  if (lower.includes("computer vision") || lower.includes("yolo") || lower.includes("opencv") || lower.includes("detection")) {
    return "Computer Vision";
  }
  if (lower.includes("nlp") || lower.includes("sentiment") || lower.includes("transformer") || lower.includes("bert")) {
    return "NLP";
  }
  if (lower.includes("saas") || lower.includes("stripe") || lower.includes("subscription") || lower.includes("crm") || lower.includes("billing")) {
    return "SaaS";
  }
  if (lower.includes("automation") || lower.includes("scraper") || lower.includes("workflow") || lower.includes("crawler")) {
    return "Automation";
  }
  return "Full Stack";
}

// Clean title of unwanted website suffixes
function cleanTitle(raw: string): string {
  return raw
    .replace(/\s*[|\-–—]\s*(GitHub|Vercel|Home|Official Website|App|Portfolio).*$/i, "")
    .replace(/^(GitHub\s*-\s*)/i, "")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let githubUrl = (body.githubUrl || "").trim();
    let demoUrl = (body.demoUrl || "").trim();

    if (!githubUrl && !demoUrl) {
      return NextResponse.json(
        { error: "Please provide at least a GitHub URL or a Project Demo URL." },
        { status: 400 }
      );
    }

    let title = "";
    let subtitle = "";
    let description = "";
    let image = "";
    const techSet = new Set<string>();

    // Normalize GitHub URL
    if (githubUrl && !githubUrl.startsWith("http://") && !githubUrl.startsWith("https://")) {
      githubUrl = `https://${githubUrl}`;
    }

    // Normalize Demo URL
    if (demoUrl && !demoUrl.startsWith("http://") && !demoUrl.startsWith("https://")) {
      demoUrl = `https://${demoUrl}`;
    }

    // 1. Process GitHub URL if provided
    let repoOwner = "";
    let repoName = "";

    if (githubUrl) {
      const ghMatch = githubUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
      if (ghMatch) {
        repoOwner = ghMatch[1];
        repoName = ghMatch[2].replace(/\.git$/i, "");
      }
    }

    if (repoOwner && repoName) {
      try {
        const ghRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
          headers: {
            "User-Agent": "Portfolio-Admin-Agent",
            Accept: "application/vnd.github.v3+json"
          },
          next: { revalidate: 60 }
        });

        if (ghRes.ok) {
          const ghData = await ghRes.json();
          title = ghData.name ? formatRepoName(ghData.name) : "";
          description = ghData.description || "";
          
          if (!demoUrl && ghData.homepage) {
            demoUrl = ghData.homepage.startsWith("http") ? ghData.homepage : `https://${ghData.homepage}`;
          }

          if (ghData.language) {
            techSet.add(ghData.language);
          }

          if (Array.isArray(ghData.topics)) {
            ghData.topics.forEach((t: string) => {
              if (t.length > 1) {
                techSet.add(formatRepoName(t));
              }
            });
          }

          // Fallback social preview image from GitHub OpenGraph
          image = `https://opengraph.githubassets.com/1/${repoOwner}/${repoName}`;
        }

        // Try reading package.json dependencies for framework discovery
        try {
          const pkgRes = await fetch(
            `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/package.json`,
            { headers: { "User-Agent": "Portfolio-Admin-Agent" } }
          );
          let pkgData = null;
          if (pkgRes.ok) {
            pkgData = await pkgRes.json();
          } else {
            // Check master branch
            const masterRes = await fetch(
              `https://raw.githubusercontent.com/${repoOwner}/${repoName}/master/package.json`,
              { headers: { "User-Agent": "Portfolio-Admin-Agent" } }
            );
            if (masterRes.ok) {
              pkgData = await masterRes.json();
            }
          }

          if (pkgData) {
            const deps = { ...pkgData.dependencies, ...pkgData.devDependencies };
            if (deps["next"]) techSet.add("Next.js");
            if (deps["react"]) techSet.add("React");
            if (deps["typescript"]) techSet.add("TypeScript");
            if (deps["tailwindcss"]) techSet.add("Tailwind CSS");
            if (deps["three"] || deps["@react-three/fiber"]) techSet.add("Three.js");
            if (deps["framer-motion"]) techSet.add("Framer Motion");
            if (deps["express"]) techSet.add("Express");
            if (deps["prisma"] || deps["@prisma/client"]) techSet.add("Prisma");
            if (deps["mongodb"] || deps["mongoose"]) techSet.add("MongoDB");
            if (deps["postgresql"] || deps["pg"]) techSet.add("PostgreSQL");
            if (deps["supabase"] || deps["@supabase/supabase-js"]) techSet.add("Supabase");
            if (deps["openai"]) techSet.add("OpenAI API");
            if (deps["lucide-react"]) techSet.add("Lucide");
          }
        } catch (_) {}
      } catch (err) {
        console.error("GitHub fetch error:", err);
      }
    }

    // 2. Process Demo / Live Website URL if provided
    if (demoUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const pageRes = await fetch(demoUrl, {
          signal: controller.signal,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
          }
        });
        clearTimeout(timeoutId);

        if (pageRes.ok) {
          const html = await pageRes.text();

          // OpenGraph Title or <title>
          const ogTitleMatch =
            html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i) ||
            html.match(/<meta\s+name=["']twitter:title["']\s+content=["'](.*?)["']/i) ||
            html.match(/<title[^>]*>(.*?)<\/title>/i);

          if (ogTitleMatch && ogTitleMatch[1]) {
            const pageTitle = cleanTitle(ogTitleMatch[1].trim());
            if (pageTitle && pageTitle.length > 2) {
              title = pageTitle;
            }
          }

          // OpenGraph Description or meta description
          const ogDescMatch =
            html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i) ||
            html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
            html.match(/<meta\s+name=["']twitter:description["']\s+content=["'](.*?)["']/i);

          if (ogDescMatch && ogDescMatch[1] && (!description || description.length < 20)) {
            description = ogDescMatch[1].trim();
          }

          // OpenGraph Image
          const ogImageMatch =
            html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i) ||
            html.match(/<meta\s+name=["']twitter:image["']\s+content=["'](.*?)["']/i) ||
            html.match(/<meta\s+name=["']twitter:image:src["']\s+content=["'](.*?)["']/i);

          if (ogImageMatch && ogImageMatch[1]) {
            let imgUrl = ogImageMatch[1].trim();
            try {
              // Convert relative URL to absolute URL
              imgUrl = new URL(imgUrl, demoUrl).href;
              image = imgUrl;
            } catch (_) {
              if (imgUrl.startsWith("http")) image = imgUrl;
            }
          }

          // Fallback to real live website screenshot if no og:image found
          if (!image && demoUrl) {
            image = `https://api.microlink.io?url=${encodeURIComponent(demoUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
          }

          // Tech detection from page HTML
          if (html.includes("__NEXT_DATA__") || html.includes("/_next/")) {
            techSet.add("Next.js");
            techSet.add("React");
          }
          if (html.includes("tailwind") || html.includes("tw-")) {
            techSet.add("Tailwind CSS");
          }
          if (html.includes("three.js") || html.includes("r3f") || html.includes("webgl")) {
            techSet.add("Three.js");
          }
          if (html.includes("vite")) {
            techSet.add("Vite");
          }
        }
      } catch (pageErr) {
        console.error("Live page metadata fetch error:", pageErr);
      }
    }

    // Default title fallback if still empty
    if (!title) {
      if (repoName) {
        title = formatRepoName(repoName);
      } else if (demoUrl) {
        try {
          const host = new URL(demoUrl).hostname.replace(/^www\./, "").split(".")[0];
          title = formatRepoName(host);
        } catch (_) {
          title = "Web Application";
        }
      } else {
        title = "Production Project";
      }
    }

    // Generate smart subtitle
    if (!subtitle) {
      if (description) {
        const firstSentence = description.split(/[.!?]/)[0].trim();
        if (firstSentence.length <= 45) {
          subtitle = firstSentence;
        } else {
          subtitle = firstSentence.split(" ").slice(0, 5).join(" ") + "...";
        }
      } else {
        subtitle = "Production Full-Stack Web Platform";
      }
    }

    // Default description fallback
    if (!description) {
      description = `A modern, responsive web application and intelligent software platform built with modern architectural standards.`;
    }

    // Default technologies if set is empty
    if (techSet.size === 0) {
      techSet.add("Next.js");
      techSet.add("TypeScript");
      techSet.add("Tailwind CSS");
    }

    const techArray = Array.from(techSet).slice(0, 6);
    const category = inferCategory(title + " " + description + " " + subtitle, techArray);

    const result: ExtractedMetadata = {
      title,
      subtitle,
      category,
      description,
      technologies: techArray,
      image: image || undefined,
      githubUrl: githubUrl || undefined,
      demoUrl: demoUrl || undefined
    };

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch project metadata." },
      { status: 500 }
    );
  }
}
