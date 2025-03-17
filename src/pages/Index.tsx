
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { restaurants } from '@/data/restaurants';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const featuredRestaurants = restaurants.filter(r => r.featured);
const topRatedRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 4);
const categories = [
  {
    name: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    name: 'Italian',
    image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    name: 'Asian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356cf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    name: 'Healthy',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    name: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 md:pt-32 px-4 relative overflow-hidden">
        <div 
          className={`container mx-auto flex flex-col items-center transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fade-in">
              Delicious food, <span className="text-primary">delivered fast</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6 md:mb-10 animate-fade-in animation-delay-200">
              Order from your favorite restaurants and have your meal delivered to your door in minutes.
            </p>
            
            <form 
              onSubmit={handleSearch}
              className="flex w-full max-w-xl mx-auto animate-fade-in animation-delay-400"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input 
                  type="text"
                  placeholder="Search for food or restaurants"
                  className="pl-10 pr-4 py-6 rounded-l-md w-full transition-all border border-r-0 focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="rounded-l-none">
                <Search size={20} className="mr-2" />
                Search
              </Button>
            </form>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full max-w-6xl mx-auto animate-fade-in animation-delay-400">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={`/search?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <div className="relative rounded-full overflow-hidden w-20 h-20 md:w-24 md:h-24 mx-auto mb-2">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <p className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Restaurants */}
      <section className="py-12 md:py-16 px-4 animate-fade-in animation-delay-400">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Restaurants</h2>
            <Link 
              to="/search" 
              className="flex items-center text-primary hover:underline text-sm font-medium"
            >
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="animate-slide-in-up" style={{animationDelay: `${featuredRestaurants.indexOf(restaurant) * 100}ms`}}>
                <RestaurantCard restaurant={restaurant} featured />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Top Rated */}
      <section className="py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Top Rated</h2>
            <Link 
              to="/search?sort=rating" 
              className="flex items-center text-primary hover:underline text-sm font-medium"
            >
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="animate-slide-in-up" style={{animationDelay: `${topRatedRestaurants.indexOf(restaurant) * 100}ms`}}>
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse</h3>
              <p className="text-muted-foreground">
                Find what you're craving from our selection of top-rated restaurants.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center animate-fade-in animation-delay-200">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 2H2v10h10V2z"></path>
                  <path d="M12 12h10v10H12V12z"></path>
                  <path d="M12 22v-9"></path>
                  <path d="M12 13V2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Order</h3>
              <p className="text-muted-foreground">
                Customize your meal and place your order with just a few taps.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center animate-fade-in animation-delay-400">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M19 11V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4.5"></path>
                  <rect x="7" y="9" width="10" height="2"></rect>
                  <path d="M7 14h5"></path>
                  <path d="M17 19l-3.5-3.5a1 1 0 0 1 0-1.4L20 7.5a2 2 0 0 1 3 3L16.4 17a1 1 0 0 1-1.4 0L12 14"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
              <p className="text-muted-foreground">
                Track your order in real-time as we bring it straight to your door.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link to="/search">
                Order Now <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
