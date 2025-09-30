import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const allowClientIdByPass = (origin: string): boolean => {
  // implement your whitelist logic
  return origin.includes("localhost"); // example
};
