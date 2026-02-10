import { MainLayout } from '@/components/layout/MainLayout';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/Homepage/HeroSection';
import { AboutSection } from '@/components/Homepage/AboutSection';

export default function Home() {
  return (
    <MainLayout>
      <Header />
      <main className="flex flex-col gap-20">
        <HeroSection />
        <AboutSection />
      </main>
    </MainLayout>
  );
}
