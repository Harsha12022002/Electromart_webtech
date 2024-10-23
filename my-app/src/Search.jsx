import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Search = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { title } = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            if (title) {
                try {
                    const response = await axios.get('http://localhost:3000/Search', {
                        params: { title }
                    });
                    setData(response.data);
                } catch (error) {
                    console.error('No data found', error);
                    setData([]);
                }
            }
        };
        fetchData();
    }, [title]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleClick = (item) => {
        console.log(item.title);
        navigate('/Buying', { state: { details: { item } } });
    };

    const ProductCard = ({ item }) => {
        return (
            <div className="card mb-3 product-card" style={{ maxWidth: '300px', margin: '5px auto'}} onClick={() => handleClick(item)}>
                <img src={item.url} className="card-img-top" alt="Product" />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                </div>
            </div>
        );
    };

    return (
        <div id="home-id" >
            <div className="product-container" style={{ padding: '20px 0' }}>
                {data.length === 0 ? (
                    <h2 style={{ color: "red" }}>No Products found</h2>
                ) : (
                    data.map((item, index) => (
                        <ProductCard key={index} item={item} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Search;
