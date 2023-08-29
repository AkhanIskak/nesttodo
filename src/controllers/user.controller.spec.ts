import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { User } from '../entitites/user.entity';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MailerModule } from '../mailer/mailer.module';
import { CacheModule } from '../cache/cache.module';

export const TypeORMMySqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'akhaniskak',
    password: process.env.DATABASE_PASSWORD || 'ahan2004',
    database: process.env.DATABASE_NAME || 'blizhe',
    entities: [...entities],
    synchronize: true,
  });
describe('Usercontroller', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeORMMySqlTestingModule([User]),
        TypeOrmModule.forFeature([User]),
        AuthModule,
        MailerModule,
        CacheModule,
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });
  describe('createRandom', () => {
    it('should create random code', () => {
      console.log(userService.createRandom());
      expect(userService.createRandom());
    });
  });
});
