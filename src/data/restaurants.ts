
import { Restaurant, MenuItem } from './types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Sakura Sushi',
    description: 'Authentic Japanese sushi and sashimi prepared with the freshest ingredients',
    rating: 4.8,
    reviewCount: 512,
    priceRange: '$$',
    categories: ['Japanese', 'Sushi', 'Asian'],
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    deliveryTime: '25-35 min',
    deliveryFee: '$2.99',
    address: '123 Cherry Blossom Ln',
    distance: '1.2 mi',
    isOpen: true,
    featured: true
  },
  {
    id: '2',
    name: 'Burger Republic',
    description: 'Gourmet burgers made with premium grass-fed beef and artisanal ingredients',
    rating: 4.6,
    reviewCount: 342,
    priceRange: '$$',
    categories: ['American', 'Burgers', 'Fast Food'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    deliveryTime: '15-25 min',
    deliveryFee: '$1.99',
    address: '456 Liberty Ave',
    distance: '0.8 mi',
    isOpen: true
  },
  {
    id: '3',
    name: 'Pasta Paradiso',
    description: 'Authentic Italian cuisine featuring handmade pasta and traditional recipes',
    rating: 4.7,
    reviewCount: 287,
    priceRange: '$$$',
    categories: ['Italian', 'Pasta', 'Mediterranean'],
    imageUrl: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    deliveryTime: '30-40 min',
    deliveryFee: '$3.99',
    address: '789 Roma Street',
    distance: '1.5 mi',
    isOpen: true,
    featured: true
  },
  {
    id: '4',
    name: 'Tandoori Nights',
    description: 'Authentic Indian cuisine featuring tandoori specialties and flavorful curries',
    rating: 4.5,
    reviewCount: 203,
    priceRange: '$$',
    categories: ['Indian', 'Curry', 'Vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356cf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    deliveryTime: '35-45 min',
    deliveryFee: '$2.99',
    address: '321 Spice Road',
    distance: '2.1 mi',
    isOpen: true
  },
  {
    id: '5',
    name: 'Green Garden',
    description: 'Fresh, organic vegetarian and vegan dishes made with locally-sourced ingredients',
    rating: 4.6,
    reviewCount: 178,
    priceRange: '$$',
    categories: ['Vegetarian', 'Vegan', 'Healthy'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    deliveryTime: '20-30 min',
    deliveryFee: '$1.99',
    address: '543 Meadow Lane',
    distance: '1.0 mi',
    isOpen: true
  },
  {
    id: '6',
    name: 'Taco Fiesta',
    description: 'Authentic Mexican tacos, burritos, and quesadillas with house-made salsas',
    rating: 4.4,
    reviewCount: 265,
    priceRange: '$',
    categories: ['Mexican', 'Tacos', 'Latin American'],
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    deliveryTime: '15-25 min',
    deliveryFee: '$1.99',
    address: '678 Fiesta Blvd',
    distance: '0.7 mi',
    isOpen: true
  },
  {
    id: '7',
    name: 'Pho Delight',
    description: 'Vietnamese pho, banh mi, and other authentic dishes made with traditional recipes',
    rating: 4.7,
    reviewCount: 198,
    priceRange: '$$',
    categories: ['Vietnamese', 'Soup', 'Asian'],
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    deliveryTime: '25-35 min',
    deliveryFee: '$2.49',
    address: '901 Saigon Street',
    distance: '1.8 mi',
    isOpen: true,
    featured: true
  },
  {
    id: '8',
    name: 'Mediterranean Grill',
    description: 'Classic Mediterranean dishes including kebabs, falafel, and fresh salads',
    rating: 4.5,
    reviewCount: 167,
    priceRange: '$$',
    categories: ['Mediterranean', 'Greek', 'Middle Eastern'],
    imageUrl: 'https://images.unsplash.com/photo-1544250965-67a8855d82a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    deliveryTime: '30-40 min',
    deliveryFee: '$2.99',
    address: '234 Olive Grove',
    distance: '2.3 mi',
    isOpen: true
  }
];

export const menuItems: { [key: string]: MenuItem[] } = {
  '1': [
    {
      id: '1-1',
      restaurantId: '1',
      name: 'Salmon Nigiri (2 pcs)',
      description: 'Fresh salmon over perfectly seasoned sushi rice',
      price: 6.50,
      imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      category: 'Nigiri',
      popular: true
    },
    {
      id: '1-2',
      restaurantId: '1',
      name: 'California Roll',
      description: 'Crab, avocado, and cucumber roll with toasted sesame seeds',
      price: 7.99,
      imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      category: 'Maki Rolls',
      popular: true
    },
    {
      id: '1-3',
      restaurantId: '1',
      name: 'Spicy Tuna Roll',
      description: 'Spicy tuna, cucumber, and spicy mayo roll',
      price: 8.99,
      imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      category: 'Maki Rolls'
    },
    {
      id: '1-4',
      restaurantId: '1',
      name: 'Dragon Roll',
      description: 'Eel and cucumber roll topped with avocado and eel sauce',
      price: 12.99,
      imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      category: 'Specialty Rolls',
      popular: true
    },
    {
      id: '1-5',
      restaurantId: '1',
      name: 'Tuna Sashimi (5 pcs)',
      description: 'Premium slices of raw tuna',
      price: 10.99,
      imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      category: 'Sashimi'
    },
    {
      id: '1-6',
      restaurantId: '1',
      name: 'Miso Soup',
      description: 'Traditional Japanese soup with tofu, seaweed, and green onions',
      price: 3.99,
      imageUrl: 'https://images.unsplash.com/photo-1607301406259-dfb186e15de8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      category: 'Appetizers'
    }
  ],
  '2': [
    {
      id: '2-1',
      restaurantId: '2',
      name: 'Classic Cheeseburger',
      description: 'Angus beef patty with cheddar cheese, lettuce, tomato, onion, and special sauce',
      price: 10.99,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      category: 'Burgers',
      popular: true,
      options: [
        {
          id: 'patty-temp',
          name: 'Patty Temperature',
          choices: [
            { id: 'medium-rare', name: 'Medium Rare', price: 0 },
            { id: 'medium', name: 'Medium', price: 0 },
            { id: 'medium-well', name: 'Medium Well', price: 0 },
            { id: 'well-done', name: 'Well Done', price: 0 }
          ],
          required: true,
          multiple: false
        },
        {
          id: 'add-ons',
          name: 'Add-ons',
          choices: [
            { id: 'bacon', name: 'Bacon', price: 1.99 },
            { id: 'avocado', name: 'Avocado', price: 1.49 },
            { id: 'extra-cheese', name: 'Extra Cheese', price: 0.99 },
            { id: 'fried-egg', name: 'Fried Egg', price: 1.49 }
          ],
          required: false,
          multiple: true
        }
      ]
    },
    {
      id: '2-2',
      restaurantId: '2',
      name: 'Bacon BBQ Burger',
      description: 'Angus beef patty with cheddar, bacon, onion rings, and BBQ sauce',
      price: 13.99,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      category: 'Burgers',
      popular: true
    },
    {
      id: '2-3',
      restaurantId: '2',
      name: 'Truffle Fries',
      description: 'Crispy fries tossed in truffle oil and parmesan cheese',
      price: 6.99,
      imageUrl: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      category: 'Sides'
    }
  ],
  // Add more menu items for other restaurants as needed
};

export const getCategoryMenuItems = (restaurantId: string, category: string): MenuItem[] => {
  const items = menuItems[restaurantId] || [];
  return items.filter(item => item.category === category);
};

export const getRestaurantCategories = (restaurantId: string): string[] => {
  const items = menuItems[restaurantId] || [];
  const categories = new Set(items.map(item => item.category));
  return Array.from(categories);
};

export const getPopularItems = (restaurantId: string): MenuItem[] => {
  const items = menuItems[restaurantId] || [];
  return items.filter(item => item.popular);
};

export const getMenuItem = (restaurantId: string, menuItemId: string): MenuItem | undefined => {
  const items = menuItems[restaurantId] || [];
  return items.find(item => item.id === menuItemId);
};
