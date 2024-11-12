import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { compareSync } from "bcrypt";
import { TOKEN } from "./token.dto";
import { PayloadSchema, payloadSchema } from "src/types/access-zod.type";

@Injectable()
export class AuthService {
  private key: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {
    this.key = this.configService.get<string>("JWT_PRIVATE_KEY");
  }

  public async validateUser(email: string, password: string): Promise<TOKEN> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user || !compareSync(password, user.password)) {
      throw new UnauthorizedException("Email ou senha inválidos");
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: {
        id: user.role.id,
        name: user.role.name,
        description: user.role.description,
        access_level: user.role.access_level,
      },
    };

    payloadSchema.parse(payload);

    return this.generateToken(payload);
  }

  private async generateToken(payload: PayloadSchema): Promise<TOKEN> {
    return {
      token: this.jwtService.sign(
        {
          sub: payload.sub,
          email: payload.email,
          role: payload.role,
        },
        {
          secret: this.key,
          expiresIn: "60m",
        }
      ),
    };
  }
}
