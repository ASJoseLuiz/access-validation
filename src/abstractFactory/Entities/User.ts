import { Access_level } from "@prisma/client";

export class User {
  protected name: string;
  protected id: string;
  protected email: string;
  protected password: string;
  protected role_id: string;
  protected access_level: Access_level;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role_id: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role_id = role_id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }
}
