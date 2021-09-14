import { v4 as uuidv4 } from 'uuid';
import { BaseUser, User } from './user.type';
import { usersDB } from './users.db';


export const getUser = async (id: string): Promise<User> => {
  return usersDB.find(elem => elem.id === id);
};

export const getAutoSuggestUsers = async (loginSubstring: string, limit: string): Promise<User[]> => {
  const list = usersDB
    .filter(user => user.login.includes(loginSubstring) && !user.isDeleted)
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, +limit);
  return list;
}

export const createUser = async (user: BaseUser): Promise<User> => { 
  const newUser = {
    ...user,
    id: uuidv4(),
    isDeleted: false,
  };
  usersDB.push(newUser);  
  return newUser;
}

export const updateUser = async (id: string, user: BaseUser): Promise<User> => { 
  const index = usersDB.findIndex(elem => elem.id === id);
  if (index > 0 || index === 0) {
    usersDB[index] = {
      ...usersDB[index],
      ...user,
    }
  }
  return usersDB[index];
}

export const deleteUser = async (id: string): Promise<void> => { 
  const index = usersDB.findIndex(elem => elem.id === id);
  usersDB[index].isDeleted = true;
}