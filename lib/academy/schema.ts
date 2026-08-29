import { ACADEMY, ACADEMY_ROUTES, MODULES } from "./content";

const BASE = "https://dfxsolution.com";

/**
 * Structured data for the Academy. Only facts that exist on the page are
 * described — no ratings, prices, enrolment counts or outcomes, none of which
 * are verified.
 */
export const academyCourseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI Digital Marketing — 8-Week Practical Program",
  description:
    "An 8-week live practical program covering digital marketing foundations and websites, SEO, social and content, paid ads and lead generation, CRM and automation, analytics, CRO, and monetization — with AI integrated across every module.",
  url: BASE + ACADEMY_ROUTES.course,
  inLanguage: "en",
  educationalLevel: "Beginner to intermediate",
  teaches: MODULES.map((m) => m.title),
  provider: {
    "@type": "Organization",
    name: ACADEMY.name,
    url: BASE + ACADEMY_ROUTES.hub,
    parentOrganization: { "@type": "Organization", name: ACADEMY.parent, url: BASE },
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: ["Online", "Onsite"],
    courseWorkload: "P8W",
    location: { "@type": "Place", address: ACADEMY.locationCity },
  },
};

export const academyBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "DFX Solution", item: BASE },
    { "@type": "ListItem", position: 2, name: "DFX Academy", item: BASE + ACADEMY_ROUTES.hub },
  ],
};
