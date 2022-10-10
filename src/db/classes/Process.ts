import {DB_COLLECTIONS} from "../../utils/constants"
import mongodb, { ObjectId } from 'mongodb'
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
        try {
            return mongo
                        .db
                        .collection(DB_COLLECTIONS.PROCESSES)
                        .deleteOne({_id: new ObjectId(process_id)})
        } catch (error) {
            console.error("Error in deleteOne Process", error.message);
            throw error;
        }

    }
    static async update(process_id: string, process: any) {
        return mongo
        .db
        .collection(DB_COLLECTIONS.PROCESSES)
        .updateOne({_id: new ObjectId(process_id)}, {$set: process})
    }
}

export default Process