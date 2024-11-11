import { User } from "./User";

export abstract class NonFunc extends User {
  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role_id: string
  ) {
    super(id, name, email, password, role_id);
  }
}