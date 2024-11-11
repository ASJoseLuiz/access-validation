import { Access_level } from "@prisma/client";
import { NonFunc } from "./NonFunc";

export class Visitor extends NonFunc {
  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role_id: string
  ) {
    super(id, name, email, password, role_id);
    this.access_level = Access_level.L1;
  }
}