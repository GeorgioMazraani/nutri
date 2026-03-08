export type Page =
  | 'home'
  | 'about'
  | 'story'
  | 'products'
  | 'distributor'
  | 'contact'
  | 'faqs'
  | 'privacy'
  | 'terms'
  | 'safety';

export type Language = 'English' | 'French' | 'Arabic' | 'Portuguese' | 'Indonesian' ;

export interface NavItem {
  label: string;
  page: Page;
}
