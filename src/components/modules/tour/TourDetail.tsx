import { useParams, useNavigate } from "react-router";
import { IconArrowLeft } from "@tabler/icons-react";
import Loading from "@/page/shared/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetATourQuery } from "@/redux/features/tour/tour.api";

export default function TourDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: tour, isLoading, error } = useGetATourQuery(slug as string);

  if (isLoading) return <Loading />;
  if (error || !tour)
    return (
      <div className="text-center text-red-500 mt-10">
        ⚠️ Tour not found. Please check the URL or try again later.
      </div>
    );

  return (
    <Card className="max-w-6xl mx-auto my-8 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl font-semibold">{tour.name}</CardTitle>
          <button
            onClick={() => navigate(-1)}
            className="bg-muted hover:bg-muted/80 p-2 rounded-full transition"
            aria-label="Go back"
          >
            <IconArrowLeft className="size-6 text-foreground" />
          </button>
        </div>
        {tour.images?.[0] && (
          <img
            src={tour.images[0]}
            alt={tour.name}
            className="w-full h-64 object-cover rounded-md mt-4"
          />
        )}
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-muted-foreground">
        {/* 🧭 Overview */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">📍 Overview</h3>
          <p>Location: {tour.location || "Not specified"}</p>
          <p>Cost From: ৳{tour.costFrom ?? "N/A"}</p>
          <p>Max Guests: {tour.maxGuest ?? "N/A"}</p>
          <p>
            Duration:{" "}
            {tour.startDate && tour.endDate
              ? `${new Date(tour.startDate).toLocaleDateString()} → ${new Date(
                tour.endDate
              ).toLocaleDateString()}`
              : "Not specified"}
          </p>
        </div>

        {/* ✅ Included & ❌ Excluded */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">🧳 What's Included</h3>
          <p>✅ {tour.included?.join(", ") || "No items listed"}</p>
          <p>❌ {tour.excluded?.join(", ") || "No exclusions listed"}</p>

        </div>

        {/* 🗺️ Tour Plan */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">🗺️ Tour Plan</h3>
          <ul className="list-decimal ml-5">
            {tour.tourPlan?.map((step: any, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>

        {/*Description */}
        <div>
          <h4 className="font-medium mt-2">📋 Description</h4>
          <ul className="list-disc ml-5">
            {tour.description?.map((desc: any, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}