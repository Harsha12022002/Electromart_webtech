import React from "react";
import axios from 'axios';
import { useUser } from './UserContext';
import { useNavigate, useLocation } from "react-router-dom";
const Buying = () => {
    const location = useLocation();
    const { item } = location.state.details;
    const { email } = useUser();
    const navigate = useNavigate();

    const handleclick = async () => {
        try {
            const response = await axios.post('http://localhost:3000/Cart', {
                id: item.id,
                name: item.name,
                url: item.url,
                price: item.price,
                discount: item.discount,
                title: item.title,
                description: item.description,
                inStock: item.inStock,
                roll: item.roll,
                email: email
            });
            console.log('Added', response.data);
        } catch (error) {
            console.error("Error", error);
        }
    };
const handleclick1=async()=>{
    try {
        const response = await axios.post('http://localhost:3000/Order', {
            id: item.id,
            url: item.url,
            name: item.name,
            price: item.price,
            discount: item.discount,
            roll: item.roll,
            email: email
        });
    
        console.log('Added', response.data);
        navigate('/Order');
    } catch (error) {
        console.error("Error", error);
    }
}

    return (
        <div id="ing">
            <div id="prod">
                <div id="pro-img">
                    <img src={item.url} alt={item.title} />
                </div>
                <div id="pro-deta">
                    <label id="pro-desc">{item.description}</label>
                    <label id="pro-title">{item.name}</label>
                    <br />
                    <label id="price">{item.price} MRP ({item.discount}% OFF)</label>
                    <p>Available offers</p>
                    <ul id="offers">
                        <li>Bank Offer: 10% off up to ₹749 on HDFC Bank Credit Card Transactions. <a href="#">T&C</a></li>
                        <li>Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card. <a href="#">T&C</a></li>
                        <li>Bank Offer: 10% off up to ₹1,250 on HDFC Bank Credit Card Transactions. Min Txn Value: ₹7,499. <a href="#">T&C</a></li>
                        <li>Special Price: Get extra 47% off (price inclusive of cashback/coupon). <a href="#">T&C</a></li>
                    </ul>
                    <div id="btn-pro">
                        <button id="buy1" onClick={handleclick1}>Buy</button>
                        <button id="cart1" onClick={handleclick}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Buying;
