import { createApplication, getAllItems, updateApplication } from '../handlers/applicationHandler';

const {Router} = require('express');
const app = Router();


/*
@route: applications
@path: /
*/
app.get('/', getAllItems)


/*
@route: applications
@path: /
*/
app.post('/', createApplication)

/*
@route: applications
@path: /
@params: id
*/
app.put('/:id', updateApplication)

export default app