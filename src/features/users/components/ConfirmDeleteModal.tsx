import { Modal } from "@/shared/components/Modal";
import { Button } from "@/shared/components/Button";
import type { User } from "../types/user";

export function ConfirmDeleteModal({
  open,
  user,
  isDeleting,
  onClose,
  onConfirm,
}: {
  open: boolean;
  user: User | null;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      open={open}
      title="Delete user"
      onClose={() => {
        if (!isDeleting) onClose();
      }}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} disabled={Boolean(isDeleting)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={Boolean(isDeleting)}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      }
    >
      <p className="text-sm text-gray-700">
        Are you sure you want to delete{" "}
        <b>{user?.name ?? "this user"}</b>? This action cannot be undone.
      </p>
    </Modal>
  );
}
