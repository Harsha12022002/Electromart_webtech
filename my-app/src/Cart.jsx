import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const Cart = () => {
    const { email } = useUser();
    const [data, setData] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        if (!email) {
            return; 
        }
        fetchCartItems();
    }, [email]);

    useEffect(() => {
        if (orderPlaced) {
            fetchCartItems();
            setOrderPlaced(false); 
        }
    }, [orderPlaced]);

    const fetchCartItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/Cart?email=${email}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setData(data);
            }
        } catch (error) {
            alert("Error fetching cart items. Please try again later.");
        }
    };

    const handleIncrease = (index) => {
        const updatedData = [...data];
        updatedData[index].quantity = (updatedData[index].quantity || 1) + 1;
        setData(updatedData);
    };

    const handleDecrease = (index) => {
        const updatedData = [...data];
        const currentQuantity = updatedData[index].quantity || 1;

        if (currentQuantity > 2) {
            updatedData[index].quantity = currentQuantity - 1;
        } else if (currentQuantity === 1) {
            handleClick(updatedData[index]); 
        } else {
            updatedData.splice(index, 1);  
        }
        setData(updatedData);
    };

    const place_order = async () => {
        if (data.length === 0) {
            alert("Your cart is empty. Please add items before placing an order.");
            return;
        }
        for (let i = 0; i < data.length; i++) {
            await axios.post('http://localhost:3000/info', {
                id: data[i].id,
                name: data[i].name,
                url: data[i].url,
                price: data[i].price,
                discount: data[i].discount,
                title: data[i].title,
                description: data[i].description,
                inStock: data[i].inStock,
                roll: data[i].roll,
                email: email
            });
            await axios.delete('http://localhost:3000/Cart', {
                params: {
                    roll: data[i].roll,  
                    email: email
                }
            });
        }
        setOrderPlaced(true); // Trigger fetching of updated cart items
    };

    const handleClick = async (item) => {
        try {
            await axios.delete('http://localhost:3000/Cart', {
                params: {
                    roll: item.roll,  
                    email: email
                }
            });
            setData((prevData) => prevData.filter((cartItem) => cartItem.roll !== item.roll));
        } catch (error) {
            console.error('Error deleting item', error);
        }
        alert(`${item.title} Removed`);
    };

    const calculateTotalPrice = () => {
        return data.reduce((total, item) => {
            const quantity = item.quantity || 1;
            return total + item.price * quantity;
        }, 0);
    };

    return (
        <div id='cart'>
            <div className="cart-container">
                <div className="delivery-address">
                    <h4>Deliver to:</h4>
                    <p>example address meow meow meow meow mewow meow...</p>
                    <button className="address-change" id="ch-adr-cart">Change</button>
                </div>
                {data.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    data.map((item, index) => (
                        <div className="cart-items" key={item._id}>
                            <div className="cart-item">
                                <img src={item.url} alt="Product Image" style={{ height: "300px", width: "300px" }} />
                                <div className="item-details">
                                    <h2>Product: {index + 1}</h2>
                                    <h5 className="mini-description">{item.name}</h5>
                                    <p>{item.description}</p>
                                    <p>Price: ₹{item.price}</p>
                                    <div className="quantity">
                                        <button className="btn decrease" id='minus' onClick={() => handleDecrease(index)}>-</button>
                                        <span className="quantity-value">{item.quantity || 1}</span>
                                        <button className="btn increase" id='plus' onClick={() => handleIncrease(index)}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => handleClick(item)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div className="cart-total" id="crt-total">
                    <h3>Total: ₹<span id="total-price">{calculateTotalPrice()}</span></h3>
                    <button id="order" onClick={place_order}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
