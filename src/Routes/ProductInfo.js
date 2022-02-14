import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import fireDB from '../fireConfig';
import Layout from '../Components/Layout';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart, getTotals } from '../redux/cartSlice';

function ProductInfo() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  async function getData() {
    try {
      setLoading(true);
      const productTemp = await getDoc(
        doc(fireDB, 'products', params.productid)
      );

      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <Layout loading={loading}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            {product && (
              <div>
                <p>
                  <b>{product.name}</b>
                </p>
                <img src={product.imageURL} className='product-info-img' />
                <hr />
                <p>{product.description}</p>
                <div className='d-flex justify-content-end my-3'>
                  {' '}
                  <button onClick={() => handleAddToCart(product)}>
                    add to cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductInfo;
