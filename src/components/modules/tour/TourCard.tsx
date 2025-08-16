import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function TourCard({ tour }: { tour: any }) {
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition">
      <CardHeader>
        {tour.image ? (
          <img
            src={tour.images?.[0]}
            alt={tour.name}
            className="w-full h-40 object-cover rounded-md "
          />
        ) : (
          <div className="h-40  border-2 rounded-md"></div>
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
      </CardContent>

      <CardFooter className="text-xs text-gray-500">
        Includes: {tour.included?.join(", ")}
      </CardFooter>
    </Card>
  );
}
