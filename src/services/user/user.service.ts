import jwt from "jsonwebtoken";
import { getRepository, Like } from "typeorm";

import { UserModel } from "../../models";
import { User } from "../../data-access/entity";
import { SECRET_KEY, TOKEN_EXPIRATION_TIME } from "../../shared/constant";

export const getUserById = async (id: string): Promise<UserModel> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ id: id });
};

export const getUserByLogin = async (login: string): Promise<UserModel> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ login: login });
};

export const getAutoSuggestUsers = async (
  loginSubstring: string,
  limit: string
): Promise<UserModel[]> => {
  const userRepository = getRepository(User);
  const result = loginSubstring
    ? await userRepository.find({
        login: Like(`%${loginSubstring}%`),
        isDeleted: false,
      })
    : await userRepository.find({
        isDeleted: false,
      });
  return result.sort((a, b) => a.login.localeCompare(b.login)).slice(0, +limit);
};

export const createUser = async (
  data: UserModel
): Promise<{ token: string; user: UserModel }> => {
  const userRepository = getRepository(User);
  const token = jwt.sign({ data }, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRATION_TIME,
  });
  const user = await userRepository.save(data);
  return { token: token, user: user };
};

export const updateUser = async (id: string, data: UserModel) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id: id });

  if (!user) {
    return;
  }

  return await userRepository.save({ ...user, ...data });
};

export const deleteUser = async (id: string): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id: id });

  if (!user) {
    return;
  }

  return userRepository.save({ ...user, isDeleted: true });
};
