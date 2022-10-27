import  Application  from "../db/classes/Application";
import { Request, Response } from "express";
import { fieldsForQuery, STATUS } from "../utils/constants";
import { buildMongoQuery, buildSortQuery } from "../utils/dbOperations";
import { StageDoc } from "../types";
import { ObjectId } from 'mongodb';


export async function getAllItems(req: Request,res: Response) {
    try {
        const process_id: any = req.headers["process_id"];

        const application = new Application(); 
        application.process_id = new ObjectId(process_id);
        const promises = [application.findAll(), application.getTotalCount({})];
        const [applications, totalItems] = await Promise.all(promises);

        res.send({success: true, data: {applications, totalItems}})
    } catch(err) {
        res.send({success: false, data: [], message: err})
    }
}

export async function getPaginatedItems(req: Request,res: Response) {
    try {
        const process_id: any = req.headers["process_id"];

        const {limit, skip, queryString = '', sortType} = req.query;
        
        const sortQuery = buildSortQuery(sortType)
        const searchQuery = buildMongoQuery(queryString, fieldsForQuery);

        const application = new Application(); 
        application.process_id = new ObjectId(process_id);

        const promises = [application.getTotalCount(searchQuery), application.find(limit, skip, searchQuery, sortQuery)];
        const [totalItems, applications] = await Promise.all(promises);

        res.send({success: true, data: { applications, totalItems }})
    } catch (err){
        res.send({success: false, data: [], message: err})
    }
}
export async function createApplication(req: Request,res: Response) {
    try {
        const application = req.body;
        const app = new Application();

        app.role = application.role;
        app.start_date = new Date(application.start_date);
        app.status = STATUS.PENDING;
        app.img = application.img;
        app.source = application.source;
        app.company_name = application.company_name;
        app.process_id = new ObjectId(application.process_id);

        const initialStage: StageDoc = {
            date: application.start_date,
            stage_name: "CV was sent"
        };

        const history = [];

        history.push(initialStage);
        app.history = history;

        const result = await app.create();

        res.send({success: true, data: {application_id: result.insertedId}, message: "created"});
    } catch (err){
        console.error("Error in createApplication", err)
        res.status(500).send({success: false, data: [], message: err});
    }
}
export async function updateApplication(req: Request,res: Response){
    try {
        const application = req.body;
        
        const { id } = req.params;
        if (application.process_id) {
            application.process_id = new ObjectId(application.process_id)
        } 
        if (application.start_date) {
            application.start_date = new Date(application.start_date)
        }
        await Application.update(id, application);
        
        res.send({success: true, data: 'updated'})
    } catch (err){
        res.send({success: false, data: [], message: err})
    }
}


export async function deleteApplication(req: Request,res: Response) {
    try {
        const {id} = req.params;

        const status = await Application.deleteById(id);
         console.log({status});
        res.send({success: true, data: 'Deleted'})
    } catch (err){
        res.send({success: false, data: [], message: err})
    }
}