import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import fireDB from '../fireConfig';
import { hatProducts } from '../data/hatProducts';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Home() {
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // function addProductsData() {
  //   hatProducts.map(async (product) => {
  //     try {
  //       await addDoc(collection(fireDB, 'products'), product);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success("Added to cart!")
  };

  return (
    <Layout loading={loading}>
      <div className='container'>
        <div className='d-flex w-50 align-items-center my-3 justify-content-center'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className='form-control mx-2'
            placeholder='search hats'
          />
          <select
            className='form-control mt-3'
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value=''>Show All</option>
            <option value='winter'>Winter Collection</option>
            <option value='spring'>Spring Collection</option>
            <option value='summer'>Summer Collection</option>
            <option value='fall'>Fall Collection</option>
          </select>
        </div>
        <div className='row'>
          {products
            .filter((obj) => obj.name.toLowerCase().includes(searchTerm))
            .filter((obj) => obj.category.toLowerCase().includes(filter))
            .map((product) => {
              return (
                <div className='col-md-6'>
                  <div className='m-2 p-1 product position-relative'>
                    <div className='product-content'>
                      <p>{product.name}</p>
                      <div className='text-center'>
                        <img
                          src={product.imageURL}
                          alt=''
                          className='product-img'
                        />
                      </div>
                    </div>
                    <div className='product-actions'>
                      <h2>$ {product.price}</h2>
                      <div className='d-flex'>
                        <button
                          className='mx-2'
                          onClick={() => addToCart(product)}
                        >
                          add to cart
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/productinfo/${product.id}`);
                          }}
                        >
                          view
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
