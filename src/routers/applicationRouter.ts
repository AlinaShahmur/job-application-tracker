import { createApplication, getAllItems, getPaginatedItems, updateApplication } from '../handlers/applicationHandler';

const {Router} = require('express');
const app = Router();



/*
@route: applications
@path: /
*/
app.get('/', getPaginatedItems)


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
app.put('/:id', updateApplication);

/*
@route: applications
@path: /all
*/
app.get('/all', getAllItems)


export default app