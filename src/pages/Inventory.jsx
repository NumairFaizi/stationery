import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../lib/db';
import * as XLSX from 'xlsx';

const Inventory = () => {
  const [products, setProducts] = useState([]);

  const handleDownloadExcel = async () => {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(data);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-8">

      <div className="bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-6xl mx-auto backdrop-blur-xl border-2 border-gray-200/30">
        <h1 className="text-4xl font-extrabold text-center text-gray-200 mb-6 drop-shadow-lg">
          Stock Report
        </h1>

        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-8">
          Current Stock Information
        </h2>

        <div>
          <button onClick={handleDownloadExcel} className='border-2 border-green-500 bg-green-500 text-white py-1 px-2 rounded-lg absolute right-8 top-28'>Download Excel</button>
        </div>

        <table className="min-w-full bg-white text-left text-black border-collapse">
          <thead>
            <tr className="border-b border-gray-500">
              <th className="py-3 px-4 text-lg font-medium">Product</th>
              <th className="py-3 px-4 text-lg font-medium">Brand</th>
              <th className="py-3 px-4 text-lg font-medium">Quantity</th>
              <th className="py-3 px-4 text-lg font-medium">Price</th>
              <th className="py-3 px-4 text-lg font-medium">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-700 transition-all duration-200">
                <td className="py-3 px-4">{product.productName}</td>
                <td className="py-3 px-4">{product.brand}</td>
                <td className="py-3 px-4">{product.quantity}</td>
                <td className="py-3 px-4">{product.rate}</td>
                <td className="py-3 px-4">{product.totalRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;