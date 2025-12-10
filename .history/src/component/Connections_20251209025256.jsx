import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constans'

export const Connections = () => {
    const fetchConnections=async()=>{
        try {
            const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[]);
  return (
    <div className='flex justify-center my-10'>
        <h1 className='font-bold text-2xl'>Connections</h1>

        <div>

        </div>
    </div>
  )
}
