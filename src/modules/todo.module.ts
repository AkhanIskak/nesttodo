import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entitites/user.entity";
import { TodoController } from "../controllers/todo.controller";
import { TodoService } from "../services/todo.service";
import { TodoEntity } from "../entitites/todo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
