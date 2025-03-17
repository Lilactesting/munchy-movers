
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  categories: string[];
  imageUrl: string;
  deliveryTime: string;
  deliveryFee: string;
  address: string;
  distance: string;
  isOpen: boolean;
  featured?: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  popular?: boolean;
  options?: MenuItemOption[];
}

export interface MenuItemOption {
  id: string;
  name: string;
  choices: MenuItemChoice[];
  required: boolean;
  multiple: boolean;
}

export interface MenuItemChoice {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  selectedChoices?: { [optionId: string]: string[] };
}

export interface Order {
  id: string;
  items: CartItem[];
  restaurantId: string;
  restaurantName: string;
  status: 'placed' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered';
  createdAt: Date;
  estimatedDeliveryTime: Date;
  deliveryAddress: string;
  deliveryInstructions?: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: string;
}
