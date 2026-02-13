import React from 'react';

interface StructuredDataProps {
  type?: 'Organization' | 'WebSite' | 'WebPage';
  data?: Record<string, unknown>;
}

/**
 * Structured Data Component (JSON-LD)
 * Adds schema.org structured data for better SEO
 */
export const StructuredData: React.FC<StructuredDataProps> = ({
  type = 'Organization',
  data
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oneshot.com';

  const defaultData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: 'Oneshot',
    description: 'Ukrainian media league built on action',
    url: baseUrl,
    logo: `${baseUrl}/icons/logo_b.svg`,
    sameAs: [
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      process.env.NEXT_PUBLIC_TELEGRAM_URL,
    ].filter(Boolean),
  };

  const structuredData = data || defaultData;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
