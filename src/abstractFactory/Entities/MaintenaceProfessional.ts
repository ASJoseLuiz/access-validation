import { Access_level } from "@prisma/client";
import { Func } from "./Func";

export class MaintenaceProfessional extends Func {
  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role_id: string
  ) {
    super(id, name, email, password, role_id);
    this.access_level = Access_level.L3;
  }
}