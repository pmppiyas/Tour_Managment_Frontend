import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteTourtypeMutation } from "@/redux/features/tour/tourType.api";

interface Props {
  tourId: string;
  open: boolean;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

export default function TourTypeDeleteModal({
  tourId,
  open,
  onClose,
  onDeleteSuccess,
}: Props) {
  const [deleteTourType, { isLoading }] = useDeleteTourtypeMutation();

  const handleConfirmDelete = async () => {
    try {
      await deleteTourType(tourId).unwrap();
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
