import  {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const DB_STRING = process.env.DB_STRING

class Mongodb {
    private readonly dbString: string = process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/jobSearchAnalyzeDB' : DB_STRING;
    public db

    async connect() {
        const client = new MongoClient(this.dbString);
        try {
            await client.connect();
            this.db = client.db();
        } catch (err) {
            console.log('Mongo connection error:', err)
            await client.close();
            throw new Error(err)
        }
    }
}
export default new Mongodb()