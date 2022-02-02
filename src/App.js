import './App.css';
import Home from './Routes/Home';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Routes/LoginPage';
import RegisterPage from './Routes/RegisterPage';
import ProductInfo from './Routes/ProductInfo';
import CartPage from './Routes/CartPage';
import { ToastContainer } from 'react-toastify';

import './stylesheets/layout.css';
import './stylesheets/products.css';
import './stylesheets/authentication.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            exact
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />

          <Route
            path='/productinfo/:productid'
            exact
            element={
              <ProtectedRoutes>
                <ProductInfo />
              </ProtectedRoutes>
            }
          />
          <Route
            path='/cart'
            exact
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />
          <Route path='/login' exact element={<LoginPage />} />
          <Route path='/register' exact element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('currentUser')) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
};
