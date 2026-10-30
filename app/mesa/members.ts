import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

// One file per member in content/mesa/; the filename is the URL slug.
// Frontmatter is flat `key: value` lines (interests comma-separated), the body is the bio.
// ponytail: hand-rolled frontmatter parser, swap for gray-matter if we ever need nested YAML.
const dir = path.join(process.cwd(), "content/mesa");

export type Member = {
  slug: string;
  order: number;
  name: string;
  role: string;
  semester: string;
  major: string;
  image: string;
  interests: string[];
  linkedin: string;
  website: string;
  email: string;
  bio: string[];
};

function parse(file: string): Member {
  const raw = readFileSync(path.join(dir, file), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`content/mesa/${file}: missing frontmatter`);
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return {
    slug: file.replace(/\.md$/, ""),
    order: Number(data.order) || 0,
    name: data.name ?? "",
    role: data.role ?? "",
    semester: data.semester ?? "",
    major: data.major ?? "",
    image: data.image ?? "",
    interests: (data.interests ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    linkedin: data.linkedin ?? "",
    website: data.website ?? "",
    email: data.email ?? "",
    bio: match[2].split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
  };
}

export function getMembers(): Member[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => a.order - b.order);
}

export function getMember(slug: string): Member | undefined {
  return getMembers().find((m) => m.slug === slug);
}

export const study = (m: Member) => `${m.major} · ${m.semester} semestre`;
