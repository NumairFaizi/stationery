import React, { useEffect, useState } from 'react'
import getRequest from '../../services/getRequest';

const DisplayBill = () => {

    const [searchString, setSearchString] = useState('')
    const [billingData, setBillingData] = useState([])
    const [isBill, setIsBill] = useState(false)
    const [date, setDate] = useState('')

    const fetchData = async (url) => {

        const { status, data } = await getRequest(url)
        // console.log(status, data)

        if (status !== 200 || !data || data.length === 0) {

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

                {/* Data will be displayed here */}
                <div className='min-h-screen, overflow-y-auto'>
                    {isBill ? (

                        <div>{billingData.billingData.map((data) => {
                            return (

                                <div key={data._id} className="p-4 bg-gray-800 text-white rounded-lg my-2">
                                    <h2 className="text-lg font-semibold">{data.customerName}</h2>
                                    <h2 className="text-sm text-gray-300">{data.email}</h2>
                                </div>
                            )
                        })}
                        </div>
                    ) : <div className="text-center text-white mt-4">No billing data</div>}

                </div>

            </div>

        </div>
    )
}

export default DisplayBill
