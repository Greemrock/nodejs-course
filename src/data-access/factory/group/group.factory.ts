import Faker from "faker";
import { define } from "typeorm-seeding";

import { Permission } from "../../../models";
import { Group } from "../../entity";

define(Group, (faker: typeof Faker) => {
  const group = new Group();
  group.id = faker.random.uuid();
  group.name = "";
  group.permissions = [Permission.READ];
  return group;
});
