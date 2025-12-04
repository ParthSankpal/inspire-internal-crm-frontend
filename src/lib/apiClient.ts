"use client";

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { allowClientIdByPass } from "./utils";
import { API_BASE_URL } from "./env";

// const publicPages = [
//   "/",
//   "/login",
//   "/privacy-policy",
//   "/terms-conditions",
//   "/signup",
//   "/onboarding",
// ];

// ✅ Create a configured Axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/**
 * ✅ Dynamically add or remove the Authorization header
 */
export const addAuthHeaderToAxios = (authHeader: string | null) => {
  if (authHeader) {
    axiosClient.defaults.headers.common["Authorization"] = authHeader;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
};

// ✅ Request Interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    try {
      if (typeof window !== "undefined") {
        const clientRequestURL = window.location.href.split("#")[0];
        config.headers.set("client_request_url", clientRequestURL);

        if (!allowClientIdByPass(window.location.origin)) {
          config.params = {
            ...config.params,
            client_id: undefined,
          };
        }
      }

      // 🧩 Diagnostic log for debugging outgoing requests
      const authHeader =
        config.headers?.Authorization || config.headers?.authorization;
      console.log(
        "%c[Axios → Request]",
        "color:#3b82f6; font-weight:bold;",
        // "\nURL:", config.baseURL + config.url,
        "\nMethod:", config.method?.toUpperCase(),
        "\nAuthorization Header:",
        authHeader ? authHeader.slice(0, 40) + "..." : "❌ Missing"
      );
    } catch (err) {
      console.error("❌ Error in Axios request interceptor:", err);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ✅ Response Interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // 🧩 Log successful responses (useful for debugging)
    if (typeof window !== "undefined") {
      console.log(
        "%c[Axios ← Response]",
        "color:#22c55e; font-weight:bold;",
        "\nStatus:", response.status,
        "\nURL:", response.config.url
      );
    }
    return response;
  },
  // (error: AxiosError) => {
  //   if (typeof window !== "undefined") {
  //     const status = error.response?.status;
  //     const url = error.config?.url;
  //     const message = error.response?.data?.message;

  //     console.error(
  //       "%c[Axios ← Error]",
  //       "color:#ef4444; font-weight:bold;",
  //       "\nStatus:", status,
  //       "\nURL:", url,
  //       "\nMessage:", message
  //     );

  //     // 🚨 Handle unauthorized access gracefully
  //     if (status === 401) {
  //       console.warn("⚠️ Unauthorized, clearing session…");

  //       // Clear cookies + redux state
  //       removeCookie("jwt");
  //       removeCookie("user");
  //       store.dispatch(clearUser());

  //       const currentPath = window.location.pathname;
  //       if (!publicPages.includes(currentPath)) {
  //         window.location.href = "/login"; // or "/" if you prefer
  //       }
  //     }
  //   }
  //   return Promise.reject(error);
  // }
);

export { axiosClient };
