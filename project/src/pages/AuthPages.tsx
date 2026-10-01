import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/context/AuthContext';
import { useToastStore } from '@/context/ToastContext';
import { ASSETS, FALLBACK_IMAGE } from '@/data/assets';
import type { UserRole } from '@/types';
import { Mail, Lock, Eye, EyeOff, User, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/portal';
  const { login, loginAs } = useAuthStore();
  const { show } = useToastStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        show('success', 'Welcome back!');
        navigate(redirect);
      } else {
        setError(result.error || 'Login failed');
      }
      setLoading(false);
    }, 600);
  };

  const handleDemoLogin = (role: UserRole) => {
    loginAs(role);
    show('success', 'Logged in as demo ' + role.replace('_', ' '));
    const target = role === 'learner' ? '/portal' : role === 'org_admin' ? '/portal/admin' : role === 'instructor' ? '/portal/instructor' : '/portal/superadmin';
    navigate(target);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Enter your email'); return; }
    setResetSent(true);
  };

  const demoAccounts: { role: UserRole; label: string; desc: string }[] = [
    { role: 'learner', label: 'Learner', desc: 'Browse & complete courses' },
    { role: 'org_admin', label: 'Organisation Admin', desc: 'Manage employees & reports' },
    { role: 'instructor', label: 'Instructor', desc: 'Create & manage courses' },
    { role: 'super_admin', label: 'Super Admin', desc: 'Full platform control' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-section">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Brand */}
          <div className="hidden lg:block">
            <Link to="/">
              <img src={ASSETS.logo} alt="EQMS Training" className="h-12 mb-8"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
            </Link>
            <h1 className="text-3xl font-bold text-heading mb-4">Welcome Back</h1>
            <p className="text-body mb-8">Sign in to access your courses, certificates and compliance dashboard.</p>
            <div className="space-y-3">
              {['Access 500+ CPD-approved courses', 'Track your compliance progress', 'Download certificates instantly', 'Manage your team\'s training'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-body">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
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
                    <p className="text-body mb-4">A password reset link has been sent to {email} (simulated).</p>
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
                <h2 className="text-xl font-bold text-heading mb-1">Sign In</h2>
                <p className="text-sm text-muted mb-6">Enter your details to access your account</p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-9 w-4 h-4 text-muted" />
                    <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.co.uk" className="pl-10" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-9 w-4 h-4 text-muted" />
                    <Input label="Password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-muted hover:text-heading">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {error && <p className="text-sm text-error">{error}</p>}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-primary" /> Remember me
                    </label>
                    <button type="button" onClick={() => setForgotMode(true)} className="text-primary hover:underline">Forgot password?</button>
                  </div>
                  <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>

                {/* Demo Login */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3 text-center">Quick Demo Login</p>
                  <div className="grid grid-cols-2 gap-2">
                    {demoAccounts.map((acc) => (
                      <button key={acc.role} onClick={() => handleDemoLogin(acc.role)}
                        className="p-3 rounded-button border border-border hover:border-primary hover:bg-primary/5 transition-all text-left">
                        <p className="text-sm font-semibold text-heading">{acc.label}</p>
                        <p className="text-xs text-muted">{acc.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-center text-muted mt-6">
                  Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Register</Link>
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
  const { register } = useAuthStore();
  const { show } = useToastStore();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    accountType: 'individual' as 'individual' | 'organisation', company: '', companySize: '', sector: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = () => {
    const p = form.password;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.firstName || !form.lastName || !form.email || !form.password) { setError('Please fill in all required fields'); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setError('Invalid email address'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.accountType === 'organisation' && !form.company) { setError('Company name is required'); return; }

    setLoading(true);
    setTimeout(() => {
      const result = register({
        firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password,
        company: form.accountType === 'organisation' ? form.company : undefined,
        companySize: form.companySize || undefined, sector: form.sector || undefined,
      });
      if (result.success) {
        show('success', 'Account created! Welcome to EQMS Training.');
        navigate('/portal');
      } else {
        setError(result.error || 'Registration failed');
      }
      setLoading(false);
    }, 800);
  };

  const strength = passwordStrength();
  const strengthLabel = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['#dc2626', '#dc2626', '#f59e0b', '#16a34a', '#16a34a'][strength];

  return (
    <div className="min-h-screen flex flex-col bg-bg-section">
      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <Card className="w-full max-w-lg p-8">
          <Link to="/" className="flex justify-center mb-6">
            <img src={ASSETS.logo} alt="EQMS Training" className="h-10"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
          </Link>
          <h1 className="text-xl font-bold text-heading mb-1 text-center">Create Your Account</h1>
          <p className="text-sm text-muted mb-6 text-center">Start learning with 500+ compliance courses</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex gap-2 mb-4">
              {['individual', 'organisation'].map((t) => (
                <button key={t} type="button" onClick={() => setForm({ ...form, accountType: t as 'individual' | 'organisation' })}
                  className={`flex-1 p-3 rounded-button border transition-all ${form.accountType === t ? 'border-primary bg-primary/5' : 'border-border hover:bg-bg-light'}`}>
                  <div className="flex items-center justify-center gap-2">
                    {t === 'individual' ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                    <span className="text-sm font-medium text-heading capitalize">{t}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              <Input label="Last Name" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </div>
            <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

            {form.accountType === 'organisation' && (
              <>
                <Input label="Company Name" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Company Size" value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })} placeholder="e.g. 10-50" />
                  <Input label="Sector" value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} placeholder="e.g. Construction" />
                </div>
              </>
            )}

            <div className="relative">
              <Input label="Password" type={showPassword ? 'text' : 'password'} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min 8 characters" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-muted hover:text-heading">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {form.password && (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-bg-light rounded-full overflow-hidden">
                  <div className="h-full transition-all" style={{ width: `${strength * 25}%`, backgroundColor: strengthColor }} />
                </div>
                <span className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</span>
              </div>
            )}
            <Input label="Confirm Password" type="password" required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />

            {error && <p className="text-sm text-error">{error}</p>}

            <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-sm text-center text-muted mt-6">
            Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
