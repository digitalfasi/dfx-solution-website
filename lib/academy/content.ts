/**
 * DFX Academy — single source of truth for all Academy content.
 *
 * Every section renders from this file so course copy can change without
 * touching UI components, and so future courses can reuse the same component
 * set with a different data object.
 *
 * CONTENT RULE: nothing here may claim placements, income, student counts or
 * trainer credentials. Anything not yet verified is marked `placeholder: true`
 * and must be replaced with real information before launch.
 */

export const ACADEMY = {
  name: "DFX Academy",
  parent: "DFX Solution",
  attribution: "DFX Academy — an initiative of DFX Solution.",
  whatsapp: "919344024373",
  phone: "+919344024373",
  phoneDisplay: "+91 93440 24373",
  email: "info@dfxsolution.com",
  /** REPLACE: full street address of the in-person training venue. */
  locationCity: "Ambur, Tamil Nadu",
} as const;

export const ACADEMY_ROUTES = {
  hub: "/academy",
  course: "/academy/ai-digital-marketing",
  ambur: "/academy/digital-marketing-course-ambur",
  resources: "/academy/resources",
  about: "/academy/about",
  enquire: "/academy/enquire",
} as const;

/**
 * Contextual in-page jump links. Deliberately NOT a second navigation bar —
 * DFX Academy is a vertical inside the DFX Solution site, so the global navbar
 * (with its "Academics" item) stays the only site navigation.
 */
export const ACADEMY_JUMP_LINKS = [
  { label: "8-Week Journey", href: "#journey" },
  { label: "What You'll Build", href: "#projects" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "AI Integration", href: "#ai" },
  { label: "FAQ", href: "#faq" },
];

export const HERO = {
  eyebrow: "AI-INTEGRATED DIGITAL MARKETING",
  h1: "Turn Curiosity Into Skills. Skills Into Opportunity.",
  sub: "An upcoming practical learning initiative from DFX Solution designed to help learners build modern digital marketing skills through AI-integrated workflows, real projects and guided learning.",
  trust: ["AI-Integrated Workflows", "GEO & Search Evolution", "Practical Projects", "Guided Learning"],
  primary: { label: "Explore Programs", href: "#programs" },
  secondary: { label: "Enquire Now", href: "#enquire" },
  /** Drop the real DFX Academy film here when ready. Empty = image hero. */
  video: "",
  poster: "/images/academy/hero-classroom.jpg",
};

export interface AudiencePath {
  id: string;
  title: string;
  lead: string;
  outcome: string;
}

export const AUDIENCE_PATHS: AudiencePath[] = [
  {
    id: "students",
    title: "Students & Freshers",
    lead: "Beyond basic theory.",
    outcome:
      "Build modern digital skills that go beyond traditional marketing fundamentals through practical, project-based execution.",
  },
  {
    id: "working-professionals",
    title: "Working Professionals",
    lead: "Upskill for what's next.",
    outcome:
      "Upgrade your existing skills with AI, automation, search evolution and performance marketing workflows.",
  },
  {
    id: "business-owners",
    title: "Business Owners",
    lead: "Drive own growth.",
    outcome:
      "Understand how modern digital marketing, AI workflows and search can directly support business growth.",
  },
  {
    id: "aspiring-freelancers",
    title: "Aspiring Freelancers",
    lead: "Market-ready skills.",
    outcome:
      "Build practical skills and project experience across modern digital marketing workflows to package and offer services.",
  },
];

export interface ProgramTrack {
  id: string;
  num: string;
  title: string;
  summary: string;
  flow: string[];
  keyAreas: string[];
  suitableFor: string;
}

