import { Factory, Seeder } from "typeorm-seeding";
import { Permission } from "../../../models";
import { Group } from "../../entity";

export class CreateGroup implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Group)().create({
      name: "admin",
      permissions: [
        Permission.DELETE,
        Permission.READ,
        Permission.SHARE,
        Permission.UPLOAD_FILES,
        Permission.WRITE,
      ],
    });
    await factory(Group)().create({
      name: "user",
      permissions: [Permission.READ],
    });
    await factory(Group)().create({
      name: "developer",
      permissions: [Permission.READ, Permission.WRITE, Permission.UPLOAD_FILES],
    });
  }
}
