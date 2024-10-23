import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Pc = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000?page=${currentPage}&limit=${itemsPerPage}`);
                if (!response.ok) {
                    console.log("Failed to fetch data");
                    return;
                }
                const result = await response.json();
                setData(result.products);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleClick = (item) => {
        navigate('/Buying', { state: { details: { item } } });
    };

    const ProductCard = ({ item }) => {
        return (
            <div className="card mb-3 product-card" style={{ maxWidth: '300px', margin: '0 auto' }} onClick={() => handleClick(item)}>
                <img src={item.url} className="card-img-top" alt="Product" />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                </div>
            </div>
        );
    };

    return (
        <div >
        <div id="home-id1"  style={{position:"relative"}}>
            <div className="product-containe" style={{ padding: '20px 0'}}>
                {data.length === 0 ? (
                    <h2 style={{ color: "red" }}>No Products found</h2>
                ) : (
                    data.map((item, index) => (
                        <ProductCard key={index} item={item} />
                    ))
                )}
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
        </div>
    );
};

export default Pc;
