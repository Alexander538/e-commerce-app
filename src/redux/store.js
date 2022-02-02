import { createStore } from 'redux';
import rootReducer from './rootReducer';

const initialStore = {
  cartReducer: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) ?? [],
  },
};

export const store = createStore(rootReducer, initialStore);
