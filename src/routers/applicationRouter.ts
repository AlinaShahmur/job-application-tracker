import { createApplication, getAllItems, getPaginatedItems, updateApplication } from '../handlers/applicationHandler';
import { auth } from '../middlewares/auth';
const {Router} = require('express');
const app = Router();



/*
@route: applications
@path: /
*/
app.get('/', auth, getPaginatedItems)


/*
@route: applications
@path: /
*/
app.post('/', auth, createApplication)

/*
@route: applications
@path: /
@params: id
*/
app.put('/:id', auth, updateApplication);

/*
@route: applications
@path: /all
*/
app.get('/all', auth, getAllItems)


export default app