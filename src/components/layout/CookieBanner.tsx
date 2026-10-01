import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('eqms-cookies');
    if (!accepted) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('eqms-cookies', 'accepted');
    setVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('eqms-cookies', 'essential');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] bg-white border-t border-border shadow-card-hover animate-slide-up">
      <div className="container-eqms py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-body">
            We use cookies to improve your experience and analyse site traffic. By clicking
            "Accept All", you consent to our use of cookies. See our{' '}
            <a href="/privacy" className="text-primary underline">Privacy Policy</a> for details.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="ghost" size="sm" onClick={acceptEssential}>
            Essential Only
          </Button>
          <Button variant="primary" size="sm" onClick={accept}>
            Accept All
          </Button>
          <button onClick={accept} className="p-2 text-muted hover:text-heading">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
