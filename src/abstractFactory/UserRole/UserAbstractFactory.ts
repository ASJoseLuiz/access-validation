import { Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import { User } from "../Entities/User";

@Injectable()
export abstract class UserAbstractFactory {
  abstract createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User>;
  abstract createRole(name: string, description: string): Promise<Role>;
}
