/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router";
import { IconArrowLeft, IconCalendar, IconMapPin, IconUsers, IconCurrency, IconCheck, IconX, IconClock } from "@tabler/icons-react";
import Loading from "@/page/shared/Loading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetATourQuery } from "@/redux/features/tour/tour.api";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useState } from "react";
import TourBookingModal from '@/components/modules/tour/TourBookingModal';
import { toast } from "sonner";

export default function TourDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: tour, isLoading, error } = useGetATourQuery(slug as string);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any | null>(null);

  if (isLoading) return <Loading />;
  if (error || !tour)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">Tour Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The tour you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate(-1)} variant="outline">
          <IconArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );

  const handleBooking = () => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
          <IconArrowLeft className="w-4 h-4 mr-2" />
          Back to Tours
        </Button>
        <Badge variant="secondary" className="px-3 py-1">
          Available for Booking
        </Badge>
      </div>

      {/* Hero Section */}
      <Card className="overflow-hidden">
        <div className="relative">
          {tour.images?.[0] && (
            <div className="relative h-96 w-full overflow-hidden">
              < img
                src={tour.images[0]}
                alt={tour.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{tour.name}</h1>
                <div className="flex items-center gap-2 text-lg">
                  <IconMapPin className="w-5 h-5" />
                  <span>{tour.location}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Info Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <IconCalendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold text-3xl">
                    {tour.startDate && tour.endDate
                      ? `${formatDate(tour.startDate)} - ${formatDate(tour.endDate)}`
                      : "Flexible dates"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <IconUsers className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Group Size</p>
                  <p className="font-semibold text-3xl">Up to {tour.maxGuest} guests</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Description */}
          {tour.description && tour.description.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  📋 About This Tour
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tour.description.map((desc: string, i: number) => (
                    <p key={i} className="text-muted-foreground leading-relaxed text-3xl">
                      {desc}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tour Plan */}
          {tour.tourPlan && tour.tourPlan.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  🗺️ Itinerary
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tour.tourPlan.map((step: string, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                        {i + 1}
                      </div>
                      <p className="text-muted-foreground pt-1 text-3xl">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid md:grid-cols-2 gap-6">
            {tour.included && tour.included.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-green-700 flex items-center gap-2">
                    <IconCheck className="w-5 h-5 " />
                    What's Included
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tour.included.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <IconCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {tour.excluded && tour.excluded.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-red-700 flex items-center gap-2 ">
                    <IconX className="w-5 h-5 " />
                    Not Included
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tour.excluded.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <IconX className="w-4 h-4 text-red-500 flex-shrink-0 " />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <div className="flex items-center gap-1">
                    <IconCurrency className="w-5 h-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">৳{tour.costFrom}</span>
                    <span className="text-sm text-muted-foreground">/person</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{tour.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Max Guests</span>
                  <span className="font-medium">{tour.maxGuest} people</span>
                </div>

                {tour.startDate && tour.endDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">
                      {Math.ceil((new Date(tour.endDate).getTime() - new Date(tour.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              <Button
                onClick={handleBooking}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                Book This Tour
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Free cancellation up to 24 hours before the tour
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedTour && isModalOpen && (
        <TourBookingModal
          tour={tour}
          key={tour._id}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBookingConfirm={() => {
            setIsModalOpen(false);
            toast.success("Tour booked successfully! 🎉");
          }}
        />
      )}
    </div>
  );
}