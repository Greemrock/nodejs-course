import Faker from "faker";
import { define } from "typeorm-seeding";
import { Group } from "../../entity";

define(Group, (faker: typeof Faker) => {
  const user = new Group();
  user.id = faker.random.uuid();
  user.name = "";
  user.permissions = ["READ"];
  return user;
});
