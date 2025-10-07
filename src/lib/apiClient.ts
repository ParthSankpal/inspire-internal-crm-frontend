import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { allowClientIdByPass } from "./utils";
import { removeCookie } from "./cookies";
import { clearUser } from "@/features/auth/authSlice";
import { store } from "@/store/store";
import { API_BASE_URL } from "./env";

const publicPages = [
  "/",
  "/login",
  "/privacy-policy",
  "/terms-conditions",
  "/signup",
  "/onboarding",
];


console.log(API_BASE_URL);

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const addAuthHeaderToAxios = (authHeader: string | null) => {
 
  if (authHeader) {
    axiosClient.defaults.headers.common["Authorization"] = authHeader;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
};

// ✅ FIXED: use InternalAxiosRequestConfig
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    try {
      if (typeof window !== "undefined") {
        const clientRequestURL = window.location.href.split("#")[0];
        
        // ✅ Set custom header properly
        config.headers.set("client_request_url", clientRequestURL);

        if (!allowClientIdByPass(window.location.origin)) {
          config.params = {
            ...config.params,
            client_id: undefined,
          };
        }
      }
    } catch (err) {
      console.error("❌ Error in Axios request interceptor:", err);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);


axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      console.warn("⚠️ Unauthorized, clearing session…");

      // clear cookies + redux state
      removeCookie("jwt");
      removeCookie("user");
      store.dispatch(clearUser());

      const currentPath = window.location.pathname;

      // if current path is protected → send to login
      if (!publicPages.includes(currentPath)) {
        window.location.href = "/login"; // or "/" if you prefer
      }
    }
    return Promise.reject(error);
  }
);

export { axiosClient };
