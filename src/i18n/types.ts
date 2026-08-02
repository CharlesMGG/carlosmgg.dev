export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    map: string;
    notes: string;
    contact: string;
    menuTitle: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
    sub: string;
    availability: string;
    cta: string;
    name: string;
    firstName: string;
    lastName: string;
    portfolioWord: string;
    role: string;
    scroll: string;
  };
  worlds: {
    heading: string;
    sub: string;
    enter: string;
    comingSoon: string;
    back: string;
  };
  study: {
    role: string;
    period: string;
    status: string;
    stack: string;
    problem: string;
    decisions: string;
    alternative: string;
    because: string;
    wentWrong: string;
    screens: string;
    descent: string;
    visit: string;
    live: string;
    screenshotsSoon: string;
  };
  notes: {
    title: string;
    sub: string;
    read: string;
  };
  about: {
    kicker: string;
    title: string;
    body: string[];
    facts: { k: string; v: string }[];
  };
  social: {
    kicker: string;
  };
  rail: {
    hero: string;
    about: string;
    contact: string;
  };
  contact: {
    title: string;
    sub: string;
    kicker: string;
    bigTitle: string;
    body: string;
    emailLabel: string;
    cv: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    tagline: string;
    source: string;
  };
  common: {
    skip: string;
    sound: string;
    skipIntro: string;
  };
};
