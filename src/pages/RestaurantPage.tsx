
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, DollarSign, MapPin, ChevronRight, Percent, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuItemCard from '@/components/restaurant/MenuItemCard';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { 
  restaurants, 
  menuItems, 
  getRestaurantCategories,
  getCategoryMenuItems 
} from '@/data/restaurants';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MenuItem } from '@/data/types';

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState(restaurants.find(r => r.id === id));
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [categoryItems, setCategoryItems] = useState<MenuItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const { addToCart } = useCart();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const foundRestaurant = restaurants.find(r => r.id === id);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        
        const cats = getRestaurantCategories(id);
        setCategories(cats);
        
        if (cats.length > 0) {
          setActiveCategory(cats[0]);
          setCategoryItems(getCategoryMenuItems(id, cats[0]));
        }
      }
    }
    
    const handleScroll = () => {
      setIsHeaderVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCategoryItems(getCategoryMenuItems(id || '', category));
  };
  
  const openItemDialog = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setItemQuantity(1);
    setSpecialInstructions('');
  };
  
  const closeItemDialog = () => {
    setSelectedMenuItem(null);
  };
  
  const handleAddToCart = () => {
    if (selectedMenuItem) {
      addToCart(
        selectedMenuItem,
        itemQuantity,
        undefined, // No options selected for now
        specialInstructions.trim() || undefined
      );
      closeItemDialog();
    }
  };
  
  if (!restaurant) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Restaurant not found</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Floating header on scroll */}
      <div 
        className={`fixed top-16 inset-x-0 bg-white/90 backdrop-blur-md z-30 transition-all duration-300 border-b ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h2 className="font-bold text-lg truncate">{restaurant.name}</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star size={16} className="text-amber-500 fill-current" />
              <span className="ml-1 font-medium">{restaurant.rating}</span>
            </div>
            <div className="text-sm text-muted-foreground">{restaurant.deliveryTime}</div>
          </div>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="h-64 md:h-80 w-full relative mt-16">
        <img 
          src={restaurant.imageUrl} 
          alt={restaurant.name}
          className="w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      {/* Restaurant Info */}
      <div className="container mx-auto px-4 py-6 animate-slide-in-up">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-muted-foreground mb-4">{restaurant.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-2">
              <div className="flex items-center">
                <Star size={16} className="text-amber-500 fill-current" />
                <span className="ml-1 font-medium">{restaurant.rating}</span>
                <span className="ml-1 text-muted-foreground">({restaurant.reviewCount}+ ratings)</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <Clock size={16} className="mr-1" />
                {restaurant.deliveryTime}
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <DollarSign size={16} className="mr-1" />
                {restaurant.priceRange}
              </div>
            </div>
            
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin size={16} className="mr-1" />
              {restaurant.address} • {restaurant.distance}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {restaurant.categories.map((category, index) => (
                <Badge key={index} variant="outline" className="bg-secondary/50">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 space-y-3">
            <div className="flex items-center bg-green-100 text-green-800 p-3 rounded-md">
              <Percent size={18} className="mr-2" />
              <div>
                <p className="font-medium">20% off your first order</p>
                <p className="text-sm">Use code: WELCOME20</p>
              </div>
            </div>
            
            <div className="flex items-center bg-blue-100 text-blue-800 p-3 rounded-md">
              <Tag size={18} className="mr-2" />
              <div>
                <p className="font-medium">Free delivery on orders over $15</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <Tabs defaultValue={categories[0]} value={activeCategory} onValueChange={handleCategoryChange}>
          <div className="sticky top-16 bg-white/90 backdrop-blur-md z-10 pt-2 pb-4 border-b">
            <TabsList className="w-full overflow-x-auto overflow-y-hidden flex justify-start h-10 bg-transparent space-x-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-4 flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground animation-delay-200"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent 
              key={category} 
              value={category}
              className="mt-6 animate-fade-in animation-delay-400"
            >
              <div className="space-y-4">
                {getCategoryMenuItems(id || '', category).map((menuItem) => (
                  <div key={menuItem.id} className="animate-slide-in-up">
                    <MenuItemCard 
                      menuItem={menuItem} 
                      onClick={() => openItemDialog(menuItem)}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Item Dialog */}
      <Dialog open={selectedMenuItem !== null} onOpenChange={(open) => !open && closeItemDialog()}>
        <DialogContent className="sm:max-w-lg">
          {selectedMenuItem && (
            <>
              <div className="relative h-48 -mt-6 -mx-6 mb-4">
                <img 
                  src={selectedMenuItem.imageUrl} 
                  alt={selectedMenuItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedMenuItem.name}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedMenuItem.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <p className="font-medium mb-4">{formatCurrency(selectedMenuItem.price)}</p>
                
                {/* Quantity selector */}
                <div className="flex items-center justify-between mb-6">
                  <p className="font-medium">Quantity</p>
                  <div className="flex items-center border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 rounded-r-none"
                      onClick={() => itemQuantity > 1 && setItemQuantity(itemQuantity - 1)}
                    >
                      -
                    </Button>
                    <div className="w-8 text-center">{itemQuantity}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 rounded-l-none"
                      onClick={() => setItemQuantity(itemQuantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                {/* Special instructions */}
                <div className="mb-6">
                  <p className="font-medium mb-2">Special instructions</p>
                  <textarea 
                    className="w-full border rounded-md p-2 text-sm"
                    placeholder="Any special requests, allergies, etc."
                    rows={3}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  Total: {formatCurrency(selectedMenuItem.price * itemQuantity)}
                </p>
                <Button onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default RestaurantPage;
