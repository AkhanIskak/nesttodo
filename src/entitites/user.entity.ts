import { Column, Entity, ObjectIdColumn, OneToMany, ObjectId } from "typeorm";
import { TodoEntity } from "./todo.entity";

export interface IUser {
  _id?: ObjectId;
  name: string;
  surname: string;
  email: string;
  created_at?: number;
  password?: string;
  emailConfirmationCode?: number;
  blocked?: boolean;
  emailConfirmed?: boolean;
  refreshToken?: string;
}
@Entity("users")
export class User implements IUser {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column({
    default: Math.floor(Date.now() / 1000),
  })
  created_at: number;

  @Column()
  password: string;

  @Column({ nullable: true })
  emailConfirmationCode: number;

  @Column({ default: false })
  blocked: boolean;

  @Column({ default: false })
  emailConfirmed: boolean;

  @Column({ nullable: true })
  refreshToken: string;

  @Column((type) => TodoEntity)
  todo: TodoEntity[];
}
