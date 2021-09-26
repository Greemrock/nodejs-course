import { Factory, Seeder } from "typeorm-seeding";
import { Group } from "../../entity";

export class CreateGroup implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Group)().create({
      name: "admin",
      permissions: ["READ", "SHARE", "WRITE", "DELETE", "UPLOAD_FILES"],
    });
    await factory(Group)().create({
      name: "user",
      permissions: ["READ", "WRITE"],
    });
  }
}
