import { createSlice } from '@reduxjs/toolkit';

const applicationsInitialState = {applications: [], totalItems:0};

const applicationSlice = createSlice({
    name: 'application',
    initialState: applicationsInitialState,
    reducers: {
        initialLoading(state, action) {
            state.applications = action.payload; // it's allowed because in redux-toolkit we can't affect to state directly (it makes copy of the current state)
        },
        setTotalItems(state, action) {
            state.totalItems = action.payload;
        }
    }
});

export const applicationActions = applicationSlice.actions;
export default applicationSlice.reducer;