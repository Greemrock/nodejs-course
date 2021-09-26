import { v4 as uuidv4 } from "uuid";
import { getRepository } from "typeorm";
import { UserModel, UserModelPayload } from "../../models";
import { User } from "../../data-access/entity";

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
        login: loginSubstring,
        isDeleted: false,
      })
    : await userRepository.find({
        isDeleted: false,
      });
  return result.sort((a, b) => a.login.localeCompare(b.login)).slice(0, +limit);
};

export const createUser = async (
  data: UserModelPayload
): Promise<UserModel> => {
  const userRepository = getRepository(User);
  const newUser = {
    ...data,
    id: uuidv4(),
    isDeleted: false,
  };
  await userRepository.save(newUser);
  return newUser;
};

export const updateUser = async (
  id: string,
  data: UserModelPayload
): Promise<UserModel> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  return userRepository.save({ ...user, ...data });
};

export const deleteUser = async (id: string): Promise<void> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  userRepository.save({ ...user, isDeleted: true });
};
