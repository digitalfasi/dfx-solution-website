import type { Metadata, Viewport } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { SideDots } from "@/components/SideDots";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { localBusinessSchema, organizationSchema, breadcrumbSchema, productSchemas } from "@/lib/schema";

const golos = Golos_Text({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://dfxsolution.com"),
  title: "DFX Solution — AI Powered Growth Systems",
  description:
    "DFX Solution builds AI Powered Growth Systems — website, SEO, ads, automation and CRM connected as one engine — for hospitals, hotels, jewellery brands and manufacturers.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://dfxsolution.com/",
    title: "DFX Solution — AI Powered Growth Systems",
    description: "Design. Future. Experience.",
    images: ["/og-image.jpg"],
    siteName: "DFX Solution",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "DFX Solution — AI Powered Growth Systems",
    description: "Design. Future. Experience.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={golos.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {productSchemas.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
      </head>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <Nav />
          <SideDots />
          <WhatsAppButton />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
