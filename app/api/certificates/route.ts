import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { CertificateItem, certificatesData, formatLinkedInUrl } from "@/data/certificates";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "certificates.json");

async function getStoredCertificates(): Promise<CertificateItem[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return certificatesData;
  } catch (error) {
    return certificatesData;
  }
}

async function saveStoredCertificates(certs: CertificateItem[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(certs, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write to certificates.json (serverless read-only mode):", err);
  }
}

// GET: Return all certificates
export async function GET() {
  try {
    const certs = await getStoredCertificates();
    return NextResponse.json({ success: true, certificates: certs });
  } catch (err: any) {
    return NextResponse.json({ success: true, certificates: [] });
  }
}

// POST: Add or edit certificate (Title, Image, LinkedIn Post ID)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, image, linkedinPostId, linkedinUrl } = body;

    const currentCerts = await getStoredCertificates();

    const postId = (linkedinPostId || linkedinUrl || "").trim();
    const finalLinkedInUrl = formatLinkedInUrl(postId);

    const newCert: CertificateItem = {
      id: id || `cert-${Date.now()}`,
      title: (title || "Certificate").trim(),
      image: image || "",
      linkedinPostId: postId,
      linkedinUrl: finalLinkedInUrl,
      issuer: "LinkedIn Verified",
      badge: "Verified"
    };

    const existingIndex = currentCerts.findIndex((c) => c.id === newCert.id);
    let updatedList: CertificateItem[];

    if (existingIndex >= 0) {
      updatedList = [...currentCerts];
      updatedList[existingIndex] = { ...updatedList[existingIndex], ...newCert };
    } else {
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
    const updatedList = currentCerts.filter((c) => c.id !== id);

    await saveStoredCertificates(updatedList);

    return NextResponse.json({ success: true, certificates: updatedList });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
