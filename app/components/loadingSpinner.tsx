import { JSX } from "react";

export default function LoadingSpinner(): JSX.Element {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-theme-yellow"></div>
    </div>
  );
}
