import { StageDoc } from "../../types";
import mongo from './Mongo'
import { DB_COLLECTIONS } from "../../utils/constants";



export class AppHistory {
    public application_id;
    public history: StageDoc[];
    
    
    pushToHistory(stage: StageDoc) {
        this.history.push(stage);
    }

    getLastHistory() {
        return this.history.reduce((prev: any, curr: any) => {
            return (prev.date.getMilliseconds() > curr.date.getMilliseconds()) ? prev : curr
        },{})
    }
    static async getHistoryByApplicationId(application_id: any) {
        return await mongo
                        .db
                        .collection(DB_COLLECTIONS.HISTORIES)
                        .find({application_id: application_id})
    }

    async save() {
        return await mongo  
                        .db
                        .collection(DB_COLLECTIONS.HISTORIES)
                        .insertOne(this)
    }
}