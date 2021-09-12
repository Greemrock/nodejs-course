import express from 'express';
import { createValidator } from 'express-joi-validation';
import { HttpStatusCode } from './statusCode';
import * as UserService from './user/user.service';
import { BaseUser } from './user/user.type';
import { bodyQuerySchema } from './joi';

const app = express();
app.use(express.json());
const port = 3000;
const validator = createValidator();

/* CRUD operations for Users */
app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserService.getUser(id);
    console.log('Get user by id:', user);
    if (user) {
      return res.status(HttpStatusCode.OK).send(user);
    }
    res.status(HttpStatusCode.NOT_FOUND).send('item not found');
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(e.message);
  }
});

app.get('/users', async (req, res) => {
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

app.post('/users', validator.body(bodyQuerySchema), async (req, res) => {
  const baseUser = req.body as BaseUser;
  try {
    const user = await UserService.createUser(baseUser);
    res.status(HttpStatusCode.CREATE).send(user);
    console.log('Create new user:', user);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(e.message);
  }
});

app.put('/users/:id', validator.body(bodyQuerySchema), async (req, res) => {
  const id = req.params.id;
  const baseUser = req.body as BaseUser;
  try {
    await UserService.updateUser(id, baseUser);
    res.status(HttpStatusCode.OK).send();
    console.log('Update user!');
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).send('User is not found');
  }
});

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await UserService.deleteUser(id);
    res.status(HttpStatusCode.OK).send();
    console.log('Delete user! id - ', id);
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).send('User is not found');
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});