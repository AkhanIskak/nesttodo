import { forwardRef, HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entitites/user.entity";
import { Repository } from "typeorm";
import { InjectConfig } from "nestjs-config";
import { AuthService } from "../auth/auth.service";
import { AccessResponse } from "../dtos/accessToken.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usrRepo: Repository<User>,
    @InjectConfig() private readonly config,
    @Inject(forwardRef(() => AuthService))
    private authServ: AuthService
  ) {}

  async register(user) {
    user.password = this.authServ.createHash(user.password);
    const dublicate = await this.usrRepo.findOne({
      where: { email: user.email },
    });
    if (dublicate) throw new HttpException("Email is not unique", 409);
    const savedUser = await this.usrRepo.save(user);
    return new AccessResponse({
      accessToken: await this.authServ.createAccessToken({
        email: savedUser.email,
        sub: savedUser.id,
      }),
    });
  }
  whoiam(email: string) {
    return this.usrRepo.findOne({ where: { email } });
  }
}
