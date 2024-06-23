import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
    // Obtener los datos de la empresa con más ventas y el mes con más ventas desde el estado de Redux
    const topCompany = useSelector((state) => state.sales.topCompany);
    const topMonth = useSelector((state) => state.sales.topMonth);

    return (
        <div className="container-fluid">
            {/* Contenedor principal fluido */}
            <div className="row">
                {/* Primera columna con la tarjeta de la empresa con más ventas */}
                <div className="col-md-6">
                    <div className="card">
                        {/* Tarjeta de la empresa con más ventas */}
                        <div className="card-body">
                            {/* Título de la tarjeta */}
                            <h2 className="title">EMPRESA MAS VENTAS</h2>
                            {/* Monto total de ventas de la empresa */}
                            <h1><strong>${topCompany.amount.toLocaleString()}</strong></h1>
                        </div>
                    </div>
                </div>
                {/* Segunda columna con la tarjeta del mes con más ventas */}
                <div className="col-md-6">
                    <div className="card">
                        {/* Tarjeta del mes con más ventas */}
                        <div className="card-body">
                            {/* Título de la tarjeta */}
                            <h2 className="title">MES MAS VENTAS</h2>
                            {/* Nombre del mes con más ventas en mayúsculas */}
                            <h1><strong>{topMonth.toUpperCase()}</strong></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
