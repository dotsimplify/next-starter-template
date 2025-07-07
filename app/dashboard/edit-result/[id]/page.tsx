"use client";

import { useParams, useRouter } from "next/navigation";
import ResultForm from "@/components/forms/resultForm";

export default function EditResultPage() {
  const router = useRouter();
  const { id } = useParams();

  const handleSuccess = () => {
    router.push("/dashboard");
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <ResultForm
          mode="edit"
          resultId={`${id}`}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
