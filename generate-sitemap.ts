import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

/**
 * Sitemap Generator
 * Fetches dynamic slugs from Supabase to ensure all projects, blogs, and case studies are indexed.
 */

const baseUrl = "https://zeyamosharraf.vercel.app";

// Fallback for local execution environment variables
const loadEnv = () => {
  if (fs.existsSync('.env')) {
    const env = fs.readFileSync('.env', 'utf-8');
    env.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) process.env[key.trim()] = value.trim();
    });
  }
};

async function generateSitemap() {
  console.log("🚀 Starting sitemap generation...");
  loadEnv();

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Supabase environment variables missing. Skipping dynamic routes.");
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Static pages
  const staticRoutes = ["/", "/projects", "/case-studies", "/blog"];

  // Fetch dynamic routes
  console.log("📡 Fetching dynamic slugs from Supabase...");
  
  const [
    { data: projects },
    { data: blogs },
    { data: caseStudies }
  ] = await Promise.all([
    supabase.from('projects').select('slug'),
    supabase.from('blog_posts').select('slug'),
    supabase.from('case_studies').select('slug')
  ]);

  const projectRoutes = projects?.map(p => `/project/${p.slug}`) || [];
  const blogRoutes = blogs?.map(b => `/blog/${b.slug}`) || [];
  const caseStudyRoutes = caseStudies?.map(cs => `/case-study/${cs.slug}`) || [];

  const allRoutes = [
    ...staticRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
  ];

  console.log(`✅ Found ${allRoutes.length} total routes (${staticRoutes.length} static, ${allRoutes.length - staticRoutes.length} dynamic).`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (url) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>${url === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  const outDir = path.resolve("dist");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  // Also write to public for local dev preview if needed, but dist is for production
  fs.writeFileSync(path.resolve(outDir, "sitemap.xml"), sitemap);
  console.log("✨ Sitemap generated successfully at dist/sitemap.xml");
}

generateSitemap().catch(err => {
  console.error("❌ Error generating sitemap:", err);
  process.exit(1);
});
