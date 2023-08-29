import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entitites/user.entity";
import { TodoController } from "../controllers/todo.controller";
import { TodoService } from "../services/todo.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
