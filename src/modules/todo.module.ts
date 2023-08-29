import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "../controllers/user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entitites/user.entity";
import { UserService } from "../services/user.service";
import { TodoEntity } from "../entitites/todo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, TodoEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
