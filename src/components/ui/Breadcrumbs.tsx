import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; to?: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center flex-wrap gap-1.5 text-sm text-muted">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted/50" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-heading font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
