import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PromoBanner } from '@/components/layout/PromoBanner';
import { CookieBanner } from '@/components/layout/CookieBanner';

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PromoBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; to?: string }[];
}

export function PageBanner({ title, subtitle, breadcrumbs }: PageBannerProps) {
  return (
    <div className="bg-bg-section border-b border-border py-12">
      <div className="container-eqms">
        {breadcrumbs && (
          <div className="mb-3">
            <nav className="flex items-center gap-2 text-sm text-muted">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-muted/40">/</span>}
                  {crumb.to ? (
                    <a href={crumb.to} className="hover:text-primary transition-colors">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-heading font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-heading">{title}</h1>
        {subtitle && <p className="mt-2 text-body text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
}
