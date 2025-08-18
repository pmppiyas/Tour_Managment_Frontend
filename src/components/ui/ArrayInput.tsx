/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import type { TourFormData } from '@/page/admin/Add_Tour';
import { Input } from '@/components/ui/input';
import { Trash } from "lucide-react";

export function ArrayInput({
  name,
  label,
  control,
  register,
}: {
  name: keyof TourFormData;
  label: string;
  control: any;
  register: any;
}) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <Input
            {...register(`${name}.${index}` as const)}
            placeholder={`Enter ${label} item`}
          />
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-600"
            size="icon"
            onClick={() => remove(index)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append("")}
        className="w-full"
      >
        ➕ Add {label}
      </Button>
    </div>
  );
}