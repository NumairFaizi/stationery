import React, { useEffect, useState } from 'react'
import getRequest from '../../services/getRequest';

const DisplayBill = () => {

    const [searchString, setSearchString] = useState('')
    const [billingData, setBillingData] = useState([])
    const [isBill, setIsBill] = useState(false)

    const fetchData = async (url) => {

        const { status, data } = await getRequest(url)
        console.log(status, data)

        if (status !== 200) {

            setIsBill(false)
            return
        }
        setIsBill(true)

        setBillingData(data)
    }

    const handleChange = (e) => {
        // console.log(e.target.value)
        setSearchString(e.target.value)

        fetchData(`/api/billing/bill-by-search-string/${e.target.value}`)
        // console.log(data)
    }

    useEffect(() => {

        fetchData('/api/billing/bills')

    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchString)

        // const { status, data } = await getRequest('/api/billing/add-bill', bill)

    };

    return (

        <div className="flex justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-4">

            <div className="bg-white/10 p-8 shadow-2xl w-full backdrop-blur-xl">

                <form className="flex w-full gap-2 justify-center items-center" onSubmit={handleSubmit}>
                    <div className='w-full'>

                        <input
                            type="text"
                            placeholder="Email or Mobile"
                            value={searchString}
                            onChange={(e) => { handleChange(e) }}
                            className="w-full p-2 rounded-lg text-gray-100 border-2 border-gray-500 bg-gray-700"
                            required
                        />
                    </div>

                    <div>

                        <button type="submit" className="py-2 px-3 bg-green-600 text-white font-bold rounded-lg">
                            search
                        </button>
                    </div>
                </form>

                {/* Data will be displayed here */}
                <div className='min-h-screen, overflow-y-auto'>
                    {isBill ? (

                        <div>{billingData.billingData.map((data, key) => {
                            return (

                                <div>
                                    <h2>{data.customerName}</h2>
                                    <h2>{data.email}</h2>
                                </div>
                            )
                        })}
                        </div>
                    ) : <div>No billing data</div>}

                </div>

            </div>

        </div>
    )
}

export default DisplayBill
