import { Leaf, Award, Handshake, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../types';
import about2 from '../assets/aboutpage/about1.png';
import HeroShell from '../components/HeroShell';

interface AboutUsProps {
  onNavigate: (page: Page) => void;
}

function renderBrandWord(text: string, word: string, color: string) {
  const parts = text.split(new RegExp(`(${word})`, 'gi'));

  return parts.map((part, i) =>
    part.toLowerCase() === word.toLowerCase() ? (
      <span key={i} style={{ color }} className="font-extrabold italic">
        {part}
      </span>
    ) : (
      part
    )
  );
}

const BRAND = '#855426';
const BRAND_DARK = '#6b401c';
const BRAND_SOFT = '#f8f2eb';

const coreValueIcons = [
  <Leaf size={28} className="text-white" />,
  <Award size={28} className="text-white" />,
  <Handshake size={28} className="text-white" />,
  <Shield size={28} className="text-white" />,
];

export default function AboutUs({ onNavigate }: AboutUsProps) {
  const { t } = useLanguage();

  const coreValues = [
    { icon: coreValueIcons[0], title: t.about.sustainability, description: t.about.sustainabilityDesc },
    { icon: coreValueIcons[1], title: t.about.quality, description: t.about.qualityDesc },
    { icon: coreValueIcons[2], title: t.about.partnership, description: t.about.partnershipDesc },
    { icon: coreValueIcons[3], title: t.about.organicIntegrity, description: t.about.organicIntegrityDesc },
  ];

  return (
    <div>
      {/* HERO */}
      <HeroShell
        bgImage={about2}
        overlayTint="#85542666"
        overlayPrimary={BRAND}
        overlayDark={BRAND_DARK}
      >
        <div className="flex justify-center">
          <h1
            className="text-white text-center font-extrabold leading-[1.07] tracking-tight max-w-5xl text-[34px] sm:text-[44px] md:text-[52px] lg:text-[58px]"
            style={{ textShadow: '0 6px 22px rgba(0,0,0,0.35)' }}
          >
            {t.about.heroTitle}
          </h1>
        </div>

        <div className="mt-[7.5rem] lg:mt-[8.5rem]">
          <div className="mx-auto w-full max-w-[360px] sm:max-w-3xl lg:max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
              {/* Mission */}
              <div className="h-full rounded-3xl bg-white/18 backdrop-blur-md border border-white/30 p-4 sm:p-5 lg:p-7 shadow-lg shadow-black/10">
                <div className="h-full flex flex-col">
                  <h3
                    className="text-base sm:text-lg lg:text-xl font-extrabold leading-snug text-center md:text-left"
                    style={{ color: '#f6dfc8' }}
                  >
                    {t.about.missionTitle}
                  </h3>

                  <p className="mt-3 sm:mt-4 text-white/95 text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] leading-relaxed text-center md:text-left flex-1">
                    {t.about.missionText}
                  </p>

                  <div className="mt-6 h-px bg-white/20" />
                </div>
              </div>

              {/* Vision */}
              <div className="h-full rounded-3xl bg-white/18 backdrop-blur-md border border-white/30 p-4 sm:p-5 lg:p-7 shadow-lg shadow-black/10">
                <div className="h-full flex flex-col">
                  <h3
                    className="text-base sm:text-lg lg:text-xl font-extrabold leading-snug text-center md:text-left"
                    style={{ color: '#f6dfc8' }}
                  >
                    {t.about.visionTitle}
                  </h3>

                  <p className="mt-3 sm:mt-4 text-white/95 text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] leading-relaxed text-center md:text-left flex-1">
                    {t.about.visionText}
                  </p>

                  <div className="mt-6 h-px bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroShell>

      {/* COMMITTED */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-extrabold leading-tight mb-10 whitespace-pre-line"
            style={{ color: BRAND }}
          >
            {t.about.committedTitle}
          </h2>

          <div className="space-y-5 text-center md:text-left">
            <p className="text-gray-700 text-[15px] sm:text-[16px] leading-[1.55] italic">
              {renderBrandWord(t.about.p1, 'Nutri', BRAND)}
            </p>

            <p className="text-gray-700 text-[15px] sm:text-[16px] leading-[1.55] italic">
              {renderBrandWord(t.about.p2, 'Nutri', BRAND)}
            </p>

            <p className="text-gray-700 text-[15px] sm:text-[16px] leading-[1.55] italic">
              {renderBrandWord(t.about.p3, 'Nutri', BRAND)}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <hr className="border-gray-200" />
      </div>

      {/* CORE VALUES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-14" style={{ color: BRAND }}>
            {t.about.coreValuesTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl p-6 transition-colors duration-200 shadow-md text-center"
                style={{ backgroundColor: BRAND }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND_DARK;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND;
                }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-5 mx-auto">
                  {value.icon}
                </div>

                <h3 className="text-white font-bold text-lg mb-3 italic">{value.title}</h3>

                <p className="text-white/90 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: BRAND_SOFT }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 rounded-3xl p-10 sm:p-12 text-center" style={{ borderColor: BRAND }}>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: BRAND }}>
              {t.about.ctaTitle}
            </h2>

            <p className="text-gray-500 italic mb-8">{t.about.ctaSubtitle}</p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate('story')}
                className="w-full sm:w-auto px-7 py-3 text-white font-semibold rounded-full transition-colors duration-200"
                style={{ backgroundColor: BRAND }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND_DARK;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND;
                }}
              >
                {t.about.readStory}
              </button>

              <button
                onClick={() => onNavigate('products')}
                className="w-full sm:w-auto px-7 py-3 text-white font-semibold rounded-full transition-colors duration-200"
                style={{ backgroundColor: BRAND }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND_DARK;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND;
                }}
              >
                {t.about.viewProducts}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}