import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface ITodo {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  finishedAt: number;
}
@Entity()
export class TodoEntity implements ITodo {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: "string" })
  name: string;
  @Column({ type: "string" })
  description: string;
  @Column({ type: "number" })
  createdAt: number;
  @Column({ type: "number" })
  finishedAt: number;
}
