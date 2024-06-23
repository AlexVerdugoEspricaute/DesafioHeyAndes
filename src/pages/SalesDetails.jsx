import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';



function SalesDetails() {
    const { id } = useParams(); // id ahora representa el nombre de la agencia
    const salesList = useSelector((state) => state.sales.salesList);
    const filteredSales = salesList.filter((sale) => sale.nameAgency === id);

    if (filteredSales.length === 0) {
        return <div>No se encontraron ventas para esta empresa.</div>;
    }

    // Para mostrar solo una vez el nombre de la agencia
    const agencyName = filteredSales[0].nameAgency;

    return (
        <div className="container-fluid mt-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><strong>Empresa</strong></Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                    <strong> {agencyName} </strong>
                    </li>
                </ol>
            </nav>
            <div className="mb-4">
                <table className="table table-bordered border-black sales-details-table">
                    <thead>
                        <tr>
                            <th>Nombre cliente</th>
                            <th>Personas</th>
                            <th>Día</th>
                            <th>Hora</th>
                            <th>Valor venta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.map((sale, index) => (
                            <tr key={index}>
                                <td>{sale.name}</td>
                                <td>{sale.persons}</td>
                                <td>{sale.day}</td>
                                <td>{sale.hour}</td>
                                <td>${sale.finalPrice.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalesDetails;
