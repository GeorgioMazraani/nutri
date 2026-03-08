import type { Page } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface LegalPageProps {
  page: 'privacy' | 'terms' | 'safety';
  onNavigate: (page: Page) => void;
}

const BRAND = '#855426';
const BRAND_DARK = '#6b401c';
const BRAND_LIGHT = '#f8e7d6';
const SOFT_BG = '#f8f2eb';

export default function LegalPage({ page, onNavigate }: LegalPageProps) {
  const { t } = useLanguage();
  const data = t.legal[page];

  return (
    <div className="bg-white">
      {/* HERO */}
      <section
        className="relative pt-14 pb-24 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32"
        style={{
          background: `
            linear-gradient(
              135deg,
              #855426 0%,
              #6b401c 100%
            )
          `,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(700px 300px at 50% 0%, rgba(255,255,255,0.12), rgba(255,255,255,0) 60%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {data.title}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/80">
            {t.legal.lastUpdated}: {data.updated}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* CONTENT */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: SOFT_BG }}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-3xl bg-white border border-gray-100 shadow-xl overflow-hidden">
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="space-y-12">
                {data.sections.map((section, idx) => (
                  <div key={idx} className="text-center sm:text-left">
                    <h2
                      className="text-lg sm:text-xl font-extrabold"
                      style={{ color: BRAND }}
                    >
                      {section.heading}
                    </h2>

                    <div
                      className="mt-3 mb-5 h-[2px] w-14 rounded-full mx-auto sm:mx-0"
                      style={{ backgroundColor: BRAND }}
                    />

                    <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-14 text-center">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full sm:w-auto px-8 py-3.5 text-white font-semibold rounded-full transition-all duration-200 shadow-md shadow-black/10"
                  style={{ backgroundColor: BRAND }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = BRAND_DARK)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = BRAND)
                  }
                >
                  {t.legal.contactBtn}
                </button>

                <p className="mt-5 text-sm text-gray-500">
                  {t.legal.lastUpdated}: {data.updated}
                </p>
              </div>
            </div>
          </div>

          <div className="h-12" />
        </div>
      </section>
    </div>
  );
}