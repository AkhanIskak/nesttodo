import { Column, CreateDateColumn, Entity } from "typeorm";

export interface ITodo {
  name: string;
  description: string;
  createdAt?: number;
  finishedAt?: number;
}
export class TodoEntity implements ITodo {
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
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
