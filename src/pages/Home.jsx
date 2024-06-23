import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
    const topCompany = useSelector((state) => state.sales.topCompany);
    const topMonth = useSelector((state) => state.sales.topMonth);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">EMPRESA MAS VENTAS</h2>
                            <h1><strong>${topCompany.amount.toLocaleString()}</strong></h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">MES MAS VENTAS</h2>
                            <h1><strong>{topMonth.toUpperCase()}</strong></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
