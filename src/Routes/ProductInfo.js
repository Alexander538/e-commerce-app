import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../Components/Layout';
import fireDB from '../fireConfig';
import { addToCart, getTotals } from '../redux/cartSlice';

function ProductInfo() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
              <div className='justify-content-center'>
                <p>
                  <b>{product.name}</b>
                </p>
                <img className='product-info-img' src={product.imageURL} />
                <hr />
                <p>{product.description}</p>
                <div className='d-flex justify-content-end my-3'>
                  {' '}
                  <button
                    style={{ marginRight: '5px' }}
                    onClick={() => navigate('/')}
                  >
                    <FaArrowAltCircleLeft /> back
                  </button>
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
