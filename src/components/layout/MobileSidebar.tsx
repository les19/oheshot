'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link as IntlLink, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Mobile/Tablet Sidebar Navigation
 * - Slides in from the right (296px wide)
 * - Logo + close button at top
 * - Nav links: ПРО НАС, ПРАВИЛА, КОНТАКТИ (32px bold uppercase)
 * - Language switcher (UA / EN)
 * - CTA button at bottom → scrolls to #contacts form section
 * - Closes on: backdrop click, close button, nav link click, ESC key
 */
export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('HomePage');

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navLinks = [
    { href: '#about', label: t('navigation.about') },
    { href: '#rules', label: t('navigation.rules') },
    { href: '#contacts', label: t('navigation.contacts') },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-[296px] bg-black z-50 lg:hidden',
          'flex flex-col transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Mobile navigation"
      >
        {/* Top bar: logo + close button */}
        <div className="flex items-center justify-between p-4 backdrop-blur-[8px] bg-black/80">
          <div className="flex flex-col items-center gap-0.5">
            <Image
              src="/icons/logo_w.svg"
              alt="ONESHOT Logo"
              width={30}
              height={30}
              className="w-auto h-auto"
            />
            <span className="text-white font-nkduy text-xs">ONESHOT.</span>
          </div>
          <button
            onClick={onClose}
            className="bg-secondary-dark border border-divider flex items-center justify-center p-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-8 px-4 pt-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-white text-[32px] font-black uppercase leading-[1.1]"
            >
              {link.label}
            </Link>
          ))}

          {/* Language switcher */}
          <div className="flex items-baseline gap-2 text-[32px] font-black uppercase leading-[1.1]">
            <IntlLink
              href={pathname}
              locale="uk"
              onClick={onClose}
              className={cn(
                'transition-colors',
                locale === 'uk' ? 'text-primary-pink' : 'text-[#3d3d3d]'
              )}
            >
              UA
            </IntlLink>
            <span className="text-[#3d3d3d]">/</span>
            <IntlLink
              href={pathname}
              locale="en"
              onClick={onClose}
              className={cn(
                'transition-colors',
                locale === 'en' ? 'text-primary-pink' : 'text-[#3d3d3d]'
              )}
            >
              EN
            </IntlLink>
          </div>
        </nav>

        {/* CTA button at bottom → leads to form section */}
        <div className="mt-auto p-4">
          <Link href="#contacts" onClick={onClose}>
            <Button variant="primary" className="w-full py-3 text-base font-semibold">
              {t('cta.join')}
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
};
