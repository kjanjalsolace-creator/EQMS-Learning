import type { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard, BookOpen, Award, Heart, Bell, User, Settings, LogOut,
  ShoppingCart, FileText, ChevronLeft, ChevronRight, Menu, X,
} from 'lucide-react';
import { ASSETS, FALLBACK_IMAGE } from '@/data/assets';
import { useAuthStore } from '@/context/AuthContext';
import { useAppDataStore } from '@/context/AppDataContext';

interface PortalLayoutProps {
  children: ReactNode;
  title: string;
  sidebarItems: { label: string; to: string; icon: typeof LayoutDashboard }[];
  activePath: string;
}

export function PortalLayout({ children, title, sidebarItems, activePath }: PortalLayoutProps) {
  const { user, logout } = useAuthStore();
  const { notifications } = useAppDataStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const userNotifications = notifications.filter((n) => n.userId === user.id);
  const unreadCount = userNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-bg-section flex">
      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col bg-white border-r border-border transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={ASSETS.logo} alt="EQMS" className="h-8" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
          </Link>
          {!collapsed && <span className="text-xs font-bold text-primary">PORTAL</span>}
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium transition-all ${isActive ? 'bg-primary text-white' : 'text-body hover:bg-bg-light hover:text-primary'}`}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-2 border-t border-border">
          <button onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium text-error hover:bg-error-light transition-all w-full">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-white flex flex-col animate-slide-in-right">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <img src={ASSETS.logo} alt="EQMS" className="h-8" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
              <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 p-2 space-y-1">
              {sidebarItems.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium ${location.pathname === item.to ? 'bg-primary text-white' : 'text-body hover:bg-bg-light'}`}>
                  <item.icon className="w-5 h-5" /> {item.label}
                </Link>
              ))}
            </nav>
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-3 px-3 py-2.5 m-2 rounded-button text-sm font-medium text-error hover:bg-error-light">
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-button hover:bg-bg-light"><Menu className="w-5 h-5" /></button>
            <button onClick={() => setCollapsed(!collapsed)} className="hidden md:block p-2 rounded-button hover:bg-bg-light"><ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} /></button>
            <h1 className="text-lg font-bold text-heading">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/cart" className="p-2 rounded-button hover:bg-bg-light relative">
              <ShoppingCart className="w-5 h-5 text-heading" />
            </Link>
            <Link to="/portal/notifications" className="p-2 rounded-button hover:bg-bg-light relative">
              <Bell className="w-5 h-5 text-heading" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{unreadCount}</span>}
            </Link>
            <Link to="/portal/profile" className="flex items-center gap-2 p-1 pr-3 rounded-button hover:bg-bg-light">
              <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=e63031&color=fff`} alt={user.firstName} className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm font-medium text-heading hidden sm:block">{user.firstName}</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
