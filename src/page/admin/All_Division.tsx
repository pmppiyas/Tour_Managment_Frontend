/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useGetAllDivisionQuery } from "@/redux/features/division/division.api";
import DivisionAddModal from "@/components/modules/division/DivisionAddModal";
import { toast } from "sonner";
import DivisionDeleteModal from "@/components/modules/division/DivisionDeleteModal";
import DivisionUpdateModal from "@/components/modules/division/DivisionUpdateModal";
import { Button } from '@/components/ui/button';
export default function All_Division() {
  const { data, isLoading } = useGetAllDivisionQuery(undefined);

  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleEdit = (tour: string) => {
    setSelectedDivision(tour);
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
        All Division
      </h1>
      <Table>

        <TableCaption>
          <div className="flex justify-center mb-4">
            <Button onClick={() => setAddModalOpen(true)}>Add Division</Button>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((division: any) => (
            <TableRow key={division._id}>
              <TableCell className="font-medium">{division.name}</TableCell>
              <TableCell className="hover:underline">{division.slug}</TableCell>
              <TableCell>
                {new Date(division.createdAt).toLocaleString()}
              </TableCell>

              <TableCell className="flex gap-2 justify-center">



                <Button size={"sm"} onClick={() => handleEdit(division._id)}>Edit</Button>

                <Button onClick={() => handleDelete(division._id)} size={"sm"} className="bg-red-500 hover:bg-red-600">Delete</Button>
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
          <DivisionAddModal
            open={addModalOpen}
            onClose={() => setAddModalOpen(false)}
            onAddSuccess={() => {
              setAddModalOpen(false);
              toast.success("New tour type added");
            }}
          />
        )}

        {modalOpen && selectedDivision && (
          <DivisionUpdateModal
            division={selectedDivision}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onUpdate={() => {
              setModalOpen(false);
            }}
          />
        )}

        {deleteModalOpen && deleteTargetId && (
          <DivisionDeleteModal
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
    </div >
  );
}
