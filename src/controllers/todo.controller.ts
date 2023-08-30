import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { CreateTodo, TodoResponse } from "../dtos/todo";
import { TodoService } from "../services/todo.service";
import { ITodo } from "../entitites/todo.entity";
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller("/todo")
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  @ApiBody({ type: CreateTodo, description: "Название и описание задачи" })
  @ApiNotFoundResponse({ description: "User does not exist" })
  createTodo(@Req() req, @Body() body: CreateTodo) {
    return this.todoService.create(req.user.userId, <ITodo>body);
  }
  @Get()
  @ApiResponse({ type: TodoResponse, isArray: true })
  getTodo(@Req() { user }): Promise<ITodo[]> {
    return this.todoService.list(user.userId);
  }

  @Delete(":id")
  @ApiParam({ name: "id", description: "Id of todo you want to delete" })
  deleteTodo(@Param() params) {
    return this.todoService.delete(params.id);
  }
}
