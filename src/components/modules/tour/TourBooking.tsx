import Loading from '@/page/shared/Loading';
import { useGetATourQuery } from '@/redux/features/tour/tour.api';
import { useParams } from "react-router"

export default function TourBooking() {

  const { slug } = useParams()
  const { data: tour, isLoading, error } = useGetATourQuery(slug as string);


  if (isLoading) return <Loading />;
  if (error || !tour)
    return (
      <div className="text-center text-red-500 mt-10">
        ⚠️ Tour not found. Please check the URL or try again later.
      </div>
    );

  return (
    <div>TourBooking</div>
  )
}
