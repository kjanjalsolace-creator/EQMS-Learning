import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: ReactNode;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function Modal({ open, onClose, title, children, size = 'md', footer }: ModalProps) {
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative bg-white rounded-card shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden flex flex-col animate-scale-in`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="text-lg font-bold text-heading">{title}</h3>
            <button onClick={onClose} className="text-muted hover:text-heading transition-colors p-1 rounded-lg hover:bg-bg-light">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="overflow-y-auto px-6 py-4 flex-1">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-border bg-bg-light">{footer}</div>}
      </div>
    </div>
  );
}
