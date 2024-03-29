
import Application from '../db/classes/Application';
import mongo from '../db/classes/Mongo';

import { DB_COLLECTIONS, sortTypes, STATUS, FOUR_WEEKS } from "./constants"

export const buildMongoQuery = (queryString, fields) => {
    const regexToMatch = queryString.length > 0 ?
    RegExp(".*" + queryString + ".*", "i") :
    RegExp(".*") ;
    let orArray;
    orArray = fields.map(field => {
        return {
            [field]: regexToMatch,
        }
    })
    return {$or: orArray}
}

export const buildSortQuery = (sortType) => {
    return sortTypes[sortType]
}

export async function updateStatus() {
    try {
        const pendingApproval = await mongo
                                        .db
                                        .collection(DB_COLLECTIONS.APPLICATIONS)
                                        .find({ status: 'pending'})
                                        .toArray()
                  
        for (let item of pendingApproval) {
            let currentTime = new Date().getTime();
            
            const sortedHistory = item.history.sort((a,b) => new Date(a.date).getTime() > new Date(b.date).getTime());
            
            let lastStatusUpdated = new Date(sortedHistory[0].date).getTime();
            if (currentTime - lastStatusUpdated > FOUR_WEEKS) {
                item.status = STATUS.REJECTED;
                await Application.update(item._id, item);
            }
        }
    } catch(err) {
        console.log('Error in update applications status', err);
    }
}