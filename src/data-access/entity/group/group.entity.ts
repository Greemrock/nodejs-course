import {
  Entity,
  Column,
  BaseEntity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { User } from "..";
import { Permission } from "../../../models";

@Entity("groups")
export class Group extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({
    array: true,
    type: "enum",
    enum: Permission,
    default: [],
  })
  permissions: Array<Permission>;

  @ManyToMany(() => User, user => user.group, {
    cascade: true,
  })
  @JoinTable()
  users: User[];
}
