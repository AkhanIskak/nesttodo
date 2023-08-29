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
    console.log(userId)
    const data = await this.userRepo.findOne({
      where: { _id: new ObjectId(userId) },
    });
    console.log(data);
    return data;
  }
  async create(userId: string, todo: ITodo): Promise<ITodo> {
    const user = await this.userRepo.findOne({
      where: { _id: new ObjectId(userId) },
    });
    if (!user) throw new HttpException("User does not exist", 401);
    user.todo ? user.todo.push(todo) : (user.todo = [todo]);
    await this.userRepo.save(user);
    return todo;
  }
}
