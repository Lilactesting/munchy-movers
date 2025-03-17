
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantById, fetchMenuItemsByRestaurantId, fetchRestaurantCategories } from "@/services/restaurantService";

// BUG #2: Missing error handling in React Query hooks
// This will cause the UI to show loading indefinitely on error with no user feedback
export function useRestaurant(id: string | undefined) {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => fetchRestaurantById(id || ''),
    enabled: !!id,
    // Missing retry, error handling, and staleTime config
  });
}

export function useMenuItems(restaurantId: string | undefined) {
  return useQuery({
    queryKey: ['menuItems', restaurantId],
    queryFn: () => fetchMenuItemsByRestaurantId(restaurantId || ''),
    enabled: !!restaurantId,
    // Missing retry, error handling, and staleTime config
  });
}

export function useRestaurantCategories(restaurantId: string | undefined) {
  return useQuery({
    queryKey: ['restaurantCategories', restaurantId],
    queryFn: () => fetchRestaurantCategories(restaurantId || ''),
    enabled: !!restaurantId,
    // Missing retry, error handling, and staleTime config
  });
}

export function useCategoryMenuItems(restaurantId: string | undefined, category: string) {
  return useQuery({
    queryKey: ['categoryMenuItems', restaurantId, category],
    queryFn: () => import('@/services/restaurantService')
      .then(module => module.fetchCategoryMenuItems(restaurantId || '', category)),
    enabled: !!restaurantId && !!category,
    // Missing retry, error handling, and staleTime config
  });
}
