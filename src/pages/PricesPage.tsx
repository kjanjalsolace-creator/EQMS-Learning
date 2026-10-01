import { Link } from 'react-router-dom';
import { PageBanner } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, X } from 'lucide-react';
import { PRICING_PLANS, FAQS } from '@/data/seed';
import { Accordion } from '@/components/ui/Accordion';

const VOLUME_DISCOUNTS = [
  { quantity: '1-4 licences', discount: 'No discount', price: 'Standard price' },
  { quantity: '5-9 licences', discount: '10% off', price: 'Best for small teams' },
  { quantity: '10-24 licences', discount: '15% off', price: 'Great for departments' },
  { quantity: '25+ licences', discount: '20% off', price: 'Best value for organisations' },
];

const COMPARISON = [
  { feature: 'Access to all 500+ courses', individual: true, team: true, enterprise: true },
  { feature: 'CPD certificate on completion', individual: true, team: true, enterprise: true },
  { feature: 'Lifetime course access', individual: true, team: true, enterprise: true },
  { feature: 'Client portal dashboard', individual: false, team: true, enterprise: true },
  { feature: 'Add/remove employees', individual: false, team: true, enterprise: true },
  { feature: 'Assign courses & due dates', individual: false, team: true, enterprise: true },
  { feature: 'Compliance reports & exports', individual: false, team: true, enterprise: true },
  { feature: 'Training matrix', individual: false, team: true, enterprise: true },
  { feature: 'Custom branding', individual: false, team: false, enterprise: true },
  { feature: 'SSO integration', individual: false, team: false, enterprise: true },
  { feature: 'Dedicated account manager', individual: false, team: false, enterprise: true },
  { feature: 'API access', individual: false, team: false, enterprise: true },
];

export function PricesPage() {
  const pricingFAQs = FAQS.filter((f) => f.category === 'Payment');

  return (
    <>
      <PageBanner
        title="Pricing Plans"
        subtitle="Simple, transparent pricing for individuals and organisations of any size."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Prices' }]}
      />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Prices' }]} />

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-16">
          {PRICING_PLANS.map((plan) => (
            <Card key={plan.id} className={`p-8 relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold text-heading mb-1">{plan.name}</h3>
              <p className="text-sm text-muted mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-heading">£{plan.price}</span>
                <span className="text-muted">/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-body">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block">
                <Button variant={plan.popular ? 'primary' : 'outline'} fullWidth size="lg">
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Volume Discounts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-heading mb-6 text-center">Volume Discounts</h2>
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-bg-section">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-heading">Licence Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-heading">Discount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-heading">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {VOLUME_DISCOUNTS.map((row, i) => (
                  <tr key={i} className="hover:bg-bg-light transition-colors">
                    <td className="px-6 py-4 text-sm text-body">{row.quantity}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">{row.discount}</td>
                    <td className="px-6 py-4 text-sm text-muted">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-heading mb-6 text-center">Feature Comparison</h2>
          <Card className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-bg-section">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-heading">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-heading">Individual</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-heading">Team/Business</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-heading">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-bg-light transition-colors">
                    <td className="px-6 py-4 text-sm text-body">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.individual ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-muted mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.team ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-muted mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.enterprise ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-muted mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* FAQ */}
        {pricingFAQs.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-heading mb-6 text-center">Pricing FAQ</h2>
            <Accordion
              items={pricingFAQs.map((f) => ({
                id: f.id,
                title: f.question,
                content: <p>{f.answer}</p>,
              }))}
            />
          </div>
        )}
      </div>
    </>
  );
}
