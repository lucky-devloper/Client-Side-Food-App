import React, { useContext, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css";
import Dishcategory from './Dishcategory';
import tag from '../assets/tag.png'
import DishCard from './DishCard';
import { MenuContext } from '../Context/FoodProvider';

function Dishpage() {
    const { foodCategory, foodItem } = useContext(MenuContext)
    const [showitem, setshowitem] = useState(false)

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <div className='w-[100%] h-[100%] p-2'>
            <div className='w-[100%] h-fit lg:h-[300px] flex flex-col gap-4 lg:gap-5'>
                <h1 className='text-xl lg:text-3xl font-semibold'>Explore our menu</h1>
                <p className='text-[13px] lg:text-[18px] lg:w-[60%]'>Dive into our curated collection of mouth-watering dishes, crafted to satisfy every craving and delight every palate.</p>
                <div className='w-[100%] h-[150px] overflow-hidden lg:hidden'>
                    <Slider {...settings}>
                        {foodCategory?.map((item) => {
                            return <Dishcategory key={item._id} data={item} />
                        })}
                    </Slider>
                </div>
                <div className='w-[100%] h-[100%] hidden lg:block'>
                    <div className='w-[100%] h-[100%] flex gap-4 overflow-hidden'>
                        {foodCategory?.map((item) => {
                            return <Dishcategory key={item._id} data={item} />
                        })}
                    </div>
                </div>
            </div>
            <hr className='border-black my-4' />
            <div className='w-[100%] h-[100%] flex flex-col items-center lg:items-start gap-4'>
                <h1 className='text-xl font-semibold'>Top dishes near you</h1>
                <div className={`w-[100%] max-h-[1000px] lg:max-h-fit lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:gap-4 p-1 ${showitem ? "overflow-y-auto" : "overflow-hidden"}`}>
                    {foodItem?.map((item) => {
                        // console.log(item);
                        return <DishCard key={item._id} data={item} />
                    })}
                </div>
                <button onClick={() => setshowitem(!showitem)} className='w-[110px] h-[35px] lg:hidden rounded-full font-semibold border-2 border-orange-500'>See more</button>
                <div className='w-[100%] h-fit lg:h-[300px] flex flex-col items-center lg:justify-center lg:gap-7 text-center'>
                    <h1 className='text-xl lg:text-5xl font-semibold'>For Better Experience Download <br /> <span className='text-[#f36236]'>BiteHaven</span> App</h1>
                    <img src={tag} alt="" className='w-[200px] lg:w-[250px]' />
                </div>
            </div>
        </div>
    )
}

export default Dishpage