import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constans';

const Feed = () => {
  const getFeed=async()=>{
    try {
      const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getFeed();
  },[]);
  return (
    <div>Feed</div>
  )
}

export default Feed