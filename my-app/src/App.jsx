import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Pinfo from './Pinfo'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Pc from './Pc';
import Cart from './Cart';
import Buying from './Buying';
import Search from './Search';
import OrderPage from './Order';
import { UserProvider } from './UserContext';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/Pc' element={<Pc/>} />
        <Route path='/Info' element={<OrderPage/>}/>
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/sign' element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/Buying' element={<Buying/>} />
        <Route path='/Search' element={<Search />} />
        <Route path='/home' element={isAuthenticated ? <Home /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}
export default App;
