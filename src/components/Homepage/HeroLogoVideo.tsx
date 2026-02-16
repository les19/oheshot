'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface HeroLogoVideoProps {
  className?: string;
  size?: 'mobile' | 'tablet' | 'desktop';
}

const VIDEO_SRC = '/Logo_360.mp4';

/**
 * Lazy-loaded hero logo video.
 * Video loads and plays only when in view; does not block initial page load.
 * Sizes match the previous hero graphic (300/530 on tablet, full on desktop).
 */
export const HeroLogoVideo: React.FC<HeroLogoVideoProps> = ({ className, size = 'desktop' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Lazy load: keep src null until the container is near the viewport — no video request on initial page load
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setSrc(VIDEO_SRC); // Only now the <video> gets src and the browser fetches the file
      },
      { rootMargin: '80px', threshold: 0.1 } // Trigger when within 80px of viewport or 10% visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const sizeClasses = {
    mobile: 'w-[300px] h-[300px]',
    tablet: 'w-[300px] h-[300px] md:w-[530px] md:h-[530px]',
    desktop: 'w-full max-w-[854px] aspect-square',
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-full', sizeClasses[size], className)}
    >
      {src ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          className="w-full h-full object-contain"
          aria-label="Logo animation"
          onLoadedData={(e) => e.currentTarget.play().catch(() => { })}
        />
      ) : (
        <div className="w-full h-full bg-black/20 animate-pulse rounded-full" aria-hidden />
      )}
    </div>
  );
};

export default HeroLogoVideo;
