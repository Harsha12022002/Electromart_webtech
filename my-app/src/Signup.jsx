import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handle = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/Signup', {
                name: name,
                phone: phone,
                email: email,
                password: password,
                address: "Harsha",
            });
            console.log("Response:", response.data);
            props.setIsAuthenticated(true);
            navigate("/home");
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div>
            <div id="sign-in">
                <div id="welcome-part">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                </div>
                <div id="create-part">
                    <h1>Create Account</h1>
                    <div id="take">
                        <form onSubmit={handle}>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required
                            />
                            <input 
                                type="tel" 
                                placeholder="Phone" 
                                value={phone} 
                                required
                                onChange={(e) => setPhone(e.target.value)} 
                            />
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                required
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <button id="btn-create" type="submit">SIGN UP</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
