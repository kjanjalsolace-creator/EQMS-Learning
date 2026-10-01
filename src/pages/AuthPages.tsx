import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/context/AuthContext';
import { useToastStore } from '@/context/ToastContext';
import { ASSETS, FALLBACK_IMAGE } from '@/data/assets';
import type { UserRole } from '@/types';
import { Mail, Lock, Eye, EyeOff, User, Building2, ArrowRight, CheckCircle2, Sparkles, Key, AlertCircle } from 'lucide-react';

const DEMO_ACCOUNTS_INFO: { role: UserRole; label: string; email: string; pass: string; desc: string }[] = [
  { role: 'learner', label: 'Learner', email: 'learner@eqms.demo', pass: 'demo123', desc: 'Browse courses & earn certificates' },
  { role: 'org_admin', label: 'Organisation Admin', email: 'admin@eqms.demo', pass: 'demo123', desc: 'Manage team, assignments & billing' },
  { role: 'instructor', label: 'Instructor', email: 'instructor@eqms.demo', pass: 'demo123', desc: 'Create & manage compliance content' },
  { role: 'super_admin', label: 'Super Admin', email: 'superadmin@eqms.demo', pass: 'demo123', desc: 'Full control of users & settings' },
];

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const { login, loginAs } = useAuthStore();
  const { show } = useToastStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const getDestination = (role?: UserRole) => {
    if (redirect) return redirect;
    if (role === 'org_admin') return '/portal/admin';
    if (role === 'instructor') return '/portal/instructor';
    if (role === 'super_admin') return '/portal/superadmin';
    return '/portal';
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      try {
        const result = login(email, password);
        if (result.success && result.user) {
          show('success', `Welcome back, ${result.user.firstName}!`);
          navigate(getDestination(result.user.role));
        } else {
          setError(result.error || 'Invalid email or password');
        }
      } catch (err: any) {
        setError(err?.message || 'Login encounter an issue. Please try a demo account.');
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const handleDemoLogin = (role: UserRole) => {
    try {
      const user = loginAs(role);
      show('success', `Signed in as demo ${role.replace('_', ' ')}`);
      navigate(getDestination(user?.role || role));
    } catch {
      show('error', 'Could not sign in with demo account');
    }
  };

  const fillFormWith = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Enter your email'); return; }
    setResetSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-section">
      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Brand & Info */}
          <div className="hidden lg:block">
            <Link to="/">
              <img src={ASSETS.logo} alt="EQMS Training" className="h-12 mb-8"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Frontend Prototype
            </div>
            <h1 className="text-3xl font-bold text-heading mb-4">Welcome to EQMS Portal</h1>
            <p className="text-body mb-8">Sign in to test the complete compliance learning management flow, shopping cart, and mock checkout.</p>
            <div className="space-y-3">
              {['Access 500+ CPD-approved courses', 'Interactive cart with simulated payment gateway', 'Learner, Organisation Admin & Super Admin roles', 'Instant certificate issuance & verification'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-body">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <Card className="p-8">
            <Link to="/" className="lg:hidden flex justify-center mb-6">
              <img src={ASSETS.logo} alt="EQMS Training" className="h-10"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
            </Link>

            {forgotMode ? (
              <>
                <h2 className="text-xl font-bold text-heading mb-2">Reset Password</h2>
                {resetSent ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
                    <p className="text-body mb-4">A password reset link has been sent to <strong>{email}</strong> (simulated).</p>
                    <Button variant="primary" onClick={() => { setForgotMode(false); setResetSent(false); }}>Back to Login</Button>
                  </div>
                ) : (
                  <form onSubmit={handleReset} className="space-y-4">
                    <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.co.uk" />
                    {error && <p className="text-sm text-error">{error}</p>}
                    <Button type="submit" variant="primary" fullWidth>Send Reset Link</Button>
                    <button type="button" onClick={() => setForgotMode(false)} className="text-sm text-primary hover:underline w-full text-center">Back to Login</button>
                  </form>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-xl font-bold text-heading">Sign In</h2>
                  {redirect && (
                    <span className="text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded">
                      Checkout redirect active
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted mb-6">Enter your details or select a 1-click demo account</p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-9 w-4 h-4 text-muted pointer-events-none" />
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. learner@eqms.demo"
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-9 w-4 h-4 text-muted pointer-events-none" />
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="demo123"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-muted hover:text-heading"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {error && (
                    <div className="p-3 rounded-card bg-error-light border border-error/20 text-error text-sm flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <p>{error}</p>
                        <div className="mt-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleDemoLogin('learner')}
                            className="text-xs underline font-semibold hover:opacity-80"
                          >
                            Sign in as Learner
                          </button>
                          <span>•</span>
                          <Link
                            to={redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register'}
                            className="text-xs underline font-semibold hover:opacity-80"
                          >
                            Create Account
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-muted">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" /> Remember me
                    </label>
                    <button type="button" onClick={() => setForgotMode(true)} className="text-primary hover:underline">Forgot password?</button>
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>

                {/* 1-Click Demo Accounts */}
                <div className="mt-6 pt-5 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider">Quick Demo Login</p>
                    <span className="text-xs text-primary font-medium">Click to instant sign-in</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {DEMO_ACCOUNTS_INFO.map((acc) => (
                      <div
                        key={acc.role}
                        className="group relative p-3 rounded-card border border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-heading">{acc.label}</p>
                            <button
                              type="button"
                              title="Pre-fill form fields"
                              onClick={(e) => {
                                e.stopPropagation();
                                fillFormWith(acc.email, acc.pass);
                              }}
                              className="text-[10px] text-muted hover:text-primary underline"
                            >
                              Fill
                            </button>
                          </div>
                          <p className="text-[11px] text-muted truncate mt-0.5">{acc.email}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDemoLogin(acc.role)}
                          className="mt-2 text-xs font-medium text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                        >
                          Sign In <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-center text-muted mt-6">
                  Don't have an account?{' '}
                  <Link
                    to={redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register'}
                    className="text-primary font-semibold hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const { register } = useAuthStore();
  const { show } = useToastStore();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'individual' as 'individual' | 'organisation',
    company: '',
    companySize: '',
    sector: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fillDemoData = (type: 'individual' | 'organisation') => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    if (type === 'individual') {
      setForm({
        firstName: 'Alex',
        lastName: 'Taylor',
        email: `alex.taylor${randomSuffix}@example.co.uk`,
        password: 'demo123',
        confirmPassword: 'demo123',
        accountType: 'individual',
        company: '',
        companySize: '',
        sector: '',
      });
    } else {
      setForm({
        firstName: 'Sarah',
        lastName: 'Jenkins',
        email: `sarah.jenkins${randomSuffix}@apexbuild.co.uk`,
        password: 'demo123',
        confirmPassword: 'demo123',
        accountType: 'organisation',
        company: 'Apex Build Solutions Ltd',
        companySize: '25-100',
        sector: 'Construction & Civil Engineering',
      });
    }
    setError('');
  };

  const passwordStrength = () => {
    const p = form.password;
    let score = 0;
    if (p.length >= 6) score++;
    if (/[A-Z]/.test(p) || /[0-9]/.test(p)) score++;
    if (p.length >= 8) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return Math.min(score, 4);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = form.email.trim();
    const cleanFirstName = form.firstName.trim();
    const cleanLastName = form.lastName.trim();

    if (!cleanFirstName || !cleanLastName || !cleanEmail || !form.password) {
      setError('Please fill in all required fields');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    if (form.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.accountType === 'organisation' && !form.company.trim()) {
      setError('Company name is required for organisation accounts');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      try {
        const result = register({
          firstName: cleanFirstName,
          lastName: cleanLastName,
          email: cleanEmail,
          password: form.password,
          role: form.accountType === 'organisation' ? 'org_admin' : 'learner',
          company: form.accountType === 'organisation' ? form.company.trim() : undefined,
          companySize: form.companySize || undefined,
          sector: form.sector || undefined,
        });

        if (result.success && result.user) {
          show('success', `Account created! Welcome, ${result.user.firstName}.`);
          if (redirect) {
            navigate(redirect);
          } else if (result.user.role === 'org_admin') {
            navigate('/portal/admin');
          } else {
            navigate('/portal');
          }
        } else {
          setError(result.error || 'Registration failed');
        }
      } catch (err: any) {
        setError(err?.message || 'Could not complete registration. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const strength = passwordStrength();
  const strengthLabels = ['Too weak', 'Basic', 'Good', 'Strong', 'Very strong'];
  const strengthColors = ['#dc2626', '#f59e0b', '#3b82f6', '#16a34a', '#16a34a'];

  return (
    <div className="min-h-screen flex flex-col bg-bg-section">
      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <Card className="w-full max-w-lg p-8">
          <Link to="/" className="flex justify-center mb-6">
            <img src={ASSETS.logo} alt="EQMS Training" className="h-10"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
          </Link>
          <h1 className="text-xl font-bold text-heading mb-1 text-center">Create Your Account</h1>
          <p className="text-sm text-muted mb-4 text-center">Join EQMS for CPD-approved compliance courses</p>

          {/* Quick Fill Testing Helper */}
          <div className="mb-6 p-3 rounded-card bg-bg-light border border-border flex items-center justify-between text-xs">
            <span className="text-muted font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Test Registration:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemoData('individual')}
                className="px-2.5 py-1 bg-white border border-border hover:border-primary rounded font-semibold text-heading hover:text-primary transition-all"
              >
                Auto-fill Learner
              </button>
              <button
                type="button"
                onClick={() => fillDemoData('organisation')}
                className="px-2.5 py-1 bg-white border border-border hover:border-primary rounded font-semibold text-heading hover:text-primary transition-all"
              >
                Auto-fill Company
              </button>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex gap-2 mb-4">
              {['individual', 'organisation'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, accountType: t as 'individual' | 'organisation' })}
                  className={`flex-1 p-3 rounded-button border transition-all ${
                    form.accountType === t ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-bg-light text-heading'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {t === 'individual' ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                    <span className="text-sm font-medium capitalize">{t}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                required
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="Jane"
              />
              <Input
                label="Last Name"
                required
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Doe"
              />
            </div>

            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jane.doe@company.co.uk"
            />

            {form.accountType === 'organisation' && (
              <>
                <Input
                  label="Company Name"
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="e.g. Acme Industries Ltd"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Company Size"
                    value={form.companySize}
                    onChange={(e) => setForm({ ...form, companySize: e.target.value })}
                    placeholder="e.g. 10-50 employees"
                  />
                  <Input
                    label="Sector"
                    value={form.sector}
                    onChange={(e) => setForm({ ...form, sector: e.target.value })}
                    placeholder="e.g. Construction"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimum 4 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-muted hover:text-heading"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {form.password && (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-bg-light rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{ width: `${Math.max(20, strength * 25)}%`, backgroundColor: strengthColors[strength] }}
                  />
                </div>
                <span className="text-xs font-medium" style={{ color: strengthColors[strength] }}>
                  {strengthLabels[strength]}
                </span>
              </div>
            )}

            <Input
              label="Confirm Password"
              type="password"
              required
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Re-enter password"
            />

            {error && (
              <div className="p-3 rounded-card bg-error-light border border-error/20 text-error text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-sm text-center text-muted mt-6">
            Already have an account?{' '}
            <Link
              to={redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login'}
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

