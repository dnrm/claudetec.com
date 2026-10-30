import type { MetadataRoute } from "next";
import { getMembers } from "./mesa/members";
import { SITE_URL } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/blog/ganadores-hackathon-oct-24", ...getMembers().map((m) => `/mesa/${m.slug}`)].map(
    (path) => ({ url: `${SITE_URL}${path}` }),
  );
}
