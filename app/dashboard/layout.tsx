"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Cookies from "js-cookie";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { setAuthorizationToken } from "@/helper";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/dashboardSidebar";
import DashboardHeader from "@/components/dashboard/dashboardHeader";
import LoadingSpinner from "@/components/loadingSpinner";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { userAPI } from "@/endpoints/userAPI";
import { setIsAuthenticated, userRequest } from "@/features/userSlice";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const tokenName = process.env.NEXT_PUBLIC_COOKIE as string;
  const refreshTokenName = process.env.NEXT_PUBLIC_REFRESH_COOKIE as string;
  const token = Cookies.get(tokenName);
  const dispatch: AppDispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.login.userDetails);
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );

  // Ref to track if a refresh is already in progress
  const refreshInProgress = useRef(false);

  // Utility to check if token is valid
  const isTokenExpired = (decodedToken: JwtPayload) => {
    const expiresIn = decodedToken.exp ? decodedToken.exp * 1000 : 0;
    return expiresIn <= Date.now();
  };

  // Function to refresh tokens if expired
  const refreshTokens = async () => {
    // Prevent multiple refresh requests
    if (refreshInProgress.current) return;

    refreshInProgress.current = true; // Mark refresh in progress

    const refreshToken = Cookies.get(refreshTokenName);
    if (!refreshToken) {
      handleLogout();
      refreshInProgress.current = false;
      return;
    }

    try {
      const { accessToken, refreshToken: newRefreshToken } =
        await userAPI.fetchNewTokens({ rf_token: refreshToken });
      // Save new tokens in cookies
      Cookies.set(tokenName, accessToken, { expires: 1 });
      Cookies.set(refreshTokenName, newRefreshToken, {
        expires: 30,
      });
      // Update Authorization header
      setAuthorizationToken(accessToken);
      // Dispatch authenticated action
      dispatch(setIsAuthenticated(true));
      // Optionally, you can make a request for user data after refreshing the tokens.
      if (!Object.keys(loggedUser).length) {
        dispatch(userRequest());
      }
    } catch (error) {
      console.error("Failed to refresh tokens", error);
      handleLogout();
    } finally {
      refreshInProgress.current = false; // Reset the refresh in progress flag
    }
  };

  // Handle logout and reset state
  const handleLogout = useCallback(() => {
    Cookies.remove(tokenName);
    Cookies.remove(refreshTokenName);
    setAuthorizationToken("");
    dispatch(setIsAuthenticated(false));
    router.push("/");
  }, [dispatch, router, tokenName, refreshTokenName]);

  // Effect to check token validity on mount or when token changes
  useEffect(() => {
    // If there's no token, log out
    if (!token) {
      handleLogout();
      return;
    }
    // Decode the token and check expiration
    const decodedToken = jwtDecode<JwtPayload>(token);
    // If the token is expired, attempt to refresh it
    if (isTokenExpired(decodedToken)) {
      refreshTokens();
    } else {
      // If token is valid, set the Authorization header and user authenticated state
      setAuthorizationToken(token);
      dispatch(setIsAuthenticated(true));
      // Optionally fetch user details if needed
      if (!Object.keys(loggedUser).length) {
        dispatch(userRequest());
      }
    }
  }, [token, dispatch, loggedUser, handleLogout, refreshTokens]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="lg:pl-64 flex flex-col flex-1">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
