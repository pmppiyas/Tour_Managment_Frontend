import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUpdateTourMutation } from "@/redux/features/tour/tour.api";
import type { TTourUpdateModalProps } from "@/types";

export default function TourUpdateModal({
  tour,
  open,
  onClose,
  onUpdate,
}: TTourUpdateModalProps) {
  const [updateTour] = useUpdateTourMutation();

  const [formData, setFormData] = useState({
    name: tour.name || "",
    location: tour.location || "",
    costFrom: tour.costFrom?.toString() || "",
    maxGuest: tour.maxGuest?.toString() || "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        tour: tour._id,
        name: formData.name,
        location: formData.location,
        costFrom: Number(formData.costFrom),
        maxGuest: Number(formData.maxGuest),
      };

      await updateTour(payload).unwrap();
      onUpdate?.();
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tour</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Tour Name"
          />
          <Input
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Location"
          />
          <Input
            type="number"
            value={formData.costFrom}
            onChange={(e) => handleChange("costFrom", e.target.value)}
            placeholder="Cost From"
          />
          <Input
            type="number"
            value={formData.maxGuest}
            onChange={(e) => handleChange("maxGuest", e.target.value)}
            placeholder="Max Guests"
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
