import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Components/Layout';
import { addDoc, collection } from 'firebase/firestore';
import fireDB from '../fireConfig';
import { toast } from 'react-toastify';

import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from '../redux/cartSlice';

function CartPage() {
  // const { cartItems } = useSelector((state) => state.cartReducer);

  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  // const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   let temp = 0;
  //   cartItems.forEach((cartItem) => {
  //     temp = temp + cartItem.price;
  //   });
  //   setTotal(temp);
  // }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
  }, [cart.cartItems]);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  // const deleteFromCart = (product) => {
  //   dispatch({ type: 'DELETE_FROM_CART', payload: product });
  // };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      zipCode,
      phoneNumber,
    };
    console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem('currentUser')).user.email,
      userid: JSON.parse(localStorage.getItem('currentUser')).user.uid,
    };

    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, 'orders'), orderInfo);
      setLoading(false);
      toast.success('Order placed successfully');
      handleClose();
      handleClearCart();
    } catch (error) {
      setLoading(false);
      toast.error('Order failed');
    }
  };

  return (
    <Layout loading={loading}>
      <table className='table mt-3'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height='80' width='80' />
                </td>

                <td>{item.name}</td>
                <td>$ {item.price}</td>
                <td>{item.cartQuantity}</td>
                <td>
                  <FaTrash onClick={() => handleDecreaseCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className='d-flex justify-content-end '>
        <h1 className='total-amount'>cart total: $ {cart.cartTotalAmount}</h1>
      </div>
      <div className='d-flex justify-content-end mt-3'>
        <button style={{ marginRight: '5px' }} onClick={handleClearCart}>
          clear cart
        </button>
        <button onClick={handleShow}>place order</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please provide your shipping information.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div className='register-form'>
            <h2>Shipping Info:</h2>

            <hr />

            <input
              type='text'
              className='form-control'
              placeholder='name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <textarea
              rows={3}
              type='text'
              className='form-control'
              placeholder='address'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              type='number'
              className='form-control'
              placeholder='zip code'
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
            />
            <input
              type='number'
              className='form-control'
              placeholder='phone number'
              value={[phoneNumber]}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeOrder}>Order</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default CartPage;
