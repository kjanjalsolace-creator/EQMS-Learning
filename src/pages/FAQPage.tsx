import { useState, useMemo } from 'react';
import { PageBanner } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';
import { FAQS } from '@/data/seed';

export function FAQPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set(FAQS.map((f) => f.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    return FAQS.filter((f) => {
      if (category !== 'all' && f.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, category]);

  return (
    <>
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our courses, payments, certifications and the LMS platform."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
      />
      <div className="container-eqms py-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />

        <div className="max-w-3xl mx-auto mt-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="input-base pl-12"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-button text-sm font-medium transition-all ${
                  category === cat ? 'bg-primary text-white' : 'bg-bg-light text-body hover:bg-border'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <Accordion
              items={filtered.map((f) => ({
                id: f.id,
                title: f.question,
                content: <p>{f.answer}</p>,
              }))}
            />
          ) : (
            <div className="text-center py-12 text-muted">
              No questions found. Try a different search.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
