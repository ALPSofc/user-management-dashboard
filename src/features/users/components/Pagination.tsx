import { Button } from "@/shared/components/Button";

type Props = {
  page: number;
  totalPages: number;
  totalItems: number;
  onPrev: () => void;
  onNext: () => void;
};

export function Pagination({ page, totalPages, totalItems, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-500">
        Page {page} of {totalPages} • Total {totalItems}
      </p>
      <div className="flex gap-2">
        <Button onClick={onPrev} disabled={page <= 1}>Prev</Button>
        <Button onClick={onNext} disabled={page >= totalPages}>Next</Button>
      </div>
    </div>
  );
}
