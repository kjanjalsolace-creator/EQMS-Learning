import { useState, useEffect } from 'react';
import { X, Tag } from 'lucide-react';

export function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('eqms-promo-dismissed');
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('eqms-promo-dismissed', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="bg-primary text-white relative">
      <div className="container-eqms py-2.5 flex items-center justify-center gap-3 text-sm">
        <Tag className="w-4 h-4 flex-shrink-0" />
        <p>
          Use code <span className="font-bold underline">EQMS25</span> for 25% off your first order!
        </p>
        <button
          onClick={dismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
