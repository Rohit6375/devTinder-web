import React, { useState } from 'react'
import UserCard from './UserCard';

const EditProfile = ({user}) => {
    const[firstName,setFirstName]=useState(user.firstName);
    const[lastName,setLastName]=useState(user.lastName);
    const[gender,setGender]=useState(user.gender);
    const[age,setAge]=useState(user.age);
    const[error,setError]=useState("");
    const[photoUrl,setPhotoUrl]=useState(user.photoUrl);
    const[skills,setSkills]=useState(user.skills);
    const[about,setAbout]=useState(user.about);
    console.log(user);
  return (
    <div className='flex justify-center my-10'>
      <div className='flex justify-center mx-10'>
    <div className="card bg-base-300 text-primary-content w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
   <div className="flex flex-col ">
    <label className='form-control w-full max-w-xs py-2'>
        <div className='label'>
            <span className='label-text'>First Name</span>
        </div>
        <input 
           type="text"
           value={firstName}
         onChange={(e)=>setFirstName(e.target.value)}

           placeholder='john@gmail.com'
           className='input input-bordered rounded-xl w-full max-w-xs py-5'
        />
    </label>

    <label className='form-control w-full max-w-xs py-2'>
        <div className='label'>
            <span className='label-text'>Last Name</span>
        </div>
        <input 
           type="text"
           value={lastName}
           onChange={(e)=>setLastName(e.target.value)}
           placeholder='John'
           className='input input-bordered rounded-xl w-full max-w-xs py-5'
        />
    </label>
    <label className='form-control w-full max-w-xs py-2'>
        <div className='label'>
            <span className='label-text'>Gender</span>
        </div>
        <input 
           type="text"
           value={gender || "none"}
           onChange={(e)=>setGender(e.target.value)}
           
           className='input input-bordered rounded-xl w-full max-w-xs py-5'
        />
    </label>
    <label className='form-control w-full max-w-xs py-2'>
        <div className='label'>
            <span className='label-text'>Age</span>
        </div>
        <input 
           type="number"
           value={age || "none"}
           onChange={(e)=>setGender(e.target.value)}
           
           className='input input-bordered rounded-xl w-full max-w-xs py-5'
        />
    </label>
</div>
<p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary m-2" >Save</button>
    </div>
  </div>
</div>
</div>
<UserCard user={{firstName,lastName,gender,about,age,skills,photoUrl}} />
</div>
  )
}

export default EditProfile