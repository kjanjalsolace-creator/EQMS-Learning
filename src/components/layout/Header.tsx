import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, X, ShoppingCart, Search, User, ChevronDown, LogOut, LayoutDashboard,
  BookOpen, Award, Settings, Heart, Package, Building2,
} from 'lucide-react';
import { ASSETS, FALLBACK_IMAGE } from '@/data/assets';
import { useCartStore } from '@/context/CartContext';
import { useAuthStore } from '@/context/AuthContext';
import { useWishlistStore } from '@/context/WishlistContext';
import { Button } from '@/components/ui/Button';
import { Drawer, DrawerHeader } from '@/components/ui/Drawer';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'About', to: '/about' },
  { label: 'News', to: '/news' },
  { label: 'Contact Us', to: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { items, getTotalQuantity } = useCartStore();
  const { user, logout } = useAuthStore();
  const { courseIds } = useWishlistStore();
  const cartCount = getTotalQuantity();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const dashboardLink = user
    ? user.role === 'learner'
      ? '/portal'
      : user.role === 'org_admin'
      ? '/portal/admin'
      : user.role === 'instructor'
      ? '/portal/instructor'
      : '/portal/superadmin'
    : '/login';

  const userMenuItems = [
    { label: 'Dashboard', to: dashboardLink, icon: LayoutDashboard },
    { label: 'My Learning', to: '/portal/my-learning', icon: BookOpen },
    { label: 'Certificates', to: '/portal/certificates', icon: Award },
    { label: 'Wishlist', to: '/portal/wishlist', icon: Heart },
    { label: 'Orders', to: '/portal/orders', icon: Package },
    { label: 'Profile', to: '/portal/profile', icon: Settings },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? 'shadow-header' : 'border-b border-border'
        }`}
      >
        <div className="container-eqms">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={ASSETS.logo}
                alt="EQMS Training"
                className="h-10 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-nav font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-primary'
                      : 'text-heading hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-button hover:bg-bg-light transition-colors text-heading"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/cart"
                className="relative p-2.5 rounded-button hover:bg-bg-light transition-colors text-heading"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-button hover:bg-bg-light transition-colors"
                  >
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=e63031&color=fff`}
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-heading max-w-[100px] truncate">
                      {user.firstName}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted" />
                  </button>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-card shadow-card-hover border border-border py-2 z-20 animate-scale-in">
                        <div className="px-4 py-2 border-b border-border">
                          <p className="text-sm font-semibold text-heading">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-muted">{user.email}</p>
                        </div>
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-body hover:bg-bg-light hover:text-primary transition-colors"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        ))}
                        <button
                          onClick={() => {
                            logout();
                            navigate('/');
                          }}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error-light transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="md">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="md">
                      Get Started Now
                    </Button>
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-button hover:bg-bg-light transition-colors text-heading"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="absolute left-0 right-0 top-full bg-white border-b border-border shadow-header animate-slide-up z-30">
              <div className="container-eqms py-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What do you want to learn?"
                    className="input-base flex-1"
                    autoFocus
                  />
                  <Button type="submit" variant="primary">
                    <Search className="w-4 h-4" />
                    Search
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} side="left" width="max-w-xs">
        <DrawerHeader title="Menu" onClose={() => setMobileOpen(false)} />
        <div className="flex flex-col p-4 gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-3 rounded-button text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-primary/10 text-primary'
                  : 'text-heading hover:bg-bg-light'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-border my-3" />
          {user ? (
            <>
              <Link to={dashboardLink} className="px-4 py-3 rounded-button text-sm font-medium text-heading hover:bg-bg-light flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/portal/profile" className="px-4 py-3 rounded-button text-sm font-medium text-heading hover:bg-bg-light flex items-center gap-3">
                <Settings className="w-4 h-4" /> Profile
              </Link>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="px-4 py-3 rounded-button text-sm font-medium text-error hover:bg-error-light flex items-center gap-3 text-left"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-3 rounded-button text-sm font-medium text-heading hover:bg-bg-light">
                Sign In
              </Link>
              <Link to="/register" className="mt-2">
                <Button variant="primary" fullWidth>Get Started Now</Button>
              </Link>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
}
