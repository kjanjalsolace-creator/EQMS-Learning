import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageBanner } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Pagination } from '@/components/ui/Pagination';
import { NEWS_ARTICLES } from '@/data/seed';
import { FALLBACK_IMAGE } from '@/data/assets';
import { Search, ArrowRight, Calendar, Clock } from 'lucide-react';

const PER_PAGE = 6;

export function NewsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const cats = new Set(NEWS_ARTICLES.map((a) => a.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    return NEWS_ARTICLES.filter((a) => {
      if (category !== 'all' && a.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <PageBanner
        title="Latest Company News and Blog Updates"
        subtitle="Stay informed with the latest compliance news, industry insights and training tips."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'News' }]}
      />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'News' }]} />

        <div className="flex flex-col md:flex-row gap-4 mb-8 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search articles..."
              className="input-base pl-12"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-button text-sm font-medium transition-all ${
                  category === cat ? 'bg-primary text-white' : 'bg-bg-light text-body hover:bg-border'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {paginated.length === 0 ? (
          <div className="text-center py-20 text-muted">No articles found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((article) => (
              <Link key={article.id} to={`/news/${article.slug}`} className="card-base group hover:shadow-card-hover transition-all">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted mb-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-heading mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-body line-clamp-2 mb-3">{article.excerpt}</p>
                  <span className="text-sm text-primary font-medium flex items-center gap-1">Read More <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </>
  );
}

export function ArticlePage() {
  const { slug } = useParams();
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="container-eqms py-20 text-center">
        <h1 className="text-2xl font-bold text-heading mb-4">Article not found</h1>
        <Link to="/news" className="text-primary underline">Back to News</Link>
      </div>
    );
  }

  const related = NEWS_ARTICLES.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);

  return (
    <>
      <PageBanner title={article.title} breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'News', to: '/news' }, { label: article.title }]} />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'News', to: '/news' }, { label: article.title }]} />

        <article className="max-w-3xl mx-auto mt-8">
          <div className="flex items-center gap-4 mb-6">
            <img src={article.authorAvatar} alt={article.author} className="w-10 h-10 rounded-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
            <div className="text-sm text-muted">
              <p className="font-medium text-heading">{article.author}</p>
              <p>{new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} • {article.readTime}</p>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-card overflow-hidden mb-8 shadow-card">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
          </div>

          <div className="prose prose-lg max-w-none text-body leading-relaxed space-y-4">
            {article.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <Badge variant="primary">{article.category}</Badge>
          </div>
        </article>

        {related.length > 0 && (
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-heading mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link key={a.id} to={`/news/${a.slug}`} className="card-base group hover:shadow-card-hover transition-all">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover" loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-heading text-sm group-hover:text-primary line-clamp-2">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import { Badge } from '@/components/ui/Card';
