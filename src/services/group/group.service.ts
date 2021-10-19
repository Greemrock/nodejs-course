import { DeleteResult, getManager, getRepository, UpdateResult } from "typeorm";

import { GroupModel } from "../../models";
import { Group, User } from "../../data-access/entity";

export const getGroupById = async (id: string): Promise<GroupModel> => {
  const groupRepository = getRepository(Group);
  return groupRepository.findOne({ id: id }, { relations: ["users"] });
};

export const getGroupAll = async (): Promise<GroupModel[]> => {
  const groupRepository = getRepository(Group);
  return groupRepository.find({ relations: ["users"] });
};

export const createGroup = async (
  data: GroupModel
): Promise<GroupModel | null> => {
  const groupRepository = getRepository(Group);

  const checkLogin = await groupRepository.find({
    where: { name: data.name },
  });

  if (checkLogin.length !== 0) {
    return null;
  }
  return await groupRepository.save(data);
};

export const updateGroup = async (
  id: string,
  data: GroupModel
): Promise<UpdateResult | null> => {
  const groupRepository = getRepository(Group);
  const group = await groupRepository.findOne(
    { id: id },
    {
      relations: ["users"],
    }
  );

  if (!group) {
    return null;
  }

  return groupRepository.update(id, data);
};

export const deleteGroup = async (id: string): Promise<DeleteResult> => {
  const groupRepository = getRepository(Group);
  return groupRepository.delete(id);
};

export const addUsersToGroup = async (
  groupId: string,
  userIds: string[]
): Promise<GroupModel> => {
  const userIdsArray = Object.values(userIds).flat();

  return await getManager().transaction(async transactionalEntityManager => {
    const users = await transactionalEntityManager.findByIds(
      User,
      userIdsArray
    );
    const group = await transactionalEntityManager.findOne(Group, groupId, {
      relations: ["users"],
    });

    if (!users.length) {
      return;
    }

    group.users = [...group.users, ...users];

    return await transactionalEntityManager.save(group);
  });
};
