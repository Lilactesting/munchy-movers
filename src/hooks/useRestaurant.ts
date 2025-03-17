
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantById, fetchMenuItemsByRestaurantId, fetchRestaurantCategories } from "@/services/restaurantService";
import { Restaurant, MenuItem } from "@/data/types";

export function useRestaurant(id: string | undefined) {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => fetchRestaurantById(id || ''),
    enabled: !!id,
  });
}

export function useMenuItems(restaurantId: string | undefined) {
  return useQuery({
    queryKey: ['menuItems', restaurantId],
    queryFn: () => fetchMenuItemsByRestaurantId(restaurantId || ''),
    enabled: !!restaurantId,
  });
}

export function useRestaurantCategories(restaurantId: string | undefined) {
  return useQuery({
    queryKey: ['restaurantCategories', restaurantId],
    queryFn: () => fetchRestaurantCategories(restaurantId || ''),
    enabled: !!restaurantId,
  });
}

export function useCategoryMenuItems(restaurantId: string | undefined, category: string) {
  return useQuery({
    queryKey: ['categoryMenuItems', restaurantId, category],
    queryFn: () => import('@/services/restaurantService')
      .then(module => module.fetchCategoryMenuItems(restaurantId || '', category)),
    enabled: !!restaurantId && !!category,
  });
}
