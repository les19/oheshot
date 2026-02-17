import type { Metadata } from "next";
import "@/app/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from "next-intl/server";
import { robotoFlex, nkduyMono } from "@/fonts";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oneshot.kiev.ua/";

  return {
    title: {
      default: "Oneshot",
      template: "%s | Oneshot",
    },
    description: "Українська медіа-ліга, побудована на дії. Це напруга з першої секунди, рух, який не дозволяє відвести погляд.",
    keywords: ["українська медіа-ліга", "медіа-ліга", "дія", "Україна", "медіа", "oneshot"],
    authors: [{ name: "Oneshot" }],
    creator: "Oneshot",
    publisher: "Oneshot",
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "uk_UA",
      url: "/",
      siteName: "Oneshot",
      title: "Oneshot - Українська медіа-ліга, побудована на дії",
      description: "Це напруга з першої секунди, рух, який не дозволяє відвести погляд, і момент, у якому все вирішується одразу.",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Oneshot - Українська медіа-ліга",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Oneshot - Українська медіа-ліга, побудована на дії",
      description: "Це напруга з першої секунди, рух, який не дозволяє відвести погляд, і момент, у якому все вирішується одразу.",
      images: ["/images/og-image.jpg"],
      creator: "@oneshot_official",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add your verification codes here when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oneshot.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Oneshot',
    description: 'Українська медіа-ліга, побудована на дії',
    url: baseUrl,
    logo: `${baseUrl}/icons/logoW.svg`,
    sameAs: [
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      process.env.NEXT_PUBLIC_TELEGRAM_URL,
    ].filter(Boolean),
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Oneshot',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang={locale}>
      <body
        className={`${robotoFlex.variable} ${nkduyMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
