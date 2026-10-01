import { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Card, ProgressRing, ProgressBar, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/context/AuthContext';
import { useAppDataStore } from '@/context/AppDataContext';
import { COURSES } from '@/data/seed';
import { FALLBACK_IMAGE } from '@/data/assets';
import {
  BookOpen, Award, Clock, TrendingUp, ArrowRight, CheckCircle2, AlertCircle,
  Calendar, Bell,
} from 'lucide-react';

const SIDEBAR = [
  { label: 'Dashboard', to: '/portal', icon: BookOpen },
  { label: 'My Learning', to: '/portal/my-learning', icon: BookOpen },
  { label: 'Certificates', to: '/portal/certificates', icon: Award },
  { label: 'Wishlist', to: '/portal/wishlist', icon: BookOpen },
  { label: 'Orders', to: '/portal/orders', icon: BookOpen },
  { label: 'Notifications', to: '/portal/notifications', icon: Bell },
  { label: 'Profile', to: '/portal/profile', icon: BookOpen },
];

export function LearnerDashboard() {
  const { user } = useAuthStore();
  const { enrolments, certificates, notifications } = useAppDataStore();

  if (!user) return <Navigate to="/login" />;

  const userEnrolments = enrolments.filter((e) => e.userId === user.id);
  const inProgress = userEnrolments.filter((e) => e.status === 'in_progress');
  const completed = userEnrolments.filter((e) => e.status === 'completed');
  const notStarted = userEnrolments.filter((e) => e.status === 'not_started');
  const userCerts = certificates.filter((c) => c.userId === user.id);
  const userNotifs = notifications.filter((n) => n.userId === user.id).slice(0, 5);

  const overallProgress = userEnrolments.length > 0
    ? Math.round(userEnrolments.reduce((sum, e) => sum + e.progress, 0) / userEnrolments.length)
    : 0;

  const continueLearning = [...inProgress, ...notStarted].slice(0, 3);

  return (
    <PortalLayout title="Dashboard" sidebarItems={SIDEBAR} activePath="/portal">
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-heading">Welcome back, {user.firstName}!</h2>
          <p className="text-muted">Here's an overview of your learning progress.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-card bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></div>
              <div><p className="text-2xl font-bold text-heading">{userEnrolments.length}</p><p className="text-xs text-muted">Enrolled</p></div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-card bg-success/10 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-success" /></div>
              <div><p className="text-2xl font-bold text-heading">{completed.length}</p><p className="text-xs text-muted">Completed</p></div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-card bg-warning/10 flex items-center justify-center"><Clock className="w-5 h-5 text-warning" /></div>
              <div><p className="text-2xl font-bold text-heading">{inProgress.length}</p><p className="text-xs text-muted">In Progress</p></div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-card bg-info/10 flex items-center justify-center"><Award className="w-5 h-5 text-info" /></div>
              <div><p className="text-2xl font-bold text-heading">{userCerts.length}</p><p className="text-xs text-muted">Certificates</p></div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-heading">Continue Learning</h3>
                <Link to="/portal/my-learning"><Button variant="ghost" size="sm">View All</Button></Link>
              </div>
              {continueLearning.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted mb-4">You haven't enrolled in any courses yet.</p>
                  <Link to="/courses"><Button variant="primary">Browse Courses</Button></Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {continueLearning.map((enr) => {
                    const course = COURSES.find((c) => c.id === enr.courseId);
                    if (!course) return null;
                    return (
                      <Link key={enr.id} to={`/portal/player/${course.slug}`} className="flex gap-4 p-3 rounded-card hover:bg-bg-light transition-colors">
                        <img src={course.thumbnail} alt={course.title} className="w-20 h-20 rounded-card object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
                        <div className="flex-1">
                          <p className="font-semibold text-heading text-sm">{course.title}</p>
                          <p className="text-xs text-muted mb-2">{course.category} • {course.duration}</p>
                          <ProgressBar value={enr.progress} />
                          <p className="text-xs text-muted mt-1">{enr.progress}% complete</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted self-center" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          {/* Overall Progress */}
          <Card className="p-6 text-center">
            <h3 className="font-bold text-heading mb-4">Overall Progress</h3>
            <ProgressRing progress={overallProgress} size={120} />
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Completed</span><span className="font-medium text-success">{completed.length}</span></div>
              <div className="flex justify-between"><span className="text-muted">In Progress</span><span className="font-medium text-warning">{inProgress.length}</span></div>
              <div className="flex justify-between"><span className="text-muted">Not Started</span><span className="font-medium text-muted">{notStarted.length}</span></div>
            </div>
          </Card>
        </div>

        {/* Notifications */}
        {userNotifs.length > 0 && (
          <Card className="p-6">
            <h3 className="font-bold text-heading mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              {userNotifs.map((n) => (
                <div key={n.id} className="flex items-start gap-3 p-3 rounded-card bg-bg-light">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    n.type === 'certificate' ? 'bg-success/10' : n.type === 'reminder' ? 'bg-warning/10' : 'bg-primary/10'
                  }`}>
                    {n.type === 'certificate' ? <Award className="w-4 h-4 text-success" /> : n.type === 'reminder' ? <AlertCircle className="w-4 h-4 text-warning" /> : <Bell className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-heading">{n.title}</p>
                    <p className="text-xs text-muted">{n.message}</p>
                  </div>
                  {!n.read && <div className="w-2 h-2 bg-primary rounded-full mt-2" />}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </PortalLayout>
  );
}
