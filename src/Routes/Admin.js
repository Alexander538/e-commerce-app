import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Layout from '../Components/Layout';
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import fireDB from '../fireConfig';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: '',
    price: 0,
    imageURL: '',
    category: '',
  });

  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const products = await getDocs(collection(fireDB, 'products'));
      const productsArray = [];
      products.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productsArray.push(obj);
        setLoading(false);
      });

      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const editHandler = (item) => {
    setProduct(item);

    setShow(true);
  };
  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, 'products', product.id), product);
      handleClose();
      toast.success('Product updated successfully!');
      window.location.reload();
    } catch (error) {
      toast.error('Product update failed');
      setLoading(false);
    }
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, 'products'), product);
      handleClose();
      toast.success('Product added successfully!');
      window.location.reload();
    } catch (error) {
      toast.error('Product addition failed');
      setLoading(false);
    }
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, 'products', item.id));
      toast.success('Product deleted successfully!');
      getData();
    } catch (error) {
      toast.failed('Product deletion failed');
      setLoading(false);
    }
  };

  const addHandler = () => {
    setAdd(true);
    handleShow();
  };
  return (
    <Layout loading={loading}>
      <div className='d-flex justify-content-between'>
        <h3>Products List</h3>
        <button onClick={addHandler}>Add Product</button>
      </div>
      <table className='table mt-3'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height='80' width='80' />
                </td>

                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>$ {item.price}</td>

                <td>
                  <FaTrash
                    color='red'
                    size={20}
                    onClick={() => deleteProduct(item)}
                  />

                  <FaEdit
                    onClick={() => editHandler(item)}
                    color='blue'
                    size={20}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{add ? 'ADD' : 'EDIT'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div className='register-form'>
            <h2>Product Info:</h2>
            <input
              type='text'
              className='form-control'
              placeholder='name'
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <input
              type='text'
              className='form-control'
              placeholder='image url'
              value={product.imageURL}
              onChange={(e) =>
                setProduct({ ...product, imageURL: e.target.value })
              }
            />
            <input
              type='number'
              className='form-control'
              placeholder='product price'
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <input
              type='text'
              className='form-control'
              placeholder='category'
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />

            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          {add ? (
            <button onClick={addProduct}>SAVE</button>
          ) : (
            <button onClick={updateProduct}>SAVE</button>
          )}
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default Admin;
