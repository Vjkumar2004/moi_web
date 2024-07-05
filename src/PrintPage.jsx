import { Link, useLocation } from "react-router-dom";
import './App.css';
import { useState } from "react";
import Loading from "./Loading";

export default function Print() {
    const location = useLocation();
    const[loading,setLoading] = useState(true);

    const list = location.state || [];
    const handlePrint = () => {
        window.print();
    }

    setTimeout(() =>{
        setLoading((loading) => loading=false);
    },1000);

    if (loading) {
        return <Loading />;
    }
    else{
    return (
        <div className="printdetails">
            <h1>Print Page</h1>
            <div>
                {list.length === 0 ? (
                    <p>No data found</p>
                ) : (
                    <ul>
                        {list.map((item, index) => (
                            <li key={index}>
                                <p>Name: {item.name}</p>
                                <p>Amount: {item.amount}</p>
                                <p>Address: {item.address}</p>
                                <p>Phone: {item.phone}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="printbutton">
                <button onClick={handlePrint}>Print</button>
            </div>
            <nav>
                <Link to={'/'}>
                    <button>Back</button>
                </Link>
            </nav>
        </div>
        );
    }
}
