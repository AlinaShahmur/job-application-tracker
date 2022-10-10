import Application from "../db/classes/Application";
import Process from "../db/classes/Process";
import { Source } from "../db/classes/Source";
import User from "../db/classes/User";

export const getProcessesByUserEmail = async (req, res) =>{
    try {
        const {userEmail} = req.params;
        const query = {user: userEmail}
        const processes = await Process.find(query);
        res.send({success: true, data: processes})
    } catch (error) {
        console.log("Error in getProcesses", error);
        res.send({success: false, data: error.message})
    }
}

export const createProcess = async (req, res) =>{
    try {
        const newProcess = req.body;
        
        const createdProcess = new Process();
        
        createdProcess.name = newProcess.name;
        createdProcess.user = newProcess.user;
        
        const result = await createdProcess.create();
        await User.attachNewProcess(newProcess.user, result.insertedId);

        res.send({success: true, data: {process_id: result.insertedId}})
    } catch (error) {
        console.log("Error in getProcesses", error);
        res.status(500).send({success: false, data: error.message})
    }
}

export const updateProcess = async (req, res) =>{
    try {

        const process = req.body;
        const { process_id } = req.params

        await Process.update(process_id, process);

        res.send({success: true})
    } catch (error) {
        console.log("Error in getProcesses", error);
        res.status(500).send({success: false, data: error.message})
    }
}

export const deleteProcess = async (req, res) => {
    try {
        const { process_id } = req.params;
        const result = await Process.deleteOne(process_id);

        if (result.acknowledged) {
            await Application.deleteByProcessId(process_id);
            await Source.deleteSourceObjectByProcessId(process_id)
        }

        res.send({success: true})
    } catch (error) {
        console.log("Error in deleteProcess", error);
        res.status(500).send({success: false, data: error.message})
    }
}

