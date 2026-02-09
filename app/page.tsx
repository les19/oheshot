import { MainLayout } from '@/components/layout/MainLayout';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/Homepage/HeroSection';

export default function Home() {
  return (
    <MainLayout>
      <Header />
      <HeroSection />
    </MainLayout>
  );
}
