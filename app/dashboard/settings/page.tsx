"use client";

import type React from "react";
import { JSX, useState } from "react";
import { userAPI } from "@/endpoints/userAPI";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { setAuthorizationToken } from "@/helper";
import { setIsAuthenticated } from "@/features/userSlice";

export default function SettingsPage(): JSX.Element {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const tokenName = process.env.NEXT_PUBLIC_COOKIE as string;
  const refreshTokenName = process.env.NEXT_PUBLIC_REFRESH_COOKIE as string;

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (passwordData.password !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await userAPI.changePassword({
        oldPassword: passwordData.oldPassword,
        password: passwordData.password,
      });

      setMessage(response.message);
      setPasswordData({
        oldPassword: "",
        password: "",
        confirmPassword: "",
      });
      if (response.message) {
        Cookies.remove(tokenName);
        Cookies.remove(refreshTokenName);
        setAuthorizationToken(null);
        dispatch(setIsAuthenticated(false));
        router.push("/");
      }
    } catch (error: any) {
      console.error("Error changing password:", error);
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your account settings
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Change Password
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Update your password to keep your account secure.</p>
          </div>

          <form className="mt-5 space-y-4" onSubmit={handlePasswordChange}>
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={passwordData.oldPassword}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="mt-1 w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={passwordData.password}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                className="mt-1 w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={passwordData.confirmPassword}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            {message && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="text-sm text-green-700">{message}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="bg-theme-yellow hover:bg-yellow-500 text-black px-4 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Changing Password..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
