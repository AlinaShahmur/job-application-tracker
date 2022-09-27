import { ObjectId } from "mongodb";
import Application from "../db/classes/Application";
import { Source } from "../db/classes/Source";

export async function getAllSources(req,res) {
    try {
        const process_id = req.headers["process_id"];
        const source = new Source();
        source.process_id = new ObjectId(process_id);
        const data = await source.getAll();
        res.send({success: true, data});
    } catch(err) {
        console.log("Error in getAllSources", err);
        res.status(500).send({success: false, data: [], message: err});
    }
}

export async function getSourcesPercentages(req, res) {
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

        res.send({success: true, data: {percentage: sources}})
    } catch(err) {
        console.log("Error in getSourcesPercentages", err);
        res.status(500).send({success: false, data: [], message: err});
    }
}

export async function addNewSource(req, res) {
    try {

        const { source_name } = req.body;
        const source = new Source();

        const process_id = req.headers["process_id"];
        source.process_id = new ObjectId(process_id);
        
        const status = await source.pushNewSource(source_name);
        
        res.send({success: true, data: [], message: "Successfully added"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, data: [], message: error});
    }
}