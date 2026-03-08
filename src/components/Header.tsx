import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X, Globe } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';
import type { Page, Language } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const languages: Language[] = ['English', 'French', 'Arabic', 'Portuguese'];

const BRAND = '#855426';
const BRAND_DARK = '#6b401c';
const BRAND_SOFT = '#f8f2eb';
const BRAND_BORDER = '#e7d6c6';

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { t, language, setLanguage } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: t.header.home, page: 'home' },
    { label: t.header.about, page: 'about' },
    { label: t.header.story, page: 'story' },
    { label: t.header.products, page: 'products' },
    { label: t.header.distributor, page: 'distributor' },
    { label: t.header.contact, page: 'contact' },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
    setLangOpen(false);
    setMobileLangOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setLangOpen(false);
        setMobileLangOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo onClick={() => handleNav('home')} />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className="px-4 py-2 text-sm rounded-md transition-all duration-200"
                  style={{
                    color: currentPage === item.page ? BRAND : '#374151',
                    fontWeight: currentPage === item.page ? 600 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== item.page) {
                      e.currentTarget.style.color = BRAND;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== item.page) {
                      e.currentTarget.style.color = '#374151';
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Desktop Language */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setLangOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium border rounded-full transition-all duration-200"
                  style={{
                    borderColor: '#e5e7eb',
                    color: '#374151',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = BRAND;
                    e.currentTarget.style.color = BRAND;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.color = '#374151';
                  }}
                >
                  <Globe size={14} />
                  {language}
                  <ChevronDown
                    size={12}
                    className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {langOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[160px]">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm rounded-md transition-colors"
                        style={{
                          backgroundColor: language === lang ? BRAND_SOFT : undefined,
                          color: language === lang ? BRAND : '#374151',
                        }}
                        onMouseEnter={(e) => {
                          if (language !== lang) {
                            e.currentTarget.style.backgroundColor = '#f8f2eb';
                            e.currentTarget.style.color = BRAND;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (language !== lang) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#374151';
                          }
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu */}
              <button
                className="lg:hidden p-2 text-gray-600"
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute inset-x-0 top-16 bottom-0 bg-white shadow-xl transition-transform duration-300 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-2'
          }`}
        >
          <div className="h-full overflow-y-auto px-5 py-6 space-y-4">
            {/* Mobile Language */}
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setMobileLangOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium"
                style={{ backgroundColor: BRAND_SOFT, color: BRAND_DARK }}
              >
                <span className="flex items-center gap-2">
                  <Globe size={16} />
                  {language}
                </span>

                <ChevronDown
                  size={14}
                  className={`transition-transform ${mobileLangOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileLangOpen && (
                <div className="p-2 space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setMobileLangOpen(false);
                        setMobileOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors"
                      style={{
                        backgroundColor: language === lang ? BRAND_SOFT : undefined,
                        color: language === lang ? BRAND : '#374151',
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Nav Items */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all"
                  style={{
                    backgroundColor: currentPage === item.page ? BRAND_SOFT : 'white',
                    borderColor: currentPage === item.page ? BRAND_BORDER : '#f1f1f1',
                    color: currentPage === item.page ? BRAND : '#374151',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}