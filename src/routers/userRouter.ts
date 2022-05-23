import { getUser } from '../handlers/userHandler';

const {Router} = require('express');
const app = Router();


/*
@route: users
@path: /
@params: email
*/

app.get('/:email', getUser)

export default app