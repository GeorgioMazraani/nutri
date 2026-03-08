export interface Translations {
  header: {
    home: string;
    about: string;
    story: string;
    products: string;
    distributor: string;
    contact: string;
    faqs: string;
    findDistributor: string;
    becomeDistributor: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    legalCompliance: string;
    privacy: string;
    terms: string;
    safety: string;
    stayConnected: string;
    stayConnectedText: string;
    contactUs: string;
    copyright: string;
    products: string;
    findDistributor: string;
    contact: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    findDistributor: string;
    downloadBrochure: string;
    aboutTitle: string;
    aboutText: string;
    learnMore: string;
    countriesServed: string;
    acresTransformed: string;
    yearsExperience: string;
    distributorsGlobally: string;
    productsTitle: string;
    soilTreatment: string;
    soilTreatmentDesc: string;
    growthStimulator: string;
    growthStimulatorDesc: string;
    organicFertilizers: string;
    organicFertilizersDesc: string;
    organicPesticide: string;
    organicPesticideDesc: string;
    learnMoreBtn: string;
    whyTitle: string;
    sciDev: string;
    sciDevDesc: string;
    fieldTested: string;
    fieldTestedDesc: string;
    safetyFirst: string;
    safetyFirstDesc: string;
    distSupport: string;
    distSupportDesc: string;
    certTitle: string;
    certSubtitle: string;
    globalTitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    exploreProducts: string;
    certification: string;
  };
  about: {
    heroTitle: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
    committedTitle: string;
    p1: string;
    p2: string;
    p3: string;
    coreValuesTitle: string;
    sustainability: string;
    sustainabilityDesc: string;
    quality: string;
    qualityDesc: string;
    partnership: string;
    partnershipDesc: string;
    organicIntegrity: string;
    organicIntegrityDesc: string;
    ctaTitle: string;
    ctaSubtitle: string;
    readStory: string;
    viewProducts: string;
  };
  story: {
    beginningTitle: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    impactTitle: string;
    organicFree: string;
    countries: string;
    acres: string;
    distributors: string;
    yieldIncrease: string;
    ctaTitle: string;
    ctaSubtitle: string;
    getInTouch: string;
    viewProducts: string;
  };
  products: {
    heroSubtitle: string;
    downloadBrochure: string;
    learnMore: string;
    ctaTitle: string;
    ctaSubtitle: string;
    findDistributor: string;
    contactUs: string;
    baseX: string;
    baseXCat: string;
    baseXDesc: string;
    directX: string;
    directXCat: string;
    directXDesc: string;
    startX: string;
    startXCat: string;
    startXDesc: string;
    setX: string;
    setXCat: string;
    setXDesc: string;
    guardX: string;
    guardXCat: string;
    guardXDesc: string;
  };
  distributor: {
    findTab: string;
    becomeTab: string;
    findTitle: string;
    findSubtitle: string;
    searchPlaceholder: string;
    searchBtn: string;
    becomeTitle: string;
    becomeSubtitle: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    country: string;
    region: string;
    additionalInfo: string;
    submitBtn: string;
    successTitle: string;
    successText: string;
    submitAnother: string;
    required: string;
    invalidEmail: string;
  };
  contact: {
    heading: string;
    formTitle: string;
    nameLbl: string;
    namePlaceholder: string;
    emailLbl: string;
    emailPlaceholder: string;
    phoneLbl: string;
    phonePlaceholder: string;
    subjectLbl: string;
    subjectPlaceholder: string;
    messageLbl: string;
    messagePlaceholder: string;
    sendBtn: string;
    successTitle: string;
    successText: string;
    sendAnother: string;
    emailLabel: string;
    phoneLabel: string;
    officeLabel: string;
    officeValue: string;
    officeSub: string;
    hoursLabel: string;
    hoursValue: string;
    hoursSub: string;
    emailReply: string;
    phoneSub: string;
    required: string;
    invalidEmail: string;
  };
  faqs: {
    title: string;
    generalTitle: string;
    productSpecificTitle: string;
    stillHaveTitle: string;
    stillHaveText: string;
    contactUs: string;
    generalQuestions: GeneralQuestion[];
    baseXTitle: string;
    directXTitle: string;
    startSetXTitle: string;
    guardXTitle: string;
    baseXFaqs: FaqItem[];
    directXFaqs: FaqItem[];
    startSetXFaqs: FaqItem[];
    guardXFaqs: FaqItem[];
  };
  legal: {
    privacy: LegalContent;
    terms: LegalContent;
    safety: LegalContent;
    contactBtn: string;
    lastUpdated: string;
  };
}

export interface GeneralQuestion {
  question: string;
  answer: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalContent {
  title: string;
  updated: string;
  sections: LegalSection[];
}
