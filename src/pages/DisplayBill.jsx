import React, { useEffect, useRef, useState } from 'react'
import getRequest from '../../services/getRequest';
// import "html2pdf.js";


const DisplayBill = () => {

    const [searchString, setSearchString] = useState('')
    const [billingData, setBillingData] = useState([])
    const [isBill, setIsBill] = useState(false)
    const [date, setDate] = useState('')
    const invoiceRefs = useRef({})

    const fetchData = async (url) => {

        const { status, data } = await getRequest(url)

        // console.log(status, data.billingData.length)

        if (status !== 200 || !data || data.billingData.length === 0) {

            setIsBill(false)
            setBillingData([]);
        } else {

            setIsBill(true)
            setBillingData(data)
        }
    }

    const handleChange = async (e, type) => {

        let url = `/api/billing/bill-by-search-string/${e.target.value}`
        if (type == 'text') {

            setSearchString(e.target.value)
        } else if (type === 'date') {

            setDate(e.target.value)
        } else {

            url = '/api/billing/bills'
        }
        fetchData(url)
    }

    useEffect(() => {

        fetchData('/api/billing/bills')

    }, [])

    // download pdf 
    const generatePDF = (invoiceId, elementRef) => {

        const element = elementRef.current
        console.log('element', invoiceId)
        // window.html2pdf()
        //     .set({ filename: 'temp' })
        //     .from(element)
        //     .save()

    }

    return (

        <div className="flex justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-4">

            <div className="bg-white/10 p-8 shadow-2xl w-full backdrop-blur-xl">

                <form className="flex w-full gap-2 justify-center items-center">
                    <div className='w-full'>

                        <input
                            type="text"
                            placeholder="Email or Mobile"
                            value={searchString}
                            onChange={(e) => { handleChange(e, 'text') }}
                            className="w-full p-2 rounded-lg text-gray-100 border-2 border-gray-500 bg-gray-700"

                        />
                    </div>

                    <div>
                        <input
                            type="date"
                            placeholder="Date"
                            value={date}
                            onChange={(e) => { handleChange(e, 'date') }}
                            className="w-full p-2 rounded-lg text-gray-100 border-2 border-gray-500 bg-gray-700"
                        />
                    </div>

                    <div>

                        {/* <button type="submit" className="py-2 px-3 bg-green-600 text-white font-bold rounded-lg">
                            search
                        </button> */}
                    </div>
                </form>

                <div className='min-h-screen, overflow-y-auto'>

                  {isBill ? (
                        <div className="p-4 space-y-6" ref={invoiceRefs}>

                            {billingData.billingData.map((data) => {

                                if (!invoiceRefs.current[data._id]) {
                                    invoiceRefs.current[data._id] = React.createRef();
                                }


                                // TODO: invoice number needs to be handled
                                return (
                                    <div
                                        key={data._id}
                                        className="bg-gray-800 text-white rounded-lg p-6 shadow-md space-y-4"
                                        ref={invoiceRefs.current[data._id]}>

                                        {/* Header */}
                                        <div className="text-center border-b border-gray-600 pb-2 bg-gradient-to-r from-blue-700 to-teal-600 text-white ">
                                            <h1 className="text-2xl font-bold bg-gradient-to-r ">INVOICE</h1>
                                            <p className="text-sm text-gray-300">Invoice No: #{data._id.slice(0, 6).toUpperCase()}</p>
                                            <p className="text-sm text-gray-300">Date: {data.date}</p>
                                        </div>

                                        {/* Customer Info */}
                                        <div className="grid grid-cols-2 gap-4 ">
                                            <div className=''>
                                                <h2 className="font-semibold text-lg">Bill To:</h2>
                                                <p>{data.customerName}</p>
                                                <p className="text-sm text-gray-300">{data.email}</p>
                                            </div>
                                            <div>
                                                <h2 className="font-semibold text-lg">Ship To:</h2>
                                                <p>{data.customerName}</p>
                                                <p className="text-sm text-gray-300">{data.email}</p>
                                            </div>
                                        </div>

                                        {/* Products Table */}
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full text-left border border-gray-600">
                                                <thead className="bg-gradient-to-r from-blue-700 to-teal-600 text-gray-100">
                                                    <tr>
                                                        <th className="px-4 py-2 border">Product</th>
                                                        <th className="px-4 py-2 border">Brand</th>
                                                        <th className="px-4 py-2 border">Qty</th>
                                                        <th className="px-4 py-2 border">Unit Price</th>
                                                        <th className="px-4 py-2 border">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.billingProducts.map((product, key) => (
                                                        <tr key={key} className="border-t border-gray-600">
                                                            <td className="px-4 py-2">{product.name}</td>
                                                            <td className="px-4 py-2">{product.brand}</td>
                                                            <td className="px-4 py-2">{product.qty}</td>
                                                            <td className="px-4 py-2">₹{product.price}</td>
                                                            <td className="px-4 py-2">₹{product.totalPrice}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Summary */}
                                        <div className="text-right space-y-1">
                                            <p className="text-sm">Subtotal: ₹{data.subTotal}</p>
                                            <p className="text-sm">Discount: ₹{data.discount}</p>
                                            <p className="text-sm">CGST @  {data.SGSTandCGST}%: ₹{data.CGSTAmount}</p>
                                            <p className="font-bold text-yellow-400 text-lg">
                                                Grand Total: ₹{data.grandTotal}
                                            </p>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-sm">Payment Mode: {data.paymentMethod}</p>
                                            <button
                                                onClick={() => { generatePDF(data._id, invoiceRefs.current[data._id]) }}
                                                className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg"
                                            >
                                                Print
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-white mt-4">No billing data</div>
                    )}

                </div>

            </div>

        </div>
    )
}

export default DisplayBill
