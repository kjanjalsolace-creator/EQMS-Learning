import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';
import { DEMO_USERS } from '@/data/seed';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  login: (email: string, password: string) => { success: boolean; error?: string };
  loginAs: (role: UserRole) => void;
  register: (data: Partial<User> & { email: string; password: string }) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  verifyEmail: () => void;
  resetPassword: (email: string) => { success: boolean; error?: string };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: DEMO_USERS,
      login: (email, password) => {
        const user = get().users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (user) {
          set({ user, isAuthenticated: true });
          return { success: true };
        }
        return { success: false, error: 'Invalid email or password' };
      },
      loginAs: (role) => {
        const user = get().users.find((u) => u.role === role);
        if (user) {
          set({ user, isAuthenticated: true });
        }
      },
      register: (data) => {
        const existing = get().users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
        if (existing) {
          return { success: false, error: 'An account with this email already exists' };
        }
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: data.email,
          password: data.password,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          role: data.company ? 'org_admin' : 'learner',
          company: data.company,
          companySize: data.companySize,
          sector: data.sector,
          createdAt: new Date().toISOString(),
          emailVerified: false,
          notificationPrefs: { courseUpdates: true, assignments: true, reminders: true, marketing: false },
        };
        set((state) => ({
          users: [...state.users, newUser],
          user: newUser,
          isAuthenticated: true,
        }));
        return { success: true };
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) => {
        const current = get().user;
        if (!current) return;
        const updated = { ...current, ...data };
        set((state) => ({
          user: updated,
          users: state.users.map((u) => (u.id === updated.id ? updated : u)),
        }));
      },
      verifyEmail: () => {
        const current = get().user;
        if (!current) return;
        const updated = { ...current, emailVerified: true };
        set({ user: updated });
      },
      resetPassword: (email) => {
        const user = get().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!user) return { success: false, error: 'No account found with this email' };
        return { success: true };
      },
    }),
    { name: 'eqms-auth' }
  )
);
