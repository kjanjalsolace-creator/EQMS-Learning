import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
}

export function Accordion({ items, defaultOpen }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen || null);

  return (
    <div className="divide-y divide-border border border-border rounded-card overflow-hidden bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-bg-light transition-colors"
            >
              <span className="font-semibold text-heading text-sm">{item.title}</span>
              <ChevronDown
                className={`w-5 h-5 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-body leading-relaxed animate-fade-in">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
