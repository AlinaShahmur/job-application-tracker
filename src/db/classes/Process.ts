import {DB_COLLECTIONS} from "../../utils/constants"
import mongodb from 'mongodb'
import mongo from './Mongo'
import { ProcessDoc } from "../../types";


class Process {
    public name: string;
    public user: string;

    static async findByIds(processesIds) {
        return mongo
                        .db
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .find({_id: {$in: processesIds}})
                        .toArray()
    }

    static async find(query = {}) {
        return mongo
                        .db
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .find(query)
                        .toArray()
    }

    async create() {
        const newProcess = {
            name: this.name,
            user: this.user
        }
        return mongo
                        .db
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .insertOne(newProcess)
    }
    static async findAll() {
        return mongo
                        .db
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .find()
                        .toArray()
    }
    static async deleteOne(process_id) {
        return mongo
                        .db
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .deleteOne({_id: process_id})
    }
    static async update(process_id: string, process: ProcessDoc) {
        return mongo
        .db
        .collection(DB_COLLECTIONS.PROCESSES)
        .updateOne({_id: process_id}, {$set: process})
    }
}

export default Process