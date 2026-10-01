import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: 'left' | 'right';
  width?: string;
}

export function Drawer({ open, onClose, children, side = 'right', width = 'max-w-md' }: DrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className={`absolute top-0 ${side === 'right' ? 'right-0' : 'left-0'} h-full w-full ${width} bg-white shadow-2xl flex flex-col animate-slide-in-right`}
      >
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
      <h2 className="text-lg font-bold text-heading">{title}</h2>
      <button onClick={onClose} className="p-2 rounded-lg hover:bg-bg-light transition-colors">
        <X className="w-5 h-5 text-muted" />
      </button>
    </div>
  );
}
