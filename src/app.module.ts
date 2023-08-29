import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { UserModule } from './modules/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      path: path.resolve(__dirname, '..', '.env')
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          ...config.get('database'),
          entities: [path.resolve(__dirname + '/../dist/**/*.entity{.ts,.js}')],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
