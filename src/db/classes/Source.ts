import { ObjectId } from 'mongodb'
import { DB_COLLECTIONS } from '../../utils/constants';
import mongo from './Mongo'


export class Source {
    public process_id: ObjectId;
    public sources: string[];
    
    public async getAll() {
        try {
            const sources = await mongo
            .db     
            .collection(DB_COLLECTIONS.SOURCES)
            .find({process_id: this.process_id})
            .toArray()
            
            return sources.length > 0 
                    ? sources[0].sources
                    : []
        }catch(err) {
            console.error("Error in get sources" + err);
            throw err
        }
    }

    public async pushNewSource(source_name: string) {
        try {
            const source = await this.getSourceObj();
            console.log({source});
            let source_id;

            if (source === null) {
                let res = await this.createSourceObject();
                source_id = res.insertedId;
            } else {
                source_id = source._id
            }
            return this.updateSourceObj(source_id, source_name);

        } catch (err) {
            console.error("Error in push source" + err);
            throw err;
        }
    }

    private async createSourceObject() {
        try {
            const newSourceObj = {
                process_id: this.process_id,
                sources: []
            }
            return mongo
                .db
                .collection(DB_COLLECTIONS.SOURCES)
                .insertOne(newSourceObj)
        } catch (err) {
            console.error("Error in createSourceObject" + err);
            throw err;
        }
    }

    private async getSourceObj() {
        try {
            return mongo
                    .db     
                    .collection(DB_COLLECTIONS.SOURCES)
                    .findOne({process_id: this.process_id})

        }catch(err) {
            console.error("Error in get source object" + err);
            throw err
        }
    }
    private async updateSourceObj(sourceObjId: ObjectId, sourceName: string) {
        try {
            return mongo
                    .db     
                    .collection(DB_COLLECTIONS.SOURCES)
                    .updateOne({_id: sourceObjId}, {$addToSet: {sources: sourceName}})
            
        } catch(err) {
            console.error("Error in updateSourceObj" + err);
            throw err
        }
    }
}