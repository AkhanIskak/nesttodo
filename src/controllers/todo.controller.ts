import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { CreateTodo } from "../dtos/todo";
import { TodoService } from "../services/todo.service";
import { ITodo, TodoEntity } from "../entitites/todo.entity";
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller("/todo")
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  @ApiBody({ type: CreateTodo })
  createTodo(@Req() req, @Body() body: CreateTodo) {
    return this.todoService.create(req.user.userId, body);
  }
  @Get()
  @ApiResponse({ type: TodoEntity, isArray: true })
  getTodo(@Req() { user }): Promise<ITodo[]> {
    return this.todoService.list(user.userId);
  }
}
