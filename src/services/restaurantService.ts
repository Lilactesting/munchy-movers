
import { supabase } from "@/integrations/supabase/client";
import { Restaurant, MenuItem, MenuItemOption, MenuItemChoice } from "@/data/types";

export async function fetchRestaurantById(id: string): Promise<Restaurant | null> {
  // Fix BUG #1: Add UUID format validation
  // Check if the ID is a valid UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isValidUuid = uuidRegex.test(id);
  
  // For numeric IDs, convert to a valid UUID format (for demo purposes)
  // In a real app, you might want to handle this differently
  const queryId = isValidUuid ? id : '00000000-0000-0000-0000-00000000000' + id;
  
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', queryId)
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
  // Fix BUG #1: Add UUID format validation for consistency
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isValidUuid = uuidRegex.test(restaurantId);
  const queryId = isValidUuid ? restaurantId : '00000000-0000-0000-0000-00000000000' + restaurantId;
  
  const { data, error } = await supabase
    .from('menu_items')
    .select(`
      *,
      menu_item_options (
        *,
        menu_item_choices (*)
      )
    `)
    .eq('restaurant_id', queryId);
  
  if (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
  
  if (!data || data.length === 0) return [];
  
  // Fix BUG #3: Correct the mapping of nested options data structure
  return data.map(item => {
    const options: MenuItemOption[] = item.menu_item_options?.map((option: any) => {
      // Fix the choices mapping
      const choices: MenuItemChoice[] = option.menu_item_choices?.map((choice: any) => {
        return {
          id: choice.id,
          name: choice.name,
          price: choice.price
        };
      }) || [];
      
      // Fix the swapped required and multiple fields
      return {
        id: option.id,
        name: option.name,
        choices,
        required: option.required, // Fixed - was swapped
        multiple: option.multiple  // Fixed - was swapped
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
  // Fix BUG #1: Add UUID format validation for consistency
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isValidUuid = uuidRegex.test(restaurantId);
  const queryId = isValidUuid ? restaurantId : '00000000-0000-0000-0000-00000000000' + restaurantId;
  
  const { data, error } = await supabase
    .from('menu_items')
    .select('category')
    .eq('restaurant_id', queryId)
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
  // Fix BUG #1: Add UUID format validation for consistency
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isValidUuid = uuidRegex.test(restaurantId);
  const queryId = isValidUuid ? restaurantId : '00000000-0000-0000-0000-00000000000' + restaurantId;
  
  const { data, error } = await supabase
    .from('menu_items')
    .select(`
      *,
      menu_item_options (
        *,
        menu_item_choices (*)
      )
    `)
    .eq('restaurant_id', queryId)
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
