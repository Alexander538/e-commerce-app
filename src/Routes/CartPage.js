import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Components/Layout';
import { addDoc, collection } from 'firebase/firestore';
import fireDB from '../fireConfig';
import { toast } from 'react-toastify';

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.price;
    });
    setTotal(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  const deleteFromCart = (product) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: product });
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height='80' width='80' />
                </td>

                <td>{item.name}</td>
                <td>$ {item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className='d-flex justify-content-end '>
        <h1 className='total-amount'>cart total: $ {total}</h1>
      </div>
      <div className='d-flex justify-content-end mt-3'>
        <button onClick={handleShow}>place order</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please provide your shipping information.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div className='register-form'>
            <h2>Register</h2>

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
