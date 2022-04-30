import express from 'express';
import cors from 'cors';
import cron from 'cron';
import dotenv from 'dotenv';
import applicationRouter from './routers/applicationRouter'
import mongoDb from './db/classes/Mongo'
//import { updateStatus } from './utils/dbOperations';

dotenv.config();

const app = express();
const CronJob = cron.CronJob;



// const { updateStatus } = require('./utils/dbOperations');
const port = process.env.PORT || 8000
app.get('/', (req,res) => {
    res.send('Job-analyze-server')
})

app.use(express.json())
app.use(cors())
app.use('/api/applications',applicationRouter)
app.listen(port,async () => {
    try {
        await mongoDb.connect()
        console.log(`Listening on port ${port}`)
        console.log(`Connected to mongo in ${process.env.NODE_ENV} mode`)
        // const job = new CronJob({
        //     //cronTime: '0 12 * * *',
        //     cronTime: '1/1 * * * *',
        //     onTick: updateStatus,
        //     start: true
        // })
    } catch (err) {
        console.log("Error in listen", err)
    }
})

