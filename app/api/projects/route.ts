import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { ProjectItem, projectsData } from "@/data/projects";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "projects.json");

async function getStoredProjects(): Promise<ProjectItem[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return projectsData;
  } catch (error) {
    // If file doesn't exist, initialize it with projectsData
    try {
      await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(projectsData, null, 2), "utf-8");
    } catch (writeErr) {
      console.error("Failed to initialize projects.json:", writeErr);
    }
    return projectsData;
  }
}

async function saveStoredProjects(projects: ProjectItem[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(projects, null, 2), "utf-8");
}

// GET: Return all projects
export async function GET() {
  try {
    const projects = await getStoredProjects();
    return NextResponse.json({ success: true, projects });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST: Add or update project
export async function POST(req: NextRequest) {
  try {
    const project: ProjectItem = await req.json();
    const current = await getStoredProjects();

    const existingIndex = current.findIndex((p) => p.id === project.id);
    let updated: ProjectItem[];

    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...project };
    } else {
      updated = [project, ...current];
    }

    await saveStoredProjects(updated);
    return NextResponse.json({ success: true, projects: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE: Remove project by id permanently
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing project id" }, { status: 400 });
    }

    const current = await getStoredProjects();
    const updated = current.filter((p) => p.id !== id);

    await saveStoredProjects(updated);
    return NextResponse.json({ success: true, projects: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
