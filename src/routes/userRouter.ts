import { Router } from 'express';
import * as UserService from '../user/user.service';
import { bodySchema } from '../joi';
import { createValidator } from 'express-joi-validation';
import { HttpStatusCode } from '../statusCode';
import { BaseUser } from '../user/user.type';

export const userRouter = Router();
const validator = createValidator();

userRouter.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserService.getUser(id);
    console.log('Get user by id:', user);
    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).send('User not found');
    } else if (user.isDeleted === true) {
      return res.status(HttpStatusCode.BAD_REQUEST).send('User deleted, please try another request');
    }
    res.status(HttpStatusCode.OK).send(user);
    
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(e.message);
  }
});

userRouter.get('/users', async (req, res) => {
  const {loginSubstring = '', limit = '10'} = req.query;
  if ( typeof loginSubstring !== 'string' ) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send('Invalid loginSubstring');
    return;
  }
  if (typeof limit !== 'string') {
    res.status(HttpStatusCode.INTERNAL_SERVER).send('Invalid limit');
    return;
  }
  try {
    const user = await UserService.getAutoSuggestUsers(loginSubstring, limit);
    console.log('Get all users:', user);
    if (user) {
      return res.status(HttpStatusCode.OK).send(user);
    }
    res.status(HttpStatusCode.NOT_FOUND).send('item not found');
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(e.message);
  }
});

userRouter.post('/users', validator.body(bodySchema), async (req, res) => {
  const baseUser = req.body as BaseUser;
  try {
    const user = await UserService.createUser(baseUser);
    res.status(HttpStatusCode.CREATE).send(user);
    console.log('Create new user:', user);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(e.message);
  }
});

userRouter.put('/users/:id', validator.body(bodySchema), async (req, res) => {
  const id = req.params.id;
  const baseUser = req.body as BaseUser;
  try {
    const user = await UserService.updateUser(id, baseUser);
    if (Object.keys(user).length === 0 ) {
      return res.status(HttpStatusCode.NOT_FOUND).send('User is not found');
    } else if (user.isDeleted === true) {
      return res.status(HttpStatusCode.BAD_REQUEST).send('User deleted, please try another request');
    }
    res.status(HttpStatusCode.OK).send();
    console.log('Update user!');
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).send('User is not found');
  }
});

userRouter.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await UserService.deleteUser(id);
    res.status(HttpStatusCode.OK).send();
    console.log('Delete user! id - ', id);
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).send('User is not found');
  }
});
