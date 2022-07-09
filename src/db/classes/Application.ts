import {DB_COLLECTIONS} from "../../utils/constants"
import { ObjectId } from 'mongodb'
import mongo from './Mongo'
import { ApplicationDoc } from '../../types'
 

class Application {
    public role: string
    public start_date: string;
    public img: string;
    public source: string;
    public company_name: string;
    public status: string;
    public rejected: boolean;
    public history: History;
    public process_id: string;

    static async find(limit, skip, searchQuery, sortQuery) {
        try {
            return await mongo
                            .db
                            .collection(DB_COLLECTIONS.APPLICATIONS)
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
        return await mongo
                        .db
                        .collection(DB_COLLECTIONS.APPLICATIONS)
                        .find()
                        .toArray()
    }

    static async getTotalCount(query: any) {
        try {
            return await mongo
                            .db
                            .collection(DB_COLLECTIONS.APPLICATIONS)
                            .countDocuments(query)
        } catch (err) {
            console.log(err)
        }
    }
    async create() {
        try {
            const createdApplication = await mongo
                                                .db
                                                .collection(DB_COLLECTIONS.APPLICATIONS)
                                                .insertOne(this);
            await mongo
                    .db
                    .collection(DB_COLLECTIONS.HISTORIES)
                    .insertOne(history);

        } catch (err) {
            console.log(err)
        }

    }
    static async update(id, obj: ApplicationDoc) {
        try {
            return await mongo
                            .db
                            .collection(DB_COLLECTIONS.APPLICATIONS)
                            .updateOne({_id: id},{$set: obj})

        } catch (err) {
            console.log(err)
        }

    }

    static async deleteById(id) {
        try {
            return await mongo
                            .db
                            .collection(DB_COLLECTIONS.APPLICATIONS)
                            .deleteOne({_id: new ObjectId(id)})
        } catch (err) {
            console.log(err)
        }
    }
}

export default Application