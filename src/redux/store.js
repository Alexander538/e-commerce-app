import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
// import { createStore } from 'redux';
// import { cartReducer } from './cartReducer';
// import rootReducer from './rootReducer';

// const initialStore = {
//   cartReducer: {
//     cartItems: JSON.parse(localStorage.getItem('cartItems')) ?? [],
//   },
// };

// export const store = createStore(rootReducer, initialStore);




const store = configureStore({
  reducer: {
    cart: cartReducer,
    
  }
})

export default store;