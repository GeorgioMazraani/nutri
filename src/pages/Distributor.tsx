import { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import distBg from '../assets/distributor/dist.jpg';
import emailjs from '@emailjs/browser';

type Tab = 'find' | 'become';

interface FormData {
  companyName: string;
  contact: string;
  email: string;
  phone: string;
  country: string;
  region: string;
  info: string;
}

const initialForm: FormData = {
  companyName: '',
  contact: '',
  email: '',
  phone: '',
  country: '',
  region: '',
  info: '',
};

const BRAND = '#855426';
const BRAND_DARK = '#6b401c';
const BRAND_LIGHT = '#f6e8db';

export default function Distributor() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('find');
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!form.companyName.trim()) newErrors.companyName = t.distributor.required;
    if (!form.contact.trim()) newErrors.contact = t.distributor.required;
    if (!form.email.trim()) newErrors.email = t.distributor.required;
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = t.distributor.invalidEmail;
    if (!form.phone.trim()) newErrors.phone = t.distributor.required;
    if (!form.country.trim()) newErrors.country = t.distributor.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const message = `
This message was submitted through the Become A Distributor form on the website.

Company Name: ${form.companyName}
Contact Person: ${form.contact}
Email: ${form.email}
Phone: ${form.phone}
Country: ${form.country}
Region: ${form.region || 'N/A'}
Additional Info: ${form.info || 'N/A'}
      `.trim();

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_DISTRIBUTOR,
        {
          name: form.contact,
          email: form.email,
          phone: form.phone,
          subject: `New Distributor Request - ${form.companyName}`,
          message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error('Distributor form email failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 bg-white/80 border rounded-xl text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all ${
      errors[field] ? 'border-red-400' : 'border-gray-200'
    }`;

  return (
    <div>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 max-w-xl mx-auto">
            <button
              onClick={() => setActiveTab('find')}
              className="py-4 text-sm font-semibold border-b-2 transition-colors"
              style={{
                color: activeTab === 'find' ? BRAND : '#6b7280',
                borderColor: activeTab === 'find' ? BRAND : 'transparent',
              }}
            >
              {t.distributor.findTab}
            </button>

            <button
              onClick={() => setActiveTab('become')}
              className="py-4 text-sm font-semibold border-b-2 transition-colors"
              style={{
                color: activeTab === 'become' ? BRAND : '#6b7280',
                borderColor: activeTab === 'become' ? BRAND : 'transparent',
              }}
            >
              {t.distributor.becomeTab}
            </button>
          </div>
        </div>
      </div>

      <section
        className="relative min-h-screen flex items-center justify-center py-20 px-4"
        style={{
          backgroundImage: `url(${distBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 w-full max-w-4xl">
          {activeTab === 'find' && (
            <div
              className="rounded-3xl p-10 sm:p-14 shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-center mb-3"
                style={{ color: BRAND }}
              >
                {t.distributor.findTitle}
              </h1>

              <p className="text-gray-600 text-center italic mb-10">
                {t.distributor.findSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="text"
                  disabled
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.distributor.searchPlaceholder}
                  className="flex-1 px-5 py-3.5 bg-white rounded-xl text-gray-600 border border-gray-200 opacity-70 cursor-not-allowed"
                />

                <button
                  type="button"
                  disabled
                  className="flex items-center justify-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl opacity-70 cursor-not-allowed"
                  style={{ backgroundColor: BRAND }}
                >
                  <Search size={16} />
                  {t.distributor.searchBtn}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'become' && (
            <div
              className="rounded-3xl p-10 sm:p-14 shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(18px)',
              }}
            >
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-center mb-3"
                style={{ color: BRAND }}
              >
                {t.distributor.becomeTitle}
              </h1>

              <p className="text-gray-600 text-center italic mb-10">
                {t.distributor.becomeSubtitle}
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: BRAND_LIGHT }}
                  >
                    <svg
                      className="w-8 h-8"
                      style={{ color: BRAND }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold mb-2" style={{ color: BRAND }}>
                    {t.distributor.successTitle}
                  </h3>

                  <p className="text-gray-600 text-sm">{t.distributor.successText}</p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                    style={{ backgroundColor: BRAND, color: 'white' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = BRAND_DARK;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = BRAND;
                    }}
                  >
                    {t.distributor.submitAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder={t.distributor.companyName}
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      className={inputClass('companyName')}
                      style={!errors.companyName ? { boxShadow: 'none' } : undefined}
                      onFocus={(e) => {
                        if (!errors.companyName) {
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(133,84,38,0.18)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.companyName) e.currentTarget.style.boxShadow = 'none';
                      }}
                    />

                    <input
                      type="text"
                      placeholder={t.distributor.contactPerson}
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      className={inputClass('contact')}
                      style={!errors.contact ? { boxShadow: 'none' } : undefined}
                      onFocus={(e) => {
                        if (!errors.contact) {
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(133,84,38,0.18)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.contact) e.currentTarget.style.boxShadow = 'none';
                      }}
                    />

                    <input
                      type="email"
                      placeholder={t.distributor.email}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass('email')}
                      style={!errors.email ? { boxShadow: 'none' } : undefined}
                      onFocus={(e) => {
                        if (!errors.email) {
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(133,84,38,0.18)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.email) e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="tel"
                      placeholder={t.distributor.phone}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass('phone')}
                      style={!errors.phone ? { boxShadow: 'none' } : undefined}
                      onFocus={(e) => {
                        if (!errors.phone) {
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(133,84,38,0.18)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.phone) e.currentTarget.style.boxShadow = 'none';
                      }}
                    />

                    <input
                      type="text"
                      placeholder={t.distributor.country}
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className={inputClass('country')}
                      style={!errors.country ? { boxShadow: 'none' } : undefined}
                      onFocus={(e) => {
                        if (!errors.country) {
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(133,84,38,0.18)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.country) e.currentTarget.style.boxShadow = 'none';
                      }}
                    />

                    <input
                      type="text"
                      placeholder={t.distributor.region}
                      value={form.region}
                      onChange={(e) => setForm({ ...form, region: e.target.value })}
                      className={inputClass('region')}
                      style={!errors.region ? { boxShadow: 'none' } : undefined}
                      onFocus={(e) => {
                        if (!errors.region) {
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(133,84,38,0.18)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.region) e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <textarea
                    rows={4}
                    placeholder={t.distributor.additionalInfo}
                    value={form.info}
                    onChange={(e) => setForm({ ...form, info: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 text-sm focus:outline-none resize-none"
                    style={{ boxShadow: 'none' }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(133,84,38,0.18)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    style={{ backgroundColor: BRAND }}
                    onMouseEnter={(e) => {
                      if (!loading) e.currentTarget.style.backgroundColor = BRAND_DARK;
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) e.currentTarget.style.backgroundColor = BRAND;
                    }}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      t.distributor.submitBtn
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}