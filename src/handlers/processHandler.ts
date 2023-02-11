import Application from "../db/classes/Application";
import Process from "../db/classes/Process";
import { Source } from "../db/classes/Source";
import User from "../db/classes/User";
import { HttpError } from "../error-handling/HttpError";
import { responseWrapper } from "../utils/responseWrapper";

export const getProcessesByUserEmail = async (req, res, next) =>{
    try {
        const {userEmail} = req.params;
        const query = {user: userEmail}
        const processes = await Process.find(query);

        responseWrapper(res, 200, processes);
    } catch (err) {
        return next(new HttpError(err.message, 500, "getProcessesByUserEmail")); 
    }
}

export const createProcess = async (req, res, next) =>{
    try {
        const newProcess = req.body;
        
        const createdProcess = new Process();
        
        createdProcess.name = newProcess.name;
        createdProcess.user = newProcess.user;
        
        const result = await createdProcess.create();
        await User.attachNewProcess(newProcess.user, result.insertedId);

        responseWrapper(res, 200, {process_id: result.insertedId});
    } catch (err) {
        return next(new HttpError(err.message, 500, "createProcess")); 
    }
}

export const updateProcess = async (req, res, next) =>{
    try {

        const process = req.body;
        const { process_id } = req.params

        await Process.update(process_id, {name: process.name});
        responseWrapper(res, 200, {});

    } catch (err) {   
        return next(new HttpError(err.message, 500, "updateProcess")); 
    }
}

export const deleteProcess = async (req, res, next) => {
    try {
        const { process_id } = req.params;
        const result = await Process.deleteOne(process_id);

        if (result.acknowledged) {
            await Application.deleteByProcessId(process_id);
            await Source.deleteSourceObjectByProcessId(process_id)
        }

        responseWrapper(res, 200, {});
    } catch (err) {
        return next(new HttpError(err.message, 500, "deleteProcess")); 
    }
}

