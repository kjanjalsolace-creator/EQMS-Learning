import type { ReactNode } from 'react';

interface TabsProps {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills';
}

export function Tabs({ tabs, activeTab, onChange, variant = 'underline' }: TabsProps) {
  if (variant === 'pills') {
    return (
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2 rounded-button text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-bg-light text-body hover:bg-border'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium transition-colors relative flex items-center gap-2 ${
            activeTab === tab.id ? 'text-primary' : 'text-body hover:text-heading'
          }`}
        >
          {tab.icon}
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
}
