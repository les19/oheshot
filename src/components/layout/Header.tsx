'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Link as IntlLink, usePathname } from '@/i18n/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui';
import { MobileSidebar } from './MobileSidebar';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface HeaderProps {
  className?: string;
}

/**
 * Header Component
 * - Desktop (lg+): Logo, nav links, language switcher, CTA button
 * - Tablet/Mobile (<lg): Logo, hamburger button → opens sidebar
 */
export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('HomePage');

  const navLinks = [
    { href: '#about', label: t('navigation.about') },
    { href: '#rules', label: t('navigation.rules') },
    { href: '#contacts', label: t('navigation.contacts') },
  ];

  return (
    <>
      <header
        className={cn(
          'w-full max-w-[1640px] mx-auto px-0 md:px-10 py-4',
          'flex items-center justify-between',
          className
        )}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-1 ">
          <Image
            src="/icons/logo_w.svg"
            alt="ONESHOT Logo"
            width={37}
            height={38}
            className="w-auto h-auto md:max-h-[38px] max-h-[24px]"
          />
          <span className="text-white font-nkduy md:text-md text-xs">ONESHOT.</span>
        </div>

        {/* Navigation Links — Desktop only */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-header-gray font-semibold hover:text-primary-pink-hover active:text-primary-pink-active transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Language Switcher + CTA Button — Desktop only */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 text-header-gray font-semibold text-base">
            <IntlLink
              href={pathname}
              locale="uk"
              className={cn(
                "transition-colors",
                locale === 'uk'
                  ? "font-bold text-primary-pink active:text-primary-pink-active"
                  : "font-normal hover:text-primary-pink-hover active:text-primary-pink-active"
              )}
            >
              UA
            </IntlLink>
            <span className="font-normal">/</span>
            <IntlLink
              href={pathname}
              locale="en"
              className={cn(
                "transition-colors",
                locale === 'en'
                  ? "font-bold text-primary-pink active:text-primary-pink-active"
                  : "font-normal hover:text-primary-pink-hover active:text-primary-pink-active"
              )}
            >
              EN
            </IntlLink>
          </div>

          {/* CTA Button */}
          <Link href="#contacts">
            <Button variant="primary" className="whitespace-nowrap text-base px-6">
              {t('cta.join')}
            </Button>
          </Link>
        </div>

        {/* Hamburger Button — Tablet/Mobile only */}
        <button
          className="lg:hidden bg-secondary-dark border border-divider flex items-center justify-center p-2"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </header>

      {/* Mobile/Tablet Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};
