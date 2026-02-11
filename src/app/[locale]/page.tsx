import { MainLayout } from '@/components/layout/MainLayout';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/Homepage/HeroSection';
import { AboutSection } from '@/components/Homepage/AboutSection';
import { CtaSection } from '@/components/Homepage/CtaSection';
import { RulesSection } from '@/components/Homepage/RulesSection';
import { ContactFormSection } from '@/components/Homepage/ContactFormSection';

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
