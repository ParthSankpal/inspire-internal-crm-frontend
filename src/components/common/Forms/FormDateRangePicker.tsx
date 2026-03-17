"use client";

import { Control, Controller, FieldPath, FieldValues, useFormState } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format, addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { getNestedError } from "@/utils/getFieldError";

interface FormDateRangePickerProps<T extends FieldValues> {
  startName: FieldPath<T>;
  endName: FieldPath<T>;
  label: string;
  control: Control<T>;
  onChange?: (range: { startDate: string; endDate: string }) => void;
}

export function FormDateRangePicker<T extends FieldValues>({
  startName,
  endName,
  label,
  control,
  onChange,
}: FormDateRangePickerProps<T>) {

  const { errors } = useFormState({ control });
  const startError = getNestedError(errors, startName);
  const endError = getNestedError(errors, endName);

  const [activePreset, setActivePreset] = useState("month");

  /* =========================
     DEFAULT → TODAY + 30 DAYS
  ========================= */
  useEffect(() => {
    const today = new Date();
    const future = addDays(today, 30);

    const start = format(today, "yyyy-MM-dd");
    const end = format(future, "yyyy-MM-dd");

    onChange?.({ startDate: start, endDate: end });
  }, []);

  /* =========================
     PRESETS
  ========================= */
  const applyPreset = (type: string, startField: any, endField: any) => {
    const today = new Date();

    let startDate = today;
    let endDate = today;

    if (type === "today") {
      // same day
    }

    if (type === "7days") {
      endDate = addDays(today, 7);
    }

    if (type === "month") {
      endDate = addDays(today, 30);
    }

    const start = format(startDate, "yyyy-MM-dd");
    const end = format(endDate, "yyyy-MM-dd");

    startField.onChange(start);
    endField.onChange(end);

    onChange?.({ startDate: start, endDate: end });
    setActivePreset(type);
  };

  return (
    <div className="space-y-2">
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
                      className="w-full justify-between font-normal"
                    >
                      <span>
                        {range?.from
                          ? range.to
                            ? `${format(range.from, "dd MMM yyyy")} - ${format(
                                range.to,
                                "dd MMM yyyy"
                              )}`
                            : format(range.from, "dd MMM yyyy")
                          : "Select Date Range"}
                      </span>

                      <CalendarIcon className="h-4 w-4 opacity-60" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-4 space-y-4" align="start">

                    {/* 🔥 PRESET TABS */}
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant={activePreset === "today" ? "default" : "outline"}
                        onClick={() => applyPreset("today", startField, endField)}
                      >
                        Today
                      </Button>

                      <Button
                        size="sm"
                        variant={activePreset === "7days" ? "default" : "outline"}
                        onClick={() => applyPreset("7days", startField, endField)}
                      >
                        7 Days
                      </Button>

                      <Button
                        size="sm"
                        variant={activePreset === "month" ? "default" : "outline"}
                        onClick={() => applyPreset("month", startField, endField)}
                      >
                        30 Days
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setActivePreset("custom")}
                      >
                        Custom
                      </Button>
                    </div>

                    {/* 📅 CALENDAR */}
                    <Calendar
                      mode="range"
                      selected={range}
                      onSelect={(r) => {
                        const start = r?.from
                          ? format(r.from, "yyyy-MM-dd")
                          : "";

                        const end = r?.to
                          ? format(r.to, "yyyy-MM-dd")
                          : "";

                        startField.onChange(start);
                        endField.onChange(end);

                        onChange?.({
                          startDate: start,
                          endDate: end,
                        });

                        setActivePreset("custom");
                      }}
                      numberOfMonths={2}
                      initialFocus
                    />

                    {(startError || endError) && (
                      <p className="text-xs text-red-500">
                        {startError || endError}
                      </p>
                    )}
                  </PopoverContent>
                </Popover>
              );
            }}
          />
        )}
      />
    </div>
  );
}