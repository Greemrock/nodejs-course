import { Entity, Column } from "typeorm";

@Entity()
export class User {
  @Column()
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  age: string;

  @Column()
  isDeleted: boolean;
}
