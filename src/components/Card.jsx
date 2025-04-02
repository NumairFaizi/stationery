import React from 'react'

const Card = ({ title, count }) => {
    // console.log(title, count)
    return (
        <div
            className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300">
            <div>
                <p className="text-lg font-semibold">{title}</p>
                <p className="text-2xl font-bold">{count}</p>
            </div>
        </div>
    )
}

export default Card
