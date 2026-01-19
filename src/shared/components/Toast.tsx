import { useEffect } from "react";
import clsx from "clsx";

type Props = {
  open: boolean;
  variant: "success" | "error";
  message: string;
  onClose: () => void;
  durationMs?: number;
};

export function Toast({ open, variant, message, onClose, durationMs = 3000 }: Props) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(t);
  }, [open, onClose, durationMs]);

  if (!open) return null;

  return (
    <div className="fixed z-[60] right-4 top-4 w-[calc(100%-2rem)] max-w-sm">
      <div
        className={clsx(
          "rounded-2xl border shadow-sm px-4 py-3 text-sm bg-white",
          variant === "success" && "border-green-200",
          variant === "error" && "border-red-200"
        )}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="font-medium">
            {variant === "success" ? "Success" : "Error"}
            <div className="font-normal text-gray-600 mt-1">{message}</div>
          </div>
          <button className="text-gray-500 hover:text-gray-900" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
