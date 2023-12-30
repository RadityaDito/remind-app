import { z } from "zod";

export const createNoteSchema = z.object({
  collectionId: z.number().nonnegative(),
  title: z.string().nonempty(),
  content: z.string().min(8, {
    message: "Note content must be at least 8 characters long",
  }),
});

export type createNoteSchemaType = z.infer<typeof createNoteSchema>;
