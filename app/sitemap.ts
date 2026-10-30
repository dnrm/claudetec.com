import type { MetadataRoute } from "next";
import { posts } from "./blog/posts";
import { getMembers } from "./mesa/members";
import { SITE_URL } from "./seo";
import { pages } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    ...pages.map((p) => `/${p.slug}`),
    "/mesa",
    "/blog",
    ...posts.map((p) => `/blog/${p.slug}`),
    ...getMembers().map((m) => `/mesa/${m.slug}`),
  ].map(
    (path) => ({ url: `${SITE_URL}${path}` }),
  );
}
