import { addNewSource, getAllSources, getSourcesPercentages } from "../handlers/sourcesHandler";
import { auth } from "../middlewares/auth";

const {Router} = require('express');
const app = Router();

app.get('/percentages', getSourcesPercentages);

app.get('/', getAllSources);

app.post('/',addNewSource);

export default app