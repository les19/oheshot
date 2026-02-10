import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from "next-intl/server";

const robotoFlex = localFont({
  src: "../public/fonts/roboto/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf",
  variable: "--font-roboto",
  display: "swap",
  weight: "100 1000",
});

const nkduyMono = localFont({
  src: [
    {
      path: "../public/fonts/nkduy/NKDuyMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nkduy/NKDuyMono-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-nkduy",
  display: "swap",
});

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
