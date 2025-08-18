import { z } from "zod";

export const createTourZodObject = z.object({
  name: z.string().min(2, "Minimum two characters needed."),
  description: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  location: z.string(),
  tourType: z.string().nonempty("Tour type is required"),
  division: z.string().nonempty("Division is required"),
  departureLocation: z.string(),
  arrivalLocation: z.string(),
  costFrom: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number()
  ),

  startDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d{3})?(Z|[\+\-]\d{2}:\d{2})?$/,
      "Start date must be a valid ISO datetime string (e.g. 2025-08-16T10:00:00Z)"
    ),
  endDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d{3})?(Z|[\+\-]\d{2}:\d{2})?$/,
      "End date must be a valid ISO datetime string"
    ),

  included: z.array(z.string()).optional().default([]),
  excluded: z.array(z.string()).optional().default([]),
  amenities: z.array(z.string()).optional().default([]),
  tourPlan: z.array(z.string()).optional().default([]),

  maxGuest: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  minAge: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
});
