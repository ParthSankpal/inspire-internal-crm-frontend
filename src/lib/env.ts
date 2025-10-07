export const API_BASE_URL =process.env.NEXT_PUBLIC_ENV === "development" ? 
  process.env.NEXT_LOCAL_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
