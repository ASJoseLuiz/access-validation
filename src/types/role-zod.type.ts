import { Access_level } from "@prisma/client";
import { z } from "zod";

export const createRoleBodySchema = z.object({
  name: z.string(),
  description: z.string().max(50),
  access_level: z.nativeEnum(Access_level),
});

export const deleteRoleBodySchema = z.object({
  access_level: z.nativeEnum(Access_level),
});

export type CreateRoleBodySchema = z.infer<typeof createRoleBodySchema>;

export type DeleteRoleBodySchema = z.infer<typeof deleteRoleBodySchema>;
