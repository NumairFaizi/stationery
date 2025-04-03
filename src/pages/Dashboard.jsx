import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import getRequest from '../../services/getRequest'

const Dashboard = () => {

  const navigate = useNavigate()

  const [totalProduct, setTotalProduct] = useState()
  const [totalPrice, setTotalPrice] = useState()


  useEffect(() => {

    if (!localStorage.getItem('stationary')) navigate('/login')

    const fetchData = async () => {

      const { status, data } = await getRequest('/api/product/')

      // console.log(data, status)

      if (status != 200)  return

      if (data == undefined) return

      setTotalPrice(data.reduce((sum, item) => sum + Number(item.price), 0))
      setTotalProduct(data.length)
    }

    fetchData()
  }, [])

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col items-start w-full bg-gradient-to-r from-blue-700 to-teal-600 p-6 text-white">
        <h1 className="mt-2 text-2xl font-semibold">Inventory Management</h1>
        <h2 className="text-base mt-2 font-medium">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
        <div className="col-span-12 md:col-span-3 bg-gray-800 p-4 rounded-lg">
          <div className="mb-6">
            <h3 className="text-xl font-bold">Total Price</h3>
            <p className="text-3xl font-bold mt-2">₹ {totalPrice}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Stock Purchases</h3>
            <ul>
              <li className="flex justify-between">
                <span>Unfulfilled</span>
                <span className="font-bold">0</span>
              </li>
              <li className="flex justify-between mt-2">
                <span>Received</span>
                <span className="font-bold">0</span>
              </li>
            </ul>
          </div>
        </div>


        <div className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            <Card title='Total Products' count={totalProduct} />

            <Card title='Low Stock' count={totalProduct} />

            <Card title='Out of Stock' count={totalProduct} />

          </div>

          <div className="mt-8 bg-gray-800 p-6 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;