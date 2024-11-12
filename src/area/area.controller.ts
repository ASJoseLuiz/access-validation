import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { Access_level, Area } from "@prisma/client";
import { Response } from "express";
import { AuthGuard } from "src/guards/authentication.guard";
import { ZodValidation } from "src/pipes/zod-validation.pipe";
import {
  CreateAreaBodySchema,
  createAreaBodySchema,
} from "src/types/area-zod.type";
import { AccessStrategy } from "src/decorators/access-strategy.decorator";
import { AccessControllFacade } from "src/facade/AccessControlFacade.facade";
import { AreaGuard } from "src/guards/area.guard";
import { RoleVerification } from "src/decorators/role.decorator";
import { RolesGuard } from "src/guards/roles.guard";

@Controller()
@UseGuards(AuthGuard, RolesGuard)
export class AreaController {
  constructor(private readonly accessControlFacade: AccessControllFacade) {}

  @Get()
  public async handleGetHospitalAreas(): Promise<Area[]> {
    return await this.accessControlFacade.getHospitalAreas();
  }

  @Post()
  @RoleVerification(Access_level.L5)
  @UsePipes(new ZodValidation(createAreaBodySchema))
  public async handleCreateArea(
    @Body() body: CreateAreaBodySchema
  ): Promise<void> {
    const { name, description, required_access_level } = body;
    await this.accessControlFacade.createHospitalArea(
      name,
      description,
      required_access_level
    );
  }

  @Get("hierarchy/:area_id")
  @AccessStrategy("hierarchy")
  @UseGuards(AreaGuard)
  public async handleGetHierarchyAreaAccess(
    @Param("area_id") area_id: string,
    @Request() req,
    @Res() response: Response
  ): Promise<void> {
    const user_id = req.user.sub;

    const accessLog = await this.accessControlFacade.getAccessLogView(
      user_id,
      area_id
    );

    response.json({
      message: "Acesso Permitido",
      view: accessLog,
    });
  }

  @Get(":area_id")
  @AccessStrategy("level")
  @UseGuards(AreaGuard)
  public async handleGetAccess(
    @Param("area_id") area_id: string,
    @Request() req,
    @Res() response: Response
  ): Promise<void> {
    const user_id = req.user.sub;

    const accessLog = await this.accessControlFacade.getAccessLogView(
      user_id,
      area_id
    );

    response.json({
      message: "Acesso permitido",
      view: accessLog,
    });
  }
}
