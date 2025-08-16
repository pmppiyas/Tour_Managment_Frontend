import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TourDeleteModal from "@/components/modules/tour/TourDeleteModal";
import { toast } from "sonner";
import TourUpdateModal from "@/components/modules/tour/TourUpdateModal";

export default function TourCard({ tour }: { tour: any }) {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  const handleEdit = (tour: string) => {
    setSelectedTour(tour);
    setModalOpen(true);
  };

  const handleDetail = () => {
    console.log("Detail clicked for:", tour._id);
  };

  return (
    <>
      <Card className="w-full shadow-sm hover:shadow-md transition">
        <CardHeader>
          {tour.images?.[0] ? (
            <img
              src={tour.images[0]}
              alt={tour.name}
              className="w-full h-40 object-cover rounded-md"
            />
          ) : (
            <div className="h-40 border-2 rounded-md bg-gray-100 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <CardTitle className="mt-2 text-lg">{tour.name}</CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground space-y-1">
          <p>📍 Location: {tour.location}</p>
          <p>💰 Cost: ৳{tour.costFrom}</p>
          <p>👥 Max Guests: {tour.maxGuest}</p>
          <p>
            🗓️ {new Date(tour.startDate).toLocaleDateString()} →{" "}
            {new Date(tour.endDate).toLocaleDateString()}
          </p>
          <p>ℹ️ Includes: {tour.included?.join(", ")}</p>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button variant="destructive" onClick={() => handleDelete(tour._id)}>
            Delete
          </Button>
          <Button variant="outline" onClick={() => handleEdit(tour)}>
            Edit
          </Button>
          <Button variant="default" onClick={handleDetail}>
            Detail
          </Button>
        </CardFooter>
      </Card>

      {modalOpen && selectedTour && (
        <TourUpdateModal
          tour={selectedTour}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onUpdate={() => {
            setModalOpen(false);
            toast.success("Tour modified successfully");
          }}
        />
      )}

      {deleteModalOpen && deleteTargetId && (
        <TourDeleteModal
          tourId={deleteTargetId}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDeleteSuccess={() => {
            setDeleteModalOpen(false);
            toast.success("Tour type deleted successfull");
          }}
        />
      )}
    </>
  );
}
