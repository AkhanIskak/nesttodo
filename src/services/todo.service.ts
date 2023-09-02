import { Injectable } from "@nestjs/common";
import { ITodo, TodoEntity } from "../entitites/todo.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, MongoRepository } from "typeorm";

export interface ITokenService {
  list(userId: string): ITodo[];

  delete(todoId: string): void;

  update(todoId): ITodo;

  create(data: ITodo): ITodo;
}

@Injectable()
export class TodoService {
  private todoRepo: MongoRepository<TodoEntity>;

  constructor(
    @InjectDataSource()
    private mongo: DataSource
  ) {
    this.todoRepo = mongo.getMongoRepository(TodoEntity);
  }

  async list(userId: string, name?: string) {
    const search: any = { user: userId };
    if (name) search.name = name;
    return await this.todoRepo.find({ where: search });
  }

  async create(userId: string, todo: ITodo): Promise<ITodo> {
    todo.createdAt = Math.floor(Date.now() / 1000);
    todo.user = userId;
    const createdTodo = await this.todoRepo.save(todo);
    createdTodo.id = createdTodo.id.toString();
    return createdTodo;
  }

  async delete(todoId: string) {
    await this.todoRepo.delete({ id: todoId });
  }

  editTodo(body: ITodo, id: string) {
    return this.todoRepo.update({ id }, body);
  }
}
