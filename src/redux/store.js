import { configureStore } from '@reduxjs/toolkit';
import salesReducer from './salesSlice';

const store = configureStore({
    reducer: {
        sales: salesReducer,
    },
});

export default store;
