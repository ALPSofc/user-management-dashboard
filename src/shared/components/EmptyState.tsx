export function EmptyState({
  title = "No results",
  description = "Try adjusting your filters or search term.",
  onClear,
}: {
  title?: string;
  description?: string;
  onClear?: () => void;
}) {
  return (
    <div className="border rounded-2xl bg-white p-8 text-center">
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
      {onClear && (
        <div className="mt-4">
          <button
            type="button"
            onClick={onClear}
            className="px-3 py-1.5 rounded bg-gray-100 text-sm hover:bg-gray-200"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}