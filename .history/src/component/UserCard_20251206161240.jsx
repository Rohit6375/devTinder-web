import React from 'react'

const UserCard = ({user}) => {
   
    const {firstName,lastName,gender,age,photoUrl,about}=user;
  return (
    <div className="card bg-base-300 w-96 shadow-md rounded-xl">
  <figure>
    <img
      src="https://rajenengg.com/wp-content/uploads/2020/05/nobody.jpg"
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
  {age && gender &&  <p>{age+", "+gender}</p>} 
    <p>{about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary rounded-xl">Ignore</button>
      <button className="btn btn-secondary rounded-xl">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard