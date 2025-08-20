/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TourDeleteModal from "@/components/modules/tour/TourDeleteModal";
import TourUpdateModal from "@/components/modules/tour/TourUpdateModal";
import { toast } from "sonner";
import { Calendar, MapPin, Users, DollarSign, Info } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/constants/role';
import { cn } from '@/lib/utils';

export default function TourCard({ tour }: { tour: any }) {
  const [selectedTour, setSelectedTour] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const { me: user } = useAuth()

  const isAdmin = user?.role === Role.ADMIN || user?.role === Role.SUPER_ADMIN;

  console.log(isAdmin)
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  const handleEdit = (tour: any) => {
    setSelectedTour(tour);
    setModalOpen(true);
  };

  const handleDetail = (tourId: string) => {
    navigate(`/tours/${tourId}`);
  };

  return (
    <>
      <Card className="w-full shadow-md hover:shadow-xl transition rounded-2xl overflow-hidden">
        {/* Image Section */}
        <CardHeader className="p-0">
          {tour.images?.[0] ? (
            <img
              src={tour.images[0]}
              alt={tour.name}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="h-48 border-2 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              No Image Available
            </div>
          )}
        </CardHeader>

        {/* Content */}
        <CardContent className="p-4 space-y-3 grow">
          <CardTitle className="text-xl font-semibold line-clamp-1">
            {tour.name}
          </CardTitle>

          <div className="text-sm text-muted-foreground space-y-2">
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" />
              {tour.location}
            </p>
            <p className="flex items-center gap-2">
              <DollarSign size={16} className="text-green-500" />
              ৳{tour.costFrom}
            </p>
            <p className="flex items-center gap-2">
              <Users size={16} className="text-purple-500" />
              Max Guests: {tour.maxGuest}
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={16} className="text-orange-500" />
              {new Date(tour.startDate).toLocaleDateString()} →{" "}
              {new Date(tour.endDate).toLocaleDateString()}
            </p>
            {tour.included?.length > 0 && (
              <p className="flex items-center gap-2">
                <Info size={16} className="text-cyan-500" />
                Includes:{" "}
                <span className="line-clamp-1">
                  {tour.included.join(", ")}
                </span>
              </p>
            )}
          </div>
        </CardContent>

        {/* Footer Buttons */}
        <CardFooter className="flex justify-between items-center p-4 border-t">


          {isAdmin &&
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(tour._id)}
            >
              Delete
            </Button>}

          {isAdmin && <Button size="sm" variant="outline" onClick={() => handleEdit(tour)}>
            Edit
          </Button>}

          {!isAdmin && <Button
            size="sm"
            className={cn(!isAdmin && "w-full")}
            onClick={() => handleDetail(tour.slug)}
          >
            Detail
          </Button>}


        </CardFooter>
      </Card >

      {/* Update Modal */}
      {
        modalOpen && selectedTour && (
          <TourUpdateModal
            tour={selectedTour}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onUpdate={() => {
              setModalOpen(false);
              toast.success("Tour updated successfully");
            }}
          />
        )
      }

      {/* Delete Modal */}
      {
        deleteModalOpen && deleteTargetId && (
          <TourDeleteModal
            tourId={deleteTargetId}
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDeleteSuccess={() => {
              setDeleteModalOpen(false);
              toast.success("Tour deleted successfully");
            }}
          />
        )
      }
    </>
  );
}
