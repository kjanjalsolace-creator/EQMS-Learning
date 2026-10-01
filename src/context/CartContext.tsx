import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Coupon } from '@/types';
import { COUPONS } from '@/data/seed';

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (courseId: string) => void;
  updateQuantity: (courseId: string, quantity: number) => void;
  updateTeamPurchase: (courseId: string, teamPurchase: boolean, assigneeEmails?: string[]) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; error?: string; discount?: number };
  removeCoupon: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getVolumeDiscount: () => number;
  getVAT: () => number;
  getTotal: () => number;
  getTotalQuantity: () => number;
}

const VAT_RATE = 0.2;

function getVolumeDiscountFor(quantity: number, subtotal: number): number {
  if (quantity >= 25) return subtotal * 0.2;
  if (quantity >= 10) return subtotal * 0.15;
  if (quantity >= 5) return subtotal * 0.1;
  return 0;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      addItem: (item) => {
        const existing = get().items.find((i) => i.courseId === item.courseId);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.courseId === item.courseId
                ? { ...i, quantity: i.quantity + item.quantity, teamPurchase: i.teamPurchase || item.teamPurchase }
                : i
            ),
          }));
        } else {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      removeItem: (courseId) => set((state) => ({ items: state.items.filter((i) => i.courseId !== courseId) })),
      updateQuantity: (courseId, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.courseId === courseId ? { ...i, quantity: Math.max(1, quantity) } : i)),
        })),
      updateTeamPurchase: (courseId, teamPurchase, assigneeEmails) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.courseId === courseId ? { ...i, teamPurchase, assigneeEmails } : i
          ),
        })),
      clearCart: () => set({ items: [], couponCode: null }),
      applyCoupon: (code) => {
        const coupon = COUPONS.find((c) => c.code.toLowerCase() === code.toLowerCase() && c.active);
        if (!coupon) return { success: false, error: 'Invalid coupon code' };
        const totalQty = get().getTotalQuantity();
        if (coupon.minLicences && totalQty < coupon.minLicences) {
          return { success: false, error: `This coupon requires a minimum of ${coupon.minLicences} licences` };
        }
        set({ couponCode: code.toUpperCase() });
        const subtotal = get().getSubtotal();
        const discount = coupon.discountType === 'percentage' ? (subtotal * coupon.discountValue) / 100 : coupon.discountValue;
        return { success: true, discount };
      },
      removeCoupon: () => set({ couponCode: null }),
      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      getDiscount: () => {
        const { couponCode } = get();
        if (!couponCode) return 0;
        const coupon = COUPONS.find((c) => c.code === couponCode);
        if (!coupon) return 0;
        const subtotal = get().getSubtotal();
        return coupon.discountType === 'percentage' ? (subtotal * coupon.discountValue) / 100 : coupon.discountValue;
      },
      getVolumeDiscount: () => {
        const totalQty = get().getTotalQuantity();
        const subtotal = get().getSubtotal();
        return getVolumeDiscountFor(totalQty, subtotal);
      },
      getVAT: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const volDiscount = get().getVolumeDiscount();
        return (subtotal - discount - volDiscount) * VAT_RATE;
      },
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const volDiscount = get().getVolumeDiscount();
        const vat = get().getVAT();
        return subtotal - discount - volDiscount + vat;
      },
      getTotalQuantity: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'eqms-cart' }
  )
);
