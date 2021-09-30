export enum Permission {
  READ = "READ",
  WRITE = "WRITE",
  DELETE = "DELETE",
  SHARE = "SHARE",
  UPLOAD_FILES = "UPLOAD_FILES",
}

export type GroupModel = {
  id: string;
  name: string;
  permissions: Array<Permission>;
};

export type UserToGroupModelPayload = {
  userIds: string[];
};
