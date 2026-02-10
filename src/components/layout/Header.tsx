'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Link as IntlLink, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface HeaderProps {
  className?: string;
}

/**
 * Header Component
 * - Logo on left
 * - Navigation links in middle-right
 * - Language switcher and CTA button on far right
 */
export const Header: React.FC<HeaderProps> = ({ className }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('HomePage');

  const navLinks = [
    { href: '#about', label: t('navigation.about') },
    { href: '#rules', label: t('navigation.rules') },
    { href: '#contacts', label: t('navigation.contacts') },
  ];

  return (
    <header
      className={cn(
        'w-full max-w-[1640px] mx-auto px-4 py-4',
        'flex items-center justify-between',
        className
      )}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-1">
        <Image
          src="/icons/logoW.svg"
          alt="ONESHOT Logo"
          width={37}
          height={38}
          className="w-auto h-auto"
        />
        <span className="text-white font-nkduy text-md">ONESHOT.</span>
      </div>

      {/* Navigation Links */}
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

      {/* Right Side: Language Switcher + CTA Button */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Language Switcher */}
        <div className="flex items-center gap-1 text-header-gray font-semibold text-sm lg:text-base">
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
        <Button variant="primary" className="whitespace-nowrap text-sm lg:text-base px-4 lg:px-6">
          {t('cta.join')}
        </Button>
      </div>
    </header>
  );
};
