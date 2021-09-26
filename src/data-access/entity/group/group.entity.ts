import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Permission } from "../../../models";

@Entity("groups")
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({
    array: true,
    type: "enum",
    enum: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
    default: [],
  })
  permissions: Array<Permission>;
}
