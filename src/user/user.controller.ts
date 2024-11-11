import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ZodValidation } from "src/pipes/zod-validation.pipe";
import {
  CreateUserBodySchema,
  createUserBodySchema,
} from "src/types/user-zod.type";
import { User } from "src/abstractFactory/Entities/User";
import { UserFacade } from "src/facade/UserFacade.facade";

@Controller()
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Post()
  @UsePipes(new ZodValidation(createUserBodySchema))
  public async handleCreateUser(
    @Body() body: CreateUserBodySchema
  ): Promise<User> {
    const { name, email, password, userType } = body;
    return this.userFacade.createUser(name, email, password, userType);
  }
}
