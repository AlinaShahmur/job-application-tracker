import {DB_COLLECTIONS} from "../../utils/constants";
import mongo from './Mongo';
import { ApplicationDoc, HistoryDoc } from '../../types';
import { ObjectId } from "mongodb";

class Application {
    public role: string
    public start_date: Date;
    public img: string;
    public source: string;
    public company_name: string;
    public status: string;
    public process_id: ObjectId;
    public history: HistoryDoc[];

    async find(limit, skip, searchQuery, sortQuery) {
        try {
            return await mongo
                            .db
                            .collection(DB_COLLECTIONS.APPLICATIONS)
                            .find({...searchQuery, process_id: this.process_id})
                            .sort(sortQuery)
                            .limit(Number(limit))
                            .skip(Number(skip))
                            .toArray();
        } catch(err) {
            console.error(err);
            throw err
        }
    }

    async findAll() {
        return await mongo
                        .db
                        .collection(DB_COLLECTIONS.APPLICATIONS)
                        .find({process_id: this.process_id})
                        .toArray()
    }

    async getTotalCount(query: any) {
        try {
            return await mongo
                            .db
                            .collection(DB_COLLECTIONS.APPLICATIONS)
                            .countDocuments({...query, process_id: this.process_id})
        } catch (err) {
            console.error(err);
            throw err
        }
    }
    async create() {
        try {
            const createdApplication = await mongo
                                                .db
                                                .collection(DB_COLLECTIONS.APPLICATIONS)
                                                .insertOne(this);
            return createdApplication.insertedId;

        } catch (err) {
            console.error(err);
            throw err
        }

    }
    static async update(id, obj: ApplicationDoc) {
        try {
            return await mongo
                            .db
                            .collection(DB_COLLECTIONS.APPLICATIONS)
                            .updateOne({_id:  new ObjectId(id)},{$set: obj})

        } catch (err) {
            console.error(err);
            throw err
        }

    }

    static async deleteById(id) {
        try {
            return await mongo
                            .db
                            .collection(DB_COLLECTIONS.APPLICATIONS)
                            .deleteOne({_id: new ObjectId(id)})
        } catch (err) {
            console.error(err);
            throw err
        }
    }
}

export default Application