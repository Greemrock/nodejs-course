import { Factory, Seeder } from "typeorm-seeding";
import { Group } from "../../entity";

export class CreateGroup implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Group)().createMany(10);
  }
}
