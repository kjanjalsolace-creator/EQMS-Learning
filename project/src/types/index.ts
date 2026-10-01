export type UserRole = 'learner' | 'org_admin' | 'instructor' | 'super_admin';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  company?: string;
  companySize?: string;
  sector?: string;
  jobTitle?: string;
  address?: string;
  city?: string;
  postcode?: string;
  createdAt: string;
  emailVerified: boolean;
  notificationPrefs?: {
    courseUpdates: boolean;
    assignments: boolean;
    reminders: boolean;
    marketing: boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  courseCount: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration: string;
  content?: string;
  videoUrl?: string;
  questions?: QuizQuestion[];
  preview?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  price: number;
  salePrice?: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  cpdPoints: number;
  cpdApproved: boolean;
  rospaAssured: boolean;
  rating: number;
  reviewCount: number;
  learningOutcomes: string[];
  whoFor: string[];
  modules: Module[];
  passMark: number;
  certificateValidity: string;
  language: string;
  lastUpdated: string;
  instructorId: string;
  enrolledCount: number;
  published: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  courseCount: number;
  students: number;
  rating: number;
}

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minLicences?: number;
  description: string;
  active: boolean;
  usageLimit?: number;
  usedCount: number;
}

export interface CartItem {
  courseId: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
  teamPurchase: boolean;
  assigneeEmails?: string[];
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  volumeDiscount: number;
  vat: number;
  total: number;
  couponCode?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  billingAddress: BillingAddress;
  invoiceNumber: string;
  createdAt: string;
}

export interface BillingAddress {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  address: string;
  city: string;
  postcode: string;
  vatNumber?: string;
  poNumber?: string;
}

export interface Enrolment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  completedLessons: string[];
  currentLesson?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completedAt?: string;
  score?: number;
  certificateId?: string;
  dueDate?: string;
  assignedBy?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  expiryDate: string;
  certificateId: string;
  score: number;
}

export interface Employee {
  id: string;
  orgId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  group?: string;
  site?: string;
  status: 'active' | 'inactive';
  assignedCourses: string[];
  completedCourses: string[];
  joinedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'purchase' | 'assignment' | 'reminder' | 'certificate' | 'expiry' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}
