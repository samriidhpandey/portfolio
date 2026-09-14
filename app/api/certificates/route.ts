import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { CertificateItem, certificatesData, formatLinkedInUrl } from "@/data/certificates";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "certificates.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "certificates");

async function getStoredCertificates(): Promise<CertificateItem[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return certificatesData;
  } catch (error) {
    // If file doesn't exist, create it with initial data
    try {
      await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(certificatesData, null, 2), "utf-8");
    } catch (writeErr) {
      console.error("Failed to initialize certificates.json:", writeErr);
    }
    return certificatesData;
  }
}

async function saveStoredCertificates(certs: CertificateItem[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(certs, null, 2), "utf-8");
}

// GET: Return all certificates
export async function GET() {
  try {
    const certs = await getStoredCertificates();
    return NextResponse.json({ success: true, certificates: certs });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST: Add new certificate (handles both multipart/form-data and JSON)
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let certData: Partial<CertificateItem> = {};
    let uploadedImageUrl: string | undefined = undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("image") as File | null;
      const title = formData.get("title")?.toString() || "";
      const issuer = formData.get("issuer")?.toString() || "";
      const linkedinPostId = formData.get("linkedinPostId")?.toString() || "";
      const linkedinUrl = formData.get("linkedinUrl")?.toString() || "";
      const issueDate = formData.get("issueDate")?.toString() || "";
      const description = formData.get("description")?.toString() || "";
      const category = formData.get("category")?.toString() || "Full Stack";
      const directImageUrl = formData.get("imageUrl")?.toString() || "";

      if (file && typeof file === "object" && file.size > 0) {
        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize and create unique filename
        const ext = path.extname(file.name) || ".png";
        const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
        const fileName = `cert-${Date.now()}-${cleanBase}${ext}`;
        const filePath = path.join(UPLOADS_DIR, fileName);

        await fs.writeFile(filePath, buffer);
        uploadedImageUrl = `/uploads/certificates/${fileName}`;
      } else if (directImageUrl) {
        uploadedImageUrl = directImageUrl;
      }

      certData = {
        title,
        issuer,
        linkedinPostId,
        linkedinUrl,
        issueDate,
        description,
        category,
        image: uploadedImageUrl
      };
    } else {
      certData = await req.json();
    }

    const currentCerts = await getStoredCertificates();

    // Determine final LinkedIn URL from ID or link input
    let finalLinkedInUrl = "";
    if (certData.linkedinPostId && certData.linkedinPostId.trim()) {
      finalLinkedInUrl = formatLinkedInUrl(certData.linkedinPostId.trim());
    } else if (certData.linkedinUrl && certData.linkedinUrl.trim()) {
      finalLinkedInUrl = formatLinkedInUrl(certData.linkedinUrl.trim());
    } else {
      finalLinkedInUrl = "https://www.linkedin.com";
    }

    const newCert: CertificateItem = {
      id: certData.id || `cert-${Date.now()}`,
      title: certData.title?.trim() || "Professional Certificate",
      issuer: certData.issuer?.trim() || "Verified Credential",
      issueDate: certData.issueDate?.trim() || new Date().getFullYear().toString(),
      credentialId: certData.credentialId || `ID-${Math.floor(100000 + Math.random() * 900000)}`,
      category: certData.category || "Full Stack",
      skills: certData.skills || ["Professional Credential", "Verified Skill"],
      description: certData.description?.trim() || "Verified professional credential and practical achievement.",
      accentColor: certData.accentColor || "#0A66C2",
      badge: certData.badge || "Verified",
      image: certData.image || uploadedImageUrl || "",
      linkedinUrl: finalLinkedInUrl,
      linkedinPostId: certData.linkedinPostId?.trim() || ""
    };

    // If updating existing cert by id
    const existingIndex = currentCerts.findIndex((c) => c.id === newCert.id);
    let updatedList: CertificateItem[];
    if (existingIndex >= 0) {
      updatedList = [...currentCerts];
      updatedList[existingIndex] = { ...updatedList[existingIndex], ...newCert };
    } else {
      // Prepend so latest appears first
      updatedList = [newCert, ...currentCerts];
    }

    await saveStoredCertificates(updatedList);

    return NextResponse.json({
      success: true,
      certificate: newCert,
      certificates: updatedList
    });
  } catch (err: any) {
    console.error("Error saving certificate:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE: Remove certificate by id
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing certificate id" }, { status: 400 });
    }

    const currentCerts = await getStoredCertificates();
    const toDelete = currentCerts.find((c) => c.id === id);

    // Optionally delete uploaded image file if exists in uploads
    if (toDelete && toDelete.image && toDelete.image.startsWith("/uploads/certificates/")) {
      try {
        const localPath = path.join(process.cwd(), "public", toDelete.image);
        await fs.unlink(localPath);
      } catch (unlinkErr) {
        // Non-fatal if already deleted
      }
    }

    const updatedList = currentCerts.filter((c) => c.id !== id);
    await saveStoredCertificates(updatedList);

    return NextResponse.json({ success: true, certificates: updatedList });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
