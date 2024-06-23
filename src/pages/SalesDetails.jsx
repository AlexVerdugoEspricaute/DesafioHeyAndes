import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

function SalesDetails() {
    const { id } = useParams(); // Obtiene el parámetro de la URL, que representa el nombre de la agencia
    const salesList = useSelector((state) => state.sales.salesList); // Obtiene la lista de ventas del estado global de Redux
    const filteredSales = salesList.filter((sale) => sale.nameAgency === id); // Filtra las ventas por el nombre de la agencia obtenido de los parámetros de la URL

    // Si no hay ventas filtradas para esta agencia, muestra un mensaje
    if (filteredSales.length === 0) {
        return <div>No se encontraron ventas para esta empresa.</div>;
    }

    // Para mostrar solo una vez el nombre de la agencia (se asume que filteredSales tiene al menos un elemento)
    const agencyName = filteredSales[0].nameAgency;

    return (
        <div className="container-fluid mt-5">
            {/* Breadcrumb para navegación */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        {/* Enlace al inicio */}
                        <Link to="/"><strong>Empresa</strong></Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {/* Nombre de la agencia actual */}
                        <strong> {agencyName} </strong>
                    </li>
                </ol>
            </nav>
            {/* Tabla de detalles de ventas */}
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
                        {/* Renderiza cada venta filtrada */}
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
