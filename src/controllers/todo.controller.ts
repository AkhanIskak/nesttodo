import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { CreateTodo } from "../dtos/todo";
import { TodoService } from "../services/todo.service";
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller("/todo")
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  @ApiBody({ type: CreateTodo })
  createTodo(@Req() req, @Body() body: CreateTodo) {
    console.log(req.user.userId);
    return this.todoService.create(req.user.userId, body);
  }
  @Get()
  getTodo(@Req() { user }) {
    console.log(user);
    return this.todoService.list(user.userId);
  }
}
