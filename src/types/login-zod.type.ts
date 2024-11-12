import { z } from "zod";

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().regex(regex),
});

export type LoginBodySchema = z.infer<typeof loginBodySchema>;
