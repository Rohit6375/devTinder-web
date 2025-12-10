import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constans'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import ConnectionCard from './ConnectionCard'

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
    if(!connections) return;
    if(connections.length===0) return <h1 className='flex justify-center my-10 font-bold text-xl'>No connections found</h1>
 return (
  <div className="flex flex-col items-center my-10 w-full">

    {/* HEADING */}
    <h1 className="font-bold text-2xl mb-6">Connections</h1>

    {/* CONNECTIONS LIST */}
    <div className="flex flex-col items-center gap-4 w-full">
      {connections.map((connection) => {
        const { _id, firstName, lastName, about, gender, age, photoUrl } = connection;

        return (
          <ConnectionCard
            key={_id}
            user={{ firstName, lastName, about, gender, age, photoUrl }}
          />
        );
      })}
    </div>

  </div>
);

}
