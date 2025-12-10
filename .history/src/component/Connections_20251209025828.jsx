import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constans'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

export const Connections = () => {
    const connections=useSelector((store)=>store.connections);
    const dispatch=useDispatch();
    const fetchConnections=async()=>{
        try {
            const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
            dispatch(addConnections(res.data.data));
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
