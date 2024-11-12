import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Access_level, User } from "@prisma/client";
import { compareSync, hash } from "bcrypt";
import { UserServiceInterface } from "../interfaces/user.interface";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUsers(): Promise<User[]> {
    try {
      return await this.prismaService.user.findMany();
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao tentar retornar usuários",
        error: err,
      });
    }
  }

  public async deleteUserByEmail(
    email: string,
    password: string
  ): Promise<User> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new NotFoundException("Usuário não encontrado");
      }

      if (!compareSync(password, user.password)) {
        throw new UnauthorizedException("Email ou senha inválidos");
      }

      return await this.prismaService.user.delete({ where: { email } });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao tentar deletar usuário",
        error: err,
      });
    }
  }

  public async createUser(
    name: string,
    email: string,
    password: string,
    role_id: string
  ): Promise<User> {
    try {
      const verifyUser = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (verifyUser) {
        throw new ConflictException("Usuário já existe");
      }
      const hashedPassword = await hash(password, 8);

      return await this.prismaService.user.create({
        data: { name, email, password: hashedPassword, role_id },
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao tentar criar usuário",
        error: err,
      });
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
        include: { role: true },
      });
      return user;
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao tentar retornar usuário",
        error: err,
      });
    }
  }

  public async getUserAccessLevelByEmail(email: string): Promise<Access_level> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
        include: { role: true },
      });

      if (!user) {
        throw new NotFoundException("Usuário não encontrado");
      }

      return user.role.access_level;
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao tentar retornar o nível de acesso do usuário",
        error: err,
      });
    }
  }
}
