import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Homepage from './Components/Homepage'
import Footer from './Components/Footer'
import Cartpage from './Components/Cartpage'
import DeliveryInfopage from './Components/DeliveryInfopage'

function App() {
  
  return (
    <div className='w-[100%] h-[100%] flex flex-col items-center'>
      <Navbar />
      <Routes>
        <Route path='' element={<Homepage />} />
        <Route path='/cart' element={<Cartpage />} />
        <Route path='/deliveryinfo' element={<DeliveryInfopage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App