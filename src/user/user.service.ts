import { v4 as uuidv4 } from 'uuid';
import { BaseUser, User } from './user.type';
import { users } from './users';


export const getUser = async (id: string): Promise<User> => {
  return users.find(elem => elem.id === id);
};

export const getAutoSuggestUsers = async (loginSubstring: string, limit: string): Promise<User[]> => {
  const list = users
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
  users.push(newUser);  
  return newUser;
}

export const updateUser = async (id: string, user: BaseUser): Promise<void> => { 
  const index = users.findIndex(elem => elem.id === id);
  if (index > 0 || index === 0) {
    users[index] = {
      ...users[index],
      ...user,
    }
  }
}

export const deleteUser = async (id: string): Promise<void> => { 
  const index = users.findIndex(elem => elem.id === id);
  users[index].isDeleted = true;
}