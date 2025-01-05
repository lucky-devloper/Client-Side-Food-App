import React from 'react'
import Dishpage from './Dishpage'

function Homepage() {
    return (
        <div className='w-[100%] h-fit lg:w-[80%]'>
            <div className='w-[100%] h-[180px] lg:h-[530px] p-2 lg:mt-6'>
                <div className='w-[100%] h-[100%] bg-[url(https://food-dellivery.vercel.app/static/media/header_img.87c84a24f79531681564.png)] bg-center bg-cover bg-no-repeat rounded-md text-white flex flex-col items-start justify-end gap-1 lg:gap-6 p-2 lg:p-20'>
                    <h1 className='text-2xl lg:text-7xl font-semibold'>Order your <br /> favourite food here</h1>
                    <p className='text-[13px] lg:text-xl font-semibold lg:font-normal lg:w-[70%]'>Feeling a little hungry? Swipe top on flavor and let us deliver happiness to your doorstep.</p>
                    <button className='text-[13px] lg:text-[16px] font-semibold py-1 px-3 lg:w-[130px] lg:h-[50px] rounded-full bg-[#f2f2f2] text-gray-600'>View menu</button>
                </div>
            </div>
            <Dishpage />
        </div>
    )
}

export default Homepage