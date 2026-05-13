import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
  canonicalUrl?: string;
  twitterHandle?: string;
  largeTwitterCard?: boolean;
  noIndex?: boolean;
  schemaData?: object | object[];
}

export const SEO = ({
  title,
  description,
  keywords,
  image,
  article = false,
  canonicalUrl,
  twitterHandle = "zeyamosharraf",
  largeTwitterCard = true,
  noIndex = false,
  schemaData,
}: SEOProps) => {
  const siteUrl = "https://zeyamosharraf.vercel.app"; // Production URL for canonical consistency

  const defaultTitle = "Zeya Mosharraf | Data Analyst & Analytics Engineer";

  const defaultDescription =
    "Portfolio of Zeya Mosharraf — Data Analyst specializing in Python, SQL, Power BI, Google Cloud, and Machine Learning. Explore projects, certifications, and data-driven insights.";

  const defaultKeywords = [
    // Personal branding
    "Zeya Mosharraf", "Zeya Mosharraf portfolio", "Zeya Mosharraf data analyst",
    // Core role
    "Data Analyst", "Analytics Engineer", "Data Analytics Portfolio",
    // Tools & Technologies
    "Python", "SQL", "Power BI", "Tableau", "Looker Studio",
    "Google Cloud", "BigQuery", "Excel", "R", "Pandas",
    // Specializations
    "Machine Learning", "Predictive Modeling", "Data Visualization",
    "ETL", "Data Engineering", "Business Intelligence",
    // Long-tail phrases
    "data analyst portfolio", "Python data analysis projects",
    "SQL projects", "Power BI dashboards", "Google Cloud certified",
    "data driven decision making", "data science projects",
  ].join(", ");

  const defaultImage = `${siteUrl}/assets/og-image.png`;

  // Determine actual canonical URL
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
  const finalCanonicalUrl = canonicalUrl || `${siteUrl}${currentPath}`;

  const seo = {
    title: title ? `${title} | Zeya Mosharraf` : defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    image: image || defaultImage,
    url: finalCanonicalUrl,
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content="Zeya Mosharraf" />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="Zeya Mosharraf | Data Analyst Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={largeTwitterCard ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {twitterHandle && <meta name="twitter:creator" content={`@${twitterHandle}`} />}
      <meta name="twitter:site" content={`@${twitterHandle}`} />

      {/* Structured Data (JSON-LD) */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;