import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPage = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/Cart')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
    }, []);
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const total = data.length > 0
    ? data.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0).toFixed(2)
    : '0.00';

    return (
        <div className="order-page">
            <h1 className="order-title">Order Summary</h1>
            <div id="order-main">
                <div className="order-details">
                    <h2>Items Ordered:</h2>
                    <ul className="item-list">
                        {data.map((item) => (
                            <li key={item.id} className="item">
                                <span className="item-name">{item.title}</span>
                                <span className="item-price">₹{item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <h3 className="total-price">Total: ₹{total}</h3>
                </div>
                <div className="payment-methods">
                    <h2>Select Payment Method:</h2>
                    <div className="payment-option">
                        <input
                            type="radio"
                            id="creditCard"
                            name="paymentMethod"
                            value="creditCard"
                            checked={paymentMethod === 'creditCard'}
                            onChange={handlePaymentChange}
                        />
                        <label htmlFor="creditCard">Credit Card</label>
                    </div>
                    <div className="payment-option">
                        <input
                            type="radio"
                            id="bankTransfer"
                            name="paymentMethod"
                            value="bankTransfer"
                            checked={paymentMethod === 'bankTransfer'}
                            onChange={handlePaymentChange}
                        />
                        <label htmlFor="bankTransfer">Bank Transfer</label>
                    </div>
                    <div className="payment-option">
                        <input
                            type="radio"
                            id="UPI"
                            name="paymentMethod"
                            value="UPI"
                            checked={paymentMethod === 'UPI'}
                            onChange={handlePaymentChange}
                        />
                        <label htmlFor="UPI">UPI</label>
                    </div>
                    <div className="payment-option">
                        <input
                            type="radio"
                            id="Wallet"
                            name="paymentMethod"
                            value="Wallet"
                            checked={paymentMethod === 'Wallet'}
                            onChange={handlePaymentChange}
                        />
                        <label htmlFor="Wallet">Wallet</label>
                    </div>
                    <button className="confirm-button">Confirm Order</button>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
