"use client";
import Cookies from "js-cookie";

// ✅ Fixed cookie options (always applied)
const DEFAULT_COOKIE_OPTIONS = {
  expires: 7, // 7 days
  sameSite: "Strict" as const,
  secure: process.env.NODE_ENV === "production",
};

/**
 * Get a cookie value
 */
export const getCookie = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  return Cookies.get(key) ?? null;
};

/**
 * Set a cookie with default fixed options
 */
export const setCookie = (
  key: string,
  value: string,
  customOptions?: Partial<typeof DEFAULT_COOKIE_OPTIONS>
): void => {
  if (typeof window === "undefined") return;
  Cookies.set(key, value, { ...DEFAULT_COOKIE_OPTIONS, ...customOptions });
};

/**
 * Remove a cookie by key or all cookies if key not provided
 */
export const removeCookie = (key?: string): void => {
  if (typeof window === "undefined") return;

  if (key) {
    Cookies.remove(key, { ...DEFAULT_COOKIE_OPTIONS });
  } else {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName, { ...DEFAULT_COOKIE_OPTIONS });
    });
  }
};
