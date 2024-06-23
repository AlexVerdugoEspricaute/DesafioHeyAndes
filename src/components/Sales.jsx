import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Sales() {
    const salesList = useSelector((state) => state.sales.salesList);
    const navigate = useNavigate();

    const handleViewDetails = (agencyName) => {
        console.log('Navigating to sales details for agency:', agencyName);
        navigate(`/sales-details/${agencyName}`);
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

    // Ordenar las agencias por nombre
    const sortedAgencies = Object.keys(groupedSales).sort();

    return (
        <div className="container-fluid mt-5">
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
                    {sortedAgencies.map((agencyName) => (
                        <tr key={agencyName}>
                            <td>{agencyName}</td>
                            <td>${groupedSales[agencyName].totalSales.toLocaleString()}</td>
                            <td>${groupedSales[agencyName].totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td>
                                <button 
                                    className="btn btn-secondary"
                                    onClick={() => handleViewDetails(agencyName)} // Usar el nombre de la agencia como identificador
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
