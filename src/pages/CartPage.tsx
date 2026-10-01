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
import { Trash2, ShoppingBag, Tag, ArrowRight, X, ShoppingCart } from 'lucide-react';

export function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getDiscount, getVolumeDiscount, getVAT, getTotal, couponCode, applyCoupon, removeCoupon, clearCart } = useCartStore();
  const { show } = useToastStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const result = applyCoupon(couponInput);
    if (result.success) {
      show('success', `Coupon applied: ${couponInput.toUpperCase()}`);
      setCouponInput('');
    } else {
      show('error', result.error || 'Invalid coupon');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      show('info', 'Please sign in or register to checkout');
      navigate('/login?redirect=/checkout');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    const recommended = COURSES.slice(0, 4);
    return (
      <>
        <PageBanner title="Shopping Cart" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
        <div className="container-eqms py-10">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-muted mx-auto mb-4" />
            <h2 className="text-xl font-bold text-heading mb-2">Your cart is empty</h2>
            <p className="text-body mb-6">Browse our courses and start learning today.</p>
            <Link to="/courses"><Button variant="primary" size="lg">Browse Courses</Button></Link>
          </div>
          <div className="mt-12">
            <h3 className="text-lg font-bold text-heading mb-6">Recommended Courses</h3>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.courseId} className="p-4 flex gap-4">
                <img src={item.thumbnail} alt={item.title} className="w-24 h-24 rounded-card object-cover flex-shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
                <div className="flex-1 flex flex-col">
                  <Link to={`/courses/${COURSES.find(c => c.id === item.courseId)?.slug || ''}`} className="font-bold text-heading hover:text-primary transition-colors">{item.title}</Link>
                  {item.teamPurchase && <span className="text-xs text-primary font-medium mt-1">Team Purchase</span>}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.courseId, item.quantity - 1)} className="w-8 h-8 rounded-button border border-border hover:bg-bg-light flex items-center justify-center">-</button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.courseId, item.quantity + 1)} className="w-8 h-8 rounded-button border border-border hover:bg-bg-light flex items-center justify-center">+</button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-primary">£{(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeItem(item.courseId)} className="p-2 text-muted hover:text-error transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <div className="flex justify-between">
              <Link to="/courses"><Button variant="ghost"><ShoppingBag className="w-4 h-4" />Continue Shopping</Button></Link>
              <Button variant="ghost" onClick={() => { clearCart(); show('info', 'Cart cleared'); }}>Clear Cart</Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-lg font-bold text-heading mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-medium">£{getSubtotal().toFixed(2)}</span></div>
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-success"><span>Coupon ({couponCode})</span><span>-£{getDiscount().toFixed(2)}</span></div>
                )}
                {getVolumeDiscount() > 0 && (
                  <div className="flex justify-between text-success"><span>Volume Discount</span><span>-£{getVolumeDiscount().toFixed(2)}</span></div>
                )}
                <div className="flex justify-between"><span className="text-muted">VAT (20%)</span><span className="font-medium">£{getVAT().toFixed(2)}</span></div>
              </div>

              <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-4">
                <Input placeholder="Coupon code" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} className="flex-1" />
                <Button type="submit" variant="secondary" size="md"><Tag className="w-4 h-4" />Apply</Button>
              </form>
              {couponCode && (
                <button onClick={() => { removeCoupon(); show('info', 'Coupon removed'); }} className="text-xs text-error flex items-center gap-1 mb-4">
                  <X className="w-3 h-3" /> Remove coupon
                </button>
              )}

              <div className="border-t border-border pt-4 mb-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-heading">Total</span>
                  <span className="text-2xl font-bold text-primary">£{getTotal().toFixed(2)}</span>
                </div>
              </div>

              <Button variant="primary" size="lg" fullWidth onClick={handleCheckout}>
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-xs text-muted text-center mt-3">Use code EQMS25 for 25% off</p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
