import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';

const OrderPage = () => {
  const { email } = useUser();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/info?email=${email}`)
      .then((response) => response.json())
      .then((data) => setOrders(data.ordered || [])) 
      .catch((error) => console.error('Error fetching orders:', error));
  }, [email]);

  return (
    <div className="order-page" style={{ color: "green", width: "100vw" ,backgroundColor:"white"}}>
      <h1 id='ord-h1'>Your Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card" >
            <div className="order-details">
              <img src={order.url} alt={order.name} className="order-image" />
              <div className="order-info">
                <h2>{order.name}</h2>
                <p>{order.description}</p>
                <div className="order-price">
                  <span className="original-price">₹{order.price}</span>
                  {order.discount && (
                    <span className="discounted-price">
                      {order.discount}% off
                    </span>
                  )}
                </div>
                <p className="order-roll">Order ID: {order.roll}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p id="p-ord">No orders found.</p>
      )}
    </div>
  );
};

export default OrderPage;
