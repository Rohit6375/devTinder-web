import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constans'

const Body = () => {
  const dispatch=useDispatch();
  const fetchUser=async()=>{
    const res=await axios.get(BASE_URL+"/profile/view",{
            withCredentials:true,
        })
  }
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body