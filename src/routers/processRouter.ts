import { createProcess, getProcessesByUserEmail } from '../handlers/processHandler';
import { auth } from '../middlewares/auth';

const {Router} = require('express');
const app = Router();


/*
    @route: processes
    @path: /
    @params: userEmail
*/
app.get('/:userEmail', auth, getProcessesByUserEmail)

/*
    @route: processes
    @path: /
*/
app.post('/', auth, createProcess)

export default app