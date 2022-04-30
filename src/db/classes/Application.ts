import {DB_COLLECTIONS} from "../../utils/constants"
import mongodb from 'mongodb'
import mongo from './Mongo'
import { ApplicationDoc } from '../../types'
 

class Application {
    public role: string
    public start_date: string;
    public stage: string;
    public img: string;
    public source: string;
    public company_name: string;
    public status: string;
    public rejected: boolean;
    public history: History
    public collection: string = DB_COLLECTIONS.APPLICATIONS

    static async find(limit, skip, searchQuery, sortQuery) {
        try {
            return await mongo.db.collection(DB_COLLECTIONS.APPLICATIONS)
            .find(searchQuery)
            .sort(sortQuery)
            .limit(Number(limit))
            .skip(Number(skip))
            .toArray();
        } catch(err) {
            console.log(err)
        }
    }

    static async findAll() {
        return await mongo.db.collection(DB_COLLECTIONS.APPLICATIONS)
        .find()
        .toArray()
    }

    static async getTotalCount(query: any) {
        try {
            return await mongo.db.collection(DB_COLLECTIONS.APPLICATIONS).countDocuments(query)
        } catch (err) {
            console.log(err)
        }
    }
    async create() {
        try {
            return await mongo.db.collection(this.collection)
            .insertOne(this)
        } catch (err) {
            console.log(err)
        }

    }
    static async update(id, obj: ApplicationDoc) {
        try {
            return await mongo.db.collection(DB_COLLECTIONS.APPLICATIONS)
            .updateOne({_id: id},{$set: obj})
        } catch (err) {
            console.log(err)
        }

    }
    static async deleteById(id) {
        try {
            return await mongo.db.collection(DB_COLLECTIONS.APPLICATIONS)
            .deleteOne({_id: new mongodb.ObjectId(id)})
        } catch (err) {
            console.log(err)
        }
    }
}

export default Application