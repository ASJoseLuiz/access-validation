import { Access_level, User } from "@prisma/client";

export interface UserServiceInterface {
  createUser(
    name: string,
    email: string,
    password: string,
    role_id: string
  ): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUserAccessLevelByEmail(email: string): Promise<Access_level>;
  deleteUserByEmail(email: string, password: string): Promise<User>;
  getUsers(): Promise<User[]>;
}
