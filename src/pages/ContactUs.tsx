import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import emailjs from '@emailjs/browser';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const BRAND = '#855426';
const BRAND_DARK = '#6b401c';
const BRAND_LIGHT = '#f6e8db';
const SECTION_BG = '#f8f2eb';

export default function ContactUs() {
  const { t } = useLanguage();
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: <Mail size={20} className="text-white" />,
      label: t.contact.emailLabel,
      value: 'info@Nutri.com',
      sub: t.contact.emailReply,
    },
    {
      icon: <Phone size={20} className="text-white" />,
      label: t.contact.phoneLabel,
      value: '+1 (800) 000-0000',
      sub: t.contact.phoneSub,
    },
    {
      icon: <MapPin size={20} className="text-white" />,
      label: t.contact.officeLabel,
      value: t.contact.officeValue,
      sub: t.contact.officeSub,
    },
  ];

  const validate = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!form.name.trim()) newErrors.name = t.contact.required;
    if (!form.email.trim()) newErrors.email = t.contact.required;
    else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = t.contact.invalidEmail;
    }
    if (!form.message.trim()) newErrors.message = t.contact.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      // 1️⃣ SEND EMAIL TO YOU
      await emailjs.send(
        "service_sjgva2p",
        "template_sf81n4p",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        },
        "lgKSYIxxuwmt9gYEA"
      );

      // 2️⃣ AUTO REPLY TO USER
      await emailjs.send(
        "service_sjgva2p",
        "template_hp8x7gq", // <-- your auto reply template id
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "lgKSYIxxuwmt9gYEA"
      );

      setSubmitted(true);
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Email failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof ContactForm) =>
    `w-full px-4 py-3 border rounded-xl text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors[field]
      ? 'border-red-400 bg-red-50 focus:ring-red-200'
      : 'border-gray-200 bg-white'
    }`;

  return (
    <section className="py-20" style={{ backgroundColor: SECTION_BG }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1
              className="text-4xl font-extrabold mb-10 text-center lg:text-left"
              style={{ color: BRAND }}
            >
              {t.contact.heading}
            </h1>

            <div className="space-y-6">
              {[
                ...contactInfo,
                {
                  icon: <Clock size={20} className="text-white" />,
                  label: t.contact.hoursLabel,
                  value: t.contact.hoursValue,
                  sub: t.contact.hoursSub,
                },
              ].map((info) => (
                <div
                  key={info.label}
                  className="rounded-2xl p-6 flex gap-4 shadow-md transition-all duration-200"
                  style={{ backgroundColor: BRAND }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = BRAND_DARK;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = BRAND;
                  }}
                >
                  <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    {info.icon}
                  </div>

                  <div>
                    <div className="text-white/70 text-xs uppercase tracking-wider mb-1">
                      {info.label}
                    </div>
                    <div className="text-white font-semibold">{info.value}</div>
                    <div className="text-white/80 text-sm mt-1">{info.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-3xl p-8 sm:p-12 shadow-2xl"
            style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: BRAND }}>
              {t.contact.formTitle}
            </h2>

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
                  {t.contact.successTitle}
                </h3>

                <p className="text-gray-600 text-sm max-w-sm mx-auto">
                  {t.contact.successText}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass('name')}
                  style={!errors.name ? { boxShadow: 'none' } : undefined}
                  onFocus={(e) => {
                    if (!errors.name) {
                      e.currentTarget.style.boxShadow =
                        '0 0 0 4px rgba(133,84,38,0.18)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.name) e.currentTarget.style.boxShadow = 'none';
                  }}
                />

                <input
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass('email')}
                  style={!errors.email ? { boxShadow: 'none' } : undefined}
                  onFocus={(e) => {
                    if (!errors.email) {
                      e.currentTarget.style.boxShadow =
                        '0 0 0 4px rgba(133,84,38,0.18)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.email) e.currentTarget.style.boxShadow = 'none';
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder={t.contact.phonePlaceholder}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass('phone')}
                    style={!errors.phone ? { boxShadow: 'none' } : undefined}
                    onFocus={(e) => {
                      if (!errors.phone) {
                        e.currentTarget.style.boxShadow =
                          '0 0 0 4px rgba(133,84,38,0.18)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.phone) e.currentTarget.style.boxShadow = 'none';
                    }}
                  />

                  <input
                    type="text"
                    placeholder={t.contact.subjectPlaceholder}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={inputClass('subject')}
                    style={!errors.subject ? { boxShadow: 'none' } : undefined}
                    onFocus={(e) => {
                      if (!errors.subject) {
                        e.currentTarget.style.boxShadow =
                          '0 0 0 4px rgba(133,84,38,0.18)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.subject) e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <textarea
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl text-gray-700 text-sm placeholder-gray-400 focus:outline-none transition-all resize-none ${errors.message
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 bg-white'
                    }`}
                  style={!errors.message ? { boxShadow: 'none' } : undefined}
                  onFocus={(e) => {
                    if (!errors.message) {
                      e.currentTarget.style.boxShadow =
                        '0 0 0 4px rgba(133,84,38,0.18)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.message) e.currentTarget.style.boxShadow = 'none';
                  }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>

                      Sending...
                    </>
                  ) : (
                    t.contact.sendBtn
                  )}
                </button>

                <p className="text-gray-500 text-xs text-center">
                  {(t.contact as any).privacyNote ||
                    'We respect your privacy. Your information is never shared.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}