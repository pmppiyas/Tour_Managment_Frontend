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

export default function All_Division() {
  const { data, isLoading } = useGetAllDivisionQuery(undefined);

  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  console.log(data);

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
            Add Division
          </button>
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
              <button
                onClick={() => handleEdit(division._id)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(division._id)}
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
    </Table>
  );
}
