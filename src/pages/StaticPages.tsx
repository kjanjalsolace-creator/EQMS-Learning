import { Link } from 'react-router-dom';
import { PageBanner } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <>
      <PageBanner title="Page Not Found" breadcrumbs={[{ label: 'Home', to: '/' }, { label: '404' }]} />
      <div className="container-eqms py-20">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: '404' }]} />
        <div className="text-center py-16">
          <div className="text-8xl font-extrabold text-primary mb-4">404</div>
          <h1 className="text-2xl font-bold text-heading mb-3">Page Not Found</h1>
          <p className="text-body mb-8 max-w-md mx-auto">
            The page you are looking for may have been moved, deleted, or never existed.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export function PrivacyPage() {
  const sections = [
    { title: 'Introduction', content: 'EQMS Training ("we", "us", "our") is committed to protecting and respecting your privacy. This policy explains how we collect, use and disclose your personal data when you use our website and services. We comply with the UK GDPR and the Data Protection Act 2018.' },
    { title: 'Data We Collect', content: 'We collect personal data you provide directly, such as your name, email address, phone number, company details and billing information when you register, purchase courses or contact us. We also collect usage data including course progress, quiz results and certificate information.' },
    { title: 'How We Use Your Data', content: 'We use your personal data to provide and manage your account, deliver courses and certifications, process payments, send training reminders and compliance notifications, improve our services, and meet our legal and regulatory obligations.' },
    { title: 'Legal Basis', content: 'We process your personal data under the following lawful bases: performance of a contract (providing courses and services), legitimate interests (improving our platform and communicating with you), legal obligation (compliance with regulatory requirements), and consent (marketing communications).' },
    { title: 'Data Sharing', content: 'We do not sell your personal data. We may share data with our accredited course providers, payment processors (Stripe), cloud hosting providers (Supabase), and regulatory bodies where required by law. All third parties are bound by appropriate data protection agreements.' },
    { title: 'Data Retention', content: 'We retain your personal data for as long as your account is active and for a reasonable period thereafter to meet our legal, regulatory and compliance obligations. Training records and certificates are retained for a minimum of 6 years to support your compliance evidence needs.' },
    { title: 'Your Rights', content: 'Under UK GDPR, you have the right to access, rectify, erase, restrict, object to and port your personal data, and to withdraw consent at any time. To exercise these rights, contact us at info@eqmstraining.co.uk.' },
    { title: 'Security', content: 'We implement appropriate technical and organisational measures to protect your personal data, including encryption, access controls and regular security assessments. However, no method of transmission over the internet is 100% secure.' },
    { title: 'Cookies', content: 'We use cookies to improve your browsing experience, analyse site traffic and remember your preferences. You can manage your cookie preferences through our cookie banner or browser settings.' },
    { title: 'Contact Us', content: 'If you have any questions about this privacy policy or our data practices, please contact us at info@eqmstraining.co.uk or at 167-169 Great Portland Street, London, W1W 5PF.' },
  ];

  return (
    <>
      <PageBanner title="Privacy Policy" subtitle="How we collect, use and protect your personal data." breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]} />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]} />
        <div className="max-w-3xl mx-auto mt-8 space-y-6">
          <p className="text-muted text-sm">Last updated: 1 October 2026</p>
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-heading mb-2">{i + 1}. {s.title}</h2>
              <p className="text-body leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function TermsPage() {
  const sections = [
    { title: 'Acceptance of Terms', content: 'By accessing and using the EQMS Training website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.' },
    { title: 'Definitions', content: '"Services" refers to our online courses, learning management system, certificates and related features. "User" refers to any individual or organisation using our services. "Content" refers to all course materials, videos, text and resources provided through the platform.' },
    { title: 'Accounts and Registration', content: 'You must provide accurate and complete information when registering. You are responsible for maintaining the security of your account credentials and for all activities under your account. Organisations are responsible for managing their employee accounts.' },
    { title: 'Course Access and Licences', content: 'Individual purchases grant lifetime access to the purchased course. Organisation licences are valid for the number of seats purchased. Unused licences can be reassigned. Access is non-transferable except within organisation accounts.' },
    { title: 'Payment and Pricing', content: 'All prices are in GBP (£) and exclude VAT at the prevailing rate unless stated otherwise. We accept major credit cards and invoice payments for organisation accounts. Volume discounts apply as published on our pricing page.' },
    { title: 'Refund Policy', content: 'We offer a 14-day money-back guarantee on individual course purchases if you have not completed more than 25% of the course content. Organisation licence purchases are non-refundable once licences have been assigned. Refund requests can be submitted through your account or by contacting support.' },
    { title: 'Certification', content: 'Certificates are issued upon successful completion of course assessments with a minimum pass mark of 80%. Certificates are valid for the period stated on the certificate. We reserve the right to revoke certificates obtained through fraudulent means.' },
    { title: 'Intellectual Property', content: 'All course content, materials and certificates are the intellectual property of EQMS Training and our accredited partners. Users may not copy, redistribute or reproduce content without written permission. Certificates are personal and may not be transferred.' },
    { title: 'User Conduct', content: 'Users must not share account credentials, attempt to circumvent access controls, use the platform for unlawful purposes, or interfere with the proper functioning of the services. Violations may result in account termination without refund.' },
    { title: 'Limitation of Liability', content: 'EQMS Training shall not be liable for indirect, incidental or consequential damages. Our total liability shall not exceed the amount paid by the user for the relevant course or licence in the preceding 12 months.' },
    { title: 'Changes to Terms', content: 'We may update these Terms from time to time. Significant changes will be communicated via email or platform notification. Continued use of the services after changes constitutes acceptance of the updated Terms.' },
    { title: 'Contact', content: 'For questions about these Terms, contact us at info@eqmstraining.co.uk or at 167-169 Great Portland Street, London, W1W 5PF.' },
  ];

  return (
    <>
      <PageBanner title="Terms & Conditions" subtitle="The terms governing your use of EQMS Training services." breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]} />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]} />
        <div className="max-w-3xl mx-auto mt-8 space-y-6">
          <p className="text-muted text-sm">Last updated: 1 October 2026</p>
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-heading mb-2">{i + 1}. {s.title}</h2>
              <p className="text-body leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
