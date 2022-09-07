import  Application  from "../db/classes/Application";
import { Request, Response } from "express";
import { fieldsForQuery, STATUS } from "../utils/constants";
import { buildMongoQuery, buildSortQuery } from "../utils/dbOperations";
import { AppHistory } from "../db/classes/History";
import { StageDoc } from "../types";


export async function getAllItems(req: Request,res: Response) {
    try {
        const applications = await Application.findAll();
        const totalItems = await Application.getTotalCount({});
        res.send({success: true, data: applications, totalCount: totalItems})
    } catch(err) {
        res.send({success: false, data: [], message: err})
    }
}

export async function getPaginatedItems(req: Request,res: Response) {
    try {
        const {limit, skip, queryString = '', sortType} = req.query;

        const sortQuery = buildSortQuery(sortType)
        const searchQuery = buildMongoQuery(queryString, fieldsForQuery);
        const totalItems = await Application.getTotalCount(searchQuery);
        const applications = await Application.find(limit, skip, searchQuery, sortQuery);
        res.send({success: true, data: applications, totalCount: totalItems})
    } catch (err){
        res.send({success: false, data: [], message: err})
    }
}
export async function createApplication(req: Request,res: Response) {
    try {
        const application = req.body;
        const app = new Application();

        app.role = application.role;
        app.start_date = application.start_date;
        app.status = STATUS.PENDING;
        app.img = application.img;
        app.source = application.source;
        app.rejected = false;
        app.company_name = application.company_name;
        app.process_id = application.process_id;

        const application_id = await app.create();

        const history = new AppHistory();

        const stage: StageDoc = {
            date: application.start_date,
            stage_name: "CV was sent"
        } 

        history.application_id = application_id;
        history.pushToHistory(stage);
        await history.save();

        res.send({success: true, data: [], message: "created"});
    } catch (err){
        console.error("Error in createApplication", err)
        res.status(500).send({success: false, data: [], message: err});
    }
}
export async function updateApplication(req: Request,res: Response){
    try {
        const application = req.body;
        const { id } = req.params;
        const applicationToUpdate = {
            role: application.role,
            start_date: application.start_date,
            status: application.status,
            img: application.img,
            source: application.source,
            rejected: application.rejected,
            company_name: application.company_name,
            history: application.history,
            process_id: application.process_id
        }
        await Application.update(id, applicationToUpdate);
        await AppHistory
        res.send({success: true, data: 'updated'})
    } catch (err){
        res.send({success: false, data: [], message: err})
    }
}


export async function deleteApplication(req: Request,res: Response) {
    try {
        const {id} = req.params
        await Application.deleteById(id);
        res.send({success: true, data: 'Deleted'})
    } catch (err){
        res.send({success: false, data: [], message: err})
    }
}