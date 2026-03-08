import { useEffect, useMemo, useState } from 'react';
import {
  Leaf,
  FlaskConical,
  ShieldCheck,
  Users,
  Sprout,
  Zap,
  Bug,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../types';
import map from '../assets/homepage/map.png';
import homeHero from '../assets/homepage/home1.png';
import HeroShell from '../components/HeroShell';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const BRAND = '#855426';
const BRAND_DARK = '#6b401c';
const BRAND_SOFT = '#f8f2eb';
const PRODUCT_CARD_COLOR = BRAND;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function darkenHex(hex: string, amount = 0.12) {
  const h = hex.replace('#', '').trim();
  if (h.length !== 6) return hex;

  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);

  const f = 1 - clamp(amount, 0, 1);
  const rr = Math.round(r * f);
  const gg = Math.round(g * f);
  const bb = Math.round(b * f);

  return `#${rr.toString(16).padStart(2, '0')}${gg
    .toString(16)
    .padStart(2, '0')}${bb.toString(16).padStart(2, '0')}`;
}

const featureIcons = [
  <FlaskConical size={30} className="text-white" />,
  <Leaf size={30} className="text-white" />,
  <ShieldCheck size={30} className="text-white" />,
  <Users size={30} className="text-white" />,
];

export default function Home({ onNavigate }: HomeProps) {
  const { t } = useLanguage();

  const products = useMemo(
    () => [
      { name: t.home.soilTreatment, description: t.home.soilTreatmentDesc, icon: Sprout },
      { name: t.home.growthStimulator, description: t.home.growthStimulatorDesc, icon: Zap },
      { name: t.home.organicFertilizers, description: t.home.organicFertilizersDesc, icon: Leaf },
      { name: t.home.organicPesticide, description: t.home.organicPesticideDesc, icon: Bug },
    ],
    [t]
  );

  const features = useMemo(
    () => [
      { icon: featureIcons[0], title: t.home.sciDev, desc: t.home.sciDevDesc },
      { icon: featureIcons[1], title: t.home.fieldTested, desc: t.home.fieldTestedDesc },
      { icon: featureIcons[2], title: t.home.safetyFirst, desc: t.home.safetyFirstDesc },
      { icon: featureIcons[3], title: t.home.distSupport, desc: t.home.distSupportDesc },
    ],
    [t]
  );

  const statLabels = useMemo(
    () => [t.home.countriesServed, t.home.acresTransformed, t.home.yearsExperience],
    [t]
  );

  const statTargets = useMemo(() => [50, 2, 10], []);
  const statSuffix = useMemo(() => ['+', 'M+', '+'], []);

  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    let raf = 0;
    const durationMs = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const tNorm = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - tNorm, 3);
      setAnimatedStats(statTargets.map((target) => Math.round(target * eased)));
      if (tNorm < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [statTargets]);

  const productIcons = [
    <Sprout size={26} strokeWidth={2} className="text-white" />,
    <Zap size={26} strokeWidth={2} className="text-white" />,
    <Leaf size={26} strokeWidth={2} className="text-white" />,
    <ShieldCheck size={26} strokeWidth={2} className="text-white" />,
  ];

  return (
    <div className="bg-white">
      {/* HERO */}
      <HeroShell
        bgImage={homeHero}
        overlayTint="#85542673"
        overlayPrimary={BRAND}
        overlayDark={BRAND_DARK}
      >
        <div className="flex justify-center">
          <h1 className="text-white text-center font-extrabold leading-[1.07] tracking-tight max-w-5xl text-[34px] sm:text-[44px] md:text-[52px] lg:text-[58px]">
            {t.home.heroTitle}
          </h1>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 items-start">
          <div className="max-w-xl">
            <h2 className="text-white text-[24px] sm:text-[30px] font-bold mb-3">
              {t.home.aboutTitle}
            </h2>

            <p className="text-white/95 text-[12px] sm:text-[13px] leading-[1.45] font-medium max-w-[560px]">
              {t.home.aboutText}
            </p>

            <button
              onClick={() => onNavigate('about')}
              className="mt-6 inline-flex items-center gap-2 text-white text-[12px] font-semibold hover:text-white/80 transition"
            >
              {t.home.learnMore}
              <span className="opacity-80">→</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-5 max-w-[720px] lg:ml-auto">
            {animatedStats.map((value, idx) => (
              <div
                key={statLabels[idx]}
                className="h-[118px] sm:h-[128px] rounded-3xl bg-white/85 backdrop-blur-[2px] shadow-lg flex items-end justify-center p-4"
              >
                <div className="text-center">
                  <div className="text-[22px] font-extrabold leading-none tabular-nums" style={{ color: BRAND }}>
                    {value}
                    {statSuffix[idx]}
                  </div>
                  <div
                    className="text-[10px] sm:text-[11px] font-semibold leading-tight mt-2"
                    style={{ color: BRAND }}
                  >
                    {statLabels[idx]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HeroShell>

      {/* PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-14" style={{ color: BRAND }}>
            {t.home.productsTitle}
          </h2>

          <div className="mx-auto max-w-[360px] sm:max-w-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {products.map((product, idx) => {
                const base = PRODUCT_CARD_COLOR;
                const hover = darkenHex(base, 0.12);

                return (
                  <div
                    key={product.name}
                    className="rounded-2xl px-4 sm:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8 min-h-[330px] sm:min-h-[420px] flex flex-col shadow-lg transition-all duration-300 will-change-transform"
                    style={{ backgroundColor: base }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = hover;
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 18px 40px rgba(0,0,0,0.18)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = base;
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <div className="flex justify-center mb-5 sm:mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        {productIcons[idx]}
                      </div>
                    </div>

                    <h3 className="text-white italic font-semibold text-[18px] sm:text-[22px] leading-tight text-center min-h-[52px] sm:min-h-[72px] flex items-center justify-center">
                      {product.name}
                    </h3>

                    <p className="mt-3 sm:mt-4 text-white/95 text-[13.5px] sm:text-[15px] leading-relaxed text-center flex-1">
                      {product.description}
                    </p>

                    <button
                      onClick={() => onNavigate('products')}
                      className="mt-5 sm:mt-6 text-white text-[14px] sm:text-base font-semibold hover:text-white/85 transition-colors text-center"
                    >
                      {t.home.learnMoreBtn}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: `${BRAND_DARK}cc` }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-white text-center mb-14">{t.home.whyTitle}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-white/85 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="py-20" style={{ backgroundColor: BRAND_SOFT }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-2" style={{ color: BRAND }}>
            {t.home.globalTitle}
          </h2>
          <p className="text-gray-500 mb-14">{t.home.globalSubtitle}</p>

          <div className="relative w-full max-w-6xl mx-auto">
            <img src={map} alt="World map" className="w-full h-auto block scale-[1.05]" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: BRAND }}>
            {t.home.ctaTitle}
          </h2>
          <p className="text-gray-500 mb-10 text-lg">{t.home.ctaSubtitle}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('products')}
              className="px-8 py-3.5 border-2 font-semibold rounded-full transition-all duration-200"
              style={{ borderColor: BRAND, color: BRAND }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BRAND;
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = BRAND;
              }}
            >
              {t.home.exploreProducts}
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 border-2 font-semibold rounded-full transition-all duration-200"
              style={{ borderColor: BRAND, color: BRAND }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BRAND;
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = BRAND;
              }}
            >
              {t.footer.contactUs}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}