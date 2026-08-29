/**
 * Mock registry.
 *
 * The mockups themselves live in a client module (they measure their own width
 * to scale), so these lookup tables are declared here instead: a Server
 * Component can hold references to client components, but it cannot read a
 * plain array exported from a "use client" module.
 */
import {
  MockWebsite,
  MockSEO,
  MockContent,
  MockAds,
  MockCRM,
  MockAnalytics,
  MockCRO,
  MockPortfolio,
  MockPromptShelf,
  MockCertificate,
} from "./mockups";

/** Week number → the interface that week produces. */
export const WEEK_MOCKS: Record<string, () => JSX.Element> = {
  "01": MockWebsite,
  "02": MockSEO,
  "03": MockContent,
  "04": MockAds,
  "05": MockCRM,
  "06": MockAnalytics,
  "07": MockCRO,
  "08": MockPortfolio,
};

/** Deliverable index → mockup, for the "what you build" showcase. */
export const DELIVERABLE_MOCKS: (() => JSX.Element)[] = [
  MockWebsite,
  MockSEO,
  MockContent,
  MockAds,
  MockCRM,
  MockAnalytics,
  MockCRO,
  MockPortfolio,
  MockPromptShelf,
  MockCertificate,
];
