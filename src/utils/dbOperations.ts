
// const { TWO_WEEKS, STATUS } = require('./constants');
// import  Application  from "../db/classes/Application";

import { sortTypes } from "./constants"

export const buildMongoQuery = (queryString, fields) => {
    const regexToMatch = queryString.length > 0 ?
    RegExp(".*" + queryString + ".*", "i") :
    RegExp(".*")  
    let orArray = fields.map(field => {
        return {
            [field]: regexToMatch,
        }
    })
    return {$or: orArray}
}

export const buildSortQuery = (sortType) => {
    return sortTypes[sortType]
}

// export async function updateStatus() {
//     try {
//         let now = new Date().getTime();
//         let twoWeeksAgo = new Date(now-TWO_WEEKS)
//         const pendingApproval = await Application
//                                         .find({
//                                             status: 'pending',
//                                             "history.date.getTime()": { $lt: twoWeeksAgo}
//                                         })
        
//         console.log(pendingApproval)            
//         // for (let item of pendingApproval) {
//         //     let currentTime = new Date().getTime();
//         //     let lastStatusUpdated = item.history.date.getTime()
//         //     if (currentTime - lastStatusUpdated > TWO_WEEKS) {
//         //         item.status = STATUS.REJECTED;
//         //         await Application.update(item._id, item)
//         //     }
//         // }
//     } catch(err) {
//         console.log('Error in update applications status', err);
//     }

// }