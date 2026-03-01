import fs from "fs";
import path from "path";

import {projects} from "./client/src/data/projectsData";
import {blogPosts} from "./client/src/data/blogdata";
import {certificates} from "./client/src/data/Certificatedata";
import {caseStudies} from "./client/src/data/CaseStudiesdata";

const baseUrl = "https://zeyamosharraf.vercel.app";

const staticRoutes = ["/", "/about", "/contact"];

// Dynamic routes
const projectRoutes = projects.map((p) => `/project/${p.slug}`);
const blogRoutes = blogPosts.map((b) => `/blog/${b.slug}`);
const certificateRoutes = certificates.map((c) => `/certificate/${c.slug}`);
const caseStudyRoutes = caseStudies.map((cs) => `/case-study/${cs.slug}`);

const allRoutes = [
  ...staticRoutes,
  ...projectRoutes,
  ...blogRoutes,
  ...certificateRoutes,
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

const outDir = path.resolve("dist", "public");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.resolve(outDir, "sitemap.xml"), sitemap);
console.log("✅ Sitemap generated at dist/public/sitemap.xml");
