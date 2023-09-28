import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRedirectError(error: any) {
  return error instanceof Error && error.message === "NEXT_REDIRECT";
}

export function capitalize(str: string) {
  return str.charAt(0) + str.slice(1).toLowerCase();
}
