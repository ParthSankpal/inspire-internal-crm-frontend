"use client";

interface IsoDateProps {
  value: string | Date | null | undefined;
}

export function IsoDate({ value }: IsoDateProps) {
  if (!value) return <span>—</span>;

  const date = new Date(value);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formatted = `${day}-${month}-${year}`;

  return <span>{formatted}</span>;
}
