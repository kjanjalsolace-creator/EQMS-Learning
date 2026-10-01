import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Card, Badge, ProgressBar } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/context/AuthContext';
import { useAppDataStore } from '@/context/AppDataContext';
import { ORG_EMPLOYEES, COURSES } from '@/data/seed';
import {
  Users, BookOpen, Award, AlertCircle, BarChart3, Building2,
  Upload, Download, UserPlus, Search, Settings, FileText,
  TrendingUp, Clock, CheckCircle2,
} from 'lucide-react';

const SIDEBAR = [
  { label: 'Dashboard', to: '/portal/admin', icon: BarChart3 },
  { label: 'Employees', to: '/portal/admin/employees', icon: Users },
  { label: 'Assignments', to: '/portal/admin/assignments', icon: BookOpen },
  { label: 'Licences', to: '/portal/admin/licences', icon: Award },
  { label: 'Reports', to: '/portal/admin/reports', icon: FileText },
  { label: 'Branding', to: '/portal/admin/branding', icon: Settings },
  { label: 'Billing', to: '/portal/admin/billing', icon: FileText },
];

export function OrgAdminDashboard() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" />;

  const stats = [
    { label: 'Total Employees', value: '25', icon: Users, color: 'text-primary' },
    { label: 'Active Learners', value: '22', icon: BookOpen, color: 'text-info' },
    { label: 'Completion Rate', value: '78%', icon: CheckCircle2, color: 'text-success' },
    { label: 'Overdue', value: '3', icon: AlertCircle, color: 'text-error' },
  ];

  const deptData = [
    { dept: 'Operations', total: 7, completed: 5, inProgress: 2 },
    { dept: 'Finance', total: 6, completed: 4, inProgress: 2 },
    { dept: 'IT', total: 6, completed: 5, inProgress: 1 },
    { dept: 'HR', total: 6, completed: 4, inProgress: 1 },
  ];

  return (
    <PortalLayout title="Organisation Dashboard" sidebarItems={SIDEBAR} activePath="/portal/admin">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-heading">{user.company || 'Organisation'} Dashboard</h2>
          <p className="text-muted text-sm">Monitor compliance across your organisation.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-card bg-bg-light flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div><p className="text-2xl font-bold text-heading">{s.value}</p><p className="text-xs text-muted">{s.label}</p></div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-bold text-heading mb-4">Compliance by Department</h3>
            <div className="space-y-4">
              {deptData.map((d) => (
                <div key={d.dept}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-heading">{d.dept}</span>
                    <span className="text-muted">{d.completed}/{d.total} completed</span>
                  </div>
                  <ProgressBar value={(d.completed / d.total) * 100} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-heading mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {ORG_EMPLOYEES.slice(0, 5).map((emp) => (
                <div key={emp.id} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{emp.firstName[0]}{emp.lastName[0]}</div>
                  <div className="flex-1">
                    <p className="font-medium text-heading">{emp.firstName} {emp.lastName}</p>
                    <p className="text-xs text-muted">{emp.department} • {emp.assignedCourses.length} courses assigned</p>
                  </div>
                  <Badge variant={emp.completedCourses.length > 0 ? 'success' : 'neutral'}>{emp.completedCourses.length > 0 ? 'Active' : 'Pending'}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}

export function OrgEmployeesPage() {
  const { user } = useAuthStore();
  const { show } = useToastStore();
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [newEmp, setNewEmp] = useState({ firstName: '', lastName: '', email: '', department: 'Operations' });
  const [employees, setEmployees] = useState(ORG_EMPLOYEES);

  if (!user) return <Navigate to="/login" />;

  const filtered = employees.filter((e) => {
    if (dept !== 'all' && e.department !== dept) return false;
    if (search) {
      const q = search.toLowerCase();
      return e.firstName.toLowerCase().includes(q) || e.lastName.toLowerCase().includes(q) || e.email.toLowerCase().includes(q);
    }
    return true;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = { ...newEmp, id: `emp-${Date.now()}`, orgId: user.id, status: 'active' as const, assignedCourses: [] as string[], completedCourses: [] as string[], joinedAt: new Date().toISOString(), group: `${newEmp.department} Team A`, site: 'Leeds HQ' };
    setEmployees([emp, ...employees]);
    setNewEmp({ firstName: '', lastName: '', email: '', department: 'Operations' });
    setShowAdd(false);
    show('success', 'Employee added successfully');
  };

  const handleCSV = () => {
    show('success', 'CSV template downloaded. Import your file to bulk add employees.');
  };

  return (
    <PortalLayout title="Employees" sidebarItems={SIDEBAR} activePath="/portal/admin/employees">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-heading">Employees</h2>
            <p className="text-muted text-sm">{employees.length} total employees</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCSV}><Download className="w-4 h-4" /> CSV Template</Button>
            <Button variant="outline" size="sm" onClick={() => show('info', 'Upload your CSV file to bulk import employees')}><Upload className="w-4 h-4" /> Import</Button>
            <Button variant="primary" size="sm" onClick={() => setShowAdd(true)}><UserPlus className="w-4 h-4" /> Add Employee</Button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search employees..." className="input-base pl-10" />
          </div>
          <select value={dept} onChange={(e) => setDept(e.target.value)} className="input-base w-auto">
            <option value="all">All Departments</option>
            <option value="Operations">Operations</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
          </select>
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-bg-section">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-heading">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-heading">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-heading">Department</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-heading">Site</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-heading">Assigned</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-heading">Completed</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-heading">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-bg-light transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-heading">{emp.firstName} {emp.lastName}</td>
                  <td className="px-4 py-3 text-sm text-body">{emp.email}</td>
                  <td className="px-4 py-3 text-sm text-body">{emp.department}</td>
                  <td className="px-4 py-3 text-sm text-body">{emp.site}</td>
                  <td className="px-4 py-3 text-sm text-body">{emp.assignedCourses.length}</td>
                  <td className="px-4 py-3 text-sm text-body">{emp.completedCourses.length}</td>
                  <td className="px-4 py-3"><Badge variant={emp.status === 'active' ? 'success' : 'neutral'}>{emp.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAdd(false)} />
          <Card className="relative p-6 w-full max-w-md">
            <h3 className="font-bold text-heading mb-4">Add Employee</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" required value={newEmp.firstName} onChange={(e) => setNewEmp({ ...newEmp, firstName: e.target.value })} />
                <Input label="Last Name" required value={newEmp.lastName} onChange={(e) => setNewEmp({ ...newEmp, lastName: e.target.value })} />
              </div>
              <Input label="Email" type="email" required value={newEmp.email} onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })} />
              <Input label="Department" value={newEmp.department} onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })} />
              <div className="flex gap-2">
                <Button type="submit" variant="primary" fullWidth>Add Employee</Button>
                <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </PortalLayout>
  );
}

