import { createSlice } from '@reduxjs/toolkit';

const processesInitialState: any = {processes: [], currentProcess: null, isFetched: false};

const processSlice = createSlice({
    name: 'process',
    initialState: processesInitialState,
    reducers: {
        initialLoading(state, action) {
            state.processes = action.payload 
        },
        deleteProcess(state, action) {
            const copyOfProcesses = [...state.processes];
            const index = copyOfProcesses.findIndex((item: any) => item._id === action.payload);
            if (index > 0) {
                copyOfProcesses.splice(index, 1);
                state.processes = copyOfProcesses;
            }
        },
        addProcess(state, action) {
            const process: any = action.payload;
            state.processes.push(process)
        },
        updateProcess(state, action) {
            const process = action.payload;            
            const foundProcess = state.processes.find((process: any) => process._id === action.payload._id);
            
            foundProcess.name = process.name;
        },
        setCurrentProcess(state, action) {
            state.currentProcess = action.payload;
        }
    }
});

export const processActions = processSlice.actions
export default processSlice.reducer