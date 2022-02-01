import './App.css';
import Home from './Routes/Home';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import LoginPage from './Routes/LoginPage';
import RegisterPage from './Routes/RegisterPage';
import ProductInfo from './Routes/ProductInfo';
import CartPage from './Routes/CartPage';

import './stylesheets/layout.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<LoginPage />} />
          <Route path='/register' exact element={<RegisterPage />} />
          <Route path='/productinfo' exact element={<ProductInfo />} />
          <Route path='/cart' exact element={<CartPage />} />



        </Routes>
      
      
      </BrowserRouter>



    </div>
  );
}

export default App;