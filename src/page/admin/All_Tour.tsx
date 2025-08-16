/* eslint-disable @typescript-eslint/no-explicit-any */
import TourCard from "@/components/modules/tour/TourCard";
import { useState } from "react";
import TourPagination from "@/components/modules/tour/TourPagination";
import Loading from "@/page/shared/Loading";
import { useGetTourQuery } from "@/redux/features/tour/tour.api";

export default function All_Tour() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetTourQuery({ page: currentPage });

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl text-center uppercase font-medium"> All Tour</h1>

      {/*Tour Card */}
      <div className="grid lg:grid-cols-2 gap-8 p-4 md:p-8 ">
        {data.tours.map((data: any) => (
          <TourCard key={data._id} tour={data} />
        ))}
      </div>

      {/* Pagination */}
      <TourPagination
        page={data.meta.page}
        totalPage={data.meta.totalPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
}
