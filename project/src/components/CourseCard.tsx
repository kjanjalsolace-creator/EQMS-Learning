import { Link } from 'react-router-dom';
import { Star, Clock, ShoppingCart, Heart, CheckCircle2 } from 'lucide-react';
import type { Course } from '@/types';
import { useCartStore } from '@/context/CartContext';
import { useWishlistStore } from '@/context/WishlistContext';
import { useToastStore } from '@/context/ToastContext';
import { Badge } from '@/components/ui/Card';
import { FALLBACK_IMAGE } from '@/data/assets';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const { show } = useToastStore();
  const wished = isWishlisted(course.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(course.id);
    show(wished ? 'info' : 'success', wished ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const displayPrice = course.salePrice || course.price;

  return (
    <Link to={`/courses/${course.slug}`} className="card-base group hover:shadow-card-hover transition-all duration-300 flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {course.cpdApproved && (
            <Badge variant="primary" className="bg-primary/90 text-white">CPD</Badge>
          )}
          {course.rospaAssured && (
            <Badge variant="neutral" className="bg-white/90 text-heading">ROSPA</Badge>
          )}
        </div>
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-card transition-all"
        >
          <Heart className={`w-4 h-4 ${wished ? 'fill-primary text-primary' : 'text-muted'}`} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-muted mb-2">
          <span className="font-medium text-primary">{course.category}</span>
          <span>•</span>
          <span>{course.level}</span>
        </div>
        <h3 className="font-bold text-heading text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-body line-clamp-2 mb-3 flex-1">{course.shortDescription}</p>
        <div className="flex items-center gap-3 text-xs text-muted mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-warning text-warning" />
            <span className="font-medium text-heading">{course.rating}</span>
            <span>({course.reviewCount})</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
          <div className="flex items-baseline gap-1">
            {course.salePrice && (
              <span className="text-xs text-muted line-through">£{course.price}</span>
            )}
            <span className="text-lg font-bold text-primary">£{displayPrice}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-button bg-primary text-white hover:bg-primary-hover transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
