"use client";

import { useState, useEffect, type FormEvent } from "react";
import SuccessModal from "@/components/modal/successModal";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "@/features/appSlice";
import { useRouter } from "next/navigation";
import {
  getGamesRequest,
  postResultRequest,
  setErrorMessage,
  updateResultRequest,
} from "@/features/userSlice";
import { userAPI } from "@/endpoints/userAPI";

interface ResultFormProps {
  mode: "create" | "edit";
  resultId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ResultForm({
  mode,
  resultId,
  onSuccess,
  onCancel,
}: ResultFormProps) {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const gameList = useSelector((state: RootState) => state.login.games);
  const loading = useSelector((state: RootState) => state.app.isLoading);
  const successMessage = useSelector((state: RootState) => state.app.message);
  const errorMessage = useSelector(
    (state: RootState) => state.login.errorInLogin
  );
  const [result, setResult] = useState<string>("");
  const [resultDate, setResultDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [gameName, setGameName] = useState<string>("");
  // Calculate min and max dates
  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 2); // 2 days ago (plus today = 3 days total)
  const minDate = threeDaysAgo.toISOString().split("T")[0];
  const maxDate = today.toISOString().split("T")[0];

  // Fetch games on component mount
  useEffect(() => {
    dispatch(getGamesRequest());
  }, [dispatch]);
  async function getSingleResult() {
    const result = await userAPI.getSingleResult(resultId as string);
    setGameName(result.gameName);
    setResultDate(result.resultDate?.split("-")?.reverse()?.join("-"));
    setResult(result.result);
  }
  // Fetch result data for edit mode
  useEffect(() => {
    if (mode === "edit" && resultId) {
      getSingleResult();
    }
  }, [mode, resultId, getSingleResult]);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // // Validation
    if (!gameName) {
      dispatch(setErrorMessage("Please select a game"));
      return;
    }
    if (Number(result) < 0 || Number(result) > 99) {
      dispatch(setErrorMessage("Result must be between 0 and 99"));
      return;
    }
    if (!resultDate) {
      dispatch(setErrorMessage("Result date is required"));
      return;
    }

    setErrorMessage("");
    const payload = {
      gameName,
      resultDate: resultDate.split("-").reverse().join("-"), // Format: DD-MM-YYYY
      result: Number(result),
    };

    if (mode === "edit" && resultId) {
      dispatch(updateResultRequest({ ...payload, id: resultId }));
    } else {
      dispatch(postResultRequest(payload));
      // Handle success
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const handleClear = () => {
    setResult("");
    setGameName("");
    setResultDate(new Date().toISOString().split("T")[0]);
    setErrorMessage("");
  };

  const handleSetYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setResultDate(yesterday.toISOString().split("T")[0]);
  };

  const closeModal = () => {
    dispatch(setMessage(""));
    router.push("/dashboard");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === "edit" ? "Edit Result" : "Publish Result"}
          </h1>
          <p className="text-gray-600 mt-1">
            {mode === "edit"
              ? "Update the game result"
              : "Add a new game result"}
          </p>
        </div>

        {/* Error/Success Toasts */}
        {errorMessage && (
          <SuccessModal
            isOpen={Boolean(errorMessage)}
            onClose={() => dispatch(setErrorMessage(""))}
            message={errorMessage}
            type="error"
            title="Something Went Wrong"
            buttonText="Try Again"
          />
        )}
        {successMessage && (
          <SuccessModal
            isOpen={Boolean(successMessage)}
            onClose={closeModal}
            title="Publish Result Success"
            message={successMessage}
          />
        )}
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Game Selection */}
          <div>
            <label
              htmlFor="game"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Game
            </label>
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-12 rounded-md"></div>
            ) : (
              <select
                id="game"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
                disabled={loading}
              >
                <option value="">Select Game</option>
                {gameList.map((game) => (
                  <option key={game._id} value={game.gameName}>
                    {game.gameName}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Result Input */}
          <div>
            <label
              htmlFor="result"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Result
            </label>
            <input
              id="result"
              type="number"
              min="0"
              max="99"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter result (0-99)"
              required
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter a number between 0 and 99
            </p>
          </div>

          {/* Date Input */}
          <div>
            <label
              htmlFor="resultDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Result Date
            </label>
            <input
              id="resultDate"
              type="date"
              min={minDate}
              max={maxDate}
              value={resultDate}
              onChange={(e) => setResultDate(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={loading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {mode === "edit" ? "Updating..." : "Publishing..."}
                </>
              ) : (
                <>{mode === "edit" ? "Update Result" : "Publish Result"}</>
              )}
            </button>

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Quick Actions
          </h3>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleClear}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear Form
            </button>
            <button
              type="button"
              onClick={handleSetYesterday}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Set Yesterday
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
