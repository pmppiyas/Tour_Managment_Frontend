import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { useUpdateDivisionMutation } from "@/redux/features/division/division.api";

export default function DivisionUpdateModal({
  division,
  open,
  onClose,
  onUpdate,
}: any) {
  const [updateDivision] = useUpdateDivisionMutation(undefined);
  const [name, setName] = useState(division?.name || "");

  const handleSubmit = () => {
    onUpdate({ ...division, name });
    const userInfo = {
      division,
      name,
    };
    console.log(userInfo);
    updateDivision(userInfo);
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
