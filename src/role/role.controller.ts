import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { Access_level, Role } from "@prisma/client";
import { Response } from "express";
import { RoleVerification } from "src/decorators/role.decorator";
import { RoleFacade } from "src/facade/RoleFacade.facade";
import { AuthGuard } from "src/guards/authentication.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { ZodValidation } from "src/pipes/zod-validation.pipe";
import {
  CreateRoleBodySchema,
  createRoleBodySchema,
  DeleteRoleBodySchema,
  deleteRoleBodySchema,
} from "src/types/role-zod.type";

@Controller()
@UseGuards(AuthGuard, RolesGuard)
export class RoleController {
  constructor(private readonly roleFacade: RoleFacade) {}

  @Get()
  @RoleVerification(Access_level.L5)
  public async handleGetRoles(): Promise<Role[]> {
    return this.roleFacade.getRoles();
  }

  @Post()
  @RoleVerification(Access_level.L5)
  @UsePipes(new ZodValidation(createRoleBodySchema))
  public async handleCreateRole(
    @Body() body: CreateRoleBodySchema,
    @Res() response: Response
  ): Promise<void> {
    const { name, description, access_level } = body;
    const role = this.roleFacade.createRole(name, description, access_level);

    response.json({
      message: "Papel criado",
      role: role,
    });
  }

  @Delete()
  @RoleVerification(Access_level.L5)
  @UsePipes(new ZodValidation(deleteRoleBodySchema))
  public async handleDeleteRole(
    @Body() body: DeleteRoleBodySchema,
    @Res() response: Response
  ): Promise<void> {
    const { access_level } = body;
    const role = await this.roleFacade.deleteRole(access_level);

    response.json({
      message: "Papel deletado",
      role: role,
    });
  }
}
