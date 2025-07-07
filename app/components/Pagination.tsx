import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParam?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
  queryParam = "page",
}) => {
  const searchParams = useSearchParams();
  const allParams = Object.fromEntries(searchParams.entries());

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(allParams);
    params.set(queryParam, page.toString());
    return `${basePath}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center my-8">
      <nav className="flex items-center gap-2">
        {currentPage > 1 && (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="px-4 py-2 border rounded-lg hover:bg-theme-yellow hover:text-black"
          >
            Previous
          </Link>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={getPageUrl(page)}
            className={`px-4 py-2 border rounded-lg ${
              page === currentPage
                ? "bg-theme-yellow text-black font-bold"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="px-4 py-2 border rounded-lg hover:bg-theme-yellow hover:text-black"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
