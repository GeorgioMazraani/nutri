import { Mail, Phone } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const BRAND = '#855426';
const BRAND_DARK = '#6b401c';
const BRAND_SOFT = '#f8f2eb';
const FOOTER_BG = '#6b401c';

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer style={{ backgroundColor: FOOTER_BG }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div>
            <Logo onClick={() => onNavigate('home')} />
            <p className="mt-4 text-white/85 text-sm leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-white/85 text-sm">
                <Mail size={16} />
                <span>info@astra-universal.com</span>
              </div>

              <div className="flex items-start gap-3 text-white/85 text-sm">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span>+961 76 474711</span>
                  <span>+971 58 6803800</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-xs uppercase tracking-widest">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t.footer.products, page: 'products' as Page },
                { label: t.footer.findDistributor, page: 'distributor' as Page },
                { label: t.footer.contact, page: 'contact' as Page },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-white/80 text-sm transition-all duration-200 hover:text-white hover:translate-x-1"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-xs uppercase tracking-widest">
              {t.footer.legalCompliance}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t.footer.privacy, page: 'privacy' as Page },
                { label: t.footer.terms, page: 'terms' as Page },
                { label: t.footer.safety, page: 'safety' as Page },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-white/80 text-sm transition-all duration-200 hover:text-white hover:translate-x-1"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-xs uppercase tracking-widest">
              {t.footer.stayConnected}
            </h4>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              {t.footer.stayConnectedText}
            </p>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 shadow-sm"
              style={{ backgroundColor: 'white', color: BRAND }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BRAND_SOFT;
                e.currentTarget.style.color = BRAND_DARK;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = BRAND;
              }}
            >
              {t.footer.contactUs}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.15)' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-5 text-center">
          <p className="text-white/70 text-sm tracking-wide">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}