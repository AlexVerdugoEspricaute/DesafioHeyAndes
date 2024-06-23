import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sales from './components/Sales';
import SalesDetails from './pages/SalesDetails'; 
import { fetchSales } from './redux/salesSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<>
          <Home />
          <Sales />
        </>} />
        <Route path="/sales-details/:id" element={<SalesDetails />} />
      </Routes>
    </div>
  );
}

export default App;
