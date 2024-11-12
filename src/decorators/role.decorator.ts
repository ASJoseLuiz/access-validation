import { SetMetadata } from "@nestjs/common";
import { Access_level } from "@prisma/client";

export const ROLE_KEY = "role";
export const RoleVerification = (role: Access_level) =>
  SetMetadata(ROLE_KEY, role);
