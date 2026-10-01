import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Card, Badge, ProgressBar } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/context/AuthContext';
import { useAppDataStore } from '@/context/AppDataContext';
import { COURSES } from '@/data/seed';
import { FALLBACK_IMAGE } from '@/data/assets';
import type { Enrolment } from '@/types';
import {
  BookOpen, Award, Heart, Bell, User, FileText, CheckCircle2, Lock,
  Play, ChevronLeft, ChevronRight, Clock, FileText as FileIcon, BarChart3,
} from 'lucide-react';

const SIDEBAR = [
  { label: 'Dashboard', to: '/portal', icon: BookOpen },
  { label: 'My Learning', to: '/portal/my-learning', icon: BookOpen },
  { label: 'Certificates', to: '/portal/certificates', icon: Award },
  { label: 'Wishlist', to: '/portal/wishlist', icon: Heart },
  { label: 'Orders', to: '/portal/orders', icon: FileText },
  { label: 'Notifications', to: '/portal/notifications', icon: Bell },
  { label: 'Profile', to: '/portal/profile', icon: User },
];

export function MyLearningPage() {
  const { user } = useAuthStore();
  const { enrolments } = useAppDataStore();
  const [tab, setTab] = useState('in_progress');

  if (!user) return <Navigate to="/login" />;

  const userEnrolments = enrolments.filter((e) => e.userId === user.id);
  const filtered = userEnrolments.filter((e) => e.status === tab);

  const tabs = [
    { id: 'in_progress', label: 'In Progress' },
    { id: 'not_started', label: 'Not Started' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <PortalLayout title="My Learning" sidebarItems={SIDEBAR} activePath="/portal/my-learning">
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-border">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium relative ${tab === t.id ? 'text-primary' : 'text-body hover:text-heading'}`}>
              {t.label}
              {tab === t.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-body mb-4">No courses here yet.</p>
            <Link to="/courses"><Button variant="primary">Browse Courses</Button></Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((enr) => {
              const course = COURSES.find((c) => c.id === enr.courseId);
              if (!course) return null;
              return (
                <Card key={enr.id} className="overflow-hidden hover:shadow-card-hover transition-all">
                  <Link to={`/portal/player/${course.slug}`}>
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
                    </div>
                    <div className="p-4">
                      <Badge variant="primary">{course.category}</Badge>
                      <h3 className="font-bold text-heading text-sm mt-2 mb-2 line-clamp-2">{course.title}</h3>
                      <ProgressBar value={enr.progress} className="mb-2" />
                      <p className="text-xs text-muted">{enr.progress}% complete • {course.duration}</p>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

export function CoursePlayerPage() {
  const { slug } = useParams();
  const { user } = useAuthStore();
  const { enrolments, updateEnrolment, addCertificate, addNotification } = useAppDataData();
  const course = COURSES.find((c) => c.slug === slug);

  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!user) return <Navigate to="/login" />;
  if (!course) return <Navigate to="/portal/my-learning" />;

  const enrolment = enrolments.find((e) => e.userId === user.id && e.courseId === course.id);

  const currentModule = course.modules[currentModuleIdx];
  const currentLesson = currentModule?.lessons[currentLessonIdx];
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLessonGlobalIdx = allLessons.findIndex((l) => l.id === currentLesson?.id);

  const completedLessons = enrolment?.completedLessons || [];
  const isLessonComplete = (lessonId: string) => completedLessons.includes(lessonId);

  const markComplete = () => {
    if (!enrolment || !currentLesson) return;
    if (!isLessonComplete(currentLesson.id)) {
      const newCompleted = [...completedLessons, currentLesson.id];
      const progress = Math.round((newCompleted.length / allLessons.length) * 100);
      const status = progress === 100 ? 'completed' : 'in_progress';
      updateEnrolment(enrolment.id, {
        completedLessons: newCompleted,
        progress,
        status,
        completedAt: status === 'completed' ? new Date().toISOString() : undefined,
      });
      if (status === 'completed') {
        const certId = `CERT-${Date.now().toString(36).toUpperCase()}`;
        addCertificate({
          id: certId,
          userId: user.id,
          userName: `${user.firstName} ${user.lastName}`,
          courseId: course.id,
          courseTitle: course.title,
          issueDate: new Date().toISOString(),
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          certificateId: certId,
          score: 85,
        });
        addNotification({
          id: `notif-${Date.now()}`,
          userId: user.id,
          type: 'certificate',
          title: 'Course Completed!',
          message: `You have completed ${course.title}. Your certificate is ready to download.`,
          read: false,
          createdAt: new Date().toISOString(),
          link: '/portal/certificates',
        });
      }
    }
    if (currentLessonGlobalIdx < allLessons.length - 1) {
      goNext();
    }
  };

  const goNext = () => {
    if (currentLessonIdx < currentModule.lessons.length - 1) {
      setCurrentLessonIdx(currentLessonIdx + 1);
    } else if (currentModuleIdx < course.modules.length - 1) {
      setCurrentModuleIdx(currentModuleIdx + 1);
      setCurrentLessonIdx(0);
    }
    setQuizSubmitted(false);
    setShowResults(false);
    setQuizAnswers({});
  };

  const goPrev = () => {
    if (currentLessonIdx > 0) {
      setCurrentLessonIdx(currentLessonIdx - 1);
    } else if (currentModuleIdx > 0) {
      const prevModule = course.modules[currentModuleIdx - 1];
      setCurrentModuleIdx(currentModuleIdx - 1);
      setCurrentLessonIdx(prevModule.lessons.length - 1);
    }
    setQuizSubmitted(false);
    setShowResults(false);
    setQuizAnswers({});
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    setShowResults(true);
    if (currentLesson) markComplete();
  };

  const quizScore = currentLesson?.questions
    ? currentLesson.questions.filter((q) => quizAnswers[q.id] === q.correctAnswer).length
    : 0;
  const quizTotal = currentLesson?.questions?.length || 0;
  const quizPassed = quizScore >= Math.ceil(quizTotal * (course.passMark / 100));

  return (
    <PortalLayout title={course.title} sidebarItems={SIDEBAR} activePath="/portal/my-learning">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Curriculum Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <h3 className="font-bold text-heading mb-3 text-sm">Curriculum</h3>
            <div className="space-y-3">
              {course.modules.map((module, mi) => (
                <div key={module.id}>
                  <p className="text-xs font-semibold text-muted uppercase mb-1">Module {mi + 1}: {module.title}</p>
                  <div className="space-y-1">
                    {module.lessons.map((lesson, li) => {
                      const isActive = mi === currentModuleIdx && li === currentLessonIdx;
                      const isDone = isLessonComplete(lesson.id);
                      const isLocked = !lesson.preview && !isDone && mi > currentModuleIdx;
                      return (
                        <button key={lesson.id} onClick={() => { if (!isLocked) { setCurrentModuleIdx(mi); setCurrentLessonIdx(li); setQuizSubmitted(false); setShowResults(false); } }}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm text-left transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-body hover:bg-bg-light'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {isDone ? <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" /> : isLocked ? <Lock className="w-4 h-4 flex-shrink-0" /> : lesson.type === 'video' ? <Play className="w-4 h-4 flex-shrink-0" /> : lesson.type === 'quiz' ? <BarChart3 className="w-4 h-4 flex-shrink-0" /> : <FileIcon className="w-4 h-4 flex-shrink-0" />}
                          <span className="flex-1 truncate">{lesson.title}</span>
                          <span className="text-xs text-muted">{lesson.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Lesson Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary">{currentModule.title}</Badge>
              <Badge variant="neutral">{currentLesson?.type}</Badge>
              {isLessonComplete(currentLesson?.id || '') && <Badge variant="success"><CheckCircle2 className="w-3 h-3" /> Complete</Badge>}
            </div>
            <h2 className="text-xl font-bold text-heading mb-4">{currentLesson?.title}</h2>

            {currentLesson?.type === 'video' && (
              <div className="aspect-video bg-black rounded-card mb-4 flex items-center justify-center">
                <div className="text-center text-white/70">
                  <Play className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Video lesson: {currentLesson.title}</p>
                  <p className="text-xs mt-1">{currentLesson.duration}</p>
                </div>
              </div>
            )}

            {currentLesson?.type === 'reading' && (
              <div className="prose max-w-none mb-4">
                <p className="text-body leading-relaxed">{currentLesson.content || 'This lesson covers key concepts related to ' + currentLesson.title + '. Read through the material carefully before proceeding to the next lesson.'}</p>
              </div>
            )}

            {currentLesson?.type === 'quiz' && !showResults && (
              <div className="space-y-4">
                {currentLesson.questions?.map((q, qi) => (
                  <div key={q.id} className="bg-bg-section p-4 rounded-card">
                    <p className="font-medium text-heading mb-3">{qi + 1}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => (
                        <button key={oi} onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: oi })}
                          className={`w-full text-left px-4 py-2.5 rounded-button border text-sm transition-all ${quizAnswers[q.id] === oi ? 'border-primary bg-primary/5' : 'border-border hover:bg-bg-light'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <Button variant="primary" onClick={submitQuiz} disabled={Object.keys(quizAnswers).length < (currentLesson.questions?.length || 0)}>
                  Submit Quiz
                </Button>
              </div>
            )}

            {currentLesson?.type === 'quiz' && showResults && (
              <div className="space-y-4">
                <div className={`p-6 rounded-card text-center ${quizPassed ? 'bg-success-light' : 'bg-error-light'}`}>
                  <CheckCircle2 className={`w-12 h-12 mx-auto mb-2 ${quizPassed ? 'text-success' : 'text-error'}`} />
                  <p className="text-xl font-bold text-heading">{quizPassed ? 'Passed!' : 'Not Passed'}</p>
                  <p className="text-body">You scored {quizScore}/{quizTotal} ({Math.round((quizScore / quizTotal) * 100)}%)</p>
                  <p className="text-sm text-muted mt-1">Pass mark: {course.passMark}%</p>
                </div>
                {currentLesson.questions?.map((q, qi) => (
                  <div key={q.id} className="bg-bg-section p-4 rounded-card">
                    <p className="font-medium text-heading mb-2">{qi + 1}. {q.question}</p>
                    <div className="space-y-1">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className={`px-3 py-2 rounded text-sm ${oi === q.correctAnswer ? 'bg-success-light text-success font-medium' : quizAnswers[q.id] === oi ? 'bg-error-light text-error' : ''}`}>
                          {opt} {oi === q.correctAnswer && '✓'} {quizAnswers[q.id] === oi && oi !== q.correctAnswer && '✗'}
                        </div>
                      ))}
                    </div>
                    {q.explanation && <p className="text-xs text-muted mt-2">{q.explanation}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <Button variant="outline" onClick={goPrev} disabled={currentLessonGlobalIdx === 0}>
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>
              {currentLesson?.type !== 'quiz' && (
                <Button variant="secondary" onClick={markComplete}>
                  <CheckCircle2 className="w-4 h-4" /> Mark Complete
                </Button>
              )}
              <Button variant="primary" onClick={goNext} disabled={currentLessonGlobalIdx === allLessons.length - 1}>
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}

import { useAppDataStore as useAppDataData } from '@/context/AppDataContext';

export function CertificatesPage() {
  const { user } = useAuthStore();
  const { certificates } = useAppDataStore();

  if (!user) return <Navigate to="/login" />;

  const userCerts = certificates.filter((c) => c.userId === user.id);

  return (
    <PortalLayout title="Certificates" sidebarItems={SIDEBAR} activePath="/portal/certificates">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-heading">My Certificates</h2>
          <p className="text-muted text-sm">Download and share your course completion certificates.</p>
        </div>
        {userCerts.length === 0 ? (
          <Card className="p-12 text-center">
            <Award className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-body mb-4">No certificates yet. Complete a course to earn your certificate.</p>
            <Link to="/portal/my-learning"><Button variant="primary">My Learning</Button></Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userCerts.map((cert) => (
              <Card key={cert.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-card bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-heading text-sm">{cert.courseTitle}</h3>
                    <p className="text-xs text-muted mt-1">Certificate ID: {cert.certificateId}</p>
                    <p className="text-xs text-muted">Issued: {new Date(cert.issueDate).toLocaleDateString('en-GB')}</p>
                    <p className="text-xs text-muted">Expires: {new Date(cert.expiryDate).toLocaleDateString('en-GB')}</p>
                    <p className="text-xs text-success mt-1">Score: {cert.score}%</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="primary" size="sm">Download</Button>
                      <Link to={`/verify/${cert.certificateId}`}><Button variant="outline" size="sm">Verify</Button></Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

export function OrdersPage() {
  const { user } = useAuthStore();
  const { orders } = useAppDataStore();

  if (!user) return <Navigate to="/login" />;

  const userOrders = orders.filter((o) => o.userId === user.id);

  return (
    <PortalLayout title="Orders" sidebarItems={SIDEBAR} activePath="/portal/orders">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">Order History</h2>
        {userOrders.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-body mb-4">No orders yet.</p>
            <Link to="/courses"><Button variant="primary">Browse Courses</Button></Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-heading">{order.invoiceNumber}</p>
                    <p className="text-xs text-muted">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <Badge variant={order.status === 'completed' ? 'success' : order.status === 'refunded' ? 'error' : 'warning'}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                <div className="space-y-1 mb-4">
                  {order.items.map((item) => (
                    <div key={item.courseId} className="flex justify-between text-sm">
                      <span className="text-body">{item.title} × {item.quantity}</span>
                      <span className="font-medium">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">£{order.total.toFixed(2)}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">Download Invoice</Button>
                  {order.status === 'completed' && <Button variant="ghost" size="sm">Request Refund</Button>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

export function WishlistPage() {
  const { user } = useAuthStore();
  const { useWishlistStore } = { useWishlistStore: null };
  return (
    <PortalLayout title="Wishlist" sidebarItems={SIDEBAR} activePath="/portal/wishlist">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-heading">My Wishlist</h2>
        <Card className="p-12 text-center">
          <Heart className="w-12 h-12 text-muted mx-auto mb-4" />
          <p className="text-body mb-4">Your wishlist is empty.</p>
          <Link to="/courses"><Button variant="primary">Browse Courses</Button></Link>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function NotificationsPage() {
  const { user } = useAuthStore();
  const { notifications, markAllRead, markNotificationRead } = useAppDataStore();

  if (!user) return <Navigate to="/login" />;

  const userNotifs = notifications.filter((n) => n.userId === user.id);

  return (
    <PortalLayout title="Notifications" sidebarItems={SIDEBAR} activePath="/portal/notifications">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-heading">Notifications</h2>
          {userNotifs.some((n) => !n.read) && <Button variant="ghost" size="sm" onClick={() => markAllRead(user.id)}>Mark all read</Button>}
        </div>
        {userNotifs.length === 0 ? (
          <Card className="p-12 text-center">
            <Bell className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-body">No notifications yet.</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {userNotifs.map((n) => (
              <Card key={n.id} className={`p-4 ${!n.read ? 'border-l-4 border-l-primary' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${n.type === 'certificate' ? 'bg-success/10' : n.type === 'reminder' ? 'bg-warning/10' : 'bg-primary/10'}`}>
                    {n.type === 'certificate' ? <Award className="w-5 h-5 text-success" /> : n.type === 'reminder' ? <Clock className="w-5 h-5 text-warning" /> : <Bell className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-heading">{n.title}</p>
                    <p className="text-sm text-body">{n.message}</p>
                    <p className="text-xs text-muted mt-1">{new Date(n.createdAt).toLocaleDateString('en-GB')}</p>
                  </div>
                  {!n.read && <button onClick={() => markNotificationRead(n.id)} className="text-xs text-primary hover:underline">Mark read</button>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

export function ProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const { show } = useToastStore();
  const [form, setForm] = useState({
    firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '',
    phone: user?.phone || '', company: user?.company || '', jobTitle: user?.jobTitle || '',
    address: user?.address || '', city: user?.city || '', postcode: user?.postcode || '',
  });

  if (!user) return <Navigate to="/login" />;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    show('success', 'Profile updated successfully');
  };

  return (
    <PortalLayout title="Profile Settings" sidebarItems={SIDEBAR} activePath="/portal/profile">
      <div className="max-w-2xl space-y-6">
        <h2 className="text-xl font-bold text-heading">Profile Settings</h2>
        <Card className="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=e63031&color=fff`} alt={user.firstName} className="w-20 h-20 rounded-full object-cover" />
              <div><Button variant="outline" size="sm">Change Avatar</Button><p className="text-xs text-muted mt-1">JPG or PNG, max 2MB</p></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              <Input label="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </div>
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              <Input label="Job Title" value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} />
            </div>
            <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <Input label="Postcode" value={form.postcode} onChange={(e) => setForm({ ...form, postcode: e.target.value })} />
            </div>
            <Button type="submit" variant="primary">Save Changes</Button>
          </form>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-heading mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            {['Course updates', 'Assignment reminders', 'Certificate expiry alerts', 'Marketing emails'].map((pref, i) => (
              <label key={i} className="flex items-center justify-between">
                <span className="text-sm text-body">{pref}</span>
                <input type="checkbox" defaultChecked={i < 3} className="w-5 h-5 accent-primary" />
              </label>
            ))}
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
}

import { Input } from '@/components/ui/Input';
import { useToastStore } from '@/context/ToastContext';
