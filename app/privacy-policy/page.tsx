import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DFX Solution",
  description:
    "Learn how DFX Solution collects, uses, protects, and manages information when you use our website, services, enquiry forms, and advertising campaigns.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    type: "website",
    url: "https://dfxsolution.com/privacy-policy",
    title: "Privacy Policy | DFX Solution",
    description:
      "Learn how DFX Solution collects, uses, protects, and manages information when you use our website, services, enquiry forms, and advertising campaigns.",
    siteName: "DFX Solution",
    locale: "en_IN",
  },
};

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "1. Introduction",
    body: (
      <p>
        DFX Solution (&ldquo;DFX Solution&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects your privacy and is
        committed to protecting it through this Privacy Policy. This policy explains what information we may collect
        when you visit our website, submit an enquiry or consultation form, or interact with our advertising
        campaigns, and how that information may be used, shared, and protected. By using our website or submitting
        information to us, you agree to the practices described in this Privacy Policy.
      </p>
    ),
  },
  {
    heading: "2. Information We Collect",
    body: (
      <p>
        We may collect information in a few different ways: information you provide directly to us, information
        collected through advertising and lead-generation forms, and information collected automatically as you
        browse our website. Not every visitor is required to provide all of the information described below — the
        information we receive depends on how you choose to interact with us.
      </p>
    ),
  },
  {
    heading: "3. Information You Provide",
    body: (
      <>
        <p>When you fill out an enquiry, contact, or consultation form on our website, we may collect information such as:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company or business name</li>
          <li>Website URL</li>
          <li>Business requirements</li>
          <li>Marketing requirements</li>
          <li>Project information</li>
          <li>Advertising requirements</li>
          <li>Any other information you voluntarily submit through our forms</li>
        </ul>
        <p>
          This information is provided by you at your discretion and is used to respond to your enquiry and
          discuss the services you are interested in.
        </p>
      </>
    ),
  },
  {
    heading: "4. Information Collected Through Advertising and Lead Generation",
    body: (
      <>
        <p>
          DFX Solution may use online advertising and lead-generation platforms, including Meta advertising
          products, to promote our services and connect with prospective customers.
        </p>
        <p>
          When you submit information through an advertising lead form or a form on our website, that information
          may be provided to DFX Solution so that we can respond to your enquiry, provide the information you
          requested, discuss our services, or arrange a consultation. We only receive information that you have
          voluntarily chosen to submit through such a form — we do not collect information about Facebook or
          Instagram users beyond what is submitted through their direct interaction with our forms or ads.
        </p>
      </>
    ),
  },
  {
    heading: "5. Automatically Collected Information",
    body: (
      <p>
        Like most websites, our site may automatically collect certain technical information when you visit,
        such as your browser type, device type, general location, referring pages, and browsing activity on our
        site. This information helps us understand how our website is used and how we can improve it, and may be
        collected using cookies or similar technologies as described below.
      </p>
    ),
  },
  {
    heading: "6. How We Use Information",
    body: (
      <>
        <p>We may use the information we collect to:</p>
        <ul>
          <li>Respond to your enquiries</li>
          <li>Provide requested information</li>
          <li>Contact prospective customers</li>
          <li>Schedule consultations</li>
          <li>Understand your business requirements</li>
          <li>Provide proposals or recommendations</li>
          <li>Deliver requested services</li>
          <li>Improve our website and services</li>
          <li>Support our marketing and advertising activities</li>
          <li>Prevent fraud, abuse, or security issues</li>
          <li>Comply with applicable legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    heading: "7. Advertising and Marketing",
    body: (
      <p>
        DFX Solution may use digital advertising platforms, including Meta/Facebook advertising products, to
        promote our services and reach prospective customers. Where applicable, third-party advertising platforms
        may use cookies, pixels, or similar technologies in accordance with their own privacy policies to measure
        advertising performance, understand campaign effectiveness, or show relevant advertising. We do not make
        claims about specific advertising technologies beyond those we actually use.
      </p>
    ),
  },
  {
    heading: "8. Cookies and Similar Technologies",
    body: (
      <p>
        Our website may use cookies or similar technologies to support website functionality, improve user
        experience, understand website analytics, support security, and assist with marketing and advertising
        measurement. You can control or disable cookies through your browser settings; however, doing so may
        affect certain features of our website.
      </p>
    ),
  },
  {
    heading: "9. Third-Party Services",
    body: (
      <p>
        We may work with third-party service providers to support our website hosting, analytics, communications,
        advertising, technology, payment processing, or other business operations where applicable. These
        providers may process information only as necessary to provide their services to us and are expected to
        handle information in accordance with their own privacy policies.
      </p>
    ),
  },
  {
    heading: "10. Information Sharing",
    body: (
      <p>
        DFX Solution does not sell personal information to third parties. Information may be shared with trusted
        service providers where reasonably necessary to operate our website, respond to enquiries, deliver our
        services, support business operations, or comply with legal obligations.
      </p>
    ),
  },
  {
    heading: "11. Data Security",
    body: (
      <p>
        We use reasonable technical and organizational measures designed to protect information against
        unauthorized access, loss, misuse, alteration, or disclosure. However, no method of transmission or
        storage is completely secure, and we cannot guarantee absolute security of information.
      </p>
    ),
  },
  {
    heading: "12. Data Retention",
    body: (
      <p>
        We may retain information for as long as reasonably necessary to provide our services, respond to
        enquiries, maintain business records, comply with legal obligations, resolve disputes, and support
        security purposes.
      </p>
    ),
  },
  {
    heading: "13. Your Choices and Rights",
    body: (
      <p>
        You may contact us through our website regarding your personal information and may request correction,
        access, or deletion of that information where applicable and subject to legal requirements. We will
        respond to reasonable requests to the extent required by applicable law.
      </p>
    ),
  },
  {
    heading: "14. External Links",
    body: (
      <p>
        Our website may contain links to third-party websites, including social media platforms and advertising
        platforms. We are not responsible for the privacy practices or content of those external sites, and we
        encourage you to review their privacy policies before providing any information.
      </p>
    ),
  },
  {
    heading: "15. Children's Privacy",
    body: (
      <p>
        Our website and services are not intentionally directed toward children, and we do not knowingly collect
        personal information from children for marketing purposes. If you believe a child has provided us with
        personal information, please contact us so that we can take appropriate action.
      </p>
    ),
  },
  {
    heading: "16. Changes to This Privacy Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or for other
        operational, legal, or regulatory reasons. Any updates will be posted on this page with a revised
        &ldquo;Last Updated&rdquo; date.
      </p>
    ),
  },
  {
    heading: "17. Contact Us",
    body: (
      <>
        <p>If you have questions about this Privacy Policy or how your information is handled, please contact:</p>
        <p>
          <strong>DFX Solution</strong>
          <br />
          Website:{" "}
          <a href="https://www.dfxsolution.com/" className="text-primary hover:underline">
            https://www.dfxsolution.com/
          </a>
        </p>
        <p>To contact us regarding this Privacy Policy, please use the contact options available on our website.</p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="container-px pt-[136px] pb-24 md:pt-[168px] md:pb-32">
      <div className="max-w-[820px] mx-auto">
        <p className="text-xs uppercase tracking-[.14em] text-primary font-semibold mb-4">Legal</p>
        <h1 className="text-3xl md:text-4xl font-bold text-tx mb-3">Privacy Policy</h1>
        <p className="text-sm text-muted mb-12">Last Updated: August 2026</p>

        <div className="flex flex-col gap-10">
          {SECTIONS.map((s) => (
            <div key={s.heading}>
              <h2 className="text-lg md:text-xl font-semibold text-tx mb-3">{s.heading}</h2>
              <div className="text-[15px] leading-relaxed text-tx2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1.5">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
