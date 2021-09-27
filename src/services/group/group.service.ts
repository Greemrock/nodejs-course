import { v4 as uuidv4 } from "uuid";
import { DeleteResult, getManager, getRepository, UpdateResult } from "typeorm";
import { GroupModel, GroupModelPayload } from "../../models";
import { Group, User } from "../../data-access/entity";

export const getGroupById = async (id: string): Promise<GroupModel> => {
  const groupRepository = getRepository(Group);
  return groupRepository.findOne({ id: id });
};

export const getGroupByName = async (name: string): Promise<GroupModel> => {
  const groupRepository = getRepository(Group);
  return groupRepository.findOne({ name: name });
};

export const getGroupAll = async (): Promise<GroupModel[]> => {
  const groupRepository = getRepository(Group);
  return groupRepository.find({ relations: ["users"] });
};

export const createGroup = async (
  data: GroupModelPayload
): Promise<GroupModel> => {
  const groupRepository = getRepository(Group);
  const newGroup: GroupModel = {
    ...data,
    id: uuidv4(),
  };
  return groupRepository.save(newGroup);
};

export const updateGroup = async (
  id: string,
  data: GroupModelPayload
): Promise<UpdateResult> => {
  const groupRepository = getRepository(Group);
  return groupRepository.update(id, data);
};

export const deleteGroup = async (id: string): Promise<DeleteResult> => {
  const groupRepository = getRepository(Group);
  return groupRepository.delete(id);
};

export const addUsersToGroup = async (
  groupId: string,
  userIds: string[]
): Promise<void> => {
  const groupRepository = getRepository(Group);
  const userRepository = getRepository(User);

  const userIdsArray = Object.values(userIds).flat();
  const groupToAddUsersIds: Group = await groupRepository.findOne(
    { id: groupId },
    {
      relations: ["users"],
    }
  );

  userIdsArray.forEach(async id => {
    const isUserInGroup =
      groupToAddUsersIds.users.filter(user => user.id === id).length > 0;

    if (isUserInGroup) {
      return;
    }

    const userEntity = await userRepository.findOne({ id: id });

    if (userEntity) {
      groupToAddUsersIds.users.push(userEntity);
    }
  });

  await getManager().transaction(async transactionalEntityManager => {
    await transactionalEntityManager.save(groupToAddUsersIds);
  });
};
