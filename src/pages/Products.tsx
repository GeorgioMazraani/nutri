import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../types';

interface ProductsProps {
  onNavigate: (page: Page) => void;
}

const BRAND = '#855426';
const BRAND_DARK = '#6b401c';
const BRAND_SOFT = '#f8f2eb';
const PRODUCT_CARD_COLOR = BRAND;

export default function Products({ onNavigate }: ProductsProps) {
  const { t } = useLanguage();

  const products = [
    {
      id: 'base-x',
      name: t.products.baseX,
      category: t.products.baseXCat,
      description: t.products.baseXDesc,
    },
    {
      id: 'direct-x',
      name: t.products.directX,
      category: t.products.directXCat,
      description: t.products.directXDesc,
    },
    {
      id: 'start-x',
      name: t.products.startX,
      category: t.products.startXCat,
      description: t.products.startXDesc,
    },
    {
      id: 'set-x',
      name: t.products.setX,
      category: t.products.setXCat,
      description: t.products.setXDesc,
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative py-20 sm:py-24" style={{ backgroundColor: BRAND }}>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }} />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.18))`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white italic mb-8 leading-relaxed">
            {t.products.heroSubtitle}
          </p>

          <button
            className="px-8 py-3 rounded-full font-semibold bg-white transition-colors"
            style={{ color: BRAND }}
            type="button"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            {t.products.downloadBrochure}
          </button>
        </div>
      </section>

      {/* PRODUCT LIST */}
      <section className="py-14 sm:py-16" style={{ backgroundColor: BRAND }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {products.map((product) => {
            const cardBg = PRODUCT_CARD_COLOR;

            return (
              <div
                key={product.id}
                className="rounded-3xl overflow-hidden border-2"
                style={{
                  borderColor: 'rgba(255,255,255,0.85)',
                  backgroundColor: cardBg,
                }}
              >
                <div className="min-h-[320px]">
                  <div className="px-8 sm:px-10 lg:px-12 py-10 text-white text-center lg:text-left">
                    <div className="w-10 h-10 rounded-full mb-6 bg-white/20 flex items-center justify-center mx-auto lg:mx-0">
                      <div className="w-5 h-5 rounded-full bg-white" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-semibold italic leading-tight mb-1">
                      {product.name}
                    </h2>

                    <h3 className="text-2xl sm:text-3xl font-light italic leading-tight mb-6">
                      {product.category}
                    </h3>

                    <p className="text-white/95 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                      {product.description}
                    </p>

                    <button
                      type="button"
                      className="mt-8 text-white/90 text-sm underline underline-offset-4 hover:text-white transition"
                      onClick={() => onNavigate('contact')}
                    >
                      {t.products.learnMore ?? 'Learn More'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: BRAND_SOFT }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: BRAND }}>
            {t.products.ctaTitle}
          </h2>

          <p className="text-gray-700 mb-8">{t.products.ctaSubtitle}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('distributor')}
              className="px-7 py-3 text-white font-semibold rounded-full transition-all duration-200 shadow-sm"
              style={{ backgroundColor: BRAND }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BRAND_DARK;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = BRAND;
                e.currentTarget.style.transform = 'translateY(0px)';
              }}
            >
              {t.products.findDistributor}
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-7 py-3 border-2 font-semibold rounded-full transition-all duration-200"
              style={{ borderColor: BRAND, color: BRAND, backgroundColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BRAND;
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = BRAND;
              }}
            >
              {t.products.contactUs}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}