import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageBanner } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { useCartStore } from '@/context/CartContext';
import { useAuthStore } from '@/context/AuthContext';
import { useAppDataStore } from '@/context/AppDataContext';
import { useToastStore } from '@/context/ToastContext';
import type { Order, Enrolment, BillingAddress } from '@/types';
import { FALLBACK_IMAGE } from '@/data/assets';
import { CheckCircle2, CreditCard, Lock, ShieldCheck, Loader2, FileText, Download, ArrowRight, Home } from 'lucide-react';

const STEPS = ['Billing', 'Review', 'Payment', 'Confirmation'];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, getSubtotal, getDiscount, getVolumeDiscount, getVAT, getTotal, couponCode, clearCart } = useCartStore();
  const { addOrder, addEnrolment, addNotification } = useAppDataStore();
  const { show } = useToastStore();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const [billing, setBilling] = useState<BillingAddress>({
    firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '',
    company: user?.company || '', address: '', city: '', postcode: '', vatNumber: '', poNumber: '',
  });

  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!user) {
    navigate('/login?redirect=/checkout');
    return null;
  }

  if (items.length === 0 && !completedOrder) {
    navigate('/cart');
    return null;
  }

  const validateBilling = () => {
    if (!billing.firstName || !billing.lastName || !billing.email || !billing.address || !billing.city || !billing.postcode) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(billing.email)) { setError('Invalid email'); return false; }
    setError('');
    return true;
  };

  const validateCard = () => {
    const num = card.number.replace(/\s/g, '');
    if (num.length < 13) { setError('Invalid card number'); return false; }
    if (!card.name) { setError('Enter cardholder name'); return false; }
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) { setError('Invalid expiry (MM/YY)'); return false; }
    if (card.cvc.length < 3) { setError('Invalid CVC'); return false; }
    setError('');
    return true;
  };

  const luhnCheck = (num: string) => {
    let sum = 0, alt = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let n = parseInt(num[i], 10);
      if (alt) { n *= 2; if (n > 9) n -= 9; }
      sum += n;
      alt = !alt;
    }
    return sum % 10 === 0;
  };

  const handlePay = () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      const num = card.number.replace(/\s/g, '');
      const isDecline = num.startsWith('4000') && num.endsWith('0002');
      const isSuccess = num.startsWith('4242') || (!isDecline && luhnCheck(num));

      if (isDecline) {
        setLoading(false);
        setError('Your card was declined. Please check your details or try a different card.');
        return;
      }
      if (!isSuccess) {
        setLoading(false);
        setError('Payment processing failed. Please try again.');
        return;
      }

      const order: Order = {
        id: `order-${Date.now()}`,
        userId: user.id,
        userEmail: user.email,
        items,
        subtotal: getSubtotal(),
        discount: getDiscount(),
        volumeDiscount: getVolumeDiscount(),
        vat: getVAT(),
        total: getTotal(),
        couponCode: couponCode || undefined,
        status: 'completed',
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'invoice' ? 'Invoice' : 'PayPal',
        billingAddress: billing,
        invoiceNumber: `INV-${Date.now().toString().slice(-8)}`,
        createdAt: new Date().toISOString(),
      };

      addOrder(order);

      items.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          const enrolment: Enrolment = {
            id: `enr-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
            userId: user.id,
            courseId: item.courseId,
            enrolledAt: new Date().toISOString(),
            progress: 0,
            completedLessons: [],
            status: 'not_started',
          };
          addEnrolment(enrolment);
        }
      });

      addNotification({
        id: `notif-${Date.now()}`,
        userId: user.id,
        type: 'purchase',
        title: 'Order Completed',
        message: `Your order ${order.invoiceNumber} has been completed. ${items.length} course(s) added to your learning.`,
        read: false,
        createdAt: new Date().toISOString(),
        link: '/portal/my-learning',
      });

      setCompletedOrder(order);
      clearCart();
      setLoading(false);
      setStep(3);
      show('success', 'Payment successful! Your courses are ready.');
    }, 2000);
  };

  const handleNext = () => {
    if (step === 0 && !validateBilling()) return;
    if (step === 2) { handlePay(); return; }
    setStep(step + 1);
  };

  if (completedOrder) {
    return (
      <>
        <PageBanner title="Order Confirmation" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Confirmation' }]} />
        <div className="container-eqms py-10">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Confirmation' }]} />
          <div className="max-w-2xl mx-auto text-center mt-8">
            <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-heading mb-2">Thank You for Your Purchase!</h1>
            <p className="text-body mb-6">Your order has been completed successfully.</p>
            <Card className="p-6 text-left mb-6">
              <div className="flex justify-between mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted">Order Number</p>
                  <p className="font-bold text-heading">{completedOrder.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted">Total Paid</p>
                  <p className="font-bold text-primary">£{completedOrder.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="space-y-2">
                {completedOrder.items.map((item) => (
                  <div key={item.courseId} className="flex justify-between text-sm">
                    <span className="text-body">{item.title} × {item.quantity}</span>
                    <span className="font-medium">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border flex justify-between font-bold">
                <span>Total</span><span className="text-primary">£{completedOrder.total.toFixed(2)}</span>
              </div>
            </Card>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/portal/my-learning"><Button variant="primary" size="lg">Start Learning <ArrowRight className="w-4 h-4" /></Button></Link>
              <Link to="/portal/orders"><Button variant="outline" size="lg"><FileText className="w-4 h-4" /> View Orders</Button></Link>
              <Link to="/"><Button variant="ghost" size="lg"><Home className="w-4 h-4" /> Home</Button></Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBanner title="Checkout" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-10 mt-6">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex flex-col items-center ${i <= step ? '' : 'opacity-40'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  i < step ? 'bg-success text-white' : i === step ? 'bg-primary text-white' : 'bg-bg-light text-muted border border-border'
                }`}>
                  {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <span className="text-xs mt-1 font-medium text-heading">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`w-16 h-0.5 mx-2 ${i < step ? 'bg-success' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {error && <div className="bg-error-light text-error px-4 py-3 rounded-card mb-4 text-sm">{error}</div>}

            {step === 0 && (
              <Card className="p-6">
                <h2 className="text-lg font-bold text-heading mb-4">Billing Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First Name" required value={billing.firstName} onChange={(e) => setBilling({ ...billing, firstName: e.target.value })} />
                  <Input label="Last Name" required value={billing.lastName} onChange={(e) => setBilling({ ...billing, lastName: e.target.value })} />
                  <Input label="Email" type="email" required value={billing.email} onChange={(e) => setBilling({ ...billing, email: e.target.value })} />
                  <Input label="Company (optional)" value={billing.company} onChange={(e) => setBilling({ ...billing, company: e.target.value })} />
                  <Input label="Address" required value={billing.address} onChange={(e) => setBilling({ ...billing, address: e.target.value })} className="sm:col-span-2" />
                  <Input label="City" required value={billing.city} onChange={(e) => setBilling({ ...billing, city: e.target.value })} />
                  <Input label="Postcode" required value={billing.postcode} onChange={(e) => setBilling({ ...billing, postcode: e.target.value })} />
                  <Input label="VAT Number (optional)" value={billing.vatNumber} onChange={(e) => setBilling({ ...billing, vatNumber: e.target.value })} />
                  <Input label="PO Number (optional)" value={billing.poNumber} onChange={(e) => setBilling({ ...billing, poNumber: e.target.value })} />
                </div>
              </Card>
            )}

            {step === 1 && (
              <Card className="p-6">
                <h2 className="text-lg font-bold text-heading mb-4">Order Review</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.courseId} className="flex gap-3 pb-3 border-b border-border last:border-0">
                      <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-card object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
                      <div className="flex-1">
                        <p className="font-medium text-heading text-sm">{item.title}</p>
                        <p className="text-xs text-muted">Qty: {item.quantity} {item.teamPurchase ? '(Team)' : ''}</p>
                      </div>
                      <span className="font-bold text-primary">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>£{getSubtotal().toFixed(2)}</span></div>
                  {getDiscount() > 0 && <div className="flex justify-between text-success"><span>Coupon</span><span>-£{getDiscount().toFixed(2)}</span></div>}
                  {getVolumeDiscount() > 0 && <div className="flex justify-between text-success"><span>Volume Discount</span><span>-£{getVolumeDiscount().toFixed(2)}</span></div>}
                  <div className="flex justify-between"><span className="text-muted">VAT</span><span>£{getVAT().toFixed(2)}</span></div>
                  <div className="flex justify-between font-bold text-lg pt-2"><span className="text-heading">Total</span><span className="text-primary">£{getTotal().toFixed(2)}</span></div>
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card className="p-6">
                <h2 className="text-lg font-bold text-heading mb-4">Payment Method</h2>
                <div className="flex gap-2 mb-6">
                  {[{ id: 'card', label: 'Credit Card' }, { id: 'invoice', label: 'Pay by Invoice' }, { id: 'paypal', label: 'PayPal' }].map((m) => (
                    <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                      className={`px-4 py-2 rounded-button text-sm font-medium transition-all ${paymentMethod === m.id ? 'bg-primary text-white' : 'bg-bg-light text-body hover:bg-border'}`}>
                      {m.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <Input label="Card Number" placeholder="4242 4242 4242 4242" value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value.replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19) })} />
                    <Input label="Cardholder Name" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Expiry (MM/YY)" placeholder="12/28" value={card.expiry} onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                        if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                        setCard({ ...card, expiry: v });
                      }} />
                      <Input label="CVC" placeholder="123" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })} />
                    </div>
                    <div className="bg-bg-section rounded-card p-3 text-xs text-muted">
                      <p className="font-semibold text-heading mb-1">Demo / Test mode</p>
                      <p>Use 4242 4242 4242 4242 for success, 4000 0000 0000 0002 for decline.</p>
                    </div>
                  </div>
                )}
                {paymentMethod === 'invoice' && <p className="text-body">An invoice will be sent to {billing.email}. Your courses will be activated once payment is received.</p>}
                {paymentMethod === 'paypal' && <p className="text-body">You will be redirected to PayPal to complete your payment securely.</p>}

                <div className="flex items-center gap-2 mt-4 text-xs text-muted">
                  <Lock className="w-4 h-4" /> Your payment is secured with 256-bit SSL encryption
                </div>
              </Card>
            )}
          </div>

          {/* Summary Sidebar */}
          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="font-bold text-heading mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>£{getSubtotal().toFixed(2)}</span></div>
                {getDiscount() > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-£{getDiscount().toFixed(2)}</span></div>}
                {getVolumeDiscount() > 0 && <div className="flex justify-between text-success"><span>Volume</span><span>-£{getVolumeDiscount().toFixed(2)}</span></div>}
                <div className="flex justify-between"><span className="text-muted">VAT (20%)</span><span>£{getVAT().toFixed(2)}</span></div>
              </div>
              <div className="border-t border-border pt-4 mb-4">
                <div className="flex justify-between items-baseline"><span className="font-bold text-heading">Total</span><span className="text-2xl font-bold text-primary">£{getTotal().toFixed(2)}</span></div>
              </div>
              {step < 3 && (
                <Button variant="primary" size="lg" fullWidth onClick={handleNext} disabled={loading}>
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : step === 2 ? 'Pay Now' : 'Continue'}
                </Button>
              )}
              {step > 0 && step < 2 && (
                <Button variant="ghost" fullWidth onClick={() => setStep(step - 1)} className="mt-2">Back</Button>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
