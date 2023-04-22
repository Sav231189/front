import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {AuthReducer} from "store/auth/reducer/authReducer";
import {TournamentReducer} from "store/tournament/reducer/tournamentReducer";
import {TaskReducer} from "store/task/reducer/TaskReducer";
import {CategoryReducer} from "store/category/reducer/CategoryReducer";

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

const rootReducer = combineReducers({
    AuthReducer,
    TournamentReducer,
    TaskReducer,
    CategoryReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
