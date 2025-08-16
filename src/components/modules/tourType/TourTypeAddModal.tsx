import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddTourtypeMutation } from "@/redux/features/tour/tour.api";
import { toast } from "sonner";
import type { IError } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onAddSuccess?: () => void;
}

export default function TourTypeAddModal({
  open,
  onClose,
  onAddSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [addTourtype, { isLoading }] = useAddTourtypeMutation();
  const [duplcate, setDuplicate] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) return toast.error("Name is required");

    try {
      await addTourtype({ name }).unwrap();
      toast.success("Tour type added successfully");
      setName("");
      onClose();
      onAddSuccess?.();
    } catch (err) {
      const error = err as IError;
      if (error.status === 500) {
        toast.error("This tour type already exists");
        setDuplicate("This tour type already exists");
      } else {
        toast.error("Failed to add tour type");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Tour Type</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter tour type name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {duplcate && <p className="text-destructive">{duplcate}</p>}
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Tour Type"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
