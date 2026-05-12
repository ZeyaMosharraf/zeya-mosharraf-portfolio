import fs from "fs";
import path from "path";

import { blogPosts } from "./client/src/data/blog";

const baseUrl = "https://zeyamosharraf.vercel.app";

// Static pages
const staticRoutes = ["/", "/projects", "/case-studies", "/blog"];

// Dynamic routes (will be empty for now since static data was moved to Supabase)
const projectRoutes: string[] = []; 
const blogRoutes = blogPosts.map((b) => `/blog/${b.slug}`);
const caseStudyRoutes: string[] = [];

const allRoutes = [
  ...staticRoutes,
  ...projectRoutes,
  ...blogRoutes,
  ...caseStudyRoutes,
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (url) => `
  <url>
    <loc>${baseUrl}${url}</loc>
  </url>`
    )
    .join("")}
</urlset>`;

const outDir = path.resolve("dist");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.resolve(outDir, "sitemap.xml"), sitemap);
console.log("Sitemap generated at dist/sitemap.xml");
