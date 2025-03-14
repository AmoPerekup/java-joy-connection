
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Coffee, Users, Truck, ShoppingCart, FileText, Utensils } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-[220px] pt-16 hidden md:block bg-white border-r border-border z-30">
      <div className="px-3 py-8 flex flex-col h-full">
        <div className="mb-8 px-3">
          <h2 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
            Main
          </h2>
          <nav className="space-y-1">
            <NavItem to="/" icon={<Coffee className="h-4 w-4" />} label="Dashboard" />
            <NavItem to="/customers" icon={<Users className="h-4 w-4" />} label="Customers" />
            <NavItem to="/suppliers" icon={<Truck className="h-4 w-4" />} label="Suppliers" />
            <NavItem to="/orders" icon={<ShoppingCart className="h-4 w-4" />} label="Orders" />
            <NavItem to="/menu" icon={<Utensils className="h-4 w-4" />} label="Menu" />
            <NavItem to="/utilities" icon={<FileText className="h-4 w-4" />} label="Utilities" />
          </nav>
        </div>
        
        <div className="mt-auto pt-6 border-t border-border">
          <div className="glassmorphism rounded-lg px-3 py-4 mx-2">
            <h3 className="font-medium text-sm mb-1">Need help?</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Contact support for assistance with your CRM system.
            </p>
            <a 
              href="#" 
              className="text-xs text-coffee-500 hover:text-coffee-600 font-medium inline-block"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group",
      isActive 
        ? "text-coffee-600 bg-coffee-100" 
        : "text-muted-foreground hover:text-coffee-600 hover:bg-secondary"
    )}
  >
    {({ isActive }) => (
      <>
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-coffee-500 rounded-full" />
        )}
        <span className="text-coffee-600 opacity-80">{icon}</span>
        {label}
      </>
    )}
  </NavLink>
);

export default Sidebar;
