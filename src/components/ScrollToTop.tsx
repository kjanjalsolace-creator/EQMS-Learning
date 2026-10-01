import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component automatically scrolls the window to the top
 * whenever the route or search parameters change.
 */
export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // 1. Scroll main window / html / body
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    // 2. Also scroll any inner scroll containers (like PortalLayout <main className="overflow-y-auto">)
    const scrollContainers = document.querySelectorAll('main, [data-scroll-container], .overflow-y-auto');
    scrollContainers.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [pathname, search]);

  return null;
}
