import { v4 as uuidv4 } from 'uuid';
import { User } from './user.type';

export const usersDB: User[] = [
  {
    login: 'andrey',
    password: 'andrey1',
    age: 123,
    id: uuidv4(),
    isDeleted: false,
  }
];