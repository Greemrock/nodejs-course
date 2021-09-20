import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { UserModel } from "../types/user.entity";

@Entity()
export class User extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ default: false })
  isDeleted: boolean;
}
