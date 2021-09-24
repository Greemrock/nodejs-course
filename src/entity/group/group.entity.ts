import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { GroupModel } from "../../models";

@Entity()
class Group extends BaseEntity implements GroupModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  persmission: Permissions[];
}

export default Group;
