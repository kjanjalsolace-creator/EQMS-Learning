import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageBanner } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { ASSETS, FALLBACK_IMAGE } from '@/data/assets';
import { useToastStore } from '@/context/ToastContext';
import { CheckCircle2, Users, BarChart3, BookOpen, Building2, ShieldCheck, Send } from 'lucide-react';

const FEATURES = [
  { icon: Users, title: 'Centralised User Management', text: 'Add, remove and manage employees in one place. Assign courses to individuals, groups or departments with due dates.' },
  { icon: BarChart3, title: 'Powerful Reporting Tools', text: 'Track progress, monitor completions and export reports for board packs and audits. Time-stamped records evidence due diligence.' },
  { icon: BookOpen, title: 'Comprehensive Course Library', text: '500+ CPD-approved and ROSPA-assured courses covering every area of compliance training.' },
  { icon: ShieldCheck, title: 'Results That Matter', text: 'Save up to 50% compared to classroom training. Automated reminders, instant reports and full traceability.' },
];

const TAB_IMAGES = [ASSETS.tab1, ASSETS.tab2, ASSETS.tab3, ASSETS.tab4];

export function LMSPage() {
  const { show } = useToastStore();
  const [form, setForm] = useState({ name: '', email: '', company: '', size: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      show('success', 'Demo request received! We will contact you within 24 hours.');
      setForm({ name: '', email: '', company: '', size: '', message: '' });
    }, 1200);
  };

  return (
    <>
      <PageBanner
        title="Learning Management System"
        subtitle="A powerful, user-friendly LMS designed to help managers maintain compliance across their organisation."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'LMS' }]}
      />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'LMS' }]} />

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-16">
          {FEATURES.map((f, i) => (
            <Card key={i} className="p-6 flex gap-4">
              <div className="w-12 h-12 rounded-card bg-primary/10 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-heading mb-1">{f.title}</h3>
                <p className="text-sm text-body leading-relaxed">{f.text}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Screenshots */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-heading mb-6 text-center">Platform Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TAB_IMAGES.map((img, i) => (
              <Card key={i} className="overflow-hidden">
                <img
                  src={img}
                  alt={`LMS screenshot ${i + 1}`}
                  className="w-full h-auto"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Demo Request Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-heading mb-4">
              Request a Free Demo
            </h2>
            <p className="text-body leading-relaxed mb-6">
              See how the EQMS Training LMS can transform your compliance management. Request a
              personalised demo and our team will walk you through the platform and answer any
              questions.
            </p>
            <ul className="space-y-3">
              {['Personalised walkthrough of the platform', 'See reporting and compliance features in action', 'Discuss your organisation\'s needs', 'No obligation, no pressure'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-body">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Work Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input label="Company Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              <Select label="Company Size" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}>
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </Select>
              <Textarea label="Message (optional)" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                <Send className="w-4 h-4" />
                Request Demo
              </Button>
            </form>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-body mb-4">Want to try it right now?</p>
          <Link to="/register">
            <Button variant="primary" size="lg">Start Your Free Trial</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