export function OrgReportsPage() {
  const { user } = useAuthStore();
  const { show } = useToastStore();
  if (!user) return <Navigate to="/login" />;

  const courses = COURSES.slice(0, 8);
  const employees = ORG_EMPLOYEES.slice(0, 10);

  return (
    <PortalLayout title="Reports" sidebarItems={SIDEBAR} activePath="/portal/admin/reports">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-heading">Training Reports</h2>
            <p className="text-muted text-sm">Compliance matrix and training records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => show('success', 'Report exported as CSV')}><Download className="w-4 h-4" /> CSV</Button>
            <Button variant="outline" size="sm" onClick={() => show('success', 'Report exported as PDF')}><FileText className="w-4 h-4" /> PDF</Button>
          </div>
        </div>

        <Card className="overflow-x-auto">
          <h3 className="font-bold text-heading p-4 border-b border-border">Training Matrix</h3>
          <table className="w-full min-w-[800px]">
            <thead className="bg-bg-section">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-heading sticky left-0 bg-bg-section">Employee</th>
                {courses.map((c) => (
                  <th key={c.id} className="px-4 py-3 text-center text-xs font-semibold text-heading" title={c.title}>{c.title.slice(0, 15)}...</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-bg-light">
                  <td className="px-4 py-3 text-sm font-medium text-heading sticky left-0 bg-white">{emp.firstName} {emp.lastName}</td>
                  {courses.map((c) => {
                    const assigned = emp.assignedCourses.includes(c.id);
                    const completed = emp.completedCourses.includes(c.id);
                    return (
                      <td key={c.id} className="px-4 py-3 text-center">
                        {completed ? <div className="w-6 h-6 bg-success rounded mx-auto flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                          : assigned ? <div className="w-6 h-6 bg-warning rounded mx-auto" />
                          : <div className="w-6 h-6 bg-bg-light rounded mx-auto" />}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function OrgAssignmentsPage() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" />;

  return (
    <PortalLayout title="Course Assignments" sidebarItems={SIDEBAR} activePath="/portal/admin/assignments">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">Course Assignments</h2>
        <Card className="p-6">
          <h3 className="font-bold text-heading mb-4">Assign Course to Team</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">Select Course</label>
              <select className="input-base">
                <option>Choose a course...</option>
                {COURSES.slice(0, 10).map((c) => <option key={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">Assign To</label>
              <select className="input-base">
                <option>All Employees</option>
                <option>Operations Department</option>
                <option>Finance Department</option>
                <option>IT Department</option>
                <option>HR Department</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1.5">Due Date</label>
              <input type="date" className="input-base" />
            </div>
            <Button variant="primary">Assign Course</Button>
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function OrgLicencesPage() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" />;

  return (
    <PortalLayout title="Licences" sidebarItems={SIDEBAR} activePath="/portal/admin/licences">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">Licence Management</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-6 text-center"><p className="text-3xl font-bold text-heading">50</p><p className="text-sm text-muted">Total Licences</p></Card>
          <Card className="p-6 text-center"><p className="text-3xl font-bold text-success">25</p><p className="text-sm text-muted">Used</p></Card>
          <Card className="p-6 text-center"><p className="text-3xl font-bold text-primary">25</p><p className="text-sm text-muted">Available</p></Card>
        </div>
        <Card className="p-6">
          <h3 className="font-bold text-heading mb-4">Buy More Licences</h3>
          <p className="text-body text-sm mb-4">Purchase additional licences to assign more courses to your team.</p>
          <Link to="/courses"><Button variant="primary">Buy More Licences</Button></Link>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function OrgBrandingPage() {
  const { user } = useAuthStore();
  const { show } = useToastStore();
  const [colour, setColour] = useState('#e63031');
  if (!user) return <Navigate to="/login" />;

  return (
    <PortalLayout title="Branding" sidebarItems={SIDEBAR} activePath="/portal/admin/branding">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">Branding Settings</h2>
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-heading mb-2">Organisation Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-card bg-bg-light flex items-center justify-center"><Building2 className="w-8 h-8 text-muted" /></div>
              <Button variant="outline" onClick={() => show('info', 'Logo upload is a demo feature')}>Upload Logo</Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-heading mb-2">Primary Colour</label>
            <div className="flex items-center gap-3">
              <input type="color" value={colour} onChange={(e) => setColour(e.target.value)} className="w-12 h-12 rounded cursor-pointer" />
              <span className="text-sm text-body">{colour}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-heading mb-2">Welcome Message</label>
            <textarea className="input-base" rows={3} defaultValue="Welcome to our compliance training portal. Please complete your assigned courses by the due dates." />
          </div>
          <Button variant="primary" onClick={() => show('success', 'Branding settings saved')}>Save Settings</Button>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function OrgBillingPage() {
  const { user } = useAuthStore();
  const { orders } = useAppDataStore();
  if (!user) return <Navigate to="/login" />;

  return (
    <PortalLayout title="Billing" sidebarItems={SIDEBAR} activePath="/portal/admin/billing">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">Billing & Invoices</h2>
        <Card className="p-6">
          <h3 className="font-bold text-heading mb-4">Current Plan</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-heading text-lg">Team/Business Plan</p>
              <p className="text-sm text-muted">50 licences • £299/month</p>
            </div>
            <Button variant="outline">Manage Plan</Button>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold text-heading mb-4">Invoice History</h3>
          {orders.length === 0 ? (
            <p className="text-muted text-sm">No invoices yet.</p>
          ) : (
            <div className="space-y-2">
              {orders.map((o) => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div><p className="text-sm font-medium text-heading">{o.invoiceNumber}</p><p className="text-xs text-muted">{new Date(o.createdAt).toLocaleDateString('en-GB')}</p></div>
                  <div className="flex items-center gap-3"><span className="font-bold text-primary">£{o.total.toFixed(2)}</span><Button variant="ghost" size="sm">Download</Button></div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </PortalLayout>
  );
}
