// Importaciones necesarias desde Redux Toolkit y Firebase
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { app } from '../config/firebaseConfig';

// Inicialización de la base de datos Firestore
const db = getFirestore(app);

// Creación de thunk asíncrono para obtener las ventas desde Firestore
export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
    // Obtenemos la colección 'sales' desde Firestore
    const salesCollection = collection(db, 'sales');
    // Obtenemos un snapshot de los documentos en la colección
    const salesSnapshot = await getDocs(salesCollection);
    // Mapeamos los datos de los documentos y los retornamos como array
    const salesList = salesSnapshot.docs.map((doc) => doc.data());
    return salesList;
});

// Definición del slice de Redux para 'sales'
const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        // Estado inicial con las propiedades necesarias
        salesList: [],          // Lista de ventas
        topCompany: {           // Empresa con mayores ventas
            name: '',           // Nombre de la empresa
            amount: 0           // Monto total de ventas
        },
        topMonth: '',           // Mes con mayores ventas
        status: 'idle',         // Estado de la solicitud (idle, loading, succeeded, failed)
        error: null             // Error en caso de fallo
    },
    reducers: {},   // Reductores síncronos (vacío en este caso)
    extraReducers: (builder) => {
        // Manejo de acciones adicionales generadas por 'fetchSales'
        builder
        .addCase(fetchSales.pending, (state) => {
            state.status = 'loading';   // Cambia el estado a 'loading' mientras se carga
        })
        .addCase(fetchSales.fulfilled, (state, action) => {
            state.status = 'succeeded'; // Cambia el estado a 'succeeded' cuando la solicitud se completa
            state.salesList = action.payload;   // Actualiza la lista de ventas con los datos obtenidos
            calculateTopCompanyAndMonth(state, action.payload);   // Calcula la empresa y el mes con mayores ventas
        })
        .addCase(fetchSales.rejected, (state, action) => {
            state.status = 'failed';    // Cambia el estado a 'failed' si la solicitud falla
            state.error = action.error.message; // Almacena el mensaje de error
        });
    },
});

// Función para calcular la empresa y el mes con mayores ventas
const calculateTopCompanyAndMonth = (state, salesData) => {
    const companySales = {};    // Objeto para almacenar las ventas por empresa
    const monthSales = {};      // Objeto para almacenar las ventas por mes

    // Iteración sobre los datos de ventas para calcular totales por empresa y mes
    salesData.forEach(sale => {
        // Calcula las ventas totales por empresa
        if (companySales[sale.nameAgency]) {
            companySales[sale.nameAgency] += sale.finalPrice;
        } else {
            companySales[sale.nameAgency] = sale.finalPrice;
        }

        // Obtiene el nombre del mes a partir de la fecha de creación de la venta
        const month = new Date(sale.createdAt).toLocaleString('default', { month: 'long' });

        // Calcula las ventas totales por mes
        if (monthSales[month]) {
            monthSales[month] += sale.finalPrice;
        } else {
            monthSales[month] = sale.finalPrice;
        }
    });

    // Determina la empresa con mayores ventas
    const topCompanyName = Object.keys(companySales).reduce((a, b) => companySales[a] > companySales[b] ? a : b);
    state.topCompany = { name: topCompanyName, amount: companySales[topCompanyName] };

    // Determina el mes con mayores ventas
    const topMonthName = Object.keys(monthSales).reduce((a, b) => monthSales[a] > monthSales[b] ? a : b);
    state.topMonth = topMonthName;
};

// Exporta el reducer generado por createSlice
export default salesSlice.reducer;
