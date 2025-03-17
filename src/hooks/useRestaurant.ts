
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantById, fetchMenuItemsByRestaurantId, fetchRestaurantCategories } from "@/services/restaurantService";
import { toast } from "sonner";

export function useRestaurant(id: string | undefined) {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => fetchRestaurantById(id || ''),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    gcTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      errorMessage: "Failed to load restaurant details"
    },
    onSettled: (data, error) => {
      if (error) {
        toast.error("Failed to load restaurant details");
        console.error("Restaurant query error:", error);
      }
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
    gcTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      errorMessage: "Failed to load menu items"
    },
    onSettled: (data, error) => {
      if (error) {
        toast.error("Failed to load menu items");
        console.error("Menu items query error:", error);
      }
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
    gcTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      errorMessage: "Failed to load menu categories"
    },
    onSettled: (data, error) => {
      if (error) {
        toast.error("Failed to load menu categories");
        console.error("Categories query error:", error);
      }
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
    gcTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      errorMessage: `Failed to load ${category} menu items`
    },
    onSettled: (data, error) => {
      if (error) {
        toast.error(`Failed to load ${category} menu items`);
        console.error("Category menu items query error:", error);
      }
    }
  });
}
