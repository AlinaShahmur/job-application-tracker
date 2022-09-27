import {DB_COLLECTIONS} from "../../utils/constants"
import mongodb, { ObjectId } from 'mongodb'
import mongo from './Mongo'


class User {
    name: string;
    email: string;
    processes: ObjectId[];
    collection: string = DB_COLLECTIONS.USERS
    
    static async getUserByEmail(email: string) {
        try {
            return await mongo
                            .db
                            .collection(DB_COLLECTIONS.USERS)
                            .findOne({email: email})
        } catch(err) {
            console.log(err);
            throw new Error(err)
        }

    }
    async create() {
        try {
            const newUser = {
                email: this.email, 
                processes: this.processes         
            }
            return await mongo
                            .db
                            .collection(DB_COLLECTIONS.USERS)
                            .insertOne(newUser)
        } catch (err) {
            console.log(err);
            throw new Error(err)
        }
    }

    static async attachNewProcess(email: string, process_id: string) {
        try {
            return await mongo
                            .db
                            .collection(DB_COLLECTIONS.USERS)
                            .updateOne({email: email}, {$addToSet: {processes: process_id}})
        } catch (err) {
            console.log(err);
            throw new Error(err)
        }
    }
}

export default User