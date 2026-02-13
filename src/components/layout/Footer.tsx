'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Instagram, Send, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

/**
 * Footer Component
 * - Navigation panel (logo, links, social icons) — same structure as Header
 * - Large ONESHOT SVG text logo
 * - Footer lights gradient overlay for the pink glow effect
 */
export const Footer: React.FC<FooterProps> = ({ className }) => {
  const t = useTranslations('HomePage');

  const navLinks = [
    { href: '#about', label: t('navigation.about') },
    { href: '#rules', label: t('navigation.rules') },
    { href: '#contacts', label: t('navigation.contacts') },
  ];

  const socialLinks = [
    { href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#', icon: Instagram, label: 'Instagram' },
    { href: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? '#', icon: Send, label: 'Telegram' },
    { href: process.env.NEXT_PUBLIC_EMAIL_URL ?? '#', icon: Mail, label: 'Email' },
  ];

  return (
    <footer className={cn('w-full', className)}>
      {/* Navigation Panel — mirrors Header structure */}
      <div className="max-w-[1640px] mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col gap-1 items-center ">
          <Image
            src="/icons/logo_w.svg"
            alt="ONESHOT Logo"
            width={37}
            height={38}
            className="w-auto h-auto"
          />
          <span className="text-white font-nkduy text-md">ONESHOT.</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold transition-colors text-header-gray hover:text-primary-pink-hover active:text-primary-pink-active"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4 items-center">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className={cn(
                'w-10 h-10 rounded-none border border-header-gray bg-dark-gray',
                'flex justify-center items-center',
                'hover:bg-dark-gray/80 hover:border-primary-pink-hover',
                'active:bg-dark-gray/60 active:border-primary-pink-active',
                'transition-all duration-200'
              )}
            >
              <social.icon className="w-5 h-5 text-header-gray" />
            </a>
          ))}
        </div>
      </div>
      {/* Navigation Links */}
      <nav className="flex gap-8 items-center md:hidden  px-4  mx-auto justify-between my-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-semibold transition-colors text-header-gray hover:text-primary-pink-hover active:text-primary-pink-active"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="overflow-hidden relative mt-10 w-full">
        {/* ONESHOT text SVG */}
        <Image
          src="/images/oneshot.svg"
          alt="ONESHOT"
          width={1920}
          height={288}
          className="block w-full h-auto"
          unoptimized
        />
        {/* Footer lights gradient overlay */}
        <Image
          src="/images/footer-lights.svg"
          alt=""
          width={1920}
          height={358}
          className="absolute bottom-0 left-0 w-full h-auto pointer-events-none"
          aria-hidden={true}
          unoptimized
        />
      </div>
    </footer>
  );
};
