import { z } from "zod";

export const omrRowSchema = z.object(
  z.union([z.string(), z.number(), z.null()])
);

export const omrUploadSchema = z.object({
  rows: z.array(omrRowSchema).min(1, "No OMR rows found"),
});

export type OMRUploadData = z.infer<typeof omrUploadSchema>;
