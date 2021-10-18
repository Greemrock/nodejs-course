import { UserModel } from "./../models/user/user.model";
import faker from "faker";

export function generateUserPayload() {
  return {
    login: `${faker.name.firstName()}1`,
    password: `${faker.name.firstName()}${faker.random.number({
      min: 100,
      max: 999,
    })}`,
    age: faker.random.number({ min: 4, max: 130 }),
  };
}

export function generateUserData(overide = {}): UserModel {
  return {
    id: faker.random.uuid(),
    login: `${faker.name.firstName()}1`,
    password: `${faker.name.firstName()}${faker.random.number({
      min: 100,
      max: 999,
    })}`,
    age: faker.random.number({ min: 4, max: 130 }),
    isDeleted: false,
    ...overide,
  };
}

export function generateUsersData(n = 1): UserModel[] {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateUserData();
    }
  );
}
