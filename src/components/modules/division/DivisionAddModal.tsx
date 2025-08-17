import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { IError } from "@/types";
import { useCreateDivisionMutation } from "@/redux/features/division/division.api";

interface Props {
  open: boolean;
  onClose: () => void;
  onAddSuccess?: () => void;
}

export default function DivisionAddModal({
  open,
  onClose,
  onAddSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [addDivision, { isLoading }] = useCreateDivisionMutation(undefined);
  const [duplcate, setDuplicate] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) return toast.error("Name is required");

    try {
      await addDivision({ name }).unwrap();
      setName("");
      onClose();
      onAddSuccess?.();
    } catch (err) {
      const error = err as IError;
      if (error.status === 409) {
        toast.error("This division already exists");
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
          <DialogTitle>Add Tour Type</DialogTitle>
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
