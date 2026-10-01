import { useState } from 'react';
import { PageBanner } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToastStore } from '@/context/ToastContext';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export function ContactPage() {
  const { show } = useToastStore();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', subject: '', message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = 'Required';
    if (!form.lastName) e.lastName = 'Required';
    if (!form.email) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject) e.subject = 'Required';
    if (!form.message) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      show('success', 'Your message has been sent. We will respond within 24 hours.');
    }, 1200);
  };

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with our team for any questions about courses, pricing or the LMS platform."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
      />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <Card className="p-6">
              <MapPin className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-bold text-heading mb-1">Our Address</h3>
              <p className="text-sm text-body">167-169 Great Portland Street, London, W1W 5PF</p>
            </Card>
            <Card className="p-6">
              <Phone className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-bold text-heading mb-1">Phone</h3>
              <p className="text-sm text-body">0203 740 8683</p>
              <p className="text-xs text-muted mt-1">Mon-Fri, 9am-5pm</p>
            </Card>
            <Card className="p-6">
              <Mail className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-bold text-heading mb-1">Email</h3>
              <p className="text-sm text-body">info@eqmstraining.co.uk</p>
              <p className="text-xs text-muted mt-1">We respond within 24 hours</p>
            </Card>
            <Card className="p-6">
              <Clock className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-bold text-heading mb-1">Opening Hours</h3>
              <div className="text-sm text-body space-y-1">
                <p>Monday - Friday: 9:00 - 17:00</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-heading mb-2">Message Sent!</h2>
                  <p className="text-body mb-6">Thank you for contacting us. We will get back to you within 24 hours.</p>
                  <Button variant="primary" onClick={() => { setSent(false); setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' }); }}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-heading mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} error={errors.firstName} />
                      <Input label="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} error={errors.lastName} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
                      <Input label="Phone (optional)" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <Select label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} error={errors.subject}>
                      <option value="">Select a subject</option>
                      <option value="general">General Enquiry</option>
                      <option value="courses">Course Information</option>
                      <option value="lms">LMS / Organisation Account</option>
                      <option value="pricing">Pricing & Quotes</option>
                      <option value="support">Technical Support</option>
                    </Select>
                    <Textarea label="Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} error={errors.message} />
                    <Button type="submit" variant="primary" size="lg" loading={loading}>
                      <Send className="w-4 h-4" />
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10 rounded-card overflow-hidden shadow-card">
          <iframe
            title="EQMS Training Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.5!2d-0.1449!3d51.5219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTEuNTIxOSwtMC4xNDQ5!5e0!3m2!1sen!2suk!4v1700000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  );
}
