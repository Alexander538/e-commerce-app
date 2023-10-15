import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout';
import { collection, getDocs } from 'firebase/firestore';
import fireDB from '../fireConfig';

function Orders () {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasOrders, setHasOrders] = useState(false);
  const userid = JSON.parse(localStorage.getItem('currentUser')).user.uid;
  console.log('currUSer: ', userid)
  const hasCartItems = (order) => order.cartItems.length > 0;

  useEffect(() => {
    getData();
  }, []);

  async function getData () {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, 'orders'));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
      });
      setLoading(false);
      console.log(ordersArray.filter(obj => String(obj.userid) === userid));
      const usersOrders = ordersArray.filter(obj => String(obj.userid) === userid);
      setHasOrders(usersOrders.length > 0);
      console.log('user has orders? ', usersOrders.length > 0);
      setOrders(usersOrders);
    } catch (error) {
      console.log('errors: ', error);
      setLoading(false);
    }
  }

  if (!hasOrders) {
    return (<div><p>No Orders.</p> </div>)
  }

  return (
    <Layout loading={loading}>
        <div className='p-2'>
        {orders.map((order) => {
          return (
          <table className='table mt-3 order' key={order.userid}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              { hasCartItems()
                ? orders.cartItems.map((item) =>
                  (<tr key={item.name}>
                    <td>
                      <img src={item.imageURL} height='80' width='80' />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.cartQuantity}</td>
                    <td>$ {item.price}</td>
                  </tr>)
                )
                : <span>Cart is empty.</span>
            }
            </tbody>
          </table>
          );
        })}
        </div>
    </Layout>
  );
}

export default Orders;
