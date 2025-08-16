import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUpdateTourtypeMutation } from "@/redux/features/tour/tour.api";

export default function TourTypeUpdateModal({
  tour,
  open,
  onClose,
  onUpdate,
}: any) {
  const [updateTourtype] = useUpdateTourtypeMutation(undefined);
  const [name, setName] = useState(tour?.name || "");

  const handleSubmit = () => {
    onUpdate({ ...tour, name });
    const userInfo = {
      tour,
      name,
    };
    updateTourtype(userInfo);
    console.log(userInfo);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tour Type</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tour Name"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Update</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
