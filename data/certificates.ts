export interface CertificateItem {
  id: string;
  title: string;
  image: string;
  linkedinPostId?: string;
  linkedinUrl: string;
  issuer?: string;
  issueDate?: string;
  credentialId?: string;
  verifyUrl?: string;
  category?: string;
  skills?: string[];
  description?: string;
  accentColor?: string;
  badge?: string;
}

export function formatLinkedInUrl(input: string): string {
  if (!input) return "https://www.linkedin.com";
  const trimmed = input.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  if (trimmed.startsWith("urn:li:")) {
    return `https://www.linkedin.com/feed/update/${trimmed}`;
  }
  // Remove spaces or any special prefix
  const cleanId = trimmed.replace(/[^a-zA-Z0-9_-]/g, "");
  return `https://www.linkedin.com/feed/update/urn:li:activity:${cleanId}`;
}

export const DEFAULT_FEATURED_LINKEDIN_EMBED = "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7472653645004857344?collapsed=1";

export function extractIframeSrc(input: string): string {
  if (!input) return DEFAULT_FEATURED_LINKEDIN_EMBED;
  const trimmed = input.trim();
  const match = trimmed.match(/src=["'](.*?)["']/);
  if (match && match[1]) {
    return match[1];
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return DEFAULT_FEATURED_LINKEDIN_EMBED;
}

export const certificatesData: CertificateItem[] = [];
