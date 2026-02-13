import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oneshot.com';
  
  // Supported locales
  const locales = ['en', 'uk'];
  
  // Generate sitemap entries for each locale
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    // Add more routes as your site grows
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.8,
    // },
  ];
  
  // Generate localized versions
  const localizedRoutes: MetadataRoute.Sitemap = [];
  
  locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = locale === 'en' ? route.url : `${baseUrl}/${locale}${route.url === baseUrl ? '' : route.url.replace(baseUrl, '')}`;
      localizedRoutes.push({
        url,
        lastModified: route.lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [
              loc,
              loc === 'en' ? baseUrl : `${baseUrl}/${loc}${route.url === baseUrl ? '' : route.url.replace(baseUrl, '')}`,
            ])
          ),
        },
      });
    });
  });
  
  return localizedRoutes;
}
