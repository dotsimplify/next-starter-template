"use client";

import { useState, useEffect, JSX } from "react";
import { useRouter, useParams } from "next/navigation";
import SuccessModal from "@/components/modal/successModal";
import LoadingSpinner from "@/components/loadingSpinner";
import ToastNotification from "@/components/modal/ToastNotification";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteResultRequest,
  getSingleResultRequest,
} from "@/features/userSlice";
import { setMessage } from "@/features/appSlice";

export default function DeleteResultPage(): JSX.Element {
  const router = useRouter();
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const resultId = params.id as string;
  const singleResult = useSelector(
    (state: RootState) => state.login.singleResult
  );
  const loading = useSelector((state: RootState) => state.app.isLoading);
  const successMessage = useSelector((state: RootState) => state.app.message);
  // Memoize handleLogout to prevent recreation
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (resultId) {
      dispatch(getSingleResultRequest(resultId));
    }
  }, [resultId, dispatch]);

  const handleDelete = async () => {
    if (!singleResult) return;

    try {
      dispatch(deleteResultRequest(singleResult._id));
    } catch (error: any) {
      console.error("Error deleting result:", error);
      setErrorMessage(error.response?.data?.message);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  const closeModal = () => {
    dispatch(setMessage(""));
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading result details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      {errorMessage && (
        <ToastNotification
          message={errorMessage}
          open={!!errorMessage}
          setOpen={() => setErrorMessage("")}
        />
      )}
      {successMessage && (
        <SuccessModal
          isOpen={Boolean(successMessage)}
          onClose={closeModal}
          title="Delete Result Success"
          message={successMessage}
        />
      )}

      {/* Result Details Card (shown while modal is open) */}
      {singleResult && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Delete Result
                  </h1>
                  <p className="text-gray-600 mb-6">
                    Review the result details before deletion
                  </p>
                </div>

                {/* Result Details */}
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Game Name
                        </label>
                        <p className="mt-1 text-sm text-gray-900 font-semibold">
                          {singleResult.gameName}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Result
                        </label>
                        <p className="mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {singleResult.result}
                          </span>
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Result Date
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {singleResult.resultDate}
                        </p>
                      </div>
                      {singleResult.createdAt && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Posted on
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {new Date(
                              singleResult.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Delete Result
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
