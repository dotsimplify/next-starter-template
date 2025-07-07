import Link from "next/link";
import { JSX } from "react";

export default function NotFound(): JSX.Element {
  return (
    <div className="flex flex-col border-l border-yellow-300 border-r items-center justify-center min-h-[55vh] p-4">
      <h1 className="md:text-4xl text-xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="md:text-xl text-sm mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-theme-yellow text-black font-semibold rounded-md hover:bg-yellow-500 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
