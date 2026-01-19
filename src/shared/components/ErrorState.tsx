import { Button } from "./Button";

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="border rounded-2xl bg-white p-6">
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      {onRetry && (
        <div className="mt-4">
          <Button variant="primary" onClick={onRetry}>Retry</Button>
        </div>
      )}
    </div>
  );
}
