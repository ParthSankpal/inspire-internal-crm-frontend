"use client";

import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
};

export function FormCombobox<T extends FieldValues>({
  name,
  control,
  options,
  placeholder = "Select...",
  disabled = false,
}: Props<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected =
          options.find((o) => o.value === field.value) ??
          (field.value
            ? { value: field.value, label: field.value }
            : undefined);

        return (
          <Popover open={open} onOpenChange={(v) => !disabled && setOpen(v)}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                disabled={disabled}
                className="w-full justify-start"
              >
                {selected ? selected.label : placeholder}
              </Button>
            </PopoverTrigger>

            {!disabled && (
              <PopoverContent className="p-0 w-full">
                <Command>
                  <CommandInput placeholder={placeholder} />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup>
                      {options.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          onSelect={() => {
                            field.onChange(opt.value);
                            setOpen(false);
                          }}
                        >
                          {opt.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            )}
          </Popover>
        );
      }}
    />
  );
}
