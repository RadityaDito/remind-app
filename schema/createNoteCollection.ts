import { CollectionColors } from "@/lib/constants";
import { z } from "zod";

export const createNoteCollectionSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Collection Name must be at least 4 characters long" }),
  color: z
    .string()
    .refine((color) => Object.keys(CollectionColors).includes(color)),
});

export type createNoteCollectionSchemaType = z.infer<
  typeof createNoteCollectionSchema
>;
