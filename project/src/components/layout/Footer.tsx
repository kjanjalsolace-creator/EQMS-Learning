import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { ASSETS, FALLBACK_IMAGE } from '@/data/assets';
import { useState } from 'react';
import { useToastStore } from '@/context/ToastContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const FOOTER_LINKS = {
  'Essential Pages': [
    { label: 'Contact', to: '/contact' },
    { label: 'Prices', to: '/prices' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Courses', to: '/courses' },
    { label: 'LMS', to: '/lms' },
  ],
  'About Company': [
    { label: 'About Us', to: '/about' },
    { label: 'News', to: '/news' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const { show } = useToastStore();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    show('success', 'You have been subscribed to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="bg-bg-footer text-white">
      {/* Main Footer */}
      <div className="container-eqms py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src={ASSETS.logo}
              alt="EQMS Training"
              className="h-10 w-auto mb-4 brightness-0 invert"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
            />
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Professional online training designed for real workplaces. Our courses are available
              online 24/7 on most devices, CPD-approved, and developed to support compliance and
              ongoing employee development.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                167-169 Great Portland Street, London, W1W 5PF
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                0203 740 8683
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                info@eqmstraining.co.uk
              </p>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-white/70 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Stay Updated</h4>
            <p className="text-sm text-white/70 mb-4">
              Subscribe for compliance updates, new courses and special offers.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <Button type="submit" variant="primary" fullWidth>
                <Send className="w-4 h-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-eqms py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/60">
            © EQMS LTD. All Rights Reserved.
          </p>
          <p className="text-xs text-white/40">
            Demo mode — prototype for evaluation purposes
          </p>
        </div>
      </div>
    </footer>
  );
}
