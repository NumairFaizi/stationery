import React, { useEffect, useState } from 'react'
// import * as XLSX from 'xlsx';
import getRequest from '../../services/getRequest';
import notify from '../utils/toast';

const Inventory = () => {
  const [products, setProducts] = useState([]);

  const handleDownloadExcel = async () => {
    // const worksheet = XLSX.utils.json_to_sheet(products);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    
    // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    // const url = window.URL.createObjectURL(data);

    // const link = document.createElement('a');
    // link.href = url;
    // link.download = 'products.xlsx';
    // link.click();
    // window.URL.revokeObjectURL(url);
  }

  useEffect(() => {
    const fetchProducts = async () => {

      const {status, data} = await getRequest('/api/product')
      // console.log(status, data)

      if (status != 200) {

        notify(status, data.message)
      }
      setProducts(data);


    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-4 sm:p-8">

      <div className="bg-white/10 p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-6xl mx-auto backdrop-blur-xl border-2 border-gray-200/30">
        {/* <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-200 mb-6 drop-shadow-lg">
          Stock Report
        </h1> */}

        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-300 mb-8">
          Current Stock Information
        </h2>

       

        <table className="min-w-full bg-white text-left text-black border-collapse">
          <thead>
            <tr className="border-b border-gray-500">
              <th className="py-3 px-2 sm:px-4 text-lg font-medium">Product</th>
              <th className="py-3 px-2 sm:px-4 text-lg font-medium">Brand</th>
              <th className="py-3 px-2 sm:px-4 text-lg font-medium">Quantity</th>
              <th className="py-3 px-2 sm:px-4 text-lg font-medium">Price per Item</th>
              <th className="py-3 px-2 sm:px-4 text-lg font-medium">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-700 transition-all duration-200">
                <td className="py-3 px-2 sm:px-4">{product.name}</td>
                <td className="py-3 px-2 sm:px-4">{product.brand}</td>
                <td className="py-3 px-2 sm:px-4">{product.qty}</td>
                <td className="py-3 px-2 sm:px-4">{product.price}</td>
                <td className="py-3 px-2 sm:px-4">{product.price * product.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2">
          <button onClick={handleDownloadExcel} className=' bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 py-2 px-2 '>Download Excel</button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;