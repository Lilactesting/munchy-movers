
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantById, fetchMenuItemsByRestaurantId, fetchRestaurantCategories } from "@/services/restaurantService";
import { toast } from "sonner";

// Fix BUG #2: Add proper error handling in React Query hooks
export function useRestaurant(id: string | undefined) {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => fetchRestaurantById(id || ''),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    onError: (error) => {
      toast.error("Failed to load restaurant details");
      console.error("Restaurant query error:", error);
    }
  });
}

export function useMenuItems(restaurantId: string | undefined) {
  return useQuery({
    queryKey: ['menuItems', restaurantId],
    queryFn: () => fetchMenuItemsByRestaurantId(restaurantId || ''),
    enabled: !!restaurantId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    onError: (error) => {
      toast.error("Failed to load menu items");
      console.error("Menu items query error:", error);
    }
  });
}

export function useRestaurantCategories(restaurantId: string | undefined) {
  return useQuery({
    queryKey: ['restaurantCategories', restaurantId],
    queryFn: () => fetchRestaurantCategories(restaurantId || ''),
    enabled: !!restaurantId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    onError: (error) => {
      toast.error("Failed to load menu categories");
      console.error("Categories query error:", error);
    }
  });
}

export function useCategoryMenuItems(restaurantId: string | undefined, category: string) {
  return useQuery({
    queryKey: ['categoryMenuItems', restaurantId, category],
    queryFn: () => import('@/services/restaurantService')
      .then(module => module.fetchCategoryMenuItems(restaurantId || '', category)),
    enabled: !!restaurantId && !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    onError: (error) => {
      toast.error(`Failed to load ${category} menu items`);
      console.error("Category menu items query error:", error);
    }
  });
}
