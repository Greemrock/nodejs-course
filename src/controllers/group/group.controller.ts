import { Request, Response } from "express";
import { GroupModelPayload } from "../../models";
import { GroupService } from "../../services";
import { HttpStatusCode } from "../../utils";

export const get = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await GroupService.getGroupById(id);
    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json("Group not found");
    }
    res.status(HttpStatusCode.OK).send(user);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(e.message);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const group = await GroupService.getGroupAll();
    if (group.length) {
      return res.status(HttpStatusCode.OK).send(group);
    }
    res.status(HttpStatusCode.NOT_FOUND).json("Groups not found");
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(e.message);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const baseGroup = req.body as GroupModelPayload;
    const findGroup = await GroupService.getGroupByName(baseGroup.name);
    if (findGroup) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json("Group already exists, please try another name");
    }
    const group = await GroupService.createGroup(baseGroup);
    res.status(HttpStatusCode.CREATE).send(group);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(e.message);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const baseGroup = req.body as GroupModelPayload;
    await GroupService.updateGroup(id, baseGroup);
    res.status(HttpStatusCode.OK).json(`Group ${id} updated`);
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).json("Group is not found");
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await GroupService.deleteGroup(id);
    res.status(HttpStatusCode.OK).json(`Group ${id} deleted`);
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).json("Group not found");
  }
};
