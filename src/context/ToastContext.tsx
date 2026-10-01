import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface ToastState {
  toasts: Toast[];
  show: (type: Toast['type'], message: string) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastState>()(
  persist(
    (set) => ({
      toasts: [],
      show: (type, message) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
        setTimeout(() => {
          set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
        }, 4000);
      },
      remove: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    }),
    { name: 'eqms-toasts', skipHydration: true }
  )
);
