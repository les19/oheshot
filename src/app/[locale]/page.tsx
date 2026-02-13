import { MainLayout } from '@/components/layout/MainLayout';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/Homepage/HeroSection';
import { AboutSection } from '@/components/Homepage/AboutSection';
import { CtaSection } from '@/components/Homepage/CtaSection';
import { RulesSection } from '@/components/Homepage/RulesSection';
import { ContactFormSection } from '@/components/Homepage/ContactFormSection';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Oneshot",
    description: "Українська медіа-ліга, побудована на дії. Це напруга з першої секунди, рух, який не дозволяє відвести погляд.",
    openGraph: {
      title: "Oneshot - Українська медіа-ліга, побудована на дії",
      description: "Це напруга з першої секунди, рух, який не дозволяє відвести погляд, і момент, у якому все вирішується одразу.",
    },
  };
}

export default function Home() {
  return (
    <MainLayout footer={<Footer />}>
      <Header />
      <main className="flex flex-col gap-20">
        <HeroSection />
        <AboutSection />
        <CtaSection />
        <RulesSection />
        <ContactFormSection />
      </main>
    </MainLayout>
  );
}
