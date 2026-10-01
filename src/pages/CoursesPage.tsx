import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3x3, List, X, Star, Clock, ShoppingCart, Heart, CheckCircle2, Play } from 'lucide-react';
import { COURSES, CATEGORIES } from '@/data/seed';
import { CourseCard } from '@/components/CourseCard';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { Pagination } from '@/components/ui/Pagination';
import { PageBanner } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useCartStore } from '@/context/CartContext';
import { useWishlistStore } from '@/context/WishlistContext';
import { useToastStore } from '@/context/ToastContext';
import { useAuthStore } from '@/context/AuthContext';
import { useAppDataStore } from '@/context/AppDataContext';
import { FALLBACK_IMAGE } from '@/data/assets';

const PER_PAGE = 9;

export function CoursesPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { enrolments } = useAppDataStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const { show } = useToastStore();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearch(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...COURSES].filter((c) => c.published);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    if (category !== 'all') result = result.filter((c) => c.category === category);
    if (level !== 'all') result = result.filter((c) => c.level === level);
    result = result.filter((c) => {
      const price = c.salePrice || c.price;
      return price >= minPrice && price <= maxPrice;
    });
    result = result.filter((c) => c.rating >= minRating);

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.enrolledCount - a.enrolledCount);
    }

    return result;
  }, [search, category, level, minPrice, maxPrice, minRating, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setLevel('all');
    setMinPrice(0);
    setMaxPrice(200);
    setMinRating(0);
    setSortBy('popular');
    setSearchParams({});
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(search ? { q: search } : {});
    setPage(1);
  };

  const handleAddToCart = (course: typeof COURSES[0]) => {
    addItem({
      courseId: course.id,
      title: course.title,
      thumbnail: course.thumbnail,
      price: course.salePrice || course.price,
      quantity: 1,
      teamPurchase: false,
    });
    show('success', `${course.title} added to cart`);
  };

  return (
    <>
      <PageBanner
        title="Courses"
        subtitle="Browse our full library of 500+ CPD-approved and ROSPA-assured compliance training courses."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Courses' }]}
      />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Courses' }]} />

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mt-6 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What do you want to learn?"
              className="input-base pl-12"
            />
          </div>
          <Button type="submit" variant="primary">
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </form>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-card border border-border p-5 space-y-5 sticky top-24">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-heading">Filters</h3>
                <button onClick={clearFilters} className="text-sm text-primary hover:underline">
                  Clear all
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                  className="input-base"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">Level</label>
                <select
                  value={level}
                  onChange={(e) => { setLevel(e.target.value); setPage(1); }}
                  className="input-base"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Price Range: £{minPrice} - £{maxPrice}
                </label>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={5}
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">Minimum Rating</label>
                <div className="flex gap-1">
                  {[0, 3, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => { setMinRating(r); setPage(1); }}
                      className={`px-3 py-1.5 text-xs rounded-button transition-colors ${
                        minRating === r ? 'bg-primary text-white' : 'bg-bg-light text-body hover:bg-border'
                      }`}
                    >
                      {r === 0 ? 'All' : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted">
                Showing <span className="font-semibold text-heading">{paginated.length}</span> of{' '}
                <span className="font-semibold text-heading">{filtered.length}</span> courses
              </p>
              <div className="flex items-center gap-3">
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-auto">
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </Select>
                <div className="flex border border-border rounded-button overflow-hidden">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 ${view === 'grid' ? 'bg-primary text-white' : 'text-muted hover:bg-bg-light'}`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2 ${view === 'list' ? 'bg-primary text-white' : 'text-muted hover:bg-bg-light'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-bg-section rounded-card">
                <p className="text-lg font-semibold text-heading mb-2">No courses found</p>
                <p className="text-muted mb-4">Try adjusting your filters or search terms.</p>
                <Button variant="primary" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginated.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginated.map((course) => {
                  const isEnrolled = !!(user && enrolments.some((e) => e.userId === user.id && e.courseId === course.id));
                  return (
                    <Link
                      key={course.id}
                      to={`/courses/${course.slug}`}
                      className="card-base group hover:shadow-card-hover transition-all flex flex-col sm:flex-row relative overflow-hidden"
                    >
                      <div className="sm:w-64 aspect-[16/9] sm:aspect-auto flex-shrink-0 overflow-hidden relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                        />
                        {isEnrolled && (
                          <div className="absolute top-2 left-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
                              <CheckCircle2 className="w-3 h-3" /> Enrolled
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-xs text-muted mb-2">
                          <span className="font-medium text-primary">{course.category}</span>
                          <span>•</span>
                          <span>{course.level}</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                        </div>
                        <h3 className="font-bold text-heading text-lg mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-body line-clamp-2 mb-3 flex-1">{course.shortDescription}</p>
                        <div className="flex items-center gap-4 text-sm text-muted mb-3">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-warning text-warning" />
                            <span className="font-medium text-heading">{course.rating}</span>
                            ({course.reviewCount})
                          </span>
                          <span>{course.cpdPoints} CPD points</span>
                        </div>

                        {isEnrolled ? (
                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-4 h-4" /> Active Access
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  navigate(`/portal/player/${course.slug}`);
                                }}
                                className="px-4 py-2 rounded-button bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                              >
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>Start Learning</span>
                              </button>
                              <button
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(course.id); }}
                                className="p-2 rounded-button border border-border hover:bg-bg-light"
                              >
                                <Heart className={`w-4 h-4 ${isWishlisted(course.id) ? 'fill-primary text-primary' : 'text-muted'}`} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <span className="text-xl font-bold text-primary">
                              £{course.salePrice || course.price}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => { e.preventDefault(); handleAddToCart(course); }}
                                className="p-2 rounded-button bg-primary text-white hover:bg-primary-hover transition-colors"
                                aria-label="Add to cart"
                              >
                                <ShoppingCart className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => { e.preventDefault(); toggle(course.id); }}
                                className="p-2 rounded-button border border-border hover:bg-bg-light transition-colors"
                                aria-label="Wishlist"
                              >
                                <Heart className={`w-4 h-4 ${isWishlisted(course.id) ? 'fill-primary text-primary' : 'text-muted'}`} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </>
  );
}
