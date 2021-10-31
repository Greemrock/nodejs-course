import { UserModelPayload } from "./../../models/user/user.model";
import { getRepository, Like } from "typeorm";

import { UserModel } from "../../models";
import { User } from "../../data-access/entity";

export const getUserById = async (id: string): Promise<UserModel> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ id });
};

export const getUserByLogin = async (login: string): Promise<UserModel> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ login });
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
  data: UserModelPayload
): Promise<UserModel | null> => {
  const userRepository = getRepository(User);

  const checkLogin = await userRepository.find({
    where: { login: data.login, isDeleted: false },
  });

  if (checkLogin.length !== 0) {
    return null;
  }
  return await userRepository.save(data);
};

export const updateUser = async (
  id: string,
  data: UserModel
): Promise<UserModel> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id });

  if (!user) {
    return;
  }

  return await userRepository.save({ ...user, ...data });
};

export const deleteUser = async (id: string): Promise<UserModel> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id });

  if (!user) {
    return;
  }

  return userRepository.save({ ...user, isDeleted: true });
};
