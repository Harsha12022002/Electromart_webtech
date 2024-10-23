import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    const handleNavigate = () => {
        navigate('/Cart');
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          handleClick();
        }
      };

    const handleInputChange = (event) => {
        const str = event.target.value;
        
        const capitalize = (str) => {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
        setInputValue(capitalize(str));
    };

    const handleClick = () => {
        if (inputValue.trim()) {
            console.log(inputValue.toUpperCase());
            navigate('/Search', { state: { title: inputValue } });
        }
    };
    const handlelogin=()=>{
        navigate('/');
    }
const handleClick1=()=>{
    navigate('/info')
}
    return (
        <div>
            <nav>
                <ul className="listt">
                    <li><Link to="#">Mobile</Link></li>
                    <li><Link to="/Pc">PC & Accessories</Link></li>
                    <li><Link to="#">Softwares</Link></li>
                    <li><Link to="#">Electronic-Gadget</Link></li>
                    <input
                        type="text"
                        id="search"
                        placeholder="search_here"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                </ul>
                <button id="btn" onClick={handleNavigate}></button>
                <div class="profile-dropdown">
  <button class="profile-btn">
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu">
    <li onClick={handleClick1}>Order History</li>
    <li onClick={handlelogin}>Logout</li>
  </ul>
</div>

            </nav>
        </div>
    );
};

export default Navbar;
