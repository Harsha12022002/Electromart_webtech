import React, { useState } from "react";
import { useUser } from './UserContext';

const AddressForm = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Address:", address);
    };

    return (
        <div id="address-form">
            <h2>Enter Your Address</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="street">Street Address:</label>
                <input 
                    type="text" 
                    id="street" 
                    name="street" 
                    value={address.street} 
                    onChange={handleChange} 
                    required 
                />
                
                <label htmlFor="city">City:</label>
                <input 
                    type="text" 
                    id="city" 
                    name="city" 
                    value={address.city} 
                    onChange={handleChange} 
                    required 
                />
                
                <label htmlFor="state">State:</label>
                <input 
                    type="text" 
                    id="state" 
                    name="state" 
                    value={address.state} 
                    onChange={handleChange} 
                    required 
                />
                
                <label htmlFor="postalCode">Postal Code:</label>
                <input 
                    type="text" 
                    id="postalCode" 
                    name="postalCode" 
                    value={address.postalCode} 
                    onChange={handleChange} 
                    required 
                />
                
                <label htmlFor="country">Country:</label>
                <input 
                    type="text" 
                    id="country" 
                    name="country" 
                    value={address.country} 
                    onChange={handleChange} 
                    required 
                />
                
                <button type="submit">Submit Address</button>
            </form>
        </div>
    );
};

export default AddressForm;
