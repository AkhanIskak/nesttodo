import { HttpException, Injectable } from "@nestjs/common";
import { ITodo, TodoEntity } from "../entitites/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ObjectId } from "mongodb";
import { User } from "../entitites/user.entity";
export interface ITokenService {
  list(userId: string): ITodo[];
  delete(todoId: string): void;
  update(todoId): ITodo;
  create(data: ITodo): ITodo;
}
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}
  async list(userId: string) {
    const { todo } = await this.userRepo.findOne({
      select: ["todo"],
      where: { _id: new ObjectId(userId) },
    });
    return todo;
  }
  async create(userId: string, todo: ITodo): Promise<ITodo> {
    todo.createdAt = Math.floor(Date.now());
    const user = await this.userRepo.findOne({
      where: { _id: new ObjectId(userId) },
    });
    if (!user) throw new HttpException("User does not exist", 404);
    user.todo ? user.todo.push(<TodoEntity>todo) : (user.todo = [<TodoEntity>todo]);
    await this.userRepo.save(user);
    return todo;
  }
}
