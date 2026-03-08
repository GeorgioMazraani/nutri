import en from './en';
import ar from './ar';
import fr from './fr';
import pt from './pt';
import type { Translations } from './types';
import type { Language } from '../types';

const translations: Record<Language, Translations> = {
  English: en,
  French: fr,
  Arabic: ar,
  Portuguese: pt,
  Indonesian: en,
};

export function getTranslations(lang: Language): Translations {
  return translations[lang] ?? en;
}

export type { Translations };
