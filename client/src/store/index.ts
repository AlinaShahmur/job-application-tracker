import { configureStore } from '@reduxjs/toolkit'
import applicationReducer from './application-store'
import processReducer from './process-store'


const store = configureStore({
    reducer: {
        application:applicationReducer,
        process: processReducer
    }
})


export default store