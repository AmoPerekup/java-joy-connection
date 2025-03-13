
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, Menu, X, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out py-3 px-4 md:px-6",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/70 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-coffee-700">
            <Coffee className="h-6 w-6" />
            <span className="font-semibold text-lg hidden md:block">Brew CRM</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1 flex-1 max-w-sm mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-secondary/50 border-none focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[62px] z-30 bg-background animate-fade-in md:hidden">
          <div className="flex flex-col p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10"
              />
            </div>
            <nav className="flex flex-col space-y-1">
              <MobileNavLink to="/" label="Dashboard" active={location.pathname === '/'} />
              <MobileNavLink to="/customers" label="Customers" active={location.pathname.startsWith('/customers')} />
              <MobileNavLink to="/suppliers" label="Suppliers" active={location.pathname.startsWith('/suppliers')} />
              <MobileNavLink to="/orders" label="Orders" active={location.pathname.startsWith('/orders')} />
              <MobileNavLink to="/utilities" label="Utilities" active={location.pathname.startsWith('/utilities')} />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

const MobileNavLink = ({ to, label, active }: { to: string; label: string; active: boolean }) => (
  <Link
    to={to}
    className={cn(
      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
      active 
        ? "bg-secondary text-foreground" 
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    )}
  >
    {label}
  </Link>
);

export default Header;
