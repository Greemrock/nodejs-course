export type UserModel = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export type UserModelPayload = {
  login: string;
  password: string;
  age: number;
};
