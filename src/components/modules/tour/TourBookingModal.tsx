/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
import {
  IconUser,
  IconMail,
  IconUsers,
  IconCalendar,
  IconMapPin,
  IconCurrency,
  IconMinus,
  IconPlus,
  IconCreditCard,
  IconShieldCheck
} from "@tabler/icons-react";

interface Props {
  tour: any;
  open: boolean;
  onClose: () => void;
  onBookingConfirm?: (formData: any) => void;
}

export default function TourBookingModal({
  tour,
  open,
  onClose,
  onBookingConfirm,
}: Props) {
  const { me: user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!user && !hasRedirected.current) {
      hasRedirected.current = true;
      navigate("/auth/login", {
        state: { from: location.pathname },
      });
      toast.success("Please login first");
    }
  }, [user, navigate, location]);

  const [createBooking, { isLoading: isBookingLoading }] = useCreateBookingMutation();

  const [formData, setFormData] = useState({
    tour: "",
    guestCount: 1,
  });

  useEffect(() => {
    if (user && tour) {
      setFormData({
        tour: tour._id,
        guestCount: 1,
      });
    }
  }, [user, tour]);

  const totalCost = Number(tour?.costFrom || 0) * Number(formData.guestCount || 1);

  const handleGuestCountChange = (increment: boolean) => {
    const currentCount = formData.guestCount;
    const maxGuests = tour?.maxGuest || 10;

    if (increment && currentCount < maxGuests) {
      setFormData(prev => ({ ...prev, guestCount: currentCount + 1 }));
    } else if (!increment && currentCount > 1) {
      setFormData(prev => ({ ...prev, guestCount: currentCount - 1 }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await createBooking(formData).unwrap();
      console.log("Booking Success:", result);

      onBookingConfirm?.(formData);
      onClose();
    } catch (err) {
      console.error("Booking Failed:", err);
      toast.error("Booking failed. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!tour) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-full md:max-w-3xl  max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4 w-full">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            🧳 Complete Your Booking
          </DialogTitle>

          {/* Tour Summary Card */}
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {tour.images?.[0] && (
                  <img
                    src={tour.images[0]}
                    alt={tour.name}
                    className=" hidden md:flex flex-1 w-24 h-20 object-cover rounded-lg flex-shrink-0 "
                  />
                )}
                <div className="flex-1 min-w-0 ">
                  <h3 className="font-semibold text-lg truncate">{tour.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                    <IconMapPin className="w-4 h-4" />
                    <span>{tour.location}</span>
                  </div>
                  {tour.startDate && tour.endDate && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                      <IconCalendar className="w-4 h-4" />
                      <span>{formatDate(tour.startDate)} - {formatDate(tour.endDate)}</span>
                    </div>
                  )}
                </div>
                <Badge variant="secondary" className="flex-shrink-0">
                  ৳{tour.costFrom}/person
                </Badge>
              </div>
            </CardContent>
          </Card>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Information */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <IconUser className="w-5 h-5" />
                Guest Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <IconUser className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{user?.name || 'Guest User'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <IconMail className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{user?.email || 'guest@example.com'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guest Count Selection */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold flex items-center gap-2">
                    <IconUsers className="w-5 h-5" />
                    Number of Guests
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Maximum {tour.maxGuest} guests allowed
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleGuestCountChange(false)}
                    disabled={formData.guestCount <= 1}
                    className="h-10 w-10"
                  >
                    <IconMinus className="w-4 h-4" />
                  </Button>

                  <div className="w-20">
                    <Input
                      type="number"
                      value={formData.guestCount}
                      onChange={(e) => {
                        const value = Math.min(Math.max(1, Number(e.target.value)), tour?.maxGuest || 10);
                        setFormData(prev => ({ ...prev, guestCount: value }));
                      }}
                      min={1}
                      max={tour?.maxGuest || 10}
                      required
                      className="text-center text-lg font-semibold"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleGuestCountChange(true)}
                    disabled={formData.guestCount >= (tour?.maxGuest || 10)}
                    className="h-10 w-10"
                  >
                    <IconPlus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <IconCreditCard className="w-5 h-5" />
                Booking Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    ৳{tour.costFrom} × {formData.guestCount} guest{formData.guestCount > 1 ? 's' : ''}
                  </span>
                  <span className="font-medium">৳{totalCost}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Service fee</span>
                  <span className="font-medium">৳0</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">৳{totalCost}</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <IconShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-800">Free Cancellation</p>
                    <p className="text-green-600">Cancel up to 48 hours before the tour starts</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" type="button" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isBookingLoading}
              size="lg"
            >
              {isBookingLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-4">
            By confirming this booking, you agree to our terms and conditions.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}