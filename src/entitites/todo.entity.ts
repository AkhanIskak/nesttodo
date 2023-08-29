import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn } from "typeorm";
import { User } from "./user.entity";

export interface ITodo {
  name: string;
  description: string;
  createdAt?: number;
  finishedAt?: number;
}
@Entity()
export class TodoEntity implements ITodo {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ type: "string" })
  name: string;
  @Column({ type: "string" })
  description: string;
  //Unix timestamp
  @Column() // This sets the default value to the current timestamp
  createdAt?: number;
  //Unix time
  @Column() // This sets the default value to the current timestamp
  finishedAt?: number;
  @ManyToOne(() => User, (user) => user.todo)
  user: User;
}
