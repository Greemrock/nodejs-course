import { Group } from "./../group/group.entity";
import { Entity, Column, BaseEntity, ManyToMany, PrimaryColumn } from "typeorm";
import { UserModel } from "../../../models";

@Entity("users")
export class User extends BaseEntity implements UserModel {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToMany(() => Group, group => group.users)
  group: Group[];
}
