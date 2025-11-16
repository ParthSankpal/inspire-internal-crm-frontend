"use client";

import * as React from "react";
import { Controller } from "react-hook-form";

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

type Props = {
  name: string;
  label?: string;
  control: any;
  options: Option[];
  placeholder?: string;
};

export function FormCombobox({
  name,
  label,
  control,
  options,
  placeholder = "Select...",
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = options.find((o) => o.value === field.value);

        return (
          <div className="flex flex-col gap-1 w-full">
            {label && <label className="text-sm font-medium">{label}</label>}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start"
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
                          value={opt.value}
                          onSelect={() => {
                            field.onChange(opt.value);
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
