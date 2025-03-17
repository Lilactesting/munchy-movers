
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const { cartCount } = useCart();
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
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/"
            className="text-2xl font-bold text-primary transition-all hover:opacity-80"
          >
            Munchy<span className="text-foreground">Movers</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-1">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <MapPin size={20} />
          </button>
          <span className="text-sm font-medium">New York, NY</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Search size={20} />
          </Link>
          <Link to="/account" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <User size={20} />
          </Link>
          <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
        
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="relative p-2 mr-2 text-muted-foreground">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md animate-slide-in-up p-4">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="p-2 hover:bg-muted rounded-md transition-colors">Home</Link>
            <Link to="/search" className="p-2 hover:bg-muted rounded-md transition-colors flex items-center">
              <Search size={18} className="mr-2" />
              Search
            </Link>
            <Link to="/account" className="p-2 hover:bg-muted rounded-md transition-colors flex items-center">
              <User size={18} className="mr-2" />
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
