import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../types';
import story from '../assets/story/story.jpg';
import story2 from '../assets/story/story2.jpg';

interface OurStoryProps {
  onNavigate: (page: Page) => void;
}

const BRAND = '#855426';
const BRAND_DARK = '#6b401c';
const BRAND_SOFT = '#f8f2eb';

/* ============================= */
/* helper: render Nutri in brand color + bold */
/* ============================= */
function renderBrandWord(text: string, word: string, color: string) {
  const parts = text.split(word);
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {p}
          {i < parts.length - 1 ? (
            <strong style={{ color }} className="font-extrabold">
              {word}
            </strong>
          ) : null}
        </React.Fragment>
      ))}
    </>
  );
}

/* ============================= */
/* Count-up animation hook */
/* ============================= */
function useCountUpOnView(target: number, isInView: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, isInView, duration]);

  return value;
}

/* ============================= */
/* Impact Card */
/* ============================= */
function ImpactStatCard({
  stat,
}: {
  stat: { target: number; suffix: string; label: string };
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const value = useCountUpOnView(stat.target, inView);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl px-4 py-5 text-center transition-all duration-300 shadow-sm hover:shadow-md h-full flex flex-col justify-center min-h-[112px]"
      style={{ backgroundColor: BRAND }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = BRAND_DARK;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = BRAND;
        e.currentTarget.style.transform = 'translateY(0px)';
      }}
    >
      <div className="text-[28px] sm:text-[30px] font-extrabold text-white leading-none mb-2">
        {value}
        {stat.suffix}
      </div>
      <div className="text-white/90 text-xs sm:text-sm italic leading-snug">
        {stat.label}
      </div>
    </div>
  );
}

/* ============================= */
/* Full-bleed helper */
/* ============================= */
function FullBleed({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}

export default function OurStory({ onNavigate }: OurStoryProps) {
  const { t } = useLanguage();

  const impactStats = useMemo(
    () => [
      { target: 100, suffix: '%', label: t.story.organicFree },
      { target: 30, suffix: '+', label: t.story.countries },
      { target: 2, suffix: 'M+', label: t.story.acres },
      { target: 500, suffix: '+', label: t.story.distributors },
      { target: 25, suffix: '%+', label: t.story.yieldIncrease },
    ],
    [t]
  );

  return (
    <div className="bg-white overflow-x-clip">
      {/* ================= TOP SPLIT (IMAGE + BRAND PANEL) ================= */}
      <FullBleed className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[0.40fr_0.60fr] w-full">
          {/* LEFT IMAGE */}
          <div className="h-[260px] sm:h-[320px] lg:h-[380px]">
            <img
              src={story}
              alt="Our story"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>

          {/* RIGHT PANEL */}
          <div
            className="h-auto lg:h-[380px] flex items-center"
            style={{ backgroundColor: BRAND }}
          >
            <div className="w-full px-6 sm:px-10 lg:pl-24 lg:pr-16 py-10 sm:py-12 lg:py-0">
              <div className="max-w-[740px] text-center lg:text-left">
                <h1 className="text-4xl font-extrabold mb-6 text-white">
                  {t.story.beginningTitle}
                </h1>

                <div className="space-y-5">
                  <p className="text-white/95 text-[14px] sm:text-[15px] lg:text-[15.5px] leading-[1.75]">
                    {renderBrandWord(t.story.p1, 'Nutri', '#ffffff')}
                  </p>

                  <p className="text-white/95 text-[14px] sm:text-[15px] lg:text-[15.5px] leading-[1.75]">
                    {renderBrandWord(t.story.p2, 'Nutri', '#ffffff')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullBleed>

      {/* ================= p3 + p4 ================= */}
      <FullBleed style={{ backgroundColor: BRAND_SOFT }}>
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
          <div className="space-y-6 text-center md:text-left">
            <p className="text-gray-700 text-[15px] sm:text-[16px] leading-[1.55] whitespace-pre-line">
              {renderBrandWord(t.story.p3, 'Nutri', BRAND)}
            </p>
            <p className="text-gray-700 text-[15px] sm:text-[16px] leading-[1.55] whitespace-pre-line">
              {renderBrandWord(t.story.p4, 'Nutri', BRAND)}
            </p>
          </div>
        </div>
      </FullBleed>

      {/* ================= IMAGE FULL-WIDTH ================= */}
      <FullBleed className="bg-white">
        <div className="relative h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden">
          <img
            src={story2}
            alt="Our impact"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/20" />
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.20)]" />
        </div>
      </FullBleed>

      {/* ================= p5 + p6 ================= */}
      <FullBleed className="bg-white">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-14 pt-10 sm:pt-12 pb-10 sm:pb-12">
          <div className="space-y-6 text-center md:text-left">
            <p className="text-gray-700 text-[15px] sm:text-[16px] leading-[1.55]">
              {renderBrandWord(t.story.p5, 'Nutri', BRAND)}
            </p>
            <p className="text-gray-700 text-[15px] sm:text-[16px] leading-[1.55]">
              {renderBrandWord(t.story.p6, 'Nutri', BRAND)}
            </p>
          </div>
        </div>
      </FullBleed>

      {/* ================= IMPACT ================= */}
      <FullBleed style={{ backgroundColor: BRAND_SOFT }}>
        <div className="max-w-[1250px] mx-auto px-6 sm:px-10 lg:px-14 pt-10 sm:pt-12 pb-20 sm:pb-24">
          <h2
            className="text-[32px] sm:text-[38px] font-extrabold text-center mb-12"
            style={{ color: BRAND }}
          >
            {t.story.impactTitle}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {impactStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`w-full ${
                  idx === impactStats.length - 1 ? 'col-span-2 sm:col-span-1 flex justify-center' : ''
                }`}
              >
                <div className="w-full max-w-[260px]">
                  <ImpactStatCard stat={stat} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </FullBleed>

      {/* ================= CTA ================= */}
      <FullBleed className="bg-white">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 lg:px-14 py-16 sm:py-20">
          <div
            className="border-2 rounded-3xl p-10 sm:p-12 text-center shadow-sm"
            style={{ borderColor: BRAND }}
          >
            <h2 className="text-3xl font-extrabold mb-3" style={{ color: BRAND }}>
              {t.story.ctaTitle}
            </h2>

            <p className="text-gray-500 italic mb-8">{t.story.ctaSubtitle}</p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-7 py-3 text-white font-semibold rounded-full transition-all duration-200"
                style={{ backgroundColor: BRAND }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
              >
                {t.story.getInTouch}
              </button>

              <button
                onClick={() => onNavigate('products')}
                className="px-7 py-3 text-white font-semibold rounded-full transition-all duration-200"
                style={{ backgroundColor: BRAND }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
              >
                {t.story.viewProducts}
              </button>
            </div>
          </div>
        </div>
      </FullBleed>
    </div>
  );
}