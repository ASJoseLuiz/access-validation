import { Access_level } from "@prisma/client";
import { z } from "zod";

export const createAreaBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  required_access_level: z.nativeEnum(Access_level),
});

export type CreateAreaBodySchema = z.infer<typeof createAreaBodySchema>;
