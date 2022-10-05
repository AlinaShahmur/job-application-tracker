import { createSlice } from '@reduxjs/toolkit';

const processesInitialState = {processes: [], currentProcess: null, isFetched: false};

const processSlice = createSlice({
    name: 'process',
    initialState: processesInitialState,
    reducers: {
        initialLoading(state, action) {
            state.processes = action.payload // it's allowed because in redux-toolkit we can't affect to state directly (it makes copy of the current state)
            state.isFetched = true
        },
        deleteProcess(state, action) {
            const copyOfProcesses = [...state.processes];
            const index = copyOfProcesses.findIndex((item: any) => item._id === action.payload);
            if (index > 0) {
                copyOfProcesses.splice(index, 1);
                state.processes = copyOfProcesses;
            }
        },
        setCurrentProcess(state, action) {
            state.currentProcess = action.payload;
        }
    }
});

export const processActions = processSlice.actions
export default processSlice.reducer