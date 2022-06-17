import { createSlice } from '@reduxjs/toolkit';

const processesInitialState = {processes: []};

const processSlice = createSlice({
    name: 'process',
    initialState: processesInitialState,
    reducers: {
        initialLoading(state, action) {
            state.processes = action.payload // it's allowed because in redux-toolkit we can't affect to state directly (it makes copy of the current state)
        }
    }
});

export const processActions = processSlice.actions
export default processSlice.reducer