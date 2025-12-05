import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constans'
import axios from 'axios'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch=useDispatch();
  const fetchUser=async()=>{
    try {
      const res=await axios.get(BASE_URL+"/profile/view",{
            withCredentials:true,
        })
        dispatch(addUser(res.data));
    } catch (error) {
      console.log(error);
    }
    
  }
  useEffect(()=>{
      fetchUser();
  },[])
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body