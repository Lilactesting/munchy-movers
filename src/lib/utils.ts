
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural || `${singular}s`);
}

export function calculateDeliveryFee(distance: number): number {
  const baseFee = 2.99;
  const additionalFeePerMile = 0.50;
  
  // For distances over 1 mile, add additional fee per mile
  if (distance <= 1) {
    return baseFee;
  }
  
  const additionalDistance = distance - 1;
  return baseFee + (additionalFeePerMile * additionalDistance);
}

export function calculateTax(subtotal: number): number {
  const taxRate = 0.0825; // 8.25% tax rate
  return subtotal * taxRate;
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
