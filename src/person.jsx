import React, { useState } from "react";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Person() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\+\d{1,3}\d{10}$/; // Simple regex to match + followed by country code and number
        return phoneRegex.test(phoneNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, amount, address, phone };
        if (name && amount && address && phone) {
            if (!isValidPhoneNumber(phone)) {
                alert('Invalid phone number format. Please use the format: +1234567890');
                return;
            }
            
            const newList = [...list, data];
            setList(newList);
            setName("");
            setAmount("");
            setAddress("");
            setPhone("");
            navigate("/PrintPage", { state: newList });

            try {
                const result = await axios.post('http://localhost:8080/users', data);
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="mainList">
            <form onSubmit={handleSubmit} className="textarea">
                <label htmlFor="nameArea" style={{color:"black"}}>Name:<span style={{ color: 'red'}}>*</span></label>

                <input
                    type="text"
                    id="nameArea"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="amountArea" style={{color:"black"}} >Amount:<span style={{ color: 'red'}}>*</span></label>
                <input
                    type="number"
                    id="amountArea"
                    name="amount"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <label htmlFor="addressArea" style={{color:"black"}} >Address:<span style={{ color: 'red'}}>*</span></label>
                <input
                    type="text"
                    id="addressArea"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="phoneArea" style={{color:"black"}} >Phone:<span style={{ color: 'red'}}>*</span></label>
                <input
                    type="text"
                    id="phoneArea"
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <div className="submit">
                    <Button handleSubmit={handleSubmit} />
                </div>
            </form>
        </div>
    );
}
