import React, { useContext, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { MenuContext } from '../Context/FoodProvider';


function DishCard({ data }) {
    const { AddItemInCart, addItemIndatabase, user } = useContext(MenuContext)
    const [addcart, setaddcart] = useState(false)
    const [quantity, setquantity] = useState(1)

    const decreaseQty = () => {
        if (quantity > 1) {
            setquantity(prevQty => prevQty - 1)
        } else {
            setaddcart(!addcart)
        }
    }

    const displayrating = (rating) => {
        let star = []
        for (let i = 0; i < 5; i++) {
            star.push(i < rating ? <FaStar key={i} color='green' /> : <FaRegStar key={i} />)
        }
        return star
    }

    const CartItem = (id, qty) => {
        if (user) {
            addItemIndatabase({ product_id: id, quantity: qty, user_id: user._id })
        } else {
            AddItemInCart(id, qty)
        }
    }

    return (
        <div className='w-[100%] h-[320px] lg:w-[280px] bg-white shadow-lg rounded-xl overflow-hidden relative mb-3 lg:mb-0'>
            <img src={data.item} alt="" className='w-[100%] h-[200px] object-cover' />
            {addcart ? (
                <div className='w-[100px] h-[34px] absolute right-3 top-40 bg-white flex items-center justify-between p-1 rounded-full'>
                    <LuMinus onClick={decreaseQty} className='text-3xl p-2 bg-[#ffd1d2] text-[#f62a29] font-semibold rounded-full' />
                    <p>{quantity}</p>
                    <LuPlus onClick={() => {
                        const newQty = quantity + 1
                        setquantity(newQty)
                        CartItem(data._id, newQty)
                    }} className='text-3xl p-2 bg-[#d4fed6] text-[#43cf50] font-semibold rounded-full' />
                </div>
            ) : <LuPlus onClick={() => { setaddcart(!addcart), CartItem(data._id, quantity) }} className='text-3xl p-2 absolute right-3 top-40 bg-white rounded-full' />}
            <div className='w-[100%] h-[100%] p-2'>
                <div className='w-[100%] flex items-center justify-between'>
                    <p className='font-semibold text-[16px]'>{data.title}</p>
                    <span className='flex items-center gap-1'>
                        {displayrating(data.rating)}
                    </span>
                </div>
                <p className='text-[13px] my-2'>{data.benefit}</p>
                <p className='text-xl font-semibold text-orange-500'>${data.price}</p>
            </div>
        </div>
    )
}

export default DishCard