export const PROGRAM_TRACKS: ProgramTrack[] = [
  {
    id: "ai-marketing",
    num: "01",
    title: "AI-INTEGRATED DIGITAL MARKETING",
    summary:
      "Build a modern understanding of digital marketing and learn how AI can accelerate research, planning, content, campaigns and execution.",
    flow: ["Research", "AI Planning", "Content", "Automation"],
    keyAreas: [
      "Digital marketing strategy",
      "AI-assisted research",
      "AI content workflows",
      "Campaign planning",
      "Marketing automation",
      "Productivity workflows",
    ],
    suitableFor: "Learners seeking to build future-ready, AI-powered marketing habits.",
  },
  {
    id: "seo-geo-search",
    num: "02",
    title: "SEO + GEO + AI SEARCH",
    summary:
      "Teach search evolution beyond traditional SEO—exploring Generative Engine Optimization (GEO) and AI-powered search engines.",
    flow: ["SEO", "Search", "AI Search", "GEO"],
    keyAreas: [
      "Technical & on-page SEO",
      "Keyword & search intent research",
      "Content strategy",
      "Generative Engine Optimization (GEO)",
      "AI search visibility",
      "Search experience optimization",
    ],
    suitableFor: "Anyone wanting to master next-generation organic discoverability.",
  },
  {
    id: "paid-growth",
    num: "03",
    title: "PAID GROWTH + PERFORMANCE MARKETING",
    summary:
      "Teach modern performance marketing across search and social channels with data-driven decision making and rapid testing.",
    flow: ["PLAN", "LAUNCH", "MEASURE", "OPTIMIZE"],
    keyAreas: [
      "Campaign strategy",
      "Paid search & paid social",
      "Audience targeting",
      "Creative testing",
      "Conversion tracking",
      "Performance analysis",
    ],
    suitableFor: "Learners seeking to design and optimize paid acquisition campaigns.",
  },
  {
    id: "conversion-crm",
    num: "04",
    title: "CONVERSION + CRM + AI WORKFLOWS",
    summary:
      "Show how traffic and marketing activity turn into lead pipelines, CRM automation, and real business outcomes.",
    flow: ["ATTRACT", "ENGAGE", "CONVERT", "RETAIN"],
    keyAreas: [
      "Landing page optimization",
      "Conversion strategy",
      "Lead journeys",
      "CRM fundamentals",
      "Marketing automation",
      "AI-assisted workflows",
    ],
    suitableFor: "Entrepreneurs, freelancers and marketers building growth engines.",
  },
];

export interface AcademyModule {
  week: string;
  title: string;
  question: string;
  deliverable: string;
  monetization: string;
}

/** LOCKED curriculum — 8 modules reflecting AI-integrated positioning. */
export const MODULES: AcademyModule[] = [
  {
    week: "01",
    title: "DIGITAL MARKETING FOUNDATION",
    question: "Understand the modern digital ecosystem, customer journey and marketing fundamentals.",
    deliverable: "Digital ecosystem framework & website structure",
    monetization: "Digital Marketing",
  },
  {
    week: "02",
    title: "AI-INTEGRATED MARKETING",
    question: "Use AI for research, ideation, planning, content and marketing workflows.",
    deliverable: "AI prompt library & marketing workflow engine",
    monetization: "AI Workflows",
  },
  {
    week: "03",
    title: "SEO & SEARCH STRATEGY",
    question: "Understand search intent, technical foundations, content and organic visibility.",
    deliverable: "Search strategy & technical audit report",
    monetization: "SEO & Organic Growth",
  },
  {
    week: "04",
    title: "GEO & AI SEARCH",
    question: "Explore Generative Engine Optimization and how brands can improve visibility across AI-powered search.",
    deliverable: "GEO audit & AI search optimization plan",
    monetization: "GEO & AI Search",
  },
  {
    week: "05",
    title: "CONTENT + SOCIAL GROWTH",
    question: "Build content systems and social strategies supported by modern AI workflows.",
    deliverable: "Multi-channel content engine & calendar",
    monetization: "Content & Social",
  },
  {
    week: "06",
    title: "PAID PERFORMANCE",
    question: "Understand campaign planning, paid acquisition, targeting, measurement and optimization.",
    deliverable: "Paid ad campaign structure & tracking setup",
    monetization: "Performance Marketing",
  },
  {
    week: "07",
    title: "CONVERSION + CRM",
    question: "Turn attention into leads through landing pages, conversion thinking, CRM and automation.",
    deliverable: "Landing page & CRM lead automation workflow",
    monetization: "Conversion & CRM",
  },
  {
    week: "08",
    title: "GROWTH + PRACTICAL PROJECT",
    question: "Bring the learning together into a practical project/workflow that demonstrates understanding.",
    deliverable: "Portfolio of practical work & pitch offer",
    monetization: "Portfolio & Growth",
  },
];

export interface Deliverable {
  title: string;
  note: string;
  kind: "browser" | "document" | "dashboard" | "campaign" | "device";
  image?: string;
}

