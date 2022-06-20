import { configureStore, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';

import { rootSaga } from './sagas';

let initialState = {
    repos: [],
    reposPage: {},
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 10 ,
    totalCount: 0
}

const slice = createSlice({
    name: 'sliceRepos',
    initialState,
    reducers: {
        fetchReposRequest: (state) => {
            state.loading = true
        },
        fetchReposSuccess: (state, action) => {
            state.loading = false;
            state.repos = action.payload.items;
            state.totalCount = action.payload.total_count;
        },
        fetchReposError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentPage: (state, action) => {
            return {...state, currentPage: action.payload};
        },
        fetchReposSuccessPage: (state, action) => {
            state.reposPage = action.payload;
        }
    } 
});


export const {
    fetchReposError,
    fetchReposRequest,
    fetchReposSuccess,
    setCurrentPage, 
    fetchReposSuccessPage
} = slice.actions;

const sagaMiddleWare = createSagaMiddleWare();

export const store = configureStore({
    reducer: slice.reducer,
    middleware: (defaultMiddleware) => {
        return defaultMiddleware().concat(sagaMiddleWare);
    },
    devTools: true 
})

sagaMiddleWare.run(rootSaga);