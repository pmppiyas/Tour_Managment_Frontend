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
import { Button } from '@/components/ui/button';

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
    <div className=" p-4  rounded-lg shadow-sm">
      <h1 className="text-3xl text-center uppercase font-medium mb-6">
        All Tour types
      </h1>
      <Table>
        <TableCaption>
          <div className="flex justify-center mb-4">

            <Button onClick={() => setAddModalOpen(true)}>
              Add Tour Type
            </Button>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead >Updated At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((tour: any) => (
            <TableRow key={tour._id}>
              <TableCell className="font-medium">{tour.name}</TableCell>
              <TableCell>{new Date(tour.createdAt).toLocaleString()}</TableCell>
              <TableCell >{new Date(tour.updatedAt).toLocaleString()}</TableCell>
              <TableCell className="flex gap-2 justify-center">

                <Button size={"sm"} onClick={() => handleEdit(tour._id)}>Edit</Button>

                <Button onClick={() => handleDelete(tour._id)} size={"sm"} className="bg-red-500 hover:bg-red-600">Delete</Button>
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
    </div>
  );
}
