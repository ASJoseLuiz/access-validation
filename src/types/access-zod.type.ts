import { z } from "zod";
import { Access_level } from "@prisma/client";

export const RoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  access_level: z.nativeEnum(Access_level),
});

export const payloadSchema = z.object({
  sub: z.string().uuid(),
  email: z.string().email(),
  role: RoleSchema,
});

export type PayloadSchema = z.infer<typeof payloadSchema>;
