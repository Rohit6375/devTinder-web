import React from 'react';

const ConnectionCard = ({ user }) => {
  const { firstName, lastName, about, gender, age, photoUrl } = user;

  return (
    <div className="card card-side bg-base-300 shadow-md p-2 w-[330px]">
      
      {/* USER AVATAR */}
      <div className="avatar">
        <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img 
            src={photoUrl || "https://via.placeholder.com/150"} 
            alt="user" 
          />
        </div>
      </div>

      {/* USER DETAILS */}
      <div className="card-body py-2 px-4">

        <h2 className="card-title text-lg">
          {firstName} {lastName}
        </h2>

        <p className="text-sm text-gray-600">
          {age} • {gender}
        </p>

        {about && (
          <p className="text-xs text-gray-500 truncate max-w-[180px]">
            {about}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;
