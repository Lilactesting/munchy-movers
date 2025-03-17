
import React from 'react';
import { MenuItem } from '@/data/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';

interface MenuItemCardProps {
  menuItem: MenuItem;
  compact?: boolean;
  onClick?: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ menuItem, compact = false, onClick }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(menuItem, 1);
  };
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer group ${
        compact ? '' : 'hover:-translate-y-0.5'
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row">
        <div className={`${compact ? 'md:w-20 md:h-20' : 'md:w-40 md:h-auto'} relative`}>
          <img 
            src={menuItem.imageUrl} 
            alt={menuItem.name}
            className={`w-full ${compact ? 'h-32 md:h-20' : 'h-48 md:h-full'} object-cover transition-transform duration-500 group-hover:scale-105`}
          />
          
          {menuItem.popular && (
            <Badge variant="default" className="absolute top-2 left-2 bg-primary">
              Popular
            </Badge>
          )}
        </div>
        
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-medium text-base md:text-lg group-hover:text-primary transition-colors">
              {menuItem.name}
            </h3>
            
            {!compact && (
              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                {menuItem.description}
              </p>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="font-medium">
              {formatCurrency(menuItem.price)}
            </div>
            
            <Button 
              size="sm" 
              variant="ghost"
              className="rounded-full p-0 w-8 h-8 text-primary hover:text-primary-foreground hover:bg-primary"
              onClick={handleAddToCart}
            >
              <PlusCircle size={20} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;