export const DELIVERABLES: Deliverable[] = [
  { title: "Professional business website", note: "Live, responsive, structured for search.", kind: "browser" },
  { title: "SEO & GEO Search Strategy Audit", note: "Technical, on-page and generative search plan.", kind: "document" },
  { title: "AI-Powered Content & Creative Engine", note: "Calendar, formats and AI workflows.", kind: "campaign" },
  { title: "Paid Lead-Generation Campaign", note: "Meta & Google campaign structure & targeting.", kind: "campaign" },
  { title: "CRM & Follow-up Automation", note: "Lead capture through to structured follow-up.", kind: "dashboard" },
  { title: "Analytics & Growth Dashboard", note: "Events, measurement and performance reporting.", kind: "dashboard" },
  { title: "Portfolio + Service Offer Assets", note: "Everything needed to present your practical work.", kind: "device" },
];

export const AI_AREAS = [
  { title: "Research", desc: "Understand markets, audiences and competitors faster." },
  { title: "Content", desc: "Draft, structure and refine marketing content." },
  { title: "Creative workflows", desc: "Move from idea to usable creative with fewer dead ends." },
  { title: "Analysis", desc: "Read the data and turn it into a decision." },
  { title: "Automation", desc: "Remove repetitive steps from marketing operations." },
  { title: "Optimization", desc: "Test, refine and improve what is already running." },
  { title: "Productivity", desc: "Cover more ground without a larger team." },
];

export const MONETIZATION_PATHS = [
  { title: "Freelancing", desc: "Build a service offer, present your portfolio and acquire clients." },
  { title: "Own Business", desc: "Apply the same systems to a business you are building yourself." },
  { title: "Grow an Existing Business", desc: "Use digital marketing systems to improve operations already running." },
];

export const PROMPT_LIBRARY_CATEGORIES = [
  "Research",
  "Website copy",
  "SEO",
  "Content",
  "Creative",
  "Ads",
  "Email & WhatsApp",
  "CRM",
  "Analytics",
  "CRO",
  "Client outreach",
];

export const LEARNING_STEPS = [
  { step: "Learn", desc: "Concept + framework" },
  { step: "Watch", desc: "Trainer demonstration" },
  { step: "Build", desc: "Hands-on practical" },
  { step: "Apply", desc: "Business Lab" },
  { step: "Prove", desc: "Portfolio deliverable" },
  { step: "Grow", desc: "Service / business application" },
];

export const FAQS = [
  {
    q: "Who is DFX Academy for?",
    a: "Students & freshers, working professionals, small business owners, and aspiring freelancers. The program focuses on practical execution, so prior advanced marketing experience is not required.",
  },
  {
    q: "What is the duration?",
    a: "Eight weeks, structured as 8 weekly modules—each ending in a practical deliverable.",
  },
  {
    q: "Is it online or in-person?",
    a: `Both. The program runs live online, with optional in-person sessions available in ${ACADEMY.locationCity}.`,
  },
  {
    q: "How is AI integrated into the curriculum?",
    a: "AI is integrated from Day One across research, content creation, GEO, ad workflows, analytics, and CRM automation—the way modern digital marketers operate daily.",
  },
  {
    q: "What will I achieve upon completion?",
    a: "You will build a portfolio of real practical work, master AI-integrated marketing workflows, and receive a DFX Academy Certificate.",
  },
  {
    q: "Does DFX Academy guarantee jobs or placements?",
    a: "No. DFX Academy focuses on building genuine practical skills, portfolio work, and real-world understanding without making false placement or income guarantees.",
  },
  {
    q: "How do I enquire?",
    a: "Fill out the enquiry form or click 'Enquire via WhatsApp' to connect with the DFX Academy team for cohort schedules and program details.",
  },
];

export const ENQUIRY_STATUS_OPTIONS = [
  "Student / Fresher",
  "Working professional",
  "Business owner",
  "Aspiring freelancer",
  "Other",
];

export const ENQUIRY_MODE_OPTIONS = ["Online", "In-person", "Either"];

export const TESTIMONIALS: { quote: string; name: string; role: string }[] = [];

export const TRAINERS: {
  name: string;
  role: string;
  bio: string;
  image?: string;
  placeholder: boolean;
}[] = [
  {
    name: "Lead Trainer — name pending",
    role: "DFX Solution",
    bio: "Profile pending. This block is CMS-ready.",
    placeholder: true,
  },
];

/** wa.me deep link with a prefilled enquiry message. */
export function whatsappHref(message: string) {
  return `https://wa.me/${ACADEMY.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_ENQUIRY_MESSAGE =
  "Hi DFX Academy, I'd like to know more about the 8-week AI-Integrated Digital Marketing program.";

