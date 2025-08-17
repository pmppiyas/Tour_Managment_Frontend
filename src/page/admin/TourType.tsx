import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/page/shared/Loading";

import TourTypeUpdateModal from "@/components/modules/division/DivisionUpdateModal";
import TourTypeDeleteModal from "@/components/modules/division/DivisionDeleteModal";
import { toast } from "sonner";
import TourTypeAddModal from "@/components/modules/division/DivisionAddModal";
import { useGetTourtypeQuery } from "@/redux/features/tour/tourType.api";

export default function Add_TourType() {
  const { data, isLoading } = useGetTourtypeQuery(undefined);
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleEdit = (tour: string) => {
    setSelectedTour(tour);
    setModalOpen(true);
  };

  if (isLoading) return <Loading />;

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  return (
    <Table>
      <TableCaption>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Tour Type
          </button>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((tour: any) => (
          <TableRow key={tour._id}>
            <TableCell className="font-medium">{tour.name}</TableCell>
            <TableCell>{new Date(tour.createdAt).toLocaleString()}</TableCell>
            <TableCell>{new Date(tour.updatedAt).toLocaleString()}</TableCell>
            <TableCell className="flex gap-2 justify-center">
              <button
                onClick={() => handleEdit(tour._id)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tour._id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="text-right font-semibold">
            Total: {data?.length} Tour Types
          </TableCell>
        </TableRow>
      </TableFooter>

      {addModalOpen && (
        <TourTypeAddModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAddSuccess={() => {
            setAddModalOpen(false);
            toast.success("New tour type added");
          }}
        />
      )}

      {modalOpen && selectedTour && (
        <TourTypeUpdateModal
          tour={selectedTour}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onUpdate={() => {
            setModalOpen(false);
          }}
        />
      )}

      {deleteModalOpen && deleteTargetId && (
        <TourTypeDeleteModal
          id={deleteTargetId}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDeleteSuccess={() => {
            setDeleteModalOpen(false);
            toast.success("Tour type deleted successfull");
          }}
        />
      )}
    </Table>
  );
}
