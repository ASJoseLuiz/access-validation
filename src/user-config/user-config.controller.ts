import {
  Body,
  Controller,
  Delete,
  Get,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { ZodValidation } from "src/pipes/zod-validation.pipe";
import {
  deleteUserBodySchema,
  DeleteUserBodySchema,
} from "src/types/user-zod.type";
import { UserFacade } from "src/facade/UserFacade.facade";
import { Response } from "express";
import { AuthGuard } from "src/guards/authentication.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { RoleVerification } from "src/decorators/role.decorator";
import { Access_level } from "@prisma/client";

@Controller()
@UseGuards(AuthGuard, RolesGuard)
export class UserConfigController {
  constructor(private readonly userFacade: UserFacade) {}

  @Get()
  @RoleVerification(Access_level.L5)
  public async handleGetUsers(@Res() response: Response): Promise<void> {
    const users = await this.userFacade.getUsers();
    response.json({
      message: "Usuários retornados com sucesso",
      users: users,
    });
  }

  @Delete()
  @RoleVerification(Access_level.L5)
  @UsePipes(new ZodValidation(deleteUserBodySchema))
  public async handleDeleteUser(
    @Res() response: Response,
    @Body() body: DeleteUserBodySchema
  ): Promise<void> {
    const { email, password } = body;
    const user = await this.userFacade.deleteUser(email, password);
    response.json({
      message: "Usuário deletado com sucesso",
      user: user,
    });
  }
}
