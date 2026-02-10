"use client";

import { Control, Controller, FieldPath, FieldValues, useFormState } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { getNestedError } from "@/utils/getFieldError";

interface FormDateRangePickerProps<T extends FieldValues> {
  startName: FieldPath<T>;
  endName: FieldPath<T>;
  label: string;
  control: Control<T>;
}

export function FormDateRangePicker<T extends FieldValues>({
  startName,
  endName,
  label,
  control,
}: FormDateRangePickerProps<T>) {

  const { errors } = useFormState({ control });
  const startError = getNestedError(errors, startName);
  const endError = getNestedError(errors, endName);



  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <Controller
        name={startName}
        control={control}
        render={({ field: startField }) => (
          <Controller
            name={endName}
            control={control}
            render={({ field: endField }) => {
              const startDate = startField.value ? new Date(startField.value) : undefined;
              const endDate = endField.value ? new Date(endField.value) : undefined;

              const range: DateRange | undefined =
                startDate || endDate
                  ? { from: startDate, to: endDate }
                  : undefined;

              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start"
                    >
                      {range?.from
                        ? range.to
                          ? `${format(range.from, "dd MMM yyyy")} - ${format(
                            range.to,
                            "dd MMM yyyy"
                          )}`
                          : format(range.from, "dd MMM yyyy")
                        : "Select Date Range"}

                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="p-0">
                    <Calendar
                      mode="range"
                      selected={range}
                      onSelect={(r) => {
                        startField.onChange(
                          r?.from ? r.from.toISOString().split("T")[0] : ""
                        );
                        endField.onChange(
                          r?.to ? r.to.toISOString().split("T")[0] : ""
                        );
                      }}
                      numberOfMonths={2}
                      initialFocus
                    />
                  </PopoverContent>
                  {(startError || endError) && (
                    <p className="text-xs text-red-500 mt-1">
                      {startError || endError}
                    </p>
                  )}
                  
                </Popover>
              );
            }}
          />
        )}
      />
    </div>
  );
}
