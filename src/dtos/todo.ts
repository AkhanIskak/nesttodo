import { ITodo } from "../entitites/todo.entity";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTodo implements ITodo {
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsString()
  name: string;
}
