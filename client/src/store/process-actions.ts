import { Dispatch } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";
import { fetchData } from "../utils/request_client";
import { processActions } from "./process-store";

export const deleteProcess = (processId: string, token?: string) => {
    return async (dispatch: Dispatch) => {
        await fetchData("DELETE",null,`${BASE_URL}/api/processes/${processId}`, token);
        dispatch(processActions.deleteProcess(processId));
    }
}

export const getProcesses = (userEmail: string, token?: string) => {
    return async (dispatch: Dispatch) => {
        const data = await fetchData('get',null,`${BASE_URL}/api/processes/${userEmail}`, token);
        dispatch(processActions.initialLoading(data));
    }
}

export const updateProcess = (process: any, token?: string) => {
    return async (dispatch: Dispatch) => {
        await fetchData("PUT",JSON.stringify(process),`${BASE_URL}/api/processes/${process._id}`, token);
        dispatch(processActions.updateProcess({...process, _id: process._id}));
    }
}

export const addProcess = (process: any, token?: string) => {
    return async (dispatch: Dispatch) => {
        const result = await fetchData("POST",JSON.stringify(process),`${BASE_URL}/api/processes`, token);
        const newProcess = {...process, _id: result.process_id };
        dispatch(processActions.addProcess(newProcess));
    }
}
