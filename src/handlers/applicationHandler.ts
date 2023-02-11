import  Application  from "../db/classes/Application";
import { NextFunction, Request, Response } from "express";
import { ApplicationTypes, fieldsForQuery, firstStageName, STATUS } from "../utils/constants";
import { buildMongoQuery, buildSortQuery } from "../utils/dbOperations";
import { StageDoc } from "../types";
import { ObjectId } from 'mongodb';
import { scrapPage } from "../utils/scrapLogic";
import { HttpError } from "../error-handling/HttpError";
import { responseWrapper } from "../utils/responseWrapper";

export async function getAllItems(req: Request,res: Response, next: NextFunction) {
    try {
        const process_id: any = req.headers["process_id"];

        const application = new Application(); 
        application.process_id = new ObjectId(process_id);
        const promises = [application.findAll(), application.getTotalCount({})];
        const [applications, totalItems] = await Promise.all(promises);
        responseWrapper(res, 200, {applications, totalItems});
    } catch(err) {
        return next(new HttpError(err.message, 500, "getAllItems")); 
    }
}

export async function getPaginatedItems(req: Request,res: Response, next: NextFunction) {
    try {
        const process_id: any = req.headers["process_id"];

        const {limit, skip, queryString = '', sortType} = req.query;
        
        const sortQuery = buildSortQuery(sortType)
        const searchQuery = buildMongoQuery(queryString, fieldsForQuery);

        const application = new Application(); 
        application.process_id = new ObjectId(process_id);

        const promises = [application.getTotalCount(searchQuery), application.find(limit, skip, searchQuery, sortQuery)];
        const [totalItems, applications] = await Promise.all(promises);

        responseWrapper(res, 200, {applications, totalItems});
    } catch (err){
        return next(new HttpError(err.message, 500, "getPaginatedItems")); 
    }
}

export async function getApplicationsByStatuses(req: Request, res: Response, next: NextFunction) {
    try {
        const process_id: any = req.headers["process_id"];

        const application = new Application(); 
        application.process_id = new ObjectId(process_id);
        const applications = await application.findAll();

        const rejected = applications.filter(application => application.status === 'rejected').length;
        const pending = applications.filter(application => application.status === 'pending').length;

        responseWrapper(res, 200, {rejected, pending});
    } catch (err) {
        return next(new HttpError(err.message, 500, "getApplicationsByStatuses")); 
    }
}

export async function createApplication(req: Request,res: Response, next: NextFunction) {
    try {
        let application = req.body;

        if (application.applicationType == ApplicationTypes.BY_LINK) {
            const { jobUrl } = application;
            const result = await scrapPage(jobUrl);
            application = Object.assign(application, result);
        }
        console.log(application);
        
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
            stage_name: firstStageName
        };

        const history = [];

        history.push(initialStage);
        app.history = history;

        const result = await app.create();
        console.log({result});
        
        responseWrapper(res, 201, {application_id: result.insertedId});
    } catch (err){
        return next(new HttpError(err.message, 500, "createApplication")); 
    }
}
export async function updateApplication(req: Request,res: Response, next: NextFunction){
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
        responseWrapper(res, 200, {});
    } catch (err){
        return next(new HttpError(err.message, 500, "updateApplication")); 
    }
}


export async function deleteApplication(req: Request,res: Response, next: NextFunction) {
    try {
        const {id} = req.params;

        await Application.deleteById(id);
        responseWrapper(res, 200, {});
    } catch (err){
        return next(new HttpError(err.message, 500, "deleteApplication"));
    }
}
