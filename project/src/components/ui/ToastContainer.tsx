import { CheckCircle2, XCircle, Info, AlertCircle, X } from 'lucide-react';
import { useToastStore } from '@/context/ToastContext';

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
};

const colors = {
  success: 'text-success',
  error: 'text-error',
  info: 'text-info',
  warning: 'text-warning',
};

export function ToastContainer() {
  const { toasts, remove } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className="flex items-start gap-3 bg-white rounded-card shadow-card-hover p-4 animate-slide-in-right border-l-4"
            style={{
              borderLeftColor:
                toast.type === 'success'
                  ? '#16a34a'
                  : toast.type === 'error'
                  ? '#dc2626'
                  : toast.type === 'warning'
                  ? '#f59e0b'
                  : '#2563eb',
            }}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors[toast.type]}`} />
            <p className="text-sm text-heading flex-1">{toast.message}</p>
            <button onClick={() => remove(toast.id)} className="text-muted hover:text-heading">
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
