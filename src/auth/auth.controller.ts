import { Body, Controller, Post, Res, UsePipes } from "@nestjs/common";
import { ZodValidation } from "src/pipes/zod-validation.pipe";
import { LoginBodySchema, loginBodySchema } from "src/types/login-zod.type";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidation(loginBodySchema))
  public async handleLogin(
    @Body() body: LoginBodySchema,
    @Res() response: Response
  ): Promise<void> {
    const { email, password } = body;
    const tokenData = await this.authService.validateUser(email, password);

    response.json({
      message: "Login bem-sucedido",
      token: tokenData.token,
    });
  }
}
