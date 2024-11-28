import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Cannot be empty"),
});

// on the client side, we can use this type to infer the type of the form values
export type UpdateProfileValues = z.infer<typeof updateProfileSchema>; 