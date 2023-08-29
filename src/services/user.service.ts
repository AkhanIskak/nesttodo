import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitites/user.entity';
import { Repository } from 'typeorm';
import { InjectConfig } from 'nestjs-config';
import { AuthService } from '../auth/auth.service';
import { AccessRefreshResponse } from '../dtos/accessRefresh.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usrRepo: Repository<User>,
    @InjectConfig() private readonly config,
    @Inject(forwardRef(() => AuthService))
    private authServ: AuthService,
  ) {}

  async register(user) {
    user.password = this.authServ.createHash(user.password);
    user.emailConfirmationCode = Number(this.createRandom());
    const dublicate = await this.usrRepo.findOne({
      where: { email: user.email },
    });
    if (dublicate) throw new HttpException('Email is not unique', 409);
    await this.usrRepo.save(user);
    return new AccessRefreshResponse({
      accessToken: await this.authServ.createAccessToken({
        email: user.email,
        sub: user.id,
      }),
      refreshToken: await this.authServ.createRefreshToken({
        email: user.email,
        sub: user.id,
      }),
    });
  }
  createRandom(size = 6): string {
    let result = '';
    for (let i = 0; i < size; i++) {
      const digit = Math.floor(Math.random() * 10);
      result += digit;
    }
    return result;
  }
  whoiam(email: string) {
    return this.usrRepo.findOne({ where: { email } });
  }
}
