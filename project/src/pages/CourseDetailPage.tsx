import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Clock, Users, CheckCircle2, Play, ShoppingCart, Heart,
  Share2, ChevronDown, Award, BookOpen, BarChart3, Lock, FileText,
} from 'lucide-react';
import { COURSES, INSTRUCTORS, REVIEWS, COURSES as ALL_COURSES } from '@/data/seed';
import { Button } from '@/components/ui/Button';
import { Badge, Card, ProgressBar } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { CourseCard } from '@/components/CourseCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useCartStore } from '@/context/CartContext';
import { useWishlistStore } from '@/context/WishlistContext';
import { useToastStore } from '@/context/ToastContext';
import { useAuthStore } from '@/context/AuthContext';
import { FALLBACK_IMAGE } from '@/data/assets';

export function CourseDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find((c) => c.slug === slug);
  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const { show } = useToastStore();
  const { user } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const [teamPurchase, setTeamPurchase] = useState(false);
  const [assigneeEmails, setAssigneeEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');

  if (!course) {
    return (
      <div className="container-eqms py-20 text-center">
        <h1 className="text-2xl font-bold text-heading mb-4">Course not found</h1>
        <Link to="/courses"><Button variant="primary">Browse Courses</Button></Link>
      </div>
    );
  }

  const instructor = INSTRUCTORS.find((i) => i.id === course.instructorId);
  const courseReviews = REVIEWS.filter((r) => r.courseId === course.id);
  const related = ALL_COURSES.filter((c) => c.category === course.category && c.id !== course.id).slice(0, 3);
  const wished = isWishlisted(course.id);
  const displayPrice = course.salePrice || course.price;

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = courseReviews.filter((r) => r.rating === star).length;
    return { star, count, pct: courseReviews.length ? (count / courseReviews.length) * 100 : 0 };
  });

  const handleAddToCart = () => {
    addItem({
      courseId: course.id,
      title: course.title,
      thumbnail: course.thumbnail,
      price: displayPrice,
      quantity,
      teamPurchase,
      assigneeEmails: teamPurchase ? assigneeEmails : undefined,
    });
    show('success', `${course.title} added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    show('success', 'Course link copied to clipboard');
  };

  const addEmail = () => {
    if (emailInput && emailInput.includes('@') && !assigneeEmails.includes(emailInput)) {
      setAssigneeEmails([...assigneeEmails, emailInput]);
      setEmailInput('');
    }
  };

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-bg-section border-b border-border py-10">
        <div className="container-eqms">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Courses', to: '/courses' }, { label: course.title }]} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="primary">{course.category}</Badge>
                <Badge variant="neutral">{course.level}</Badge>
                {course.cpdApproved && <Badge variant="success">CPD Approved</Badge>}
                {course.rospaAssured && <Badge variant="info">ROSPA Assured</Badge>}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-heading mb-4">{course.title}</h1>
              <p className="text-body text-lg mb-4">{course.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-bold text-heading">{course.rating}</span>
                  ({course.reviewCount} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.enrolledCount} enrolled
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span>CPD: {course.cpdPoints} points</span>
                <span>Updated: {new Date(course.lastUpdated).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="aspect-video rounded-card overflow-hidden shadow-card">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-eqms py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-heading mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.learningOutcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-body">{outcome}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-heading mb-4">Course Description</h2>
              <p className="text-body leading-relaxed">{course.fullDescription}</p>
            </Card>

            {/* Curriculum */}
            <div>
              <h2 className="text-xl font-bold text-heading mb-4">Curriculum</h2>
              <div className="mb-4 flex items-center gap-4 text-sm text-muted">
                <span>{course.modules.length} modules</span>
                <span>•</span>
                <span>{totalLessons} lessons</span>
                <span>•</span>
                <span>{course.duration}</span>
              </div>
              <Accordion
                items={course.modules.map((module, i) => ({
                  id: module.id,
                  title: `${i + 1}. ${module.title} (${module.lessons.length} lessons)`,
                  content: (
                    <ul className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <li key={lesson.id} className="flex items-center gap-3 text-sm py-1.5">
                          {lesson.type === 'video' && <Play className="w-4 h-4 text-primary" />}
                          {lesson.type === 'reading' && <FileText className="w-4 h-4 text-info" />}
                          {lesson.type === 'quiz' && <BarChart3 className="w-4 h-4 text-warning" />}
                          <span className="text-body flex-1">{lesson.title}</span>
                          <span className="text-muted text-xs">{lesson.duration}</span>
                          {lesson.preview && <Badge variant="success" className="text-xs">Preview</Badge>}
                          {!lesson.preview && <Lock className="w-3.5 h-3.5 text-muted" />}
                        </li>
                      ))}
                    </ul>
                  ),
                }))}
              />
            </div>

            {/* Who is this for */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-heading mb-4">Who Is This Course For?</h2>
              <ul className="space-y-2">
                {course.whoFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-body">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Instructor */}
            {instructor && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-heading mb-4">Your Instructor</h2>
                <div className="flex items-start gap-4">
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                  />
                  <div>
                    <h3 className="font-bold text-heading">{instructor.name}</h3>
                    <p className="text-sm text-primary mb-2">{instructor.title}</p>
                    <p className="text-sm text-body leading-relaxed">{instructor.bio}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {instructor.courseCount} courses
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {instructor.students.toLocaleString()} students
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        {instructor.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-bold text-heading mb-4">Student Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="p-6 text-center">
                  <div className="text-4xl font-bold text-heading mb-2">{course.rating}</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-5 h-5 ${s <= Math.round(course.rating) ? 'fill-warning text-warning' : 'text-border'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted">{course.reviewCount} reviews</p>
                </Card>
                <Card className="p-6 md:col-span-2">
                  {ratingBreakdown.map((r) => (
                    <div key={r.star} className="flex items-center gap-3 mb-1.5">
                      <span className="text-sm text-muted w-12">{r.star} stars</span>
                      <ProgressBar value={r.pct} className="flex-1" />
                      <span className="text-sm text-muted w-8 text-right">{r.count}</span>
                    </div>
                  ))}
                </Card>
              </div>
              <div className="space-y-4">
                {courseReviews.slice(0, 5).map((review) => (
                  <Card key={review.id} className="p-5">
                    <div className="flex items-start gap-3">
                      <img
                        src={review.userAvatar || `https://ui-avatars.com/api/?name=${review.userName}`}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <span className="font-semibold text-heading text-sm">{review.userName}</span>
                            {review.verified && <Badge variant="success" className="ml-2">Verified</Badge>}
                          </div>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-warning text-warning' : 'text-border'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="font-semibold text-heading text-sm mt-1">{review.title}</p>
                        <p className="text-sm text-body mt-1">{review.comment}</p>
                        <p className="text-xs text-muted mt-2">{new Date(review.date).toLocaleDateString('en-GB')}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  {course.salePrice && (
                    <span className="text-lg text-muted line-through">£{course.price}</span>
                  )}
                  <span className="text-3xl font-bold text-primary">£{displayPrice}</span>
                  <span className="text-sm text-muted">+ VAT</span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-body">
                    <Clock className="w-4 h-4 text-primary" />
                    Duration: {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-body">
                    <Award className="w-4 h-4 text-primary" />
                    Certificate: {course.certificateValidity}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-body">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Pass mark: {course.passMark}%
                  </div>
                  <div className="flex items-center gap-2 text-sm text-body">
                    <BookOpen className="w-4 h-4 text-primary" />
                    {totalLessons} lessons
                  </div>
                </div>

                {/* Team Purchase Toggle */}
                <div className="border-t border-border pt-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer mb-3">
                    <input
                      type="checkbox"
                      checked={teamPurchase}
                      onChange={(e) => setTeamPurchase(e.target.checked)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm font-medium text-heading">Buy for your team</span>
                  </label>

                  {teamPurchase ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                          className="input-base text-center w-20"
                          min={1}
                        />
                        <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>+</Button>
                      </div>
                      <div className="text-xs text-muted">
                        Volume discounts: 5+ (10%), 10+ (15%), 25+ (20%)
                      </div>
                      {quantity > 1 && (
                        <div>
                          <label className="text-sm font-medium text-heading block mb-1">Assignee Emails (optional)</label>
                          <div className="flex gap-2">
                            <input
                              type="email"
                              value={emailInput}
                              onChange={(e) => setEmailInput(e.target.value)}
                              placeholder="colleague@company.co.uk"
                              className="input-base flex-1 text-sm"
                              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addEmail(); } }}
                            />
                            <Button variant="secondary" size="sm" onClick={addEmail}>Add</Button>
                          </div>
                          {assigneeEmails.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {assigneeEmails.map((email) => (
                                <div key={email} className="flex items-center justify-between bg-bg-light px-3 py-1.5 rounded text-sm">
                                  {email}
                                  <button onClick={() => setAssigneeEmails(assigneeEmails.filter((e) => e !== email))} className="text-error">×</button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart}>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                  <Button variant="secondary" size="lg" fullWidth onClick={handleBuyNow}>
                    Buy Now
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => { toggle(course.id); show(wished ? 'info' : 'success', wished ? 'Removed from wishlist' : 'Added to wishlist'); }}
                    >
                      <Heart className={`w-4 h-4 ${wished ? 'fill-primary text-primary' : ''}`} />
                      Wishlist
                    </Button>
                    <Button variant="outline" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {!user && (
                  <p className="text-xs text-muted text-center mt-4">
                    <Link to="/login" className="text-primary underline">Sign in</Link> or{' '}
                    <Link to="/register" className="text-primary underline">register</Link> to purchase
                  </p>
                )}
              </Card>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-heading mb-6">Related Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
