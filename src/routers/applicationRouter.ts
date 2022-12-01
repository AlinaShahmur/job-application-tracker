import { createApplication, deleteApplication, getAllItems, getApplicationsByStatuses, getPaginatedItems, updateApplication } from '../handlers/applicationHandler';
const {Router} = require('express');
const app = Router();


/*
@route: applications
@path: /byStatuses
*/
app.get('/byStatuses', getApplicationsByStatuses);

/*
@route: applications
@path: /all
*/

app.get('/all', getAllItems);

/*
@route: applications
@path: /
*/
app.get('/', getPaginatedItems);


/*
@route: applications
@path: /
*/

app.post('/', createApplication);

/*
@route: applications
@path: /
@params: id
*/

app.put('/:id', updateApplication);

/*
@route: applications
@path: /
@params: id
*/

app.delete('/:id', deleteApplication);




export default app