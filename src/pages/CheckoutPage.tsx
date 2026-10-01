import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageBanner } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/context/CartContext';
import { useAuthStore } from '@/context/AuthContext';
import { useAppDataStore } from '@/context/AppDataContext';
import { useToastStore } from '@/context/ToastContext';
import type { Order, Enrolment, BillingAddress } from '@/types';
import { COURSES } from '@/data/seed';
import { FALLBACK_IMAGE } from '@/data/assets';
import {
  CheckCircle2, CreditCard, Lock, ShieldCheck, Loader2, FileText, Download,
  ArrowRight, Home, Smartphone, Building2, QrCode, Play, Sparkles, AlertCircle,
  Check, Zap, Printer
} from 'lucide-react';

const STEPS = ['Billing', 'Review', 'Payment Gateway', 'Confirmation'];

// Audio chime generator using native Web Audio API
function playSuccessChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
    });
  } catch {
    // Ignore audio restrictions
  }
}

// UK Banks for Open Banking simulation
const UK_BANKS = [
  { id: 'monzo', name: 'Monzo Bank', color: '#ff365d' },
  { id: 'revolut', name: 'Revolut', color: '#0075eb' },
  { id: 'barclays', name: 'Barclays', color: '#00aeef' },
  { id: 'hsbc', name: 'HSBC UK', color: '#db0011' },
  { id: 'lloyds', name: 'Lloyds Bank', color: '#006a4e' },
  { id: 'natwest', name: 'NatWest', color: '#5a2582' },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, getSubtotal, getDiscount, getVolumeDiscount, getVAT, getTotal, couponCode, clearCart } = useCartStore();
  const { addOrder, addEnrolment, addNotification } = useAppDataStore();
  const { show } = useToastStore();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [error, setError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Billing address state
  const [billing, setBilling] = useState<BillingAddress>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    company: user?.company || '',
    address: '14 Queen Victoria Street',
    city: 'London',
    postcode: 'EC4N 4TA',
    vatNumber: '',
    poNumber: '',
  });

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'open_banking' | 'invoice'>('card');
  const [card, setCard] = useState({
    number: '4242 4242 4242 4242',
    name: `${user?.firstName || 'Olivia'} ${user?.lastName || 'Bennett'}`.toUpperCase(),
    expiry: '12/28',
    cvc: '123',
  });
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [saveCard, setSaveCard] = useState(true);

  // 3D Secure / OTP Simulation modal
  const [show3DSModal, setShow3DSModal] = useState(false);
  const [otpCode, setOtpCode] = useState('849201');
  const [otpVerifying, setOtpVerifying] = useState(false);

  // Biometric / Apple Pay simulation
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [biometricState, setBiometricState] = useState<'prompt' | 'scanning' | 'approved'>('prompt');

  // Open Banking simulation
  const [selectedBank, setSelectedBank] = useState(UK_BANKS[0].id);

  // Invoice / PO simulation
  const [poNumber, setPoNumber] = useState('PO-2026-9884');
  const [invoiceEmail, setInvoiceEmail] = useState(user?.email || '');

  // Confetti canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    }
  }, [user, navigate]);

  if (!user) return null;

  if (items.length === 0 && !completedOrder) {
    navigate('/cart');
    return null;
  }

  // Trigger confetti burst on completed order
  useEffect(() => {
    if (completedOrder && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; rot: number; vrot: number }[] = [];
      const colors = ['#e63031', '#16a34a', '#2563eb', '#f59e0b', '#8b5cf6', '#ec4899'];

      for (let i = 0; i < 90; i++) {
        particles.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 200,
          y: canvas.height / 3 + (Math.random() - 0.5) * 100,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.7) * 15,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot: Math.random() * 360,
          vrot: (Math.random() - 0.5) * 10,
        });
      }

      let animId: number;
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35; // gravity
          p.rot += p.vrot;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });

        if (particles.some(p => p.y < canvas.height)) {
          animId = requestAnimationFrame(render);
        }
      };

      render();
      return () => cancelAnimationFrame(animId);
    }
  }, [completedOrder]);

  // Card brand detection
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s/g, '');
    if (clean.startsWith('4')) return { brand: 'VISA', bg: 'from-blue-900 via-indigo-950 to-slate-900', color: 'text-amber-400' };
    if (/^(5[1-5]|2[2-7])/.test(clean)) return { brand: 'MASTERCARD', bg: 'from-zinc-900 via-stone-900 to-black', color: 'text-red-500' };
    if (/^3[47]/.test(clean)) return { brand: 'AMEX', bg: 'from-teal-900 via-emerald-950 to-slate-900', color: 'text-cyan-400' };
    return { brand: 'CREDIT', bg: 'from-slate-900 via-gray-900 to-zinc-900', color: 'text-gray-300' };
  };

  const cardBrand = getCardBrand(card.number);

  const fillTestCard = (preset: 'success' | 'otp' | 'mastercard' | 'decline') => {
    if (preset === 'success') {
      setCard({ number: '4242 4242 4242 4242', name: `${user.firstName} ${user.lastName}`.toUpperCase(), expiry: '12/28', cvc: '123' });
      show('info', 'Loaded Instant Success Visa card');
    } else if (preset === 'otp') {
      setCard({ number: '4000 0000 0000 3021', name: `${user.firstName} ${user.lastName}`.toUpperCase(), expiry: '09/27', cvc: '789' });
      show('info', 'Loaded 3D Secure / OTP Simulation card');
    } else if (preset === 'mastercard') {
      setCard({ number: '5555 4444 3333 2222', name: `${user.firstName} ${user.lastName}`.toUpperCase(), expiry: '11/26', cvc: '456' });
      show('info', 'Loaded Corporate Mastercard');
    } else if (preset === 'decline') {
      setCard({ number: '4000 0000 0000 0002', name: `${user.firstName} ${user.lastName}`.toUpperCase(), expiry: '05/25', cvc: '000' });
      show('warning', 'Loaded Card Declined test card');
    }
    setError('');
  };

  const validateBilling = () => {
    if (!billing.firstName || !billing.lastName || !billing.email || !billing.address || !billing.city || !billing.postcode) {
      setError('Please fill in all required billing fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(billing.email)) {
      setError('Invalid email address');
      return false;
    }
    setError('');
    return true;
  };

  const validateCard = () => {
    const num = card.number.replace(/\s/g, '');
    if (num.length < 15) { setError('Please enter a valid card number'); return false; }
    if (!card.name) { setError('Please enter the cardholder name'); return false; }
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) { setError('Please enter expiry in MM/YY format'); return false; }
    if (card.cvc.length < 3) { setError('Please enter a 3 or 4 digit CVC security code'); return false; }
    setError('');
    return true;
  };

  const executeOrderCompletion = (methodLabel: string) => {
    const finalOrder: Order = {
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
      paymentMethod: methodLabel,
      billingAddress: billing,
      invoiceNumber: `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
    };

    addOrder(finalOrder);

    // Enroll learner in each purchased course with instant LMS tokens
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
      title: 'Order Completed & Courses Activated',
      message: `Order ${finalOrder.invoiceNumber} paid via ${methodLabel}. ${items.length} course(s) are now ready in your portal.`,
      read: false,
      createdAt: new Date().toISOString(),
      link: '/portal/my-learning',
    });

    playSuccessChime();
    setCompletedOrder(finalOrder);
    clearCart();
    setLoading(false);
    setProcessingStage('');
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    show('success', 'Payment Authorized! Your courses are ready.');
  };

  const handlePay = () => {
    setError('');

    // If card payment selected, validate inputs
    if (paymentMethod === 'card') {
      if (!validateCard()) return;

      const num = card.number.replace(/\s/g, '');
      const isDecline = num.endsWith('0002');
      const isOTP = num.endsWith('3021') || num.includes('3021');

      if (isDecline) {
        setLoading(true);
        setProcessingStage('🔒 Contacting Card Network (Visa/Mastercard)...');
        setTimeout(() => {
          setLoading(false);
          setProcessingStage('');
          setError('Declined (Do Not Honor): The simulated card issuer rejected the transaction. Please try our Instant Success card preset.');
        }, 1200);
        return;
      }

      // If test OTP card is used, show the simulated 3D Secure modal
      if (isOTP) {
        setShow3DSModal(true);
        return;
      }

      // Standard Realistic Processing Sequence
      setLoading(true);
      setProcessingStage('🔒 Establishing 256-bit TLS secure tunnel...');
      setTimeout(() => {
        setProcessingStage('💳 Routing token to issuing bank network...');
        setTimeout(() => {
          setProcessingStage('🛡️ Verified by Visa / 3DS2 checks passed...');
          setTimeout(() => {
            setProcessingStage('⚡ Authorizing £' + getTotal().toFixed(2) + ' and issuing LMS licences...');
            setTimeout(() => {
              executeOrderCompletion(`Credit Card (${cardBrand.brand} •••• ${num.slice(-4)})`);
            }, 800);
          }, 700);
        }, 800);
      }, 700);
      return;
    }

    // Apple Pay / Digital Wallet Flow
    if (paymentMethod === 'apple_pay') {
      setShowBiometricModal(true);
      setBiometricState('prompt');
      return;
    }

    // UK Open Banking Flow
    if (paymentMethod === 'open_banking') {
      const bank = UK_BANKS.find(b => b.id === selectedBank)?.name || 'UK Bank';
      setLoading(true);
      setProcessingStage(`🏦 Connecting to ${bank} via Open Banking API...`);
      setTimeout(() => {
        setProcessingStage('📲 Waiting for approval on your mobile banking app...');
        setTimeout(() => {
          setProcessingStage('✅ Faster Payments settlement confirmed...');
          setTimeout(() => {
            executeOrderCompletion(`Open Banking (${bank})`);
          }, 800);
        }, 1200);
      }, 1000);
      return;
    }

    // Corporate Invoice Flow
    if (paymentMethod === 'invoice') {
      setLoading(true);
      setProcessingStage('📄 Generating corporate VAT invoice and Net-30 agreement...');
      setTimeout(() => {
        executeOrderCompletion(`Corporate Invoice (${poNumber || 'Net-30'})`);
      }, 1200);
    }
  };

  const handleNext = () => {
    if (step === 0 && !validateBilling()) return;
    if (step === 2) { handlePay(); return; }
    setStep(step + 1);
  };

  // 3D Secure OTP verification
  const handleVerifyOTP = () => {
    setOtpVerifying(true);
    setTimeout(() => {
      setOtpVerifying(false);
      setShow3DSModal(false);
      const num = card.number.replace(/\s/g, '');
      executeOrderCompletion(`Credit Card (3DS Verified •••• ${num.slice(-4)})`);
    }, 1200);
  };

  // Biometric Apple Pay simulation
  const handleTriggerBiometric = () => {
    setBiometricState('scanning');
    setTimeout(() => {
      setBiometricState('approved');
      playSuccessChime();
      setTimeout(() => {
        setShowBiometricModal(false);
        executeOrderCompletion('Apple Pay (Biometric Authorized)');
      }, 900);
    }, 1400);
  };

  // -------------------------------------------------------------
  // VIEW: CONFIRMATION SCREEN
  // -------------------------------------------------------------
  if (completedOrder) {
    return (
      <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 w-full h-full" />
        <PageBanner title="Order Confirmed" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Confirmation' }]} />
        <div className="container-eqms py-10">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Confirmation' }]} />

          <div className="max-w-3xl mx-auto mt-6">
            {/* Top Success Banner */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4 animate-scale-in">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <span className="px-3 py-1 rounded-full bg-success-light text-success font-semibold text-xs tracking-wide uppercase mb-2 inline-block">
                Payment Authorized & Verified
              </span>
              <h1 className="text-3xl font-bold text-heading">Thank You for Your Order!</h1>
              <p className="text-body mt-2">
                We've activated your course licences. You can start learning immediately or review your official VAT invoice below.
              </p>
            </div>

            {/* Ready to Learn - Quick Course Launchers */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-heading text-lg flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" /> Ready to Start Learning
                </h3>
                <span className="text-xs text-muted">Instant LMS enrolment</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {completedOrder.items.map((item) => {
                  const courseData = COURSES.find(c => c.id === item.courseId);
                  const courseSlug = courseData?.slug || 'health-and-safety-at-work';
                  return (
                    <Card key={item.courseId} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-card-hover transition-all border-l-4 border-l-primary">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-16 h-16 rounded-card object-cover flex-shrink-0"
                          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                        />
                        <div>
                          <p className="font-bold text-heading text-sm sm:text-base">{item.title}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                            <span className="text-success font-semibold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Enrolled
                            </span>
                            <span>•</span>
                            <span>{item.quantity} Licence{item.quantity > 1 ? 's' : ''} Issued</span>
                            <span>•</span>
                            <span>CPD Accredited</span>
                          </div>
                        </div>
                      </div>
                      <Link to={`/portal/player/${courseSlug}`}>
                        <Button variant="primary" size="md" className="whitespace-nowrap shadow">
                          <Play className="w-4 h-4 fill-current" /> Start Course
                        </Button>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Official Digital Tax Invoice / Receipt */}
            <Card className="p-6 md:p-8 mb-6 border border-border shadow-card print-receipt bg-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-border gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    <span className="font-extrabold text-heading text-xl tracking-tight">EQMS TRAINING</span>
                  </div>
                  <p className="text-xs text-muted mt-1">Official Tax Receipt & Order Confirmation</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-success/10 text-success text-xs font-bold uppercase mb-1">
                    PAID IN FULL
                  </span>
                  <p className="text-sm font-bold text-heading">Invoice #{completedOrder.invoiceNumber}</p>
                  <p className="text-xs text-muted">{new Date(completedOrder.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-b border-border text-xs">
                <div>
                  <p className="text-muted font-semibold uppercase mb-1">Billed To</p>
                  <p className="font-bold text-heading">{completedOrder.billingAddress.firstName} {completedOrder.billingAddress.lastName}</p>
                  {completedOrder.billingAddress.company && <p className="text-muted">{completedOrder.billingAddress.company}</p>}
                  <p className="text-muted">{completedOrder.billingAddress.address}</p>
                  <p className="text-muted">{completedOrder.billingAddress.city}, {completedOrder.billingAddress.postcode}</p>
                  <p className="text-muted">{completedOrder.billingAddress.email}</p>
                </div>
                <div>
                  <p className="text-muted font-semibold uppercase mb-1">Payment Method</p>
                  <p className="font-bold text-heading">{completedOrder.paymentMethod}</p>
                  <p className="text-muted">Transaction ID: TXN-{completedOrder.id.slice(-8).toUpperCase()}</p>
                  <p className="text-muted">Status: Settled (GBP £)</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-muted font-semibold uppercase mb-1">Compliance & Accreditation</p>
                  <p className="font-bold text-heading">CPD UK Standards Office</p>
                  <p className="text-muted">Provider Reg: EQMS-UK-8492</p>
                  <p className="text-muted">VAT Registration: GB 982 4410 82</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="py-6 space-y-3">
                <p className="text-xs font-semibold text-muted uppercase">Purchased Items</p>
                {completedOrder.items.map((item) => (
                  <div key={item.courseId} className="flex justify-between items-center text-sm py-2 border-b border-border/50">
                    <div>
                      <p className="font-semibold text-heading">{item.title}</p>
                      <p className="text-xs text-muted">Single/Team Licence × {item.quantity} • 12 Months Access</p>
                    </div>
                    <span className="font-bold text-heading">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span>£{completedOrder.subtotal.toFixed(2)}</span>
                </div>
                {completedOrder.discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount ({completedOrder.couponCode})</span>
                    <span>-£{completedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                {completedOrder.volumeDiscount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Volume Discount</span>
                    <span>-£{completedOrder.volumeDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted">
                  <span>VAT (20% UK Standard)</span>
                  <span>£{completedOrder.vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-lg pt-3 border-t border-border text-heading">
                  <span>Total Amount Paid</span>
                  <span className="text-primary">£{completedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 no-print">
              <Link to="/portal/my-learning">
                <Button variant="primary" size="lg" className="shadow">
                  Go to My Learning Portal <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-1" /> Print / Save Invoice
              </Button>
              <Link to="/portal/orders">
                <Button variant="ghost" size="lg">
                  <FileText className="w-4 h-4 mr-1" /> All Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // -------------------------------------------------------------
  // VIEW: CHECKOUT STEPS (BILLING, REVIEW, PAYMENT)
  // -------------------------------------------------------------
  return (
    <>
      <PageBanner title="Secure Checkout" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-8 mt-6">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex flex-col items-center ${i <= step ? '' : 'opacity-40'}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                  i < step ? 'bg-success text-white' : i === step ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-bg-light text-muted border border-border'
                }`}>
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className="text-xs mt-1.5 font-medium text-heading whitespace-nowrap">{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 sm:w-20 h-0.5 mx-2 transition-colors ${i < step ? 'bg-success' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="max-w-5xl mx-auto mb-6 p-4 rounded-card bg-error-light border border-error/20 text-error text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{error}</p>
              {paymentMethod === 'card' && (
                <p className="text-xs mt-1 opacity-90">Tip: Click one of the test card buttons below to automatically load valid test credentials.</p>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* STEP 0: BILLING DETAILS */}
            {step === 0 && (
              <Card className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-heading">Billing Details</h2>
                  <span className="text-xs text-muted">All fields with * are required</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First Name *" required value={billing.firstName} onChange={(e) => setBilling({ ...billing, firstName: e.target.value })} />
                  <Input label="Last Name *" required value={billing.lastName} onChange={(e) => setBilling({ ...billing, lastName: e.target.value })} />
                  <Input label="Email Address *" type="email" required value={billing.email} onChange={(e) => setBilling({ ...billing, email: e.target.value })} />
                  <Input label="Company Name (optional)" value={billing.company} onChange={(e) => setBilling({ ...billing, company: e.target.value })} placeholder="e.g. Acme Corp" />
                  <Input label="Street Address *" required value={billing.address} onChange={(e) => setBilling({ ...billing, address: e.target.value })} className="sm:col-span-2" />
                  <Input label="City *" required value={billing.city} onChange={(e) => setBilling({ ...billing, city: e.target.value })} />
                  <Input label="Postcode *" required value={billing.postcode} onChange={(e) => setBilling({ ...billing, postcode: e.target.value })} placeholder="e.g. SW1A 1AA" />
                  <Input label="VAT Number (optional)" value={billing.vatNumber} onChange={(e) => setBilling({ ...billing, vatNumber: e.target.value })} placeholder="e.g. GB123456789" />
                  <Input label="Purchase Order (PO) Number" value={billing.poNumber} onChange={(e) => setBilling({ ...billing, poNumber: e.target.value })} placeholder="e.g. PO-8921" />
                </div>
              </Card>
            )}

            {/* STEP 1: ORDER REVIEW */}
            {step === 1 && (
              <Card className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-heading mb-4">Review Your Compliance Order</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.courseId} className="flex gap-4 pb-4 border-b border-border last:border-0 items-center">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 rounded-card object-cover flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-heading text-sm">{item.title}</p>
                        <p className="text-xs text-muted mt-0.5">
                          Licence Quantity: <strong>{item.quantity}</strong> {item.teamPurchase ? '(Team Allocated)' : '(Individual)'}
                        </p>
                        <p className="text-[11px] text-success font-medium">Includes CPD Certificate & Online Exam</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-primary text-base">£{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-card bg-bg-light border border-border text-xs text-body space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted">Purchaser:</span>
                    <span className="font-semibold text-heading">{billing.firstName} {billing.lastName} ({billing.email})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Billing Address:</span>
                    <span>{billing.address}, {billing.city}, {billing.postcode}</span>
                  </div>
                </div>
              </Card>
            )}

            {/* STEP 2: IMMERSIVE PAYMENT GATEWAY SIMULATOR */}
            {step === 2 && (
              <Card className="p-6 sm:p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-heading">Payment Gateway</h2>
                    <p className="text-xs text-muted">Select your simulated payment gateway to complete checkout</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-success/10 text-success text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4" /> 256-Bit TLS
                  </span>
                </div>

                {/* Gateway Tab Selectors */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard, badge: 'Stripe' },
                    { id: 'apple_pay', label: 'Apple / Google', icon: Smartphone, badge: '1-Click' },
                    { id: 'open_banking', label: 'Open Banking', icon: QrCode, badge: 'Instant' },
                    { id: 'invoice', label: 'Pay by Invoice', icon: Building2, badge: 'Net 30' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => { setPaymentMethod(m.id as any); setError(''); }}
                      className={`p-3 rounded-card border text-left transition-all relative ${
                        paymentMethod === m.id
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                          : 'border-border hover:bg-bg-light'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <m.icon className={`w-5 h-5 ${paymentMethod === m.id ? 'text-primary' : 'text-muted'}`} />
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-bg-light text-muted">{m.badge}</span>
                      </div>
                      <p className={`text-xs font-bold ${paymentMethod === m.id ? 'text-heading' : 'text-body'}`}>{m.label}</p>
                    </button>
                  ))}
                </div>

                {/* =================================================== */}
                {/* METHOD 1: CREDIT / DEBIT CARD WITH 3D FLIP CARD */}
                {/* =================================================== */}
                {paymentMethod === 'card' && (
                  <div className="space-y-6">
                    {/* 3D Realistic Virtual Card Simulator */}
                    <div className="perspective-1000 w-full max-w-sm mx-auto h-52 sm:h-56 select-none">
                      <div
                        className={`w-full h-full relative duration-700 transform-style-3d rounded-2xl shadow-2xl transition-transform ${
                          isCardFlipped ? 'rotate-y-180' : ''
                        }`}
                      >
                        {/* FRONT OF CARD */}
                        <div
                          className={`absolute inset-0 w-full h-full rounded-2xl p-6 text-white backface-hidden flex flex-col justify-between overflow-hidden bg-gradient-to-tr ${cardBrand.bg} border border-white/20`}
                        >
                          {/* Top Row: Chip, Contactless, Brand */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {/* Realistic EMV Metallic Chip */}
                              <div className="w-11 h-8 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 shadow-inner border border-amber-300/40 relative overflow-hidden flex items-center justify-center">
                                <div className="w-full h-[1px] bg-amber-700/40 absolute top-2.5" />
                                <div className="w-full h-[1px] bg-amber-700/40 absolute bottom-2.5" />
                                <div className="h-full w-[1px] bg-amber-700/40 absolute left-3.5" />
                                <div className="h-full w-[1px] bg-amber-700/40 absolute right-3.5" />
                              </div>
                              {/* Contactless Waves */}
                              <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                                <path d="M12 19a9 9 0 0 0 0-14" />
                                <path d="M15.5 21.5a13 13 0 0 0 0-19" />
                              </svg>
                            </div>
                            <span className={`text-lg font-black tracking-wider ${cardBrand.color}`}>
                              {cardBrand.brand}
                            </span>
                          </div>

                          {/* Middle: Card Number */}
                          <div className="font-mono text-lg sm:text-xl tracking-widest text-center text-white/95 font-bold drop-shadow">
                            {card.number || '•••• •••• •••• ••••'}
                          </div>

                          {/* Bottom Row: Holder Name & Expiry */}
                          <div className="flex items-end justify-between text-xs tracking-wider">
                            <div>
                              <p className="text-[9px] uppercase text-white/60 font-medium">Cardholder</p>
                              <p className="font-bold uppercase truncate max-w-[170px] drop-shadow">{card.name || 'YOUR NAME'}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[9px] uppercase text-white/60 font-medium">Valid Thru</p>
                              <p className="font-bold font-mono drop-shadow">{card.expiry || 'MM/YY'}</p>
                            </div>
                          </div>
                        </div>

                        {/* BACK OF CARD */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl text-white backface-hidden rotate-y-180 flex flex-col justify-between overflow-hidden bg-gradient-to-tr from-slate-950 via-gray-900 to-black border border-white/20 py-5"
                        >
                          {/* Magnetic Black Strip */}
                          <div className="w-full h-10 bg-black shadow-inner" />

                          {/* Signature Bar and CVC */}
                          <div className="px-6">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-8 bg-gray-100 rounded flex items-center justify-end px-3">
                                <span className="font-mono text-sm font-bold text-gray-800 tracking-wider">
                                  {card.cvc || '•••'}
                                </span>
                              </div>
                              <span className="text-[10px] text-white/70 uppercase font-mono">CVC</span>
                            </div>
                            <p className="text-[9px] text-white/50 mt-2">
                              Authorized signature. Not valid unless signed. For simulated testing purposes only.
                            </p>
                          </div>

                          <div className="px-6 flex justify-between items-center text-[10px] text-white/40">
                            <span>EQMS Secure Pay</span>
                            <span className="font-bold">{cardBrand.brand}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Test Card Quick Preset Chips */}
                    <div className="p-3 rounded-card bg-bg-light border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-heading flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-primary" /> Test Card Presets (Click to autofill):
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => fillTestCard('success')}
                          className="px-2.5 py-1 rounded bg-white border border-border hover:border-success text-xs font-medium text-heading flex items-center gap-1.5 transition-all"
                        >
                          <span className="w-2 h-2 rounded-full bg-success" /> Instant Success (Visa)
                        </button>
                        <button
                          type="button"
                          onClick={() => fillTestCard('otp')}
                          className="px-2.5 py-1 rounded bg-white border border-border hover:border-warning text-xs font-medium text-heading flex items-center gap-1.5 transition-all"
                        >
                          <span className="w-2 h-2 rounded-full bg-warning" /> 3D Secure OTP Test
                        </button>
                        <button
                          type="button"
                          onClick={() => fillTestCard('mastercard')}
                          className="px-2.5 py-1 rounded bg-white border border-border hover:border-primary text-xs font-medium text-heading flex items-center gap-1.5 transition-all"
                        >
                          <span className="w-2 h-2 rounded-full bg-primary" /> Mastercard
                        </button>
                        <button
                          type="button"
                          onClick={() => fillTestCard('decline')}
                          className="px-2.5 py-1 rounded bg-white border border-border hover:border-error text-xs font-medium text-heading flex items-center gap-1.5 transition-all"
                        >
                          <span className="w-2 h-2 rounded-full bg-error" /> Declined Card Test
                        </button>
                      </div>
                    </div>

                    {/* Card Form Inputs */}
                    <div className="space-y-4">
                      <div>
                        <Input
                          label="Card Number"
                          placeholder="4242 4242 4242 4242"
                          value={card.number}
                          onFocus={() => setIsCardFlipped(false)}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                            const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
                            setCard({ ...card, number: formatted });
                          }}
                        />
                      </div>
                      <div>
                        <Input
                          label="Cardholder Name"
                          placeholder="JANE DOE"
                          value={card.name}
                          onFocus={() => setIsCardFlipped(false)}
                          onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date (MM/YY)"
                          placeholder="12/28"
                          value={card.expiry}
                          onFocus={() => setIsCardFlipped(false)}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                            if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                            setCard({ ...card, expiry: v });
                          }}
                        />
                        <Input
                          label="CVC Security Code (Flips Card)"
                          placeholder="123"
                          value={card.cvc}
                          onFocus={() => setIsCardFlipped(true)}
                          onBlur={() => setIsCardFlipped(false)}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                            setCard({ ...card, cvc: v });
                          }}
                        />
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer text-xs text-muted pt-1">
                        <input
                          type="checkbox"
                          checked={saveCard}
                          onChange={(e) => setSaveCard(e.target.checked)}
                          className="w-4 h-4 accent-primary"
                        />
                        Save card securely for 1-click checkout on future courses
                      </label>
                    </div>
                  </div>
                )}

                {/* =================================================== */}
                {/* METHOD 2: APPLE PAY / GOOGLE PAY SIMULATOR */}
                {/* =================================================== */}
                {paymentMethod === 'apple_pay' && (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-lg">
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-heading text-lg">Express Mobile Wallet</h3>
                      <p className="text-xs text-muted max-w-sm mx-auto mt-1">
                        Pay instantly with Touch ID or Face ID using Apple Pay or Google Wallet. No card details required.
                      </p>
                    </div>
                    <div className="max-w-xs mx-auto pt-2">
                      <button
                        type="button"
                        onClick={handlePay}
                        className="w-full py-3.5 px-6 rounded-xl bg-black text-white font-bold text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md"
                      >
                        <span>Pay with</span>
                        <span className="font-black tracking-tight text-base">Pay</span>
                        <span>/ GPay</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-muted">Simulates native biometric authentication prompt</p>
                  </div>
                )}

                {/* =================================================== */}
                {/* METHOD 3: UK OPEN BANKING / INSTANT TRANSFER */}
                {/* =================================================== */}
                {paymentMethod === 'open_banking' && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-heading mb-2">Choose your UK Bank:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {UK_BANKS.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelectedBank(b.id)}
                            className={`p-2.5 rounded-card border text-left flex items-center gap-2 transition-all ${
                              selectedBank === b.id ? 'border-primary bg-primary/5 font-bold text-primary ring-1 ring-primary' : 'border-border hover:bg-bg-light text-heading'
                            }`}
                          >
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }} />
                            <span className="text-xs">{b.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-card bg-bg-light border border-border flex flex-col sm:flex-row items-center gap-4 text-xs">
                      {/* Simulated QR Code Graphic */}
                      <div className="w-24 h-24 bg-white p-2 rounded-card border border-border flex items-center justify-center flex-shrink-0 shadow-sm">
                        <QrCode className="w-20 h-20 text-heading" />
                      </div>
                      <div className="space-y-1 text-center sm:text-left">
                        <p className="font-bold text-heading">Instant Bank App Authorization</p>
                        <p className="text-muted">Scan the QR code with your mobile banking app or click 'Authorize Payment' to simulate Faster Payments settlement.</p>
                        <p className="text-[11px] text-primary font-medium">Sort Code: 20-45-77 • Account: 84920199 • Ref: EQMS</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================== */}
                {/* METHOD 4: CORPORATE INVOICE / PO */}
                {/* =================================================== */}
                {paymentMethod === 'invoice' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-card bg-primary/5 border border-primary/20 text-xs">
                      <p className="font-bold text-heading mb-1">Corporate Net-30 Invoicing</p>
                      <p className="text-muted">
                        Full course access and employee licences are generated immediately upon submission. An official VAT invoice will be issued for payment within 30 days.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Purchase Order (PO) Number"
                        required
                        value={poNumber}
                        onChange={(e) => setPoNumber(e.target.value)}
                        placeholder="e.g. PO-2026-9812"
                      />
                      <Input
                        label="Accounts Payable Email"
                        type="email"
                        required
                        value={invoiceEmail}
                        onChange={(e) => setInvoiceEmail(e.target.value)}
                        placeholder="accounts@company.co.uk"
                      />
                    </div>
                  </div>
                )}

                {/* Processing Overlay inside Card */}
                {loading && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                    <div className="relative mb-5">
                      <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                      <Lock className="w-6 h-6 text-primary absolute inset-0 m-auto" />
                    </div>
                    <h3 className="font-bold text-heading text-lg mb-1">Processing Payment</h3>
                    <p className="text-xs text-primary font-semibold tracking-wide animate-pulse">
                      {processingStage || 'Authorizing transaction...'}
                    </p>
                    <p className="text-[11px] text-muted mt-4">Please do not refresh or close this window.</p>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* =================================================== */}
          {/* SIDEBAR: ORDER SUMMARY & SUBMIT */}
          {/* =================================================== */}
          <div>
            <Card className="p-6 sticky top-24 shadow-card">
              <h3 className="font-bold text-heading mb-4 text-base">Payment Summary</h3>

              <div className="space-y-2.5 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted">Courses ({items.length})</span>
                  <span className="font-semibold text-heading">£{getSubtotal().toFixed(2)}</span>
                </div>
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-success font-medium">
                    <span>Discount Code</span>
                    <span>-£{getDiscount().toFixed(2)}</span>
                  </div>
                )}
                {getVolumeDiscount() > 0 && (
                  <div className="flex justify-between text-success font-medium">
                    <span>Team Volume Discount</span>
                    <span>-£{getVolumeDiscount().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted text-xs">
                  <span>UK VAT (20%)</span>
                  <span>£{getVAT().toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-5">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-heading text-base block">Total Due</span>
                    <span className="text-[11px] text-muted">CPD certifications included</span>
                  </div>
                  <span className="text-2xl font-black text-primary">£{getTotal().toFixed(2)}</span>
                </div>
              </div>

              {step < 3 && (
                <div className="space-y-2">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleNext}
                    disabled={loading}
                    className="shadow-md text-base"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                      </span>
                    ) : step === 2 ? (
                      paymentMethod === 'card' ? `Pay £${getTotal().toFixed(2)} Now` :
                      paymentMethod === 'apple_pay' ? 'Authorize with Apple Pay' :
                      paymentMethod === 'open_banking' ? 'Authorize Bank Transfer' : 'Confirm & Generate Invoice'
                    ) : (
                      'Continue to ' + STEPS[step + 1]
                    )}
                  </Button>

                  {step > 0 && (
                    <Button
                      variant="ghost"
                      size="md"
                      fullWidth
                      onClick={() => { setStep(step - 1); setError(''); }}
                      disabled={loading}
                    >
                      Back
                    </Button>
                  )}
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-border text-center space-y-1.5">
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
                  <Lock className="w-3.5 h-3.5 text-success" />
                  <span>Simulated Mock Payment Gateway</span>
                </div>
                <p className="text-[10px] text-muted">No real money will be charged.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* =================================================== */}
      {/* MODAL: 3D SECURE / BANK OTP VERIFICATION SIMULATION */}
      {/* =================================================== */}
      {show3DSModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-border animate-scale-in">
            {/* Bank Header */}
            <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm tracking-wide">EQMS Bank SafeKey 3DS 2.0</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-white/20 font-mono">VISA Secure</span>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-heading text-lg">One-Time Passcode Verification</h4>
                <p className="text-xs text-muted mt-1">
                  To protect your transaction, a 6-digit verification code has been sent to your mobile phone ending in <strong>••89</strong>.
                </p>
              </div>

              <div className="p-3 rounded-card bg-bg-light border border-border text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted">Merchant:</span>
                  <span className="font-semibold text-heading">EQMS Training Ltd</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Amount:</span>
                  <span className="font-bold text-primary">£{getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Card:</span>
                  <span>Visa •••• 3021</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1">Enter Verification Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center tracking-widest text-2xl font-mono font-bold py-2.5 border-2 border-primary rounded-card focus:outline-none focus:ring-4 focus:ring-primary/20"
                />
                <div className="flex items-center justify-between text-xs text-muted mt-2">
                  <span>Code expires in: <strong>02:49</strong></span>
                  <button
                    type="button"
                    onClick={() => { setOtpCode('849201'); show('info', 'Code resent: 849201'); }}
                    className="text-primary hover:underline font-medium"
                  >
                    Resend Code
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleVerifyOTP}
                  disabled={otpVerifying}
                >
                  {otpVerifying ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Verifying Code...
                    </span>
                  ) : (
                    'Verify & Authorize Payment'
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  fullWidth
                  onClick={() => setShow3DSModal(false)}
                  disabled={otpVerifying}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================== */}
      {/* MODAL: BIOMETRIC APPLE PAY SIMULATION */}
      {/* =================================================== */}
      {showBiometricModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-neutral-900 text-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl border border-white/10 animate-scale-in">
            <div className="flex items-center justify-between text-white/60 text-xs">
              <span>Pay</span>
              <span>Double Click Side Button</span>
            </div>

            <div className="my-6">
              {biometricState === 'prompt' && (
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center mx-auto animate-pulse">
                  <Smartphone className="w-12 h-12 text-white" />
                </div>
              )}
              {biometricState === 'scanning' && (
                <div className="w-24 h-24 rounded-full border-4 border-blue-500 border-t-transparent animate-spin flex items-center justify-center mx-auto">
                  <Smartphone className="w-10 h-10 text-blue-400" />
                </div>
              )}
              {biometricState === 'approved' && (
                <div className="w-24 h-24 rounded-full bg-success flex items-center justify-center mx-auto animate-scale-in">
                  <Check className="w-12 h-12 text-white" />
                </div>
              )}
            </div>

            <div>
              <p className="text-xl font-bold">
                {biometricState === 'prompt' && 'Hold Near Reader / Use Face ID'}
                {biometricState === 'scanning' && 'Scanning Face ID...'}
                {biometricState === 'approved' && 'Done'}
              </p>
              <p className="text-xs text-white/60 mt-1">Total: £{getTotal().toFixed(2)} • EQMS Training</p>
            </div>

            {biometricState === 'prompt' && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleTriggerBiometric}
                  className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all text-sm"
                >
                  Simulate Face ID Scan
                </button>
                <button
                  type="button"
                  onClick={() => setShowBiometricModal(false)}
                  className="text-xs text-white/60 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
