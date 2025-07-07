"use client";

import { ReactNode } from "react";

type ModalType = "success" | "error";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: ModalType;
  title?: string;
  message?: string | ReactNode;
  buttonText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  type = "success",
  title,
  message = "Operation completed successfully.",
  buttonText = "OK",
}: ModalProps) {
  if (!isOpen) return null;

  // Configuration based on modal type
  const modalConfig = {
    success: {
      icon: (
        <svg
          className="h-6 w-6 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      iconBg: "bg-green-100",
      buttonBg: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
      defaultTitle: "Success!",
    },
    error: {
      icon: (
        <svg
          className="h-6 w-6 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      iconBg: "bg-red-100",
      buttonBg: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      defaultTitle: "Error!",
    },
  };

  const config = modalConfig[type];
  const displayTitle = title || config.defaultTitle;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
          {/* Close X button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex flex-col items-center">
              {/* Icon */}
              <div
                className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${config.iconBg} mb-4`}
              >
                {config.icon}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                  {displayTitle}
                </h3>
                <div className="mt-2">
                  {typeof message === "string" ? (
                    <p className="text-sm text-gray-500">{message}</p>
                  ) : (
                    message
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.buttonBg} sm:ml-3 sm:w-auto sm:text-sm`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
