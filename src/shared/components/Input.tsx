import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, ...props }: Props) {
  return (
    <div>
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        {...props}
        className={clsx(
          "mt-1 w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-black/10",
          error && "border-red-500",
          className
        )}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
