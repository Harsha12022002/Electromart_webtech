import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; 

const Login = (props) => {
    const [email, setEmail] = useState("");
    console.log(email)
    const [password, setPassword] = useState("");
    const [info, setInfo] = useState("");
    const navigate = useNavigate();
    const { setEmail: setLoggedInEmail } = useUser(); 

    const checkUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/Signup?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
                method: 'GET'
            });

            if (response.status === 404) {
                setInfo("Username or password is incorrect");
                return;
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (result.user) {
                props.setIsAuthenticated(true);
                setLoggedInEmail(email); 
                navigate("/home");
            } else {
                setInfo("Login failed. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            setInfo("An error occurred while checking user data");
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setInfo("");
        checkUserData(); 
    };
    const handle=()=>{
        navigate('/sign')
    }
    return (
        <div id="login">
            <h1 style={{ color: "black" }}>Login</h1>
            <h2 id="login-h2" style={{ color: "cyan" }}>{info}</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Enter Your Email:</label>
                <input 
                    id="email"
                    type="email" 
                    placeholder="example@mail.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <label htmlFor="password">Enter Your Password:</label>
                <input 
                    id="password"
                    type="password" 
                    placeholder="12345678" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit" id="sub">Login</button>
            </form>
            <div>
                Don't have an account? <a href="/sign" onClick={handle}style={{ textDecoration: "underline" }}>Sign up</a>
            </div>
        </div>
    );
};

export default Login;
