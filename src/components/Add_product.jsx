import React, { useState } from 'react';
import postRequest from '../../services/postRequest'
import { ToastContainer} from 'react-toastify';
import notify from '../utils/toast';

const Add_product = ({ closeModal }) => {
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const HandleAddProduct = async (event) => {
        event.preventDefault();

        const product = {
            name: productName,
            brand,
            qty: parseInt(quantity),
            price: parseFloat(price)
        };

        // console.log(product)
        // add product
        const { status, data } = await postRequest('/api/product/', product)

      
        notify(status, data.message)

        // Clear form fields
        setProductName('');
        setBrand('');
        setPrice('');
        setQuantity('');

        // Close modal after adding the product
        // closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">

            <ToastContainer />
            <div className="backdrop-blur-sm bg-white/30 p-8 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    ✖
                </button>
                <h1 className="text-3xl font-bold text-center text-gray-800 opacity-100 mb-4">
                    Add Product Here
                </h1>
                <form className="space-y-5" onSubmit={HandleAddProduct}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        className="w-full p-3 rounded-md text-gray-800 border-2 border-gray-300 focus:border-blue-500 focus:outline-none opacity-100"
                    />
                    <input
                        type="text"
                        placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                        className="w-full p-3 rounded-md text-gray-800 border-2 border-gray-300 focus:border-blue-500 focus:outline-none opacity-100"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full p-3 rounded-md text-gray-800 border-2 border-gray-300 focus:border-blue-500 focus:outline-none opacity-100"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="w-full p-3 rounded-md text-gray-800 border-2 border-gray-300 focus:border-blue-500 focus:outline-none opacity-100"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 rounded-md text-white border-2 bg-green-600 hover:bg-green-500 opacity-100"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Add_product;
