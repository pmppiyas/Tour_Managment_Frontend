import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useDeleteTourMutation } from "@/redux/features/tour/tour.api";

interface Props {
  tourId: string;
  open: boolean;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

export default function TourDeleteModal({
  tourId,
  open,
  onClose,
  onDeleteSuccess,
}: Props) {
  const [deleteTour, { isLoading }] = useDeleteTourMutation();

  const handleConfirmDelete = async () => {
    try {
      await deleteTour(tourId).unwrap();
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
          <DialogTitle className="text-red-500">Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p className="text-sm ">
          Are you sure you want to delete this tour ? This action cannot be
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
