import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidToken = (token: string | null): boolean => {
  if (!token) return false;
  return token === process.env.REVALIDATE_SECRET_TOKEN;
};
