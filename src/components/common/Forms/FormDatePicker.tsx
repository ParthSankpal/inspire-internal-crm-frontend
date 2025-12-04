"use client";

import * as React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FormDatePickerProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export function FormDatePicker<T extends FieldValues>({
  name,
  label,
  control,
  placeholder = "Select date",
  disabled = false,
  error,
}: FormDatePickerProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedDate = field.value ? new Date(field.value) : undefined;

          return (
            <>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                      "w-full justify-between font-normal",
                      error && "border-red-500 text-red-600"
                    )}
                  >
                    {selectedDate
                      ? format(selectedDate, "dd/MM/yyyy")
                      : placeholder}

                    <ChevronDownIcon className="h-4 w-4 opacity-60" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={selectedDate}
                    onSelect={(date) => {
                      field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                      setOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
