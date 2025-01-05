import React, { useContext } from 'react'
import { MenuContext } from '../Context/FoodProvider'

function Dishcategory({ data }) {
    const { selectedfood } = useContext(MenuContext)
    return (
        <>
            {data !== undefined ? <div onClick={() => selectedfood(data.name)} className='w-[100px] h-[100%] lg:h-[153px] lg:w-[150px] flex flex-col items-center'>
                <img src={data.image} alt="" className='w-[90px] h-[90px] lg:h-[130px] lg:w-[130px] object-cover rounded-full' />
                <p>{data.name}</p>
            </div> : ""}
        </>
    )
}

export default Dishcategory