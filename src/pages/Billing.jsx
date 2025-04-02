import React, { useState, useEffect } from 'react';
import getRequest from '../../services/getRequest';

const Billing = () => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState([]);  // Fetched product list
  const [billingProducts, setBillingProducts] = useState([]); // User-selected products
  const [brands, setBrands] = useState([])

  useEffect(() => {

    const fetchData = async () => {

      const { status, data } = await getRequest('/api/product/');

      if (status === 200 && data) {
        
        setProducts(data);

        const uniqueBrands = data.reduce((acc, prod) => {

          if (!acc.includes(prod.brand)) {

            acc.push(acc)
          }
          return acc
        }, [])
        setBrands(uniqueBrands)
      }

    };

    fetchData();
  }, []);

  const addProducts = () => {
    setBillingProducts([
      ...billingProducts,
      { name: '', qty: 1, price: 0, brand: '', totalPrice: 0 },
    ]);
  };

  // Handle product input changes
  const handleProductChange = (index, field, value) => {
    const newProducts = [...billingProducts];

    if (field === 'qty') {
      newProducts[index].qty = Number(value);
      newProducts[index].totalPrice = newProducts[index].qty * newProducts[index].price;

    } else {

      newProducts[index][field] = value;
      if (field === 'name') {
        const selectedProduct = products.find((p) => p.name === value);
        if (selectedProduct) {
          newProducts[index].price = selectedProduct.price;
          newProducts[index].brand = selectedProduct.brand;
          newProducts[index].totalPrice = newProducts[index].qty * selectedProduct.price;
        }
      }
    }

    setBillingProducts(newProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Billing Details:\nCustomer: ${customerName}\nEmail: ${email}\nProducts: ${JSON.stringify(billingProducts)}\nTotal Amount: $${billingProducts.reduce((sum, p) => sum + p.totalPrice, 0)}`
    );
  };

  const handleReset = () => {
    setCustomerName('');
    setEmail('');
    setBillingProducts([]);
  };

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-4">
      <div className="bg-white/10 p-8 shadow-2xl w-full backdrop-blur-xl">

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex w-full gap-2">

            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-3 rounded-lg text-gray-100 border-2 border-gray-500 bg-gray-700"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg text-gray-100 border-2 border-gray-500 bg-gray-700"
              required
            />

          </div>

          {billingProducts.map((item, index) => (
           
           <div key={index} className="flex gap-2 flex-wrap p-2 border-b border-gray-600">

              <select
                value={item.name}
                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                className="w-full max-w-md p-2 border rounded"
                required
              >
                <option value="">Select Product</option>

                {products.map((item) => (

                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>

                ))}
              </select>

              <select
                value={item.brand}
                onChange={(e) => handleProductChange(index, 'brand', e.target.value)}
                className="w-full max-w-md p-2 border rounded"
                required
              >
                <option value="">Select Brand</option>

                {brands.map((br, index) => (
                  
                  <option key={index} value={br}>
                    {br}
                  </option>

                ))}
              </select>

              <input
                type="number"
                value={item.qty}
                onChange={(e) => handleProductChange(index, 'qty', e.target.value)}
                className="border rounded p-2 w-20"
                placeholder="Qty"
                required
              />

              <p className="text-white text-lg">Total Price: ₹{item.totalPrice}</p>
            </div>
          ))}

          <button
            type="button"
            onClick={addProducts}
            className="flex items-center gap-1 text-blue-500 text-sm hover:cursor-pointer"
          >
            Add Product
          </button>

          <div className="text-white">
            <p>Total Items: {billingProducts.length}</p>
            <p>
              Total Amount: ₹
              {billingProducts.reduce((sum, p) => sum + p.totalPrice, 0)}
            </p>
          </div>

          <button type="submit" className="w-full py-3 bg-green-600 text-white font-bold rounded-lg">
            Submit Billing
          </button>

          <button type="button" onClick={handleReset} className="w-full py-3 bg-red-600 text-white font-bold rounded-lg">
            Reset Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default Billing;
