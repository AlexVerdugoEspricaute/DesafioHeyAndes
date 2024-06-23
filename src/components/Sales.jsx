import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Sales() {
    // Obtener la lista de ventas del estado de Redux
    const salesList = useSelector((state) => state.sales.salesList);
    
    // Hook de navegación de React Router para redirigir a la página de detalles de ventas
    const navigate = useNavigate();

    // Función para manejar el clic en el botón de "Ver detalle"
    const handleViewDetails = (agencyName) => {
        console.log('Navigating to sales details for agency:', agencyName);
        navigate(`/sales-details/${agencyName}`); // Navegar a la ruta de detalles de ventas con el nombre de la agencia como parámetro
    };

    // Agrupar y sumar ventas por nombre de la agencia
    const groupedSales = salesList.reduce((acc, sale) => {
        if (!acc[sale.nameAgency]) {
            acc[sale.nameAgency] = {
                totalSales: 0,
                totalCommission: 0,
                salesDetails: [],
            };
        }
        acc[sale.nameAgency].totalSales += sale.finalPrice;
        acc[sale.nameAgency].totalCommission += sale.finalPrice * 0.025;
        acc[sale.nameAgency].salesDetails.push(sale);
        return acc;
    }, {});

    // Ordenar las agencias alfabéticamente
    const sortedAgencies = Object.keys(groupedSales).sort();

    return (
        <div className="container-fluid mt-5">
            {/* Tabla para mostrar el resumen de ventas por agencia */}
            <table className="table table-bordered border-black">
                <thead>
                    <tr>
                        <th>Nombre empresa</th>
                        <th>Total de ventas</th>
                        <th>Comisión</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapear y renderizar cada agencia con su resumen de ventas */}
                    {sortedAgencies.map((agencyName) => (
                        <tr key={agencyName}>
                            <td>{agencyName}</td>
                            <td>${groupedSales[agencyName].totalSales.toLocaleString()}</td>
                            <td>${groupedSales[agencyName].totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td>
                                {/* Botón para ver los detalles de ventas de la agencia */}
                                <button 
                                    className="btn btn-secondary"
                                    onClick={() => handleViewDetails(agencyName)} // Pasar el nombre de la agencia como parámetro
                                >
                                    Ver detalle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sales;
