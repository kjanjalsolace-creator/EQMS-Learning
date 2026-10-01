import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Card, Badge, ProgressBar } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { useAuthStore } from '@/context/AuthContext';
import { useToastStore } from '@/context/ToastContext';
import { COURSES } from '@/data/seed';
import {
  BookOpen, Users, BarChart3, Settings, Plus, Edit, Copy,
  Trash2, Eye, TrendingUp, Award, Search,
} from 'lucide-react';

const SIDEBAR = [
  { label: 'Dashboard', to: '/portal/instructor', icon: BarChart3 },
  { label: 'Courses', to: '/portal/instructor/courses', icon: BookOpen },
  { label: 'Analytics', to: '/portal/instructor/analytics', icon: TrendingUp },
  { label: 'Students', to: '/portal/instructor/students', icon: Users },
  { label: 'Settings', to: '/portal/instructor/settings', icon: Settings },
];

export function InstructorDashboard() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" />;

  const instructorCourses = COURSES.filter((c) => c.instructorId === 'ins-1');

  return (
    <PortalLayout title="Instructor Dashboard" sidebarItems={SIDEBAR} activePath="/portal/instructor">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-heading">Welcome, {user?.firstName}!</h2>
          <p className="text-muted text-sm">Manage your courses and track student progress.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-card bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></div><div><p className="text-2xl font-bold text-heading">{instructorCourses.length}</p><p className="text-xs text-muted">Courses</p></div></div></Card>
          <Card className="p-5"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-card bg-info/10 flex items-center justify-center"><Users className="w-5 h-5 text-info" /></div><div><p className="text-2xl font-bold text-heading">8,400</p><p className="text-xs text-muted">Students</p></div></div></Card>
          <Card className="p-5"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-card bg-success/10 flex items-center justify-center"><Award className="w-5 h-5 text-success" /></div><div><p className="text-2xl font-bold text-heading">4.9</p><p className="text-xs text-muted">Avg Rating</p></div></div></Card>
          <Card className="p-5"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-card bg-warning/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-warning" /></div><div><p className="text-2xl font-bold text-heading">92%</p><p className="text-xs text-muted">Completion</p></div></div></Card>
        </div>
        <Card className="p-6">
          <h3 className="font-bold text-heading mb-4">Your Courses</h3>
          <div className="space-y-3">
            {instructorCourses.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-card bg-bg-light hover:bg-border transition-colors">
                <div className="flex items-center gap-3">
                  <img src={c.thumbnail} alt={c.title} className="w-12 h-12 rounded-card object-cover" />
                  <div><p className="font-medium text-heading text-sm">{c.title}</p><p className="text-xs text-muted">{c.enrolledCount} students • £{c.price}</p></div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function InstructorCoursesPage() {
  const { user } = useAuthStore();
  const { show } = useToastStore();
  const [showCreate, setShowCreate] = useState(false);
  const [courses, setCourses] = useState(COURSES.filter((c) => c.instructorId === 'ins-1'));
  const [newCourse, setNewCourse] = useState({ title: '', category: 'Health & Safety', price: '49', description: '' });

  if (!user) return <Navigate to="/login" />;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title) return;
    const course = {
      ...COURSES[0],
      id: `crs-${Date.now()}`,
      title: newCourse.title,
      slug: newCourse.title.toLowerCase().replace(/\s+/g, '-'),
      category: newCourse.category,
      price: Number(newCourse.price),
      shortDescription: newCourse.description || 'New course',
      enrolledCount: 0,
      published: false,
    };
    setCourses([course, ...courses]);
    setShowCreate(false);
    setNewCourse({ title: '', category: 'Health & Safety', price: '49', description: '' });
    show('success', 'Course created. Edit details and publish when ready.');
  };

  return (
    <PortalLayout title="Course Manager" sidebarItems={SIDEBAR} activePath="/portal/instructor/courses">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-heading">My Courses</h2>
          <Button variant="primary" onClick={() => setShowCreate(true)}><Plus className="w-4 h-4" /> Create Course</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <Card key={c.id} className="overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={c.published ? 'success' : 'warning'}>{c.published ? 'Published' : 'Draft'}</Badge>
                  <Badge variant="neutral">{c.level}</Badge>
                </div>
                <h3 className="font-bold text-heading text-sm mb-2 line-clamp-2">{c.title}</h3>
                <p className="text-xs text-muted mb-3">{c.enrolledCount} students • £{c.price}</p>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm"><Edit className="w-3.5 h-3.5" /> Edit</Button>
                  <Button variant="ghost" size="sm"><Copy className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => { setCourses(courses.filter((x) => x.id !== c.id)); show('info', 'Course archived'); }}><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCreate(false)} />
          <Card className="relative p-6 w-full max-w-lg">
            <h3 className="font-bold text-heading mb-4">Create New Course</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input label="Course Title" required value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
              <Select label="Category" value={newCourse.category} onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}>
                <option>Health & Safety</option><option>Fire Safety</option><option>Cyber Security</option><option>HR & Employment</option><option>Data Protection & GDPR</option>
              </Select>
              <Input label="Price (£)" type="number" value={newCourse.price} onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })} />
              <Textarea label="Description" rows={3} value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
              <div className="flex gap-2">
                <Button type="submit" variant="primary" fullWidth>Create Course</Button>
                <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </PortalLayout>
  );
}

export function InstructorAnalyticsPage() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" />;

  return (
    <PortalLayout title="Analytics" sidebarItems={SIDEBAR} activePath="/portal/instructor/analytics">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">Course Analytics</h2>
        <Card className="p-6">
          <h3 className="font-bold text-heading mb-4">Top Performing Courses</h3>
          <div className="space-y-3">
            {COURSES.slice(0, 5).map((c) => (
              <div key={c.id}>
                <div className="flex justify-between text-sm mb-1"><span className="font-medium text-heading">{c.title}</span><span className="text-muted">{c.enrolledCount} students</span></div>
                <ProgressBar value={(c.enrolledCount / 2000) * 100} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function InstructorStudentsPage() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" />;

  return (
    <PortalLayout title="Students" sidebarItems={SIDEBAR} activePath="/portal/instructor/students">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">Student Overview</h2>
        <Card className="p-6 text-center">
          <Users className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-body">8,400 total students across your courses</p>
          <p className="text-sm text-muted mt-1">Average rating: 4.9/5</p>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function InstructorSettingsPage() {
  const { user } = useAuthStore();
  const { show } = useToastStore();
  if (!user) return <Navigate to="/login" />;

  return (
    <PortalLayout title="Settings" sidebarItems={SIDEBAR} activePath="/portal/instructor/settings">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">Instructor Settings</h2>
        <Card className="p-6">
          <h3 className="font-bold text-heading mb-4">Profile</h3>
          <div className="space-y-4">
            <Input label="Display Name" defaultValue={user?.firstName + ' ' + user?.lastName} />
            <Input label="Title" defaultValue="Lead Health & Safety Consultant" />
            <Textarea label="Bio" rows={3} defaultValue="A NEBOSH-qualified safety professional with over 18 years of experience." />
            <Button variant="primary" onClick={() => show('success', 'Settings saved')}>Save</Button>
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
}
