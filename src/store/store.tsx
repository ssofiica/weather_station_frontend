import {combineReducers, configureStore} from '@reduxjs/toolkit'
import requestFilterReducer from './slices/search_slice'
import authReducer from './slices/auth_slices'
import draftReducer from './slices/draft_slices'
import phenomFilterReducer from './slices/search_phenom_slice'

export const store = configureStore({
    reducer: combineReducers({
        requestFilter: requestFilterReducer,
        phenomFilter: phenomFilterReducer,
        auth: authReducer,
        draft: draftReducer,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
