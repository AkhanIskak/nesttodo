import { HttpException, Injectable } from "@nestjs/common";
import { ITodo, TodoEntity } from "../entitites/todo.entity";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, MongoRepository, Repository } from "typeorm";
import { ObjectId } from "mongodb";
import { User } from "../entitites/user.entity";
import { async } from "rxjs";
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
  async list(userId: string) {
    return await this.todoRepo.find({ where: { user: userId } });
  }
  async create(userId: string, todo: ITodo): Promise<ITodo> {
    todo.createdAt = Math.floor(Date.now() / 1000);
    todo.user = userId;
    return this.todoRepo.save(todo);
  }
}
