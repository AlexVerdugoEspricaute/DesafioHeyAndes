// Importación de las funciones necesarias desde Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
// Importación del reducer personalizado para ventas
import salesReducer from './salesSlice';

// Configuración del store de Redux
const store = configureStore({
    reducer: {
        // Se define el slice 'sales' que utilizará el reducer 'salesReducer'
        sales: salesReducer,
    },
});

// Exportación del store configurado
export default store;
