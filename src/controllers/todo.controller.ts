import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateTodo, TodoResponse, TodosQuery } from "../dtos/todo.dto";
import { TodoService } from "../services/todo.service";
import { ITodo } from "../entitites/todo.entity";
@UseGuards(JwtAuthGuard)
@ApiTags("Todos")
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller("/todo")
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  @ApiBody({ type: CreateTodo, description: "Название и описание задачи" })
  @ApiNotFoundResponse({ description: "User does not exist" })
  @ApiResponse({ description: "Returns created user", type: TodoResponse })
  createTodo(@Req() req, @Body() body) {
    return this.todoService.create(req.user.userId, <ITodo>body);
  }
  @Get()
  @ApiQuery({ description: "Query todos", type: TodosQuery })
  @ApiResponse({ type: TodoResponse, isArray: true })
  getTodo(@Req() { user }, @Query() query): Promise<ITodo[]> {
    return this.todoService.list(user.userId, query.name);
  }

  @Delete(":id")
  @ApiParam({ description: "Id of the todo you want to delete", name: "id" })
  @ApiParam({ name: "id", description: "Id of todo you want to delete" })
  deleteTodo(@Param() params) {
    return this.todoService.delete(params.id);
  }
  @Patch(":id")
  @ApiParam({ description: "Id of the todo you want to edit", name: "id" })
  editTodo(@Req() req, @Param() params) {
    return this.todoService.editTodo(req.body, params.id);
  }
}
