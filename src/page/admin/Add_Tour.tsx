import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTourZodObject } from "@/components/modules/tour/tour.validation";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrayInput } from "@/components/ui/ArrayInput";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { useAddTourMutation } from '@/redux/features/tour/tour.api';
import { useGetTourtypeQuery } from '@/redux/features/tour/tourType.api';
import { useGetAllDivisionQuery } from '@/redux/features/division/division.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { IError } from '@/types';

export type TourFormData = z.infer<typeof createTourZodObject>;

export default function Add_Tour() {
  const [addTour] = useAddTourMutation();
  const { data: tourTypes, isLoading: tourTypeLoading } = useGetTourtypeQuery(undefined);
  const { data: divisions, isLoading: divisionLoading } = useGetAllDivisionQuery(undefined);

  const navigate = useNavigate();


  const form = useForm<TourFormData>({
    resolver: zodResolver(createTourZodObject),
    defaultValues: {
      name: "",
      description: [],
      images: [],
      location: "",
      tourType: "",
      division: "",
      departureLocation: "",
      arrivalLocation: "",
      costFrom: 0,
      startDate: "",
      endDate: "",
      maxGuest: 0,
      minAge: 0,
      included: [],
      excluded: [],
      amenities: [],
      tourPlan: [],
    },
  });

  const onSubmit: SubmitHandler<TourFormData> = async (data) => {

    try {
      await addTour(data).unwrap();
      navigate("/admin/all_tour")
      toast.success("Tour added successfully.");
    } catch (err) {
      const error = err as IError;
      console.error(error);
      if (error.status === 500) {
        form.setError("email", {
          type: "manual",
          message: "User is not verified.",
        });
        toast.error(error.data.message);
      }
    }
  };
  return (
    <div className=" p-4  rounded-lg shadow-sm">
      <h1 className="text-3xl text-center uppercase font-medium mb-6">
        Add Tour
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 *:space-y-2"
        >
          {/* Tour Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div>
                <FormLabel>Tour Name</FormLabel>
                <FormControl>
                  <Input placeholder="Amazing Tour" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <div>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Location" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          {/* Tour Type */}

          <FormField
            control={form.control}
            name="tourType"
            render={({ field }) => (
              <FormItem className="flex-1 ">
                <FormLabel>Tour Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={tourTypeLoading}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tourTypes?.map(
                      (item: { name: string; _id: string }) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Division */}
          <FormField
            control={form.control}
            name="division"
            render={({ field }) => (
              <FormItem className="flex-1 ">
                <FormLabel>Division</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={divisionLoading}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {divisions?.map(
                      (item: { name: string; _id: string }) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Departure & Arrival */}
          <FormField
            control={form.control}
            name="departureLocation"
            render={({ field }) => (
              <div>
                <FormLabel>Departure Location</FormLabel>
                <FormControl>
                  <Input placeholder="From where?" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="arrivalLocation"
            render={({ field }) => (
              <div>
                <FormLabel>Arrival Location</FormLabel>
                <FormControl>
                  <Input placeholder="Destination" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          {/* Cost */}
          <FormField
            control={form.control}
            name="costFrom"
            render={({ field }) => (
              <div>
                <FormLabel>Cost From</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Amount by TK" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          {/* Dates */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <div>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <div>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          {/* Max Guest & Min Age */}
          <div className="md:col-span-2 flex gap-6 md:gap-12 *:space-y-2">
            <FormField
              control={form.control}
              name="maxGuest"
              render={({ field }) => (
                <div className="flex-1">
                  <FormLabel>Max Guest</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="minAge"
              render={({ field }) => (
                <div className="flex-1">
                  <FormLabel>Minimum Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="12" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </div>


          <h2 className="text-xl font-semibold md:col-span-2 ">Optional Fields ⤵️</h2>

          <div className='col-span-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12'>

            <ArrayInput name="included" label="Included" control={form.control} register={form.register} />
            <ArrayInput name="excluded" label="Excluded" control={form.control} register={form.register} />
            <ArrayInput name="amenities" label="Amenities" control={form.control} register={form.register} />
            <ArrayInput name="tourPlan" label="Tour Plan" control={form.control} register={form.register} />
            <div className="md:col-span-full">
              <ArrayInput name="description" label="Description" control={form.control} register={form.register} />
            </div>
          </div>



          {/* Submit Button */}
          <div className="md:col-span-full">
            <Button type="submit" className="w-full py-3 text-lg" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Submitting..." : "Create Tour"}
            </Button>
          </div>
        </form>
      </Form>
    </div >
  )
}
