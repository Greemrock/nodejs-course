import { Request, Response } from "express";

import { GroupService } from "../../services";
import { HttpStatusCode } from "../../utils";

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await GroupService.getGroupById(id);

    if (!user) {
      res.status(HttpStatusCode.NOT_FOUND).json("Group not found");
    } else {
      res.status(HttpStatusCode.OK).send(user);
    }
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
    const baseGroup = req.body;
    const group = await GroupService.createGroup(baseGroup);

    if (!group) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json("Group already exists, please try another name");
    } else {
      res.status(HttpStatusCode.CREATE).send(group);
    }
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(e.message);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const group = await GroupService.updateGroup(id, body);

    if (group) {
      res.status(HttpStatusCode.OK).json(`Group updated`);
    } else {
      res.status(HttpStatusCode.BAD_REQUEST).json("Check id group");
    }
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(e.message);
  }
};

export const addUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const group = await GroupService.addUsersToGroup(id, body);

    if (group) {
      res.status(HttpStatusCode.OK).json("Group updated");
    } else {
      res.status(HttpStatusCode.BAD_REQUEST).json("Check id users");
    }
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(e.message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedGroup = await GroupService.deleteGroup(id);

    if (deletedGroup) {
      res.status(HttpStatusCode.OK).json("Group deleted");
    } else {
      res.status(HttpStatusCode.BAD_REQUEST).json("Check id group");
    }
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(e.message);
  }
};
