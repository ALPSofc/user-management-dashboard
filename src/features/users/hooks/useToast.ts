import { useCallback, useState } from "react";

export function useToast() {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<"success" | "error">("success");
  const [message, setMessage] = useState("");

  const show = useCallback((v: "success" | "error", msg: string) => {
    setVariant(v);
    setMessage(msg);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return { open, variant, message, show, close };
}
