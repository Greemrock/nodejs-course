import Faker from "faker";
import { internet } from "faker/locale/en";
import { define } from "typeorm-seeding";
import { User } from "../../entity";

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.id = faker.random.uuid();
  user.login = faker.fake("{{name.lastName}}, {{datatype.number}}");
  user.password = internet.password();
  user.age = faker.random.number({ max: 130 });
  user.isDeleted = false;
  return user;
});
