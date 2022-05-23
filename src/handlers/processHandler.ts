import Process from "../db/classes/Process";

export const getProcesses = async (req, res) =>{
    try {
        const { processesId } = req.body;
        const processes = await Process.findByIds(processesId);
        res.send({success: true, data: processes})
    } catch (error) {
        console.log("Error in getProcesses", error);
        res.send({success: false, data: error.message})
    }
}

export const createProcess = async (req, res) =>{
    try {
        const newProcess = req.body;
        console.log(newProcess)
        const createdProcess = new Process();

        createdProcess.name = newProcess.name;
        createdProcess.user_id = newProcess.user_id;
        createdProcess.applications = [];

        await createdProcess.create();

        res.send({success: true, data: 'The process created successfully'})
    } catch (error) {
        console.log("Error in getProcesses", error);
        res.send({success: false, data: error.message})
    }
}

