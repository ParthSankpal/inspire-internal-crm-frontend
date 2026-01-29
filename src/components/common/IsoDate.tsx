"use client";

interface IsoDateProps {
  value: string | Date | null | undefined;
}

export function IsoDate({ value }: IsoDateProps) {
  if (!value) return <span>—</span>;

  const date = new Date(value);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
   const monthName = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  const formatted = `${day}-${monthName}-${year}`;

  return <span>{formatted}</span>;
}
