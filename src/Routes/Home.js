import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import fireDB from '../fireConfig';
import { hatProducts } from '../data/hatProducts';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      const products = await getDocs(collection(fireDB, 'products'));
      const productsArray = [];
      products.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productsArray.push(obj);
      });

      setProducts(productsArray);
    } catch (error) {
      console.log(error);
    }
  }

  function addProductsData() {
    hatProducts.map(async (product) => {
      try {
        await addDoc(collection(fireDB, 'products'), product);
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  );
}

export default Home;
