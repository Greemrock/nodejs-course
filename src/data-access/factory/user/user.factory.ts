import Faker from "faker";
import { define } from "typeorm-seeding";
import { User } from "../../entity";

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.id = faker.random.uuid();
  user.login = faker.name.firstName();
  user.password = faker.internet.password();
  user.age = faker.random.number({ min: 4, max: 130 });
  user.isDeleted = false;
  return user;
});
