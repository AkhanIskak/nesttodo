import { ITodo } from "../entitites/todo.entity";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateTodo implements Partial<ITodo> {
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @Transform(() => Math.floor(Date.now() / 1000))
  createdAt: number;
}
export class TodosQuery {
  @ApiProperty({ description: "name of the todo" })
  name: string;
}
export class TodoResponse implements Partial<ITodo> {
  @ApiProperty()
  description: string;
  @ApiProperty({ description: "Unix timestamp" })
  finishedAt: number;
  @ApiProperty({ description: "Unix timestamp" })
  createdAt: number;
  @ApiProperty()
  name: string;
}
