import {DB_COLLECTIONS} from "../../utils/constants"
import mongodb from 'mongodb'
import mongo from './Mongo'


class Process {
    public name: string;
    public user_id: string;
    public applications: string[];
    public collection: string = DB_COLLECTIONS.PROCESSES

    static async findByIds(processesIds) {
        return await mongo
                        .db
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .find({_id: {$in: processesIds}})
                        .toArray()
    }

    async create() {
        const newProcess = {
            name: this.name,
            user_id: this.user_id,
            applications: this.applications
        }
        return await mongo
                        .db
                        .collection(this.collection)
                        .insertOne(newProcess)
    }
}

export default Process