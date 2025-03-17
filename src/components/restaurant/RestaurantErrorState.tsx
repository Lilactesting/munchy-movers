
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface RestaurantErrorStateProps {
  message?: string;
}

const RestaurantErrorState: React.FC<RestaurantErrorStateProps> = ({ 
  message = "We couldn't load the restaurant information. Please try again."
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
      <AlertTriangle size={48} className="text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      <div className="space-x-4">
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
        <Link to="/">
          <Button>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantErrorState;
