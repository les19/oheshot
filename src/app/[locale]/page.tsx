import { MainLayout } from '@/components/layout/MainLayout';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/Homepage/HeroSection';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <MainLayout>
      <Header />
      <h1>{t('title')}</h1>
      <HeroSection />
    </MainLayout>
  );
}
