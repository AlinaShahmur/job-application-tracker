import { 
    createProcess,
    deleteProcess,
    getProcessesByUserEmail,
    updateProcess 
} from '../handlers/processHandler';

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

/*
    @route: processes
    @path: /:process_id
*/
app.put('/:process_id', updateProcess)

/*
    @route: processes
    @path: /
    @params: process_id
*/
app.delete('/:process_id', deleteProcess)

export default app