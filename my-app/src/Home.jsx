import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/home');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]);
            }
        };
        fetchData();
    }, []);

    const handleClick = (item) => {
        navigate('/Buying', { state: { details: { item } } });
    }

    return (
        <div id="home-idd">
            <div className="product-containerr" style={{ padding: '20px 0' }}>
                {data.length === 0 ? (
                    <h2 style={{ color: "red" }}>No Products found</h2>
                ) : (
                    data.map((item, index) => (
                        <ProductCard key={index} item={item} handleClick={handleClick} />
                    ))
                )}
            </div>
        </div>
    );
};

const ProductCard = ({ item, handleClick }) => {
    return (
        <div className="card mb-3 product-card" style={{ maxWidth: '300px', margin: '0 auto' }}>
            <img src={item.url} className="card-img-top" alt="Product" onClick={() => handleClick(item)} />
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
            </div>
        </div>
    );
};

export default Home;
