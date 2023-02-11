import { ObjectId } from "mongodb";
import Application from "../db/classes/Application";
import { Source } from "../db/classes/Source";
import { HttpError } from "../error-handling/HttpError";
import { responseWrapper } from "../utils/responseWrapper";

export async function getAllSources(req, res, next) {
    try {
        const process_id = req.headers["process_id"];
        const source = new Source();
        source.process_id = new ObjectId(process_id);
        const data = await source.getAll();

        responseWrapper(res, 200, data);
    } catch(err) {
        return next(new HttpError(err.message, 500, "getAllSources")); 
    }
}

export async function getSourcesPercentages(req, res, next) {
    try {
        
        const process_id = req.headers["process_id"];
       
        const source = new Source();
        source.process_id = new ObjectId(process_id);

        const application = new Application();
        application.process_id = new ObjectId(process_id);

        const promises = [source.getAll(), application.findAll()];
        let [sources, applications] = await Promise.all(promises);

        sources = sources.map((source) => ( {source: source, quantity: 0, percentage: 0} ))
        const appWithResponse = applications.filter((application) => application.history.length > 1);
        
        appWithResponse.forEach(app => {
            sources.map((source) => {
                if (source.source === app.source) ++source.quantity 
            })
        });

        
        for (let key in sources) {
            sources[key].percentage = appWithResponse.length > 0 
                                        ? sources[key].quantity/appWithResponse.length
                                        : 0
        }

        responseWrapper(res, 200, {percentage: sources});
    } catch(err) {
        return next(new HttpError(err.message, 500, "getSourcesPercentages")); 
    }
}

export async function addNewSource(req, res, next) {
    try {

        const { source_name } = req.body;
        const source = new Source();

        const process_id = req.headers["process_id"];
        source.process_id = new ObjectId(process_id);
        
        await source.pushNewSource(source_name);
        responseWrapper(res, 201, {});
    } catch (err) {
        return next(new HttpError(err.message, 500, "addNewSource")); 
    }
}