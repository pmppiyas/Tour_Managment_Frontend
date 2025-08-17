import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteDivisionMutation } from "@/redux/features/division/division.api";

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

export default function DivisionDeleteModal({
  id,
  open,
  onClose,
  onDeleteSuccess,
}: Props) {
  const [deleteDivision, { isLoading }] = useDeleteDivisionMutation(undefined);

  const handleConfirmDelete = async () => {
    try {
      await deleteDivision(id).unwrap();
      onClose();
      onDeleteSuccess?.();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-lg font-semibold text-red-500">
              Confirm Deletion
            </h2>
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm ">
          Are you sure you want to delete this tour type? This action cannot be
          undone.
        </p>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
