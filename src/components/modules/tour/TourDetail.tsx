import { useParams } from "react-router";
import { IconArrowLeft } from "@tabler/icons-react";
import Loading from "@/page/shared/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetATourQuery } from "@/redux/features/tour/tour.api";
import { useNavigate } from "react-router";

export default function TourDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetATourQuery(slug as string);

  if (isLoading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center">Tour not found</div>;

  const tour = data;

  return (
    <Card className=" mx-auto m-8 shadow-md">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-2xl font-bold">{tour.name}</CardTitle>
          <div className="bg-foreground/10 hover:bg-foreground/25 flex items-center justify-center size-10 rounded-full ">
            <IconArrowLeft
              onClick={() => navigate(-1)}
              className="animate-pulse"
            />
          </div>
        </div>

        <img
          src={tour.images?.[0]}
          alt={tour.name}
          className="w-full h-64 object-cover rounded-md mt-4"
        />
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <div>🏳️🏳️🏳️</div>
          <p>📍 Location: {tour.location}</p>
          <p>💰 Cost From: ৳{tour.costFrom}</p>
          <p>👥 Max Guests: {tour.maxGuest}</p>
          <p>
            🗓️ {new Date(tour.startDate).toLocaleDateString()} →{" "}
            {new Date(tour.endDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <div>🏳️🏳️🏳️</div>
          <p>✅ Included: {tour.included?.join(", ")}</p>
          <p>❌ Excluded: {tour.excluded?.join(", ")}</p>
          <p>📋 Description:</p>
          <ul className="list-disc ml-5">
            {tour.description?.map((desc: string, i: number) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
        <div>
          <div>🏳️🏳️🏳️</div>
          <p>🗺️ Tour Plan:</p>
          <ul className="list-decimal ml-5">
            {tour.tourPlan?.map((step: string, i: number) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
