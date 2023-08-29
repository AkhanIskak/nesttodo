import { ITodo } from "../entitites/todo.entity";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateTodo implements ITodo {
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsString()
  name: string;

  @Transform(() => Math.floor(Date.now() / 1000))
  createdAt: number;
}
