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
  label?: string;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
};

export function FormCombobox<T extends FieldValues>({
  name,
  label,
  control,
  options,
  placeholder = "Select...",
}: Props<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = options.find((o) => o.value === field.value);

        return (
          <div className="flex flex-col gap-1 w-full">
            {label && <label className="text-sm font-medium">{label}</label>}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  type="button"
                >
                  {selected ? selected.label : placeholder}
                </Button>
              </PopoverTrigger>

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
            </Popover>
          </div>
        );
      }}
    />
  );
}
