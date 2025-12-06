import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constans';

const Feed = () => {
  const getFeed=async()=>{
    try {
      const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>Feed</div>
  )
}

export default Feed