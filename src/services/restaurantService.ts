import { supabase } from "@/integrations/supabase/client";
import { Restaurant, MenuItem, MenuItemOption, MenuItemChoice } from "@/data/types";

export async function fetchRestaurantById(id: string): Promise<Restaurant | null> {
  // BUG #1: Not validating UUID format, causing API errors when numeric IDs are used
  // This will cause 400 errors when IDs like "1" are used instead of proper UUIDs
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching restaurant:', error);
    return null;
  }
  
  if (!data) return null;
  
  // Map the database restaurant to our frontend Restaurant type
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    rating: data.rating,
    reviewCount: data.review_count,
    priceRange: data.price_range as '$' | '$$' | '$$$' | '$$$$',
    categories: data.categories,
    imageUrl: data.image_url,
    deliveryTime: data.delivery_time,
    deliveryFee: data.delivery_fee,
    address: data.address,
    distance: data.distance,
    isOpen: data.is_open,
    featured: data.featured
  };
}

export async function fetchMenuItemsByRestaurantId(restaurantId: string): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select(`
      *,
      menu_item_options (
        *,
        menu_item_choices (*)
      )
    `)
    .eq('restaurant_id', restaurantId);
  
  if (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
  
  if (!data || data.length === 0) return [];
  
  // BUG #3: Incorrect mapping of nested options data structure
  // This will cause options to appear incorrectly in the UI
  return data.map(item => {
    // Note: incorrectly mapping the nested options - changed structure
    const options: MenuItemOption[] = item.menu_item_options?.map((option: any) => {
      // Intentionally swapping required and multiple fields to create a bug
      return {
        id: option.id,
        name: option.name,
        choices: [], // Not including choices, causing them to be missing
        required: option.multiple, // SWAPPED on purpose - this is the bug
        multiple: option.required  // SWAPPED on purpose - this is the bug
      };
    }) || [];
    
    return {
      id: item.id,
      restaurantId: item.restaurant_id,
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.image_url,
      category: item.category,
      popular: item.popular,
      options: options.length > 0 ? options : undefined
    };
  });
}

export async function fetchRestaurantCategories(restaurantId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('category')
    .eq('restaurant_id', restaurantId)
    .order('category');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  // Extract unique categories
  const categories = new Set(data?.map(item => item.category) || []);
  return Array.from(categories);
}

export async function fetchCategoryMenuItems(restaurantId: string, category: string): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select(`
      *,
      menu_item_options (
        *,
        menu_item_choices (*)
      )
    `)
    .eq('restaurant_id', restaurantId)
    .eq('category', category);
  
  if (error) {
    console.error('Error fetching category menu items:', error);
    return [];
  }
  
  if (!data || data.length === 0) return [];
  
  // Map the database menu items to our frontend MenuItem type
  return data.map(item => {
    const options: MenuItemOption[] = item.menu_item_options?.map((option: any) => {
      const choices: MenuItemChoice[] = option.menu_item_choices?.map((choice: any) => {
        return {
          id: choice.id,
          name: choice.name,
          price: choice.price
        };
      }) || [];
      
      return {
        id: option.id,
        name: option.name,
        choices,
        required: option.required,
        multiple: option.multiple
      };
    }) || [];
    
    return {
      id: item.id,
      restaurantId: item.restaurant_id,
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.image_url,
      category: item.category,
      popular: item.popular,
      options: options.length > 0 ? options : undefined
    };
  });
}
