import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/context/AuthContext';
import { useToastStore } from '@/context/ToastContext';
import { COUPONS, COURSES, DEMO_USERS, NEWS_ARTICLES, FAQS, TESTIMONIALS } from '@/data/seed';
import {
  LayoutDashboard, Users, BookOpen, FileText, Settings, Search,
  TrendingUp, DollarSign, ShoppingBag, Tag, Plus, Edit, Trash2,
  Download, MessageSquare, Mail,
} from 'lucide-react';

const SIDEBAR = [
  { label: 'Dashboard', to: '/portal/superadmin', icon: LayoutDashboard },
  { label: 'Users', to: '/portal/superadmin/users', icon: Users },
  { label: 'Courses', to: '/portal/superadmin/courses', icon: BookOpen },
  { label: 'Coupons', to: '/portal/superadmin/coupons', icon: Tag },
  { label: 'Content', to: '/portal/superadmin/content', icon: FileText },
  { label: 'Settings', to: '/portal/superadmin/settings', icon: Settings },
];

export function SuperAdminDashboard() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" />;

  const stats = [
    { label: 'Revenue', value: '£24,580', icon: DollarSign, color: 'text-success' },
    { label: 'Orders', value: '142', icon: ShoppingBag, color: 'text-primary' },
    { label: 'Users', value: '1,247', icon: Users, color: 'text-info' },
    { label: 'Courses', value: '36', icon: BookOpen, color: 'text-warning' },
  ];

  return (
    <PortalLayout title="Super Admin Dashboard" sidebarItems={SIDEBAR} activePath="/portal/superadmin">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">Platform Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-card bg-bg-light flex items-center justify-center"><s.icon className={`w-5 h-5 ${s.color}`} /></div>
                <div><p className="text-2xl font-bold text-heading">{s.value}</p><p className="text-xs text-muted">{s.label}</p></div>
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-bold text-heading mb-4">Top Courses</h3>
            <div className="space-y-2">
              {COURSES.slice(0, 5).sort((a, b) => b.enrolledCount - a.enrolledCount).slice(0, 5).map((c) => (
                <div key={c.id} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                  <span className="text-heading">{c.title}</span><span className="text-muted">{c.enrolledCount} enrolled</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold text-heading mb-4">Recent Activity</h3>
            <div className="space-y-2 text-sm">
              <p className="text-body">New user registered: admin@meridian.co.uk</p>
              <p className="text-body">Order completed: INV-00123456 (£149.00)</p>
              <p className="text-body">Course published: Fire Safety Awareness</p>
              <p className="text-body">Coupon created: SUMMER20 (20% off)</p>
            </div>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}

export function SuperAdminUsersPage() {
  const { user } = useAuthStore();
  const { show } = useToastStore();
  const [search, setSearch] = useState('');
  if (!user) return <Navigate to="/login" />;

  return (
    <PortalLayout title="Manage Users" sidebarItems={SIDEBAR} activePath="/portal/superadmin/users">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-heading">Users</h2>
          <Button variant="outline" size="sm" onClick={() => show('success', 'Users exported as CSV')}><Download className="w-4 h-4" /> Export</Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="input-base pl-10" />
        </div>
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-bg-section">
              <tr><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Name</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Email</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Role</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Joined</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DEMO_USERS.map((u) => (
                <tr key={u.id} className="hover:bg-bg-light">
                  <td className="px-4 py-3 text-sm font-medium text-heading">{u.firstName} {u.lastName}</td>
                  <td className="px-4 py-3 text-sm text-body">{u.email}</td>
                  <td className="px-4 py-3"><Badge variant={u.role === 'super_admin' ? 'error' : u.role === 'org_admin' ? 'info' : 'neutral'}>{u.role.replace('_', ' ')}</Badge></td>
                  <td className="px-4 py-3 text-sm text-muted">{new Date(u.createdAt).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-3"><div className="flex gap-1"><Button variant="ghost" size="sm"><Edit className="w-3.5 h-3.5" /></Button><Button variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5" /></Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function SuperAdminCoursesPage() {
  const { user } = useAuthStore();
  const { show } = useToastStore();
  if (!user) return <Navigate to="/login" />;

  return (
    <PortalLayout title="Manage Courses" sidebarItems={SIDEBAR} activePath="/portal/superadmin/courses">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-heading">All Courses ({COURSES.length})</h2>
          <Button variant="primary" size="sm" onClick={() => show('info', 'Course builder is available for instructors')}><Plus className="w-4 h-4" /> Add Course</Button>
        </div>
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-bg-section">
              <tr><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Title</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Category</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Price</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Enrolled</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Status</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COURSES.slice(0, 15).map((c) => (
                <tr key={c.id} className="hover:bg-bg-light">
                  <td className="px-4 py-3 text-sm font-medium text-heading">{c.title}</td>
                  <td className="px-4 py-3 text-sm text-body">{c.category}</td>
                  <td className="px-4 py-3 text-sm font-medium text-primary">£{c.price}</td>
                  <td className="px-4 py-3 text-sm text-body">{c.enrolledCount}</td>
                  <td className="px-4 py-3"><Badge variant={c.published ? 'success' : 'warning'}>{c.published ? 'Published' : 'Draft'}</Badge></td>
                  <td className="px-4 py-3"><div className="flex gap-1"><Button variant="ghost" size="sm"><Edit className="w-3.5 h-3.5" /></Button><Button variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5" /></Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function SuperAdminCouponsPage() {
  const { user } = useAuthStore();
  const { show } = useToastStore();
  const [coupons, setCoupons] = useState(COUPONS);
  const [showCreate, setShowCreate] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '10', type: 'percentage' });

  if (!user) return <Navigate to="/login" />;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code) return;
    setCoupons([...coupons, { code: newCoupon.code.toUpperCase(), discountType: newCoupon.type as 'percentage' | 'fixed', discountValue: Number(newCoupon.discount), description: 'Custom coupon', active: true, usedCount: 0 }]);
    setShowCreate(false);
    setNewCoupon({ code: '', discount: '10', type: 'percentage' });
    show('success', 'Coupon created successfully');
  };

  return (
    <PortalLayout title="Manage Coupons" sidebarItems={SIDEBAR} activePath="/portal/superadmin/coupons">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-heading">Coupons</h2>
          <Button variant="primary" size="sm" onClick={() => setShowCreate(true)}><Plus className="w-4 h-4" /> Create Coupon</Button>
        </div>
        <Card className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-section">
              <tr><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Code</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Discount</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Used</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Status</th><th className="px-4 py-3 text-left text-xs font-semibold text-heading">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-bg-light">
                  <td className="px-4 py-3 text-sm font-bold text-heading">{c.code}</td>
                  <td className="px-4 py-3 text-sm text-body">{c.discountType === 'percentage' ? c.discountValue + '%' : '£' + c.discountValue}</td>
                  <td className="px-4 py-3 text-sm text-body">{c.usedCount}</td>
                  <td className="px-4 py-3"><Badge variant={c.active ? 'success' : 'neutral'}>{c.active ? 'Active' : 'Inactive'}</Badge></td>
                  <td className="px-4 py-3"><Button variant="ghost" size="sm" onClick={() => { setCoupons(coupons.map((x) => x.code === c.code ? { ...x, active: !x.active } : x)); show('info', 'Coupon status updated'); }}><Edit className="w-3.5 h-3.5" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCreate(false)} />
          <Card className="relative p-6 w-full max-w-md">
            <h3 className="font-bold text-heading mb-4">Create Coupon</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input label="Coupon Code" required value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Discount Value" type="number" value={newCoupon.discount} onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })} />
                <div>
                  <label className="block text-sm font-medium text-heading mb-1.5">Type</label>
                  <select className="input-base" value={newCoupon.type} onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}><option value="percentage">Percentage</option><option value="fixed">Fixed Amount</option></select>
                </div>
              </div>
              <div className="flex gap-2"><Button type="submit" variant="primary" fullWidth>Create</Button><Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button></div>
            </form>
          </Card>
        </div>
      )}
    </PortalLayout>
  );
}

export function SuperAdminContentPage() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" />;

  return (
    <PortalLayout title="Content Management" sidebarItems={SIDEBAR} activePath="/portal/superadmin/content">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">Content Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6"><FileText className="w-8 h-8 text-primary mb-3" /><h3 className="font-bold text-heading mb-1">News Articles</h3><p className="text-sm text-muted mb-3">{NEWS_ARTICLES.length} articles</p><Button variant="outline" size="sm">Manage</Button></Card>
          <Card className="p-6"><MessageSquare className="w-8 h-8 text-primary mb-3" /><h3 className="font-bold text-heading mb-1">FAQs</h3><p className="text-sm text-muted mb-3">{FAQS.length} FAQs</p><Button variant="outline" size="sm">Manage</Button></Card>
          <Card className="p-6"><Mail className="w-8 h-8 text-primary mb-3" /><h3 className="font-bold text-heading mb-1">Newsletter</h3><p className="text-sm text-muted mb-3">1,247 subscribers</p><Button variant="outline" size="sm">Manage</Button></Card>
        </div>
      </div>
    </PortalLayout>
  );
}

export function SuperAdminSettingsPage() {
  const { user } = useAuthStore();
  const { show } = useToastStore();
  if (!user) return <Navigate to="/login" />;

  return (
    <PortalLayout title="System Settings" sidebarItems={SIDEBAR} activePath="/portal/superadmin/settings">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">System Settings</h2>
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-heading">General Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Currency" defaultValue="GBP (£)" />
            <Input label="VAT Rate (%)" defaultValue="20" />
            <Input label="Payment Gateway" defaultValue="Stripe (Test Mode)" />
            <Input label="Support Email" defaultValue="support@eqmstraining.co.uk" />
          </div>
          <Button variant="primary" onClick={() => show('success', 'Settings saved')}>Save Settings</Button>
        </Card>
      </div>
    </PortalLayout>
  );
}
