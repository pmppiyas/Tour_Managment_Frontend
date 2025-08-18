import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
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

import { useAddTourMutation } from '@/redux/features/tour/tour.api';
import { useGetTourtypeQuery } from '@/redux/features/tour/tourType.api';
import { useGetAllDivisionQuery } from '@/redux/features/division/division.api';

export type TourFormData = z.infer<typeof createTourZodObject>;

export default function Add_Tour() {
  const [addTour] = useAddTourMutation();
  const { data: tourTypes } = useGetTourtypeQuery(undefined);
  const { data: divisions } = useGetAllDivisionQuery(undefined);

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
    console.log("✅ Submitted Tour Data:", data);
    try {
      await addTour(data).unwrap();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="my-10 p-6 border rounded-lg shadow-sm bg-accent ">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Tour</h2>

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
              <div>
                <FormLabel>Tour Type</FormLabel>
                <FormControl>
                  <select {...field} className="w-full border rounded px-3 py-2 bg-accent">
                    <option value="">Select Tour Type</option>
                    {tourTypes?.map((type: any) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          {/* Division */}
          <FormField
            control={form.control}
            name="division"
            render={({ field }) => (
              <div>
                <FormLabel>Division</FormLabel>
                <FormControl>
                  <select {...field} className="w-full border rounded px-3 py-2 bg-accent">
                    <option value="">Select Division</option>
                    {divisions?.map((division: any) => (
                      <option key={division.id} value={division.id}>
                        {division.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </div>
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
    </div>
  )
}
