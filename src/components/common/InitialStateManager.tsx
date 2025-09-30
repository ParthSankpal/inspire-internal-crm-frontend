"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "@/lib/cookies";
import { addAuthHeaderToAxios } from "@/lib/apiClient";
import { setUser } from "@/features/auth/authSlice";
import { getCurrentUser } from "@/api/authApi";
import { RootState } from "@/store/store";

const publicPages = [
  "/",
  "/privacy-policy",
  "/terms-conditions",
  "/signup",
  "/onboarding",
  "/login", 
];

const entryPages = ["/", "/login", "/signup"]; // pages we want logged-in users redirected away from

const InitialStateManager = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const [checked, setChecked] = useState(false);

  // ensure init runs only once (prevents re-running when pathname/user changes)
  const initializedRef = useRef(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Fast local check first
        const jwt = getCookie("jwt");
        const storedUser = getCookie("user");

        if (jwt) {
          // Make sure axios has auth header for the API call if we have a token
          addAuthHeaderToAxios(`Bearer ${jwt}`);
        }

        // If Redux already has user, we're done initializing
        if (user) {
          setChecked(true);
          return;
        }

        // If cookies exist, hydrate Redux quickly and skip API call
        if (jwt && storedUser) {
          dispatch(setUser({ user: JSON.parse(storedUser), token: jwt }));
          setChecked(true);
          return;
        }

        // Only hit backend if we're on a protected route (avoids unnecessary 401 redirect loops)
        if (!publicPages.includes(pathname)) {
          try {
            const data = await getCurrentUser(); // expected { user, token }
            if (data?.user) {
              dispatch(setUser({ user: data.user, token: data.token }));
            }
          } catch (err) {
            // API call failed — we'll handle redirect after init
            console.warn("getUser failed:", err);
          }
        }
      } catch (err) {
        console.warn("Auth init error:", err);
      } finally {
        setChecked(true);
      }
    };

    if (!initializedRef.current) {
      initializedRef.current = true;
      init();
    }
    // intentionally include pathname/user in deps only to satisfy possible linter/runtime; guarded by initializedRef
  }, [dispatch, pathname, user]);

  // Redirect handling AFTER initial auth check completes
  useEffect(() => {
    if (!checked) return;

    if (user) {
      // If logged in and on entry pages, send to dashboard
      if (entryPages.includes(pathname)) {
        router.push("/dashboard");
      }
      // If logged in and on other pages (like privacy/terms), leave them alone
    } else {
      // Not logged in: if on a protected page, redirect to root/login
      if (!publicPages.includes(pathname)) {
        router.push("/"); // or "/login" if that's your desired login route
      }
    }
  }, [checked, user, pathname, router]);

  // While initialization is in progress, show a small loader placeholder (avoids blank flashes)
  if (!checked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Checking session...</p>
      </div>
    );
  }

  return null;
};

export default InitialStateManager;
