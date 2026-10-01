import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageBanner } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/context/CartContext';
import { useToastStore } from '@/context/ToastContext';
import { useAuthStore } from '@/context/AuthContext';
import { COURSES } from '@/data/seed';
import { CourseCard } from '@/components/CourseCard';
import { FALLBACK_IMAGE } from '@/data/assets';
import {
  Trash2, ShoppingBag, Tag, ArrowRight, X, ShoppingCart, ShieldCheck,
  Award, Zap, Lock, Users, Sparkles, Check
} from 'lucide-react';

const SUGGESTED_COUPONS = [
  { code: 'EQMS25', label: '25% OFF Storewide', desc: 'Any order' },
  { code: 'SAFETY15', label: '15% OFF Bulk', desc: 'Min 5 licenses' },
  { code: 'WELCOME10', label: '10% OFF Starter', desc: 'First purchase' },
];

export function CartPage() {
  const {
    items, removeItem, updateQuantity, getSubtotal, getDiscount,
    getVolumeDiscount, getVAT, getTotal, getTotalQuantity, couponCode,
    applyCoupon, removeCoupon, clearCart, addItem
  } = useCartStore();
  const { show } = useToastStore();
  const { user, loginAs } = useAuthStore();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const totalQuantity = getTotalQuantity();

  // Volume discount milestone calculation
  const getVolumeDiscountInfo = () => {
    if (totalQuantity >= 25) {
      return { current: 20, next: null, needed: 0, progress: 100 };
    }
    if (totalQuantity >= 10) {
      return { current: 15, next: 20, needed: 25 - totalQuantity, progress: (totalQuantity / 25) * 100 };
    }
    if (totalQuantity >= 5) {
      return { current: 10, next: 15, needed: 10 - totalQuantity, progress: (totalQuantity / 10) * 100 };
    }
    return { current: 0, next: 10, needed: 5 - totalQuantity, progress: (totalQuantity / 5) * 100 };
  };

  const volumeInfo = getVolumeDiscountInfo();

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim();
    if (!code) return;
    const result = applyCoupon(code);
    if (result.success) {
      show('success', `Coupon applied: ${code.toUpperCase()}! You saved £${(result.discount || 0).toFixed(2)}`);
      setCouponInput('');
    } else {
      show('error', result.error || 'Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      show('info', 'Please sign in or register to complete your order');
      navigate('/login?redirect=/checkout');
      return;
    }
    navigate('/checkout');
  };

  const handleQuickDemoCheckout = () => {
    loginAs('learner');
    show('success', 'Signed in as Demo Learner. Proceeding to payment...');
    navigate('/checkout');
  };

  const handleAddSampleCourses = () => {
    const sample = COURSES.slice(0, 2);
    sample.forEach((c) => {
      addItem({
        courseId: c.id,
        title: c.title,
        thumbnail: c.thumbnail,
        price: c.salePrice || c.price,
        quantity: 1,
        teamPurchase: false,
      });
    });
    show('success', 'Added popular compliance courses to your cart!');
  };

  if (items.length === 0) {
    const recommended = COURSES.slice(0, 4);
    return (
      <>
        <PageBanner title="Shopping Cart" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
        <div className="container-eqms py-10">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
          <div className="text-center py-16 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 animate-bounce">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-heading mb-2">Your cart is currently empty</h2>
            <p className="text-body mb-6">Explore our CPD-approved courses or add sample courses to test our interactive checkout and fake payment gateway.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" size="lg" onClick={handleAddSampleCourses}>
                <Sparkles className="w-4 h-4" /> Add Test Courses to Cart
              </Button>
              <Link to="/courses">
                <Button variant="outline" size="lg">Browse Catalogue</Button>
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-lg font-bold text-heading mb-6">Popular Compliance Courses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBanner title="Shopping Cart" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />

        {/* Volume Discount Progress Banner */}
        <div className="mt-6 p-4 rounded-card bg-gradient-to-r from-primary/10 via-primary/5 to-white border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-heading text-sm sm:text-base">
                {volumeInfo.current > 0
                  ? `🎉 Tier Unlocked: ${volumeInfo.current}% Team Volume Discount Active!`
                  : 'Volume Discounts Available for Teams & Organisations'}
              </p>
              <p className="text-xs text-muted">
                {volumeInfo.next
                  ? `Add ${volumeInfo.needed} more licence${volumeInfo.needed > 1 ? 's' : ''} to unlock a ${volumeInfo.next}% discount across all items.`
                  : 'You have unlocked the maximum 20% enterprise discount!'}
              </p>
            </div>
          </div>
          <div className="w-full md:w-48 flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-muted font-medium">
              <span>{totalQuantity} licenses</span>
              <span>Next tier: {volumeInfo.next ? `${volumeInfo.next}%` : 'MAX'}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${Math.min(100, volumeInfo.progress)}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.courseId} className="p-4 flex flex-col sm:flex-row gap-4 hover:shadow-card-hover transition-all">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full sm:w-28 h-28 rounded-card object-cover flex-shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/courses/${COURSES.find(c => c.id === item.courseId)?.slug || ''}`}
                        className="font-bold text-heading hover:text-primary transition-colors text-base"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeItem(item.courseId)}
                        className="p-1.5 text-muted hover:text-error transition-colors"
                        title="Remove course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-bg-light text-muted font-medium">CPD UK Certified</span>
                      {item.teamPurchase && (
                        <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium flex items-center gap-1">
                          <Users className="w-3 h-3" /> Multi-Seat Team Licence
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted font-medium">Licences:</span>
                      <div className="flex items-center border border-border rounded-button overflow-hidden bg-bg-light">
                        <button
                          onClick={() => updateQuantity(item.courseId, item.quantity - 1)}
                          className="w-8 h-8 hover:bg-white flex items-center justify-center font-bold text-heading transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.courseId, item.quantity + 1)}
                          className="w-8 h-8 hover:bg-white flex items-center justify-center font-bold text-heading transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-muted block">£{item.price.toFixed(2)} each</span>
                      <span className="font-bold text-primary text-lg">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Link to="/courses">
                <Button variant="ghost">
                  <ShoppingBag className="w-4 h-4" /> Continue Shopping
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => { clearCart(); show('info', 'Cart cleared'); }}
                className="text-error hover:bg-error-light hover:text-error"
              >
                Clear Cart
              </Button>
            </div>

            {/* Trust and Assurance Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 p-4 rounded-card bg-bg-light border border-border text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-6 h-6 text-success mb-1" />
                <p className="text-xs font-bold text-heading">30-Day Guarantee</p>
                <p className="text-[10px] text-muted">100% money-back</p>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="w-6 h-6 text-primary mb-1" />
                <p className="text-xs font-bold text-heading">Instant Access</p>
                <p className="text-[10px] text-muted">Start learning right now</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-6 h-6 text-info mb-1" />
                <p className="text-xs font-bold text-heading">CPD Accredited</p>
                <p className="text-[10px] text-muted">Official verifiable certs</p>
              </div>
              <div className="flex flex-col items-center">
                <Lock className="w-6 h-6 text-heading mb-1" />
                <p className="text-xs font-bold text-heading">256-Bit SSL</p>
                <p className="text-[10px] text-muted">Bank-grade security</p>
              </div>
            </div>
          </div>

          {/* Sidebar Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 shadow-card">
              <h2 className="text-lg font-bold text-heading mb-4">Order Summary</h2>

              <div className="space-y-2.5 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal ({totalQuantity} licence{totalQuantity > 1 ? 's' : ''})</span>
                  <span className="font-semibold text-heading">£{getSubtotal().toFixed(2)}</span>
                </div>
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-success font-medium">
                    <span>Coupon ({couponCode})</span>
                    <span>-£{getDiscount().toFixed(2)}</span>
                  </div>
                )}
                {getVolumeDiscount() > 0 && (
                  <div className="flex justify-between text-success font-medium">
                    <span>Volume Discount ({volumeInfo.current}%)</span>
                    <span>-£{getVolumeDiscount().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted text-xs">
                  <span>UK VAT (20% standard)</span>
                  <span>£{getVAT().toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Form & Suggestions */}
              <div className="mb-4">
                <form onSubmit={(e) => { e.preventDefault(); handleApplyCoupon(); }} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Enter discount code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 uppercase font-semibold text-xs"
                  />
                  <Button type="submit" variant="secondary" size="md">
                    <Tag className="w-3.5 h-3.5" /> Apply
                  </Button>
                </form>

                {couponCode ? (
                  <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded bg-success/10 text-success border border-success/20">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Code <strong>{couponCode}</strong> applied
                    </span>
                    <button
                      onClick={() => { removeCoupon(); show('info', 'Coupon removed'); }}
                      className="text-error hover:underline flex items-center gap-0.5"
                    >
                      <X className="w-3 h-3" /> Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-[11px] text-muted mb-1.5">Available sample coupons (click to apply):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED_COUPONS.map((sc) => (
                        <button
                          key={sc.code}
                          type="button"
                          onClick={() => handleApplyCoupon(sc.code)}
                          className="px-2 py-0.5 rounded border border-dashed border-primary/40 bg-primary/5 text-primary text-[11px] font-semibold hover:bg-primary hover:text-white transition-all"
                        >
                          {sc.code} ({sc.label})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="border-t border-border pt-4 mb-5">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-heading text-lg block">Total Due</span>
                    <span className="text-[11px] text-muted">Includes VAT & certification fees</span>
                  </div>
                  <span className="text-3xl font-extrabold text-primary">£{getTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Main Checkout Buttons */}
              <div className="space-y-2.5">
                <Button variant="primary" size="lg" fullWidth onClick={handleCheckout} className="shadow-md">
                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-1" />
                </Button>

                {!user && (
                  <button
                    type="button"
                    onClick={handleQuickDemoCheckout}
                    className="w-full py-2.5 px-3 rounded-button border border-border bg-bg-light hover:bg-border text-xs font-semibold text-heading flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    ⚡ 1-Click Demo Checkout (Instant Sign In)
                  </button>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-center gap-2 text-xs text-muted">
                <Lock className="w-3.5 h-3.5 text-success" />
                <span>Simulated PCI-DSS Level 1 Secure Gateway</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

