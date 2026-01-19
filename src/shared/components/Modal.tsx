import type { ReactNode } from "react";
import { useEffect } from "react";

export function Modal({
  open,
  title,
  children,
  footer,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-lg border overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h3 className="font-semibold">{title}</h3>
          </div>

          <div className="p-5">{children}</div>

          {footer && <div className="px-5 py-4 border-t bg-gray-50">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
