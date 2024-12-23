import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  imageUrl?: string;
}

export function SEO({
  title,
  description,
  keywords = [],
  canonicalUrl,
  imageUrl,
}: SEOProps) {
  const domain = "https://calculator.info";
  const fullUrl = canonicalUrl ? `${domain}${canonicalUrl}` : domain;
  const defaultImage = `${domain}/social-share.jpg`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl || defaultImage} />
      <meta property="og:site_name" content="Calculator.info" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl || defaultImage} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={fullUrl} />}

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
}
