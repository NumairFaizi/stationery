import React, { useState } from 'react'
import getRequest from '../../services/getRequest';

const DisplayBill = () => {

    const [searchString, setSearchString] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchString)

        // const { status, data } = await getRequest('/api/billing/add-bill', bill)

    };

    const handleChange = (e) => { 
        // console.log(e.target.value)
        setSearchString(e.target.value)

        // const {status, data} = getRequest('', e.target.value)
    }


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

                </div>

            </div>

        </div>
    )
}

export default DisplayBill
