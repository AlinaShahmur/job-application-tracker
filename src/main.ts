import express from 'express';
import cors from 'cors';
import cron from 'cron';
import dotenv from 'dotenv';
import applicationRouter from './routers/applicationRouter';
import userRouter from './routers/userRouter';
import processRouter from './routers/processRouter';
import sourcesRouter from './routers/sourcesRouter';
import mongoDb from './db/classes/Mongo'
import bodyParser from 'body-parser';
import path from 'path';


import { updateStatus } from './utils/dbOperations';
import { auth } from './middlewares/auth';

dotenv.config();

const app = express();
const CronJob = cron.CronJob;

const port = process.env.PORT || 8000;

app.get('/', (req,res) => {
    res.send('Job Application Tracker')
})

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/applications',auth, applicationRouter);
app.use('/api/users', auth, userRouter);
app.use('/api/processes', auth, processRouter);
app.use('/api/sources', auth, sourcesRouter);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port,async () => {
    try {
        await mongoDb.connect()
        console.log(`Listening on port ${port}`)
        console.log(`Connected to mongo in ${process.env.NODE_ENV} mode`)

    } catch (err) {
        console.log("Error in listen", err)
    }
})

const job = new CronJob({
    cronTime: '0 12 * * *',
    onTick: updateStatus,
    start: true
})

