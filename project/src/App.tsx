import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { useAuthStore } from '@/context/AuthContext';
import type { UserRole } from '@/types';

const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const CoursesPage = lazy(() => import('@/pages/CoursesPage').then(m => ({ default: m.CoursesPage })));
const CourseDetailPage = lazy(() => import('@/pages/CourseDetailPage').then(m => ({ default: m.CourseDetailPage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import('@/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const PricesPage = lazy(() => import('@/pages/PricesPage').then(m => ({ default: m.PricesPage })));
const LMSPage = lazy(() => import('@/pages/LMSPage').then(m => ({ default: m.LMSPage })));
const NewsPage = lazy(() => import('@/pages/NewsPage').then(m => ({ default: m.NewsPage })));
const ArticlePage = lazy(() => import('@/pages/NewsPage').then(m => ({ default: m.ArticlePage })));
const CartPage = lazy(() => import('@/pages/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const CertificateVerifyPage = lazy(() => import('@/pages/CertificateVerifyPage').then(m => ({ default: m.CertificateVerifyPage })));

// Static imports for multi-export modules
import { NotFoundPage, PrivacyPage, TermsPage } from '@/pages/StaticPages';
import { LoginPage, RegisterPage } from '@/pages/AuthPages';
import { LearnerDashboard } from '@/pages/portal/LearnerDashboard';
import {
  MyLearningPage, CoursePlayerPage, CertificatesPage, OrdersPage,
  WishlistPage, NotificationsPage, ProfilePage,
} from '@/pages/portal/LearnerPages';
import {
  OrgAdminDashboard, OrgEmployeesPage, OrgReportsPage, OrgAssignmentsPage,
  OrgLicencesPage, OrgBrandingPage, OrgBillingPage,
} from '@/pages/portal/OrgAdminPages';
import {
  InstructorDashboard, InstructorCoursesPage, InstructorAnalyticsPage,
  InstructorStudentsPage, InstructorSettingsPage,
} from '@/pages/portal/InstructorPages';
import {
  SuperAdminDashboard, SuperAdminUsersPage, SuperAdminCoursesPage,
  SuperAdminCouponsPage, SuperAdminContentPage, SuperAdminSettingsPage,
} from '@/pages/portal/SuperAdminPages';

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: UserRole[] }) {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/portal" />;
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public pages with layout */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/courses" element={<PublicLayout><CoursesPage /></PublicLayout>} />
          <Route path="/courses/:slug" element={<PublicLayout><CourseDetailPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
          <Route path="/faq" element={<PublicLayout><FAQPage /></PublicLayout>} />
          <Route path="/prices" element={<PublicLayout><PricesPage /></PublicLayout>} />
          <Route path="/lms" element={<PublicLayout><LMSPage /></PublicLayout>} />
          <Route path="/news" element={<PublicLayout><NewsPage /></PublicLayout>} />
          <Route path="/news/:slug" element={<PublicLayout><ArticlePage /></PublicLayout>} />
          <Route path="/cart" element={<PublicLayout><CartPage /></PublicLayout>} />
          <Route path="/privacy" element={<PublicLayout><PrivacyPage /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><TermsPage /></PublicLayout>} />
          <Route path="/404" element={<PublicLayout><NotFoundPage /></PublicLayout>} />

          {/* Checkout - has its own layout */}
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />

          {/* Auth pages - standalone */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Certificate verification - standalone */}
          <Route path="/verify/:certificateId" element={<CertificateVerifyPage />} />

          {/* Learner Portal */}
          <Route path="/portal" element={<ProtectedRoute><LearnerDashboard /></ProtectedRoute>} />
          <Route path="/portal/my-learning" element={<ProtectedRoute><MyLearningPage /></ProtectedRoute>} />
          <Route path="/portal/player/:slug" element={<ProtectedRoute><CoursePlayerPage /></ProtectedRoute>} />
          <Route path="/portal/certificates" element={<ProtectedRoute><CertificatesPage /></ProtectedRoute>} />
          <Route path="/portal/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
          <Route path="/portal/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
          <Route path="/portal/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/portal/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          {/* Org Admin Portal */}
          <Route path="/portal/admin" element={<ProtectedRoute roles={['org_admin', 'super_admin']}><OrgAdminDashboard /></ProtectedRoute>} />
          <Route path="/portal/admin/employees" element={<ProtectedRoute roles={['org_admin', 'super_admin']}><OrgEmployeesPage /></ProtectedRoute>} />
          <Route path="/portal/admin/assignments" element={<ProtectedRoute roles={['org_admin', 'super_admin']}><OrgAssignmentsPage /></ProtectedRoute>} />
          <Route path="/portal/admin/licences" element={<ProtectedRoute roles={['org_admin', 'super_admin']}><OrgLicencesPage /></ProtectedRoute>} />
          <Route path="/portal/admin/reports" element={<ProtectedRoute roles={['org_admin', 'super_admin']}><OrgReportsPage /></ProtectedRoute>} />
          <Route path="/portal/admin/branding" element={<ProtectedRoute roles={['org_admin', 'super_admin']}><OrgBrandingPage /></ProtectedRoute>} />
          <Route path="/portal/admin/billing" element={<ProtectedRoute roles={['org_admin', 'super_admin']}><OrgBillingPage /></ProtectedRoute>} />

          {/* Instructor Portal */}
          <Route path="/portal/instructor" element={<ProtectedRoute roles={['instructor', 'super_admin']}><InstructorDashboard /></ProtectedRoute>} />
          <Route path="/portal/instructor/courses" element={<ProtectedRoute roles={['instructor', 'super_admin']}><InstructorCoursesPage /></ProtectedRoute>} />
          <Route path="/portal/instructor/analytics" element={<ProtectedRoute roles={['instructor', 'super_admin']}><InstructorAnalyticsPage /></ProtectedRoute>} />
          <Route path="/portal/instructor/students" element={<ProtectedRoute roles={['instructor', 'super_admin']}><InstructorStudentsPage /></ProtectedRoute>} />
          <Route path="/portal/instructor/settings" element={<ProtectedRoute roles={['instructor', 'super_admin']}><InstructorSettingsPage /></ProtectedRoute>} />

          {/* Super Admin Portal */}
          <Route path="/portal/superadmin" element={<ProtectedRoute roles={['super_admin']}><SuperAdminDashboard /></ProtectedRoute>} />
          <Route path="/portal/superadmin/users" element={<ProtectedRoute roles={['super_admin']}><SuperAdminUsersPage /></ProtectedRoute>} />
          <Route path="/portal/superadmin/courses" element={<ProtectedRoute roles={['super_admin']}><SuperAdminCoursesPage /></ProtectedRoute>} />
          <Route path="/portal/superadmin/coupons" element={<ProtectedRoute roles={['super_admin']}><SuperAdminCouponsPage /></ProtectedRoute>} />
          <Route path="/portal/superadmin/content" element={<ProtectedRoute roles={['super_admin']}><SuperAdminContentPage /></ProtectedRoute>} />
          <Route path="/portal/superadmin/settings" element={<ProtectedRoute roles={['super_admin']}><SuperAdminSettingsPage /></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
        </Routes>
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
