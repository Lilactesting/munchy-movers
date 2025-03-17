
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Restaurant } from '@/data/types';
import { Card } from '@/components/ui/card';
import { Star, Clock, ImageOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
  featured?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, featured }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image for restaurant: ${restaurant.name}`);
  };

  return (
    <Link 
      to={`/restaurant/${restaurant.id}`}
      className="block group"
    >
      <Card 
        className={`overflow-hidden transition-all duration-300 h-full ${
          featured 
            ? 'hover:shadow-xl hover:-translate-y-1'
            : 'hover:shadow-md hover:-translate-y-0.5'
        }`}
      >
        <div className="relative">
          {!imageError ? (
            <img 
              src={restaurant.imageUrl} 
              alt={restaurant.name}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-slate-100 text-slate-400">
              <ImageOff size={32} />
            </div>
          )}
          
          {restaurant.isOpen ? (
            <Badge variant="secondary" className="absolute top-3 left-3">
              Open
            </Badge>
          ) : (
            <Badge variant="outline" className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
              Closed
            </Badge>
          )}
          
          {restaurant.featured && (
            <Badge variant="default" className="absolute top-3 right-3 bg-primary">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center text-amber-500">
              <Star size={16} className="fill-current" />
              <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {restaurant.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {restaurant.categories.slice(0, 3).map((category, index) => (
              <Badge key={index} variant="outline" className="bg-secondary/50">
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {restaurant.deliveryTime}
            </div>
            <div className="flex items-center">
              <span>{restaurant.priceRange}</span>
              <span className="mx-2">•</span> 
              <span>{restaurant.distance}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
