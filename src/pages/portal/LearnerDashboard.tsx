import { useState, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Card, ProgressRing, ProgressBar, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/context/AuthContext';
import { useAppDataStore } from '@/context/AppDataContext';
import { useWishlistStore } from '@/context/WishlistContext';
import { useToastStore } from '@/context/ToastContext';
import { downloadDemoCertificate } from '@/utils/downloadCertificate';
import { COURSES } from '@/data/seed';
import { FALLBACK_IMAGE } from '@/data/assets';
import {
  BookOpen, Award, Clock, ArrowRight, CheckCircle2, AlertCircle,
  Bell, Play, Heart, FileText, User, LayoutDashboard, Search,
  Check, Sparkles, ChevronRight, Download
} from 'lucide-react';

const SIDEBAR = [
  { label: 'Dashboard', to: '/portal', icon: LayoutDashboard },
  { label: 'My Learning', to: '/portal/my-learning', icon: BookOpen },
  { label: 'Certificates', to: '/portal/certificates', icon: Award },
  { label: 'Wishlist', to: '/portal/wishlist', icon: Heart },
  { label: 'Orders', to: '/portal/orders', icon: FileText },
  { label: 'Notifications', to: '/portal/notifications', icon: Bell },
  { label: 'Profile', to: '/portal/profile', icon: User },
];

export function LearnerDashboard() {
  const { user } = useAuthStore();
  const { enrolments, certificates, notifications, addCertificate } = useAppDataStore();
  const { courseIds } = useWishlistStore();
  const { show } = useToastStore();
  const [filterStatus, setFilterStatus] = useState<'all' | 'in_progress' | 'not_started' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) return <Navigate to="/login" />;

  const userEnrolments = enrolments.filter((e) => e.userId === user.id);
  const inProgress = userEnrolments.filter((e) => e.status === 'in_progress');
  const completed = userEnrolments.filter((e) => e.status === 'completed');
  const notStarted = userEnrolments.filter((e) => e.status === 'not_started');
  const userCerts = certificates.filter((c) => c.userId === user.id);
  const userNotifs = notifications.filter((n) => n.userId === user.id).slice(0, 4);

  // Active / Up Next Course Spotlight
  const activeEnrolment = inProgress[0] || notStarted[0] || userEnrolments[0];
  const activeCourse = activeEnrolment ? COURSES.find((c) => c.id === activeEnrolment.courseId) : null;

  // Filtered course list for course-wise progress
  const filteredEnrolments = useMemo(() => {
    return userEnrolments.filter((enr) => {
      if (filterStatus !== 'all' && enr.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const c = COURSES.find((item) => item.id === enr.courseId);
        if (!c) return false;
        const q = searchQuery.toLowerCase();
        return c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      }
      return true;
    });
  }, [userEnrolments, filterStatus, searchQuery]);

  return (
    <PortalLayout title="Learner Dashboard" sidebarItems={SIDEBAR} activePath="/portal">
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-white border border-border rounded-xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Learner Dashboard</span>
            </div>
            <h2 className="text-2xl font-bold text-heading">
              Welcome back, {user.firstName}! 👋
            </h2>
            <p className="text-muted text-sm">
              Here is your course-wise progress tracker. Track each course individually and resume where you left off.
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <Link to="/courses">
              <Button variant="outline" size="sm" className="text-xs font-semibold">
                <Search className="w-3.5 h-3.5 mr-1.5 text-muted" />
                Browse Catalog
              </Button>
            </Link>
            <Link to="/portal/my-learning">
              <Button variant="primary" size="sm" className="text-xs font-semibold shadow-sm">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                My Learning
              </Button>
            </Link>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Enrolled Courses */}
          <div
            onClick={() => setFilterStatus('all')}
            className={`cursor-pointer group relative p-5 bg-white rounded-2xl border transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 overflow-hidden ${
              filterStatus === 'all'
                ? 'border-primary ring-2 ring-primary/10 shadow-sm'
                : 'border-border/80 hover:border-slate-300'
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 via-primary/0 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 text-primary flex items-center justify-center ring-1 ring-primary/20 shadow-xs group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                Enrolled
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-heading tracking-tight">
                  {userEnrolments.length}
                </span>
                <span className="text-xs text-muted font-medium">courses</span>
              </div>
              <p className="text-xs font-semibold text-heading mt-1">Total Enrolments</p>
              <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-muted">
                <span className="flex items-center gap-1 text-primary font-medium">
                  <span>View full curriculum</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: In Progress */}
          <div
            onClick={() => setFilterStatus('in_progress')}
            className={`cursor-pointer group relative p-5 bg-white rounded-2xl border transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 overflow-hidden ${
              filterStatus === 'in_progress'
                ? 'border-warning ring-2 ring-warning/10 shadow-sm'
                : 'border-border/80 hover:border-slate-300'
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 via-amber-500/0 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-600/5 text-amber-600 flex items-center justify-center ring-1 ring-amber-500/25 shadow-xs group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/50">
                Active
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-heading tracking-tight">
                  {inProgress.length}
                </span>
                <span className="text-xs text-muted font-medium">in progress</span>
              </div>
              <p className="text-xs font-semibold text-heading mt-1">Ongoing Learning</p>
              <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-muted">
                <span className="flex items-center gap-1 text-amber-600 font-medium">
                  <span>Ready to resume</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Completed */}
          <div
            onClick={() => setFilterStatus('completed')}
            className={`cursor-pointer group relative p-5 bg-white rounded-2xl border transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 overflow-hidden ${
              filterStatus === 'completed'
                ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-sm'
                : 'border-border/80 hover:border-slate-300'
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 via-emerald-500/0 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 text-emerald-600 flex items-center justify-center ring-1 ring-emerald-500/25 shadow-xs group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                Passed
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-heading tracking-tight">
                  {completed.length}
                </span>
                <span className="text-xs text-muted font-medium">completed</span>
              </div>
              <p className="text-xs font-semibold text-heading mt-1">Finished Courses</p>
              <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-muted">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <span>100% completion rate</span>
                  <Check className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Certificates Earned */}
          <Link
            to="/portal/certificates"
            className="group relative p-5 bg-white rounded-2xl border border-border/80 hover:border-blue-300 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 overflow-hidden block"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 via-blue-500/0 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-600/5 text-blue-600 flex items-center justify-center ring-1 ring-blue-500/25 shadow-xs group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/50">
                CPD Accredited
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-heading tracking-tight">
                  {userCerts.length}
                </span>
                <span className="text-xs text-muted font-medium">issued</span>
              </div>
              <p className="text-xs font-semibold text-heading mt-1">Official Certificates</p>
              <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-muted">
                <span className="flex items-center gap-1 text-blue-600 font-medium">
                  <span>Download & share</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Priority Focus: Active Course Spotlight */}
        {activeCourse && activeEnrolment && (
          <Card className="p-6 overflow-hidden border border-border bg-gradient-to-br from-white via-white to-primary/5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                  <img
                    src={activeCourse.thumbnail}
                    alt={activeCourse.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-1.5 left-1.5">
                    <Badge variant="primary" className="text-[10px] py-0.5 px-1.5 bg-primary/90 text-white">
                      {activeCourse.category}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                      <Play className="w-3 h-3 fill-current" />
                      {activeEnrolment.status === 'completed'
                        ? 'Course Finished'
                        : activeEnrolment.progress > 0
                        ? 'Currently In Progress'
                        : 'Next to Begin'}
                    </span>
                    <span className="text-muted text-xs">•</span>
                    <span className="text-xs text-muted">{activeCourse.duration}</span>
                  </div>

                  <h3 className="text-lg font-bold text-heading line-clamp-1">
                    {activeCourse.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-muted pt-1">
                    <span>Pass mark: {activeCourse.passMark}%</span>
                    <span>•</span>
                    <span>{activeCourse.cpdPoints} CPD points</span>
                  </div>

                  {/* Progress bar inside spotlight */}
                  <div className="w-full max-w-md pt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-heading">Course Progress</span>
                      <span className="font-bold text-primary">{activeEnrolment.progress}%</span>
                    </div>
                    <ProgressBar value={activeEnrolment.progress} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2">
                <Link to={`/portal/player/${activeCourse.slug}`} className="w-full">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>
                      {activeEnrolment.status === 'completed'
                        ? 'Review Course'
                        : activeEnrolment.progress > 0
                        ? 'Resume Learning'
                        : 'Start Course Now'}
                    </span>
                  </Button>
                </Link>
                {activeEnrolment.status === 'completed' && (
                  <Link to="/portal/certificates" className="w-full">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      <Award className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      View Certificate
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* PRIMARY CORE: Course-wise Progress Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
            <div>
              <h3 className="text-xl font-bold text-heading flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Course-wise Progress</span>
              </h3>
              <p className="text-xs text-muted mt-0.5">
                Detailed individual completion status and lesson progress for each course
              </p>
            </div>

            {/* Search within enrolled courses */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search your courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-base text-xs pl-9 pr-3 py-2 w-full rounded-lg"
              />
            </div>
          </div>

          {/* Filter Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all' as const, label: 'All Courses', count: userEnrolments.length },
              { id: 'in_progress' as const, label: 'In Progress', count: inProgress.length },
              { id: 'not_started' as const, label: 'Not Started', count: notStarted.length },
              { id: 'completed' as const, label: 'Completed', count: completed.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  filterStatus === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white border border-border text-body hover:text-heading hover:bg-bg-light'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    filterStatus === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-bg-light text-muted'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Individual Course Progress Cards */}
          {filteredEnrolments.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-muted mx-auto mb-3" />
              <h4 className="font-bold text-heading text-base mb-1">No courses found</h4>
              <p className="text-body text-xs mb-4">
                {userEnrolments.length === 0
                  ? "You haven't enrolled in any courses yet."
                  : 'No enrolled courses match your current filter.'}
              </p>
              {userEnrolments.length === 0 ? (
                <Link to="/courses">
                  <Button variant="primary" size="sm">Browse Course Catalog</Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" onClick={() => { setFilterStatus('all'); setSearchQuery(''); }}>
                  Reset Filters
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredEnrolments.map((enr) => {
                const course = COURSES.find((c) => c.id === enr.courseId);
                if (!course) return null;

                const totalLessons = course.modules?.reduce((sum, m) => sum + m.lessons.length, 0) || 1;
                const completedCount = enr.completedLessons?.length || Math.round((enr.progress / 100) * totalLessons);

                return (
                  <Card
                    key={enr.id}
                    className="p-5 hover:shadow-card-hover transition-all border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                  >
                    {/* Left: Thumbnail & Course Info */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <Link to={`/portal/player/${course.slug}`} className="flex-shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden relative group">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <Play className="w-5 h-5 text-white opacity-80 group-hover:opacity-100" />
                          </div>
                        </div>
                      </Link>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="primary" className="text-[11px] py-0.5 px-2 font-semibold">
                            {course.category}
                          </Badge>
                          <span className="text-xs text-muted">•</span>
                          <span className="text-xs text-muted">{course.level}</span>
                          <span className="text-xs text-muted">•</span>
                          <span className="text-xs text-muted">{course.duration}</span>
                          <span className="text-xs text-muted">•</span>
                          <span className="text-xs text-muted">{course.cpdPoints} CPD pts</span>
                        </div>

                        <Link to={`/portal/player/${course.slug}`}>
                          <h4 className="font-bold text-heading text-base hover:text-primary transition-colors line-clamp-1">
                            {course.title}
                          </h4>
                        </Link>

                        <div className="text-xs text-body flex items-center gap-2">
                          <span className="text-muted">Completed:</span>
                          <span className="font-semibold text-heading">
                            {completedCount} of {totalLessons} lessons
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Course Progress Bar & Status */}
                    <div className="w-full md:w-64 space-y-2 flex-shrink-0">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-muted">Progress</span>
                        <div className="flex items-center gap-1.5">
                          {enr.status === 'completed' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% Done
                            </span>
                          ) : enr.status === 'in_progress' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                              <Clock className="w-3 h-3 text-amber-600" /> {enr.progress}% Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                              0% Not Started
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <ProgressBar
                          value={enr.progress}
                          className={`h-2.5 ${
                            enr.status === 'completed'
                              ? '[&>div]:bg-emerald-600'
                              : enr.status === 'in_progress'
                              ? '[&>div]:bg-primary'
                              : '[&>div]:bg-slate-300'
                          }`}
                        />
                      </div>

                      <p className="text-[11px] text-muted text-right">
                        {enr.status === 'completed'
                          ? 'Certificate ready for download'
                          : `${totalLessons - completedCount} lessons remaining`}
                      </p>
                    </div>

                    {/* Right: Direct Actions */}
                    <div className="w-full md:w-auto flex md:flex-col gap-2 flex-shrink-0">
                      <Link to={`/portal/player/${course.slug}`} className="flex-1 md:flex-initial">
                        <Button
                          variant={enr.status === 'completed' ? 'outline' : 'primary'}
                          size="sm"
                          fullWidth
                          className={
                            enr.status !== 'completed'
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 shadow-sm'
                              : 'text-xs py-2'
                          }
                        >
                          <Play className="w-3.5 h-3.5 fill-current mr-1.5" />
                          <span>
                            {enr.status === 'completed'
                              ? 'Review Lessons'
                              : enr.status === 'in_progress'
                              ? 'Continue Learning'
                              : 'Start Course'}
                          </span>
                        </Button>
                      </Link>

                      {enr.status === 'completed' ? (
                        <Link to="/portal/certificates" className="flex-1 md:flex-initial">
                          <Button variant="secondary" size="sm" fullWidth className="text-xs py-2">
                            <Award className="w-3.5 h-3.5 mr-1 text-primary" />
                            Certificate
                          </Button>
                        </Link>
                      ) : (
                        <Link to={`/courses/${course.slug}`} className="flex-1 md:flex-initial">
                          <Button variant="ghost" size="sm" fullWidth className="text-xs text-muted hover:text-heading">
                            Course Details
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Dual Grid: Certificates & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Certificates Card */}
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-info" />
                <h3 className="font-bold text-heading text-base">Earned Certificates</h3>
              </div>
              <Link to="/portal/certificates">
                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
              </Link>
            </div>

            {userCerts.length === 0 ? (
              <div className="text-center py-6 bg-bg-light rounded-xl border border-dashed border-border">
                <Award className="w-8 h-8 text-muted mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold text-heading">No Certificates Earned Yet</p>
                <p className="text-xs text-muted max-w-sm mx-auto mt-1 mb-3">
                  Score 80%+ on any course assessment to issue an accredited CPD certificate, or test demo download below.
                </p>
                <div className="flex items-center justify-center">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const demoId = `CPD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
                      downloadDemoCertificate({
                        userName: `${user.firstName} ${user.lastName}`,
                        courseTitle: 'Asbestos Awareness (Category A)',
                        certificateId: demoId,
                        score: 96,
                        cpdHours: '3.0 CPD Hours',
                      });
                      show('success', `Demo CPD Certificate (${demoId}) downloaded!`);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Demo Certificate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {userCerts.slice(0, 3).map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-light border border-border">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-heading text-xs line-clamp-1">{cert.courseTitle}</p>
                        <p className="text-[11px] text-muted">ID: {cert.certificateId} • Pass: {cert.score}%</p>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        downloadDemoCertificate({
                          userName: cert.userName || `${user.firstName} ${user.lastName}`,
                          courseTitle: cert.courseTitle,
                          certificateId: cert.certificateId,
                          issueDate: cert.issueDate,
                          expiryDate: cert.expiryDate,
                          score: cert.score,
                        });
                        show('success', `Certificate for "${cert.courseTitle}" downloaded!`);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-7 px-2.5 flex items-center gap-1 flex-shrink-0"
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Recent Notifications Card */}
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-heading text-base">Recent Notifications</h3>
              </div>
              <Link to="/portal/notifications">
                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
              </Link>
            </div>

            {userNotifs.length === 0 ? (
              <div className="text-center py-8 text-muted text-xs">
                No recent notifications.
              </div>
            ) : (
              <div className="space-y-3">
                {userNotifs.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-bg-light border border-border">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      n.type === 'certificate' ? 'bg-success/10 text-success' : n.type === 'reminder' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                    }`}>
                      {n.type === 'certificate' ? <Award className="w-4 h-4" /> : n.type === 'reminder' ? <AlertCircle className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-heading">{n.title}</p>
                      <p className="text-[11px] text-muted line-clamp-2 mt-0.5">{n.message}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}
