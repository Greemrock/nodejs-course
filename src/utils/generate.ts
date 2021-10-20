import faker from "faker";
import jwt from "jsonwebtoken";

import { GroupModel, Permission, UserModel } from "../models";
import { SECRET_KEY, EXPIRATION_TIME } from "../shared/constant";

export const generateUserPayload = () => {
  return {
    login: `${faker.name.firstName()}1`,
    password: `${faker.name.firstName()}${faker.random.number({
      min: 100,
      max: 999,
    })}`,
    age: faker.random.number({ min: 4, max: 130 }),
  };
};

export const generateUserData = (overide = {}): UserModel => {
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
};

export const generateUsersData = (n = 1): UserModel[] => {
  return Array.from(
    {
      length: n,
    },
    () => generateUserData()
  );
};

export const generateGroupPayload = () => {
  return {
    name: faker.name.firstName(),
    permissions: [Permission.READ],
  };
};

export const generateGroupData = (overide = {}): GroupModel => {
  return {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    permissions: [Permission.READ],
    ...overide,
  };
};

export const generateGroupsData = (n = 1): GroupModel[] => {
  return Array.from(
    {
      length: n,
    },
    () => generateGroupData()
  );
};

export const generateIdUserPayload = () => {
  return faker.random.uuid();
};

export const generateIdUsersData = (n: number): string[] => {
  return Array.from(
    {
      length: n,
    },
    () => generateIdUserPayload()
  );
};

export const generateUsersToGroupData = (overide = {}, n = 1) => {
  return {
    id: faker.random.uuid(),
    users: generateIdUsersData(n),
    ...overide,
  };
};

export const generateToken = (id: string) => {
  const token = jwt.sign({ id }, SECRET_KEY, {
    expiresIn: EXPIRATION_TIME,
  });
  return token;
};
