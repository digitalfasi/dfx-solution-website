import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://dfxsolution.com/", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://dfxsolution.com/academy", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://dfxsolution.com/academy/ai-digital-marketing", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://dfxsolution.com/academy/digital-marketing-course-ambur", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://dfxsolution.com/academy/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://dfxsolution.com/academy/resources", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://dfxsolution.com/academy/enquire", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
