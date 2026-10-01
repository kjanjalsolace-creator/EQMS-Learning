import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';
import { DEMO_USERS } from '@/data/seed';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  login: (email: string, password: string) => { success: boolean; error?: string; user?: User };
  loginAs: (role: UserRole) => User | null;
  register: (data: Partial<User> & { email: string; password: string }) => { success: boolean; error?: string; user?: User };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  verifyEmail: () => void;
  resetPassword: (email: string) => { success: boolean; error?: string };
}

function getInitialUsers(): User[] {
  return [...DEMO_USERS];
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: getInitialUsers(),
      login: (email, password) => {
        const cleanEmail = (email || '').trim().toLowerCase();
        const cleanPassword = (password || '').trim();

        if (!cleanEmail || !cleanPassword) {
          return { success: false, error: 'Please enter both email and password' };
        }

        // Always check in both persisted users and DEMO_USERS fallback
        const userList = (get().users && get().users.length > 0) ? get().users : DEMO_USERS;
        const user = userList.find(
          (u) => u.email.toLowerCase() === cleanEmail && (u.password === cleanPassword || (cleanPassword === 'demo123' && DEMO_USERS.some(d => d.email.toLowerCase() === cleanEmail)))
        );

        if (user) {
          set({ user, isAuthenticated: true });
          return { success: true, user };
        }

        // Check if account exists but password was wrong
        const userExists = userList.some((u) => u.email.toLowerCase() === cleanEmail);
        if (userExists) {
          return { success: false, error: 'Incorrect password. (Tip: Demo accounts use password "demo123")' };
        }

        return {
          success: false,
          error: 'No account found with this email. Click "Register" to create one or use a Demo Login below.'
        };
      },
      loginAs: (role) => {
        const userList = (get().users && get().users.length > 0) ? get().users : DEMO_USERS;
        let user = userList.find((u) => u.role === role);
        if (!user) {
          user = DEMO_USERS.find((u) => u.role === role);
        }
        if (user) {
          set({ user, isAuthenticated: true });
          return user;
        }
        return null;
      },
      register: (data) => {
        const cleanEmail = (data.email || '').trim().toLowerCase();
        if (!cleanEmail) {
          return { success: false, error: 'Email is required' };
        }

        const userList = (get().users && get().users.length > 0) ? get().users : DEMO_USERS;
        const existing = userList.find((u) => u.email.toLowerCase() === cleanEmail);
        if (existing) {
          return { success: false, error: 'An account with this email already exists. Please sign in.' };
        }

        const role: UserRole = data.role || (data.company ? 'org_admin' : 'learner');
        const newUser: User = {
          id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          email: cleanEmail,
          password: data.password || 'demo123',
          firstName: data.firstName?.trim() || 'Learner',
          lastName: data.lastName?.trim() || 'User',
          role,
          company: data.company?.trim(),
          companySize: data.companySize,
          sector: data.sector,
          createdAt: new Date().toISOString(),
          emailVerified: true,
          notificationPrefs: { courseUpdates: true, assignments: true, reminders: true, marketing: false },
        };

        const updatedUsers = [...userList, newUser];
        set({
          users: updatedUsers,
          user: newUser,
          isAuthenticated: true,
        });

        return { success: true, user: newUser };
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) => {
        const current = get().user;
        if (!current) return;
        const updated = { ...current, ...data };
        const userList = (get().users && get().users.length > 0) ? get().users : DEMO_USERS;
        set({
          user: updated,
          users: userList.map((u) => (u.id === updated.id ? updated : u)),
        });
      },
      verifyEmail: () => {
        const current = get().user;
        if (!current) return;
        const updated = { ...current, emailVerified: true };
        set({ user: updated });
      },
      resetPassword: (email) => {
        const cleanEmail = (email || '').trim().toLowerCase();
        const userList = (get().users && get().users.length > 0) ? get().users : DEMO_USERS;
        const user = userList.find((u) => u.email.toLowerCase() === cleanEmail);
        if (!user) return { success: false, error: 'No account found with this email' };
        return { success: true };
      },
    }),
    {
      name: 'eqms-auth',
      merge: (persistedState: any, currentState: AuthState) => {
        const p = persistedState as Partial<AuthState> | undefined;
        const storedUsers = Array.isArray(p?.users) ? p.users : [];
        const demoIds = new Set(DEMO_USERS.map((u) => u.id));
        // Keep all demo users fresh, and retain any new registered users from localStorage
        const customUsers = storedUsers.filter(
          (u) => !demoIds.has(u.id) && !DEMO_USERS.some(d => d.email.toLowerCase() === u.email.toLowerCase())
        );
        const mergedUsers = [...DEMO_USERS, ...customUsers];

        return {
          ...currentState,
          ...p,
          users: mergedUsers,
          user: p?.user || null,
          isAuthenticated: !!p?.user,
        };
      },
    }
  )
);

