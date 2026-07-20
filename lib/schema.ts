export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DFX Solution",
  description:
    "AI Powered Growth Systems — website, SEO, ads, automation and CRM connected as one engine.",
  url: "https://dfxsolution.com/",
  telephone: "+919344024373",
  email: "hello@dfxsolution.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 13.0827, longitude: 80.2707 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DFX Solution",
  url: "https://dfxsolution.com/",
  logo: "https://dfxsolution.com/logo.png",
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI Growth System?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A single connected engine — website, SEO, ads, automation, CRM — replacing disconnected vendors with one compounding system.",
      },
    },
    {
      "@type": "Question",
      name: "Which industries do you work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Healthcare, hospitality, jewellery, manufacturing, education, real estate and restaurants.",
      },
    },
    {
      "@type": "Question",
      name: "How fast will I see results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ads within weeks. SEO compounds over 3-6 months. Automation improves conversion from day one.",
      },
    },
  ],
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dfxsolution.com/" },
  ],
};

export const productSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ReviewOS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Collect more Google reviews through QR, NFC and AI-powered review automation while protecting your online reputation.",
    brand: { "@type": "Organization", name: "DFX Solution" },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Voice Agent",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Automates payment reminders, offers, debt collection and customer follow-ups using natural AI voice conversations.",
    brand: { "@type": "Organization", name: "DFX Solution" },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tablet Reminder",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Automatically reminds patients about medicines, follow-up appointments and treatment completion through intelligent healthcare automation.",
    brand: { "@type": "Organization", name: "DFX Solution" },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
  },
];
