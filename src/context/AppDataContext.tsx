import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Notification, Order, Enrolment, Certificate } from '@/types';

interface AppDataState {
  orders: Order[];
  enrolments: Enrolment[];
  certificates: Certificate[];
  notifications: Notification[];
  addOrder: (order: Order) => void;
  addEnrolment: (enrolment: Enrolment) => void;
  updateEnrolment: (id: string, data: Partial<Enrolment>) => void;
  addCertificate: (cert: Certificate) => void;
  addNotification: (notif: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: (userId: string) => void;
}

export const useAppDataStore = create<AppDataState>()(
  persist(
    (set) => ({
      orders: [],
      enrolments: [],
      certificates: [],
      notifications: [],
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      addEnrolment: (enrolment) => set((s) => ({ enrolments: [enrolment, ...s.enrolments] })),
      updateEnrolment: (id, data) =>
        set((s) => ({
          enrolments: s.enrolments.map((e) => (e.id === id ? { ...e, ...data } : e)),
        })),
      addCertificate: (cert) => set((s) => ({ certificates: [cert, ...s.certificates] })),
      addNotification: (notif) => set((s) => ({ notifications: [notif, ...s.notifications] })),
      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      markAllRead: (userId) =>
        set((s) => ({
          notifications: s.notifications.map((n) => (n.userId === userId ? { ...n, read: true } : n)),
        })),
    }),
    { name: 'eqms-app-data' }
  )
);
