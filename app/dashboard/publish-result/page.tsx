"use client";

import ResultForm from "@/components/forms/resultForm";
import { JSX } from "react";

const PublishResultPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <ResultForm mode="create" />
      </div>
    </div>
  );
};

export default PublishResultPage;
