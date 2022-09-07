import {DB_COLLECTIONS} from "../../utils/constants"
import mongodb from 'mongodb'
import mongo from './Mongo'


class Process {
    public name: string;
    public user_id: string;
    public applications: string[];

    static async findByIds(processesIds) {
        return await mongo
                        .db
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .find({_id: {$in: processesIds}})
                        .toArray()
    }

    static async find(query = {}) {
        return await mongo
                        .db
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .find(query)
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
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .insertOne(newProcess)
    }
    static async findAll() {
        return await mongo
                        .db
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .find()
                        .toArray()
    }
    static async deleteOne(process_id) {
        return await mongo
                        .db
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .deleteOne({_id: process_id})
    }
}

export default Process