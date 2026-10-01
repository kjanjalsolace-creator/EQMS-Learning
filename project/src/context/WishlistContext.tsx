import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  courseIds: string[];
  toggle: (courseId: string) => void;
  isWishlisted: (courseId: string) => boolean;
  remove: (courseId: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      courseIds: [],
      toggle: (courseId) =>
        set((state) => ({
          courseIds: state.courseIds.includes(courseId)
            ? state.courseIds.filter((id) => id !== courseId)
            : [...state.courseIds, courseId],
        })),
      isWishlisted: (courseId) => get().courseIds.includes(courseId),
      remove: (courseId) => set((state) => ({ courseIds: state.courseIds.filter((id) => id !== courseId) })),
    }),
    { name: 'eqms-wishlist' }
  )
);
