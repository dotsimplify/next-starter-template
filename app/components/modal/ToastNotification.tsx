"use client";

import type React from "react";
import { useEffect } from "react";

interface ToastNotificationProps {
  message: string;
  open: boolean | string;
  setOpen: () => void;
  success?: boolean;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  open,
  setOpen,
  success = false,
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen();
      }, 5000); // Auto close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [open, setOpen]);

  if (!open) return null;
  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div
        className={`${
          success
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        } rounded-lg p-4 shadow-lg`}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            {success ? (
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p
              className={`text-sm font-medium ${
                success ? "text-green-800" : "text-red-800"
              }`}
            >
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className={`inline-flex ${
                success
                  ? "text-green-400 hover:text-green-600"
                  : "text-red-400 hover:text-red-600"
              } focus:outline-none`}
              onClick={setOpen}
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
