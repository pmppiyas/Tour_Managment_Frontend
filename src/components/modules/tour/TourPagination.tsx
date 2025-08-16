import { Button } from "@/components/ui/button";

export default function TourPagination({
  page,
  totalPage,
  onPageChange,
}: {
  page: number;
  totalPage: number;
  onPageChange: (newPage: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ⬅️ Prev
      </Button>

      <span className="text-sm font-medium">
        Page {page} of {totalPage}
      </span>

      <Button
        variant="outline"
        disabled={page === totalPage}
        onClick={() => onPageChange(page + 1)}
      >
        Next ➡️
      </Button>
    </div>
  );
}
