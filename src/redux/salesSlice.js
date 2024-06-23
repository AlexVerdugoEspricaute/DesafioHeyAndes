import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { app } from '../config/firebaseConfig';

const db = getFirestore(app);

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
    const salesCollection = collection(db, 'sales');
    const salesSnapshot = await getDocs(salesCollection);
    const salesList = salesSnapshot.docs.map((doc) => doc.data());
    return salesList;
});

const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        salesList: [],
        topCompany: { name: '', amount: 0 },
        topMonth: '',
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSales.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchSales.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.salesList = action.payload;
            calculateTopCompanyAndMonth(state, action.payload);
        })
        .addCase(fetchSales.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

const calculateTopCompanyAndMonth = (state, salesData) => {
    const companySales = {};
    const monthSales = {};

    salesData.forEach(sale => {
    if (companySales[sale.nameAgency]) {
        companySales[sale.nameAgency] += sale.finalPrice;
    } else {
        companySales[sale.nameAgency] = sale.finalPrice;
    }

    const month = new Date(sale.createdAt).toLocaleString('default', { month: 'long' });

    if (monthSales[month]) {
        monthSales[month] += sale.finalPrice;
    } else {
        monthSales[month] = sale.finalPrice;
    }
    });

    const topCompanyName = Object.keys(companySales).reduce((a, b) => companySales[a] > companySales[b] ? a : b);
    state.topCompany = { name: topCompanyName, amount: companySales[topCompanyName] };

    const topMonthName = Object.keys(monthSales).reduce((a, b) => monthSales[a] > monthSales[b] ? a : b);
    state.topMonth = topMonthName;
};

export default salesSlice.reducer;
