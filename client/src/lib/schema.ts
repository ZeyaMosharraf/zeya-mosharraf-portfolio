/**
 * Structured Data (JSON-LD) Helpers
 * Designed to help Google understand the semantic identity and content of the portfolio.
 */

export const siteUrl = "https://zeyamosharraf.vercel.app";

export const getPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Zeya Mosharraf",
  "alternateName": "Zeya",
  "url": siteUrl,
  "image": `${siteUrl}/assets/avatar.png`,
  "jobTitle": "Analytics Engineer",
  "description": "Data Analyst and Analytics Engineer specializing in SQL, Python automation, and Power BI dashboards.",
  "sameAs": [
    "https://linkedin.com/in/zeyamosharraf",
    "https://github.com/ZeyaMosharraf",
    "https://zeyamosharraf.com"
  ],
  "knowsAbout": [
    "SQL",
    "Python",
    "Power BI",
    "Data Analytics",
    "Analytics Engineering",
    "Automation",
    "Data Modeling",
    "Business Intelligence"
  ]
});

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Zeya Mosharraf | Portfolio",
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteUrl}/projects?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
});

export const getProjectSchema = (project: {
  title: string;
  description: string | null;
  category: string;
  tools?: string[] | null;
  thumbnail_url?: string | null;
  github_url?: string | null;
  slug: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.title,
  "description": project.description || "",
  "genre": project.category,
  "author": {
    "@type": "Person",
    "name": "Zeya Mosharraf"
  },
  "image": project.thumbnail_url || `${siteUrl}/assets/og-image.png`,
  "url": `${siteUrl}/project/${project.slug}`,
  "keywords": project.tools?.join(", ") || "",
  "mainEntityOfPage": `${siteUrl}/project/${project.slug}`
});

export const getCaseStudySchema = (caseStudy: {
  title: string;
  description: string | null;
  category: string;
  cover_image?: string | null;
  slug: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": caseStudy.title,
  "description": caseStudy.description || "",
  "genre": caseStudy.category,
  "author": {
    "@type": "Person",
    "name": "Zeya Mosharraf"
  },
  "image": caseStudy.cover_image || `${siteUrl}/assets/og-image.png`,
  "url": `${siteUrl}/case-studies/${caseStudy.slug}`,
  "mainEntityOfPage": `${siteUrl}/case-studies/${caseStudy.slug}`
});

export const getBlogPostingSchema = (post: {
  title: string;
  short_description: string | null;
  published_date: string | null;
  author: string;
  slug: string;
  category: string;
  tags?: string[] | null;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.short_description || "",
  "datePublished": post.published_date || new Date().toISOString(),
  "author": {
    "@type": "Person",
    "name": post.author
  },
  "publisher": {
    "@type": "Person",
    "name": "Zeya Mosharraf"
  },
  "url": `${siteUrl}/blog/${post.slug}`,
  "articleSection": post.category,
  "keywords": post.tags?.join(", ") || ""
});



export const getBreadcrumbSchema = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.item.startsWith("http") ? item.item : `${siteUrl}${item.item}`
  }))
});
