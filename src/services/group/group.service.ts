import { v4 as uuidv4 } from "uuid";
import { DeleteResult, getRepository, UpdateResult } from "typeorm";
import { GroupModel, GroupModelPayload } from "../../models";
import { Group } from "../../data-access/entity";

export const getGroupById = async (id: string): Promise<GroupModel> => {
  const groupRepository = getRepository(Group);
  return groupRepository.findOne({ id: id }, { relations: ["users"] });
};

export const getGroupByName = async (name: string): Promise<GroupModel> => {
  const groupRepository = getRepository(Group);
  return groupRepository.findOne({ name: name }, { relations: ["users"] });
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
  groupRepository.save(newGroup);

  const createdGroup = await groupRepository.findOne(newGroup.id, {
    relations: ["users"],
  });
  return createdGroup;
};

export const updateGroup = async (
  id: string,
  data: GroupModelPayload
): Promise<UpdateResult | Group> => {
  const groupRepository = getRepository(Group);
  const groupToUpdate = await groupRepository.findOne(id, {
    relations: ["users"],
  });

  if (groupToUpdate) {
    return groupRepository.update(id, data);
  }
  return groupToUpdate;
};

export const deleteGroup = async (id: string): Promise<DeleteResult> => {
  const groupRepository = getRepository(Group);
  return groupRepository.delete(id);
};
