import { createProcess, getProcessesByUserEmail } from '../handlers/processHandler';

const {Router} = require('express');
const app = Router();


/*
    @route: processes
    @path: /
    @params: userEmail
*/
app.get('/:userEmail',  getProcessesByUserEmail)

/*
    @route: processes
    @path: /
*/
app.post('/', createProcess)

export default app