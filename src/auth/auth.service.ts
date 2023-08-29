import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { createHash } from "node:crypto";
import token from "../config/auth.config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entitites/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user && user.password === this.createHash(pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  createHash(str: string): string {
    return createHash("md5").update(str).digest("hex");
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    const refresh_token = await this.jwtService.signAsync(payload);
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: refresh_token,
    };
  }
  createAccessToken(payload) {
    return this.jwtService.signAsync(payload, {
      secret: token.ACCESS_SECRET,
      expiresIn: token.ACCESS_EXPIRE,
    });
  }
  createRefreshToken(payload) {
    return this.jwtService.signAsync(payload, {});
  }
}
