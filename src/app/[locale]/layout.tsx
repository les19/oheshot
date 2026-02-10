import type { Metadata } from "next";
import "@/app/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from "next-intl/server";
import { robotoFlex, nkduyMono } from "@/fonts";

export const metadata: Metadata = {
  title: "Oneshot",
  description: "Ukrainian media league built on action",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${robotoFlex.variable} ${nkduyMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
