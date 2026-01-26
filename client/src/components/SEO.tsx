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
}: SEOProps) => {
  const siteUrl = window.location.origin;
  const defaultTitle = "Zeya Mosharraf | Data Analyst Portfolio";
  const defaultDescription = "Portfolio of Zeya Mosharraf – Data Analyst skilled in Python, SQL, Power BI, and Automation.";
  const defaultKeywords = "Data Analyst, Python, SQL, Power BI, Portfolio, Dashboard, Automation, Projects";
  const defaultImage = `${siteUrl}/assets/og-image.png`;

  const seo = {
    title: title ? `${title} | Zeya Mosharraf` : defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    image: image || defaultImage,
    url: typeof window !== "undefined" ? window.location.href : canonicalUrl || siteUrl,
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Robots Meta Tag - Control Indexing */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="Zeya Mosharraf Portfolio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={largeTwitterCard ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {twitterHandle && <meta name="twitter:creator" content={`@${twitterHandle}`} />}
      <meta name="twitter:site" content={`@${twitterHandle}`} />
    </Helmet>
  );
};

export default SEO;