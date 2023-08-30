import { AfterLoad, Column, Entity, ObjectIdColumn } from "typeorm";

export interface ITodo {
  name: string;
  description: string;
  createdAt?: number;
  finishedAt?: number;
  user: string;
}
@Entity()
export class TodoEntity implements ITodo {
  @ObjectIdColumn()
  id: string;
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
  @Column()
  user: string;
  //convert id from Object id to simple string
  @AfterLoad()
  convertIdToString() {
    this.id = this.id.toString();
  }
}
