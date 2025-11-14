"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface FormDatePickerProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
  placeholder?: string;
}

export function FormDatePicker<T extends FieldValues>({
  name,
  label,
  control,
  placeholder = "Select a date",
}: FormDatePickerProps<T>) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedDate = field.value ? new Date(field.value) : undefined;

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                >
                  {selectedDate ? format(selectedDate, "dd MMM yyyy") : placeholder}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) =>
                    field.onChange(
                      date ? date.toISOString().split("T")[0] : ""
                    )
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
}
