import { createProcess, getProcesses } from '../handlers/processHandler';

const {Router} = require('express');
const app = Router();


/*
    @route: processes
    @path: /
*/
app.get('/', getProcesses)

/*
    @route: processes
    @path: /
*/
app.post('/', createProcess)

export default app