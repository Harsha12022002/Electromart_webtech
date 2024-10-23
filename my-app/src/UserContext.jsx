import React, { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext(); 

export const UserProvider = ({ children }) => {
    const [email, setEmail] = useState(() => {
        const storedEmail = localStorage.getItem('email');
        return storedEmail ? storedEmail : "harshadevadia6289@gmail.com";
    });

    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    useEffect(() => {
        localStorage.setItem('email', email);
    }, [email]);

    return (
        <UserContext.Provider value={{ email, setEmail }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
