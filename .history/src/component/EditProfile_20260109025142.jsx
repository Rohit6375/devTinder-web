import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constans';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [error, setError] = useState("");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const [skills, setSkills] = useState(
    Array.isArray(user.skills) ? user.skills : []
  );

  const [about, setAbout] = useState(user.about);
  const [showToast, setShowToast] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  // ---------------------------
  // CLOUDINARY PHOTO UPLOAD
  // ---------------------------
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "devtinder_preset"); // replace
      // e.g. data.append("upload_preset", "devtinder_preset");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/drcmjhvpk/image/upload", // replace
        data
      );

      setPhotoUrl(res.data.secure_url);
      setUploading(false);

    } catch (err) {
      console.log("UPLOAD ERROR:", err.response?.data || err.message);
      setError("Image upload failed");
      setUploading(false);
    }
  };

  // ---------------------------
  // ADD SKILL (button + Enter)
  // ---------------------------
  const addSkill = () => {
    const input = document.getElementById("skillInput");
    const value = input.value.trim().toLowerCase();

    if (!value) return;

    if (skills.length >= 5) {
      setError("You can add max 5 skills");
      return;
    }

    if (skills.includes(value)) {
      setError("Skill already added");
      return;
    }

    setSkills([...skills, value]);
    input.value = "";
    setError("");
  };

  // ---------------------------
  // SAVE PROFILE
  // ---------------------------
  const handleSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, gender, about, age, skills, photoUrl },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      setError("");

    } catch (error) {
      console.log(error);
      setError(error?.response?.data || "Something went wrong");
    }
  };


  return (
    <div className='flex justify-center my-10'>

      <div className='flex justify-center mx-10'>
        <div className="card bg-base-300 text-primary-content w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            {/* FORM FIELDS */}
            <div className="flex flex-col">

              {/* First Name */}
              <label className='form-control w-full max-w-xs py-2'>
                <div className='label'>
                  <span className='label-text'>First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='input input-bordered rounded-xl w-full max-w-xs py-5'
                />
              </label>

              {/* Last Name */}
              <label className='form-control w-full max-w-xs py-2'>
                <div className='label'>
                  <span className='label-text'>Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='input input-bordered rounded-xl w-full max-w-xs py-5'
                />
              </label>

              {/* Gender Dropdown */}
              <label className='form-control w-full max-w-xs py-2'>
                <div className='label'>
                  <span className='label-text'>Gender</span>
                </div>

                <select
                  className="select select-bordered rounded-xl w-full max-w-xs py-3"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>

              {/* Age */}
              <label className='form-control w-full max-w-xs py-2'>
                <div className='label'>
                  <span className='label-text'>Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className='input input-bordered rounded-xl w-full max-w-xs py-5'
                />
              </label>

              {/* Photo Upload */}
              <label className='form-control w-full max-w-xs py-2'>
                <div className='label'>
                  <span className='label-text'>Profile Photo</span>
                </div>

                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handlePhotoUpload}
                />

                {uploading && (
                  <p className="text-sm text-blue-500 mt-1">Uploading...</p>
                )}
              </label>

              {/* Skills */}
              <label className='form-control w-full max-w-xs py-2'>
                <div className='label'>
                  <span className='label-text'>Skills (max 5)</span>
                </div>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="badge badge-primary gap-2">
                      {skill}
                      <button onClick={() =>
                        setSkills(skills.filter((_, i) => i !== index))
                      }>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Input + Add button */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="skillInput"
                    placeholder="Type skill"
                    className='input input-bordered rounded-xl w-full py-5'
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  />

                  <button className="btn btn-primary" type="button" onClick={addSkill}>
                    Add
                  </button>
                </div>
              </label>

              {/* About */}
              <label className='form-control w-full max-w-xs py-2'>
                <div className='label'>
                  <span className='label-text'>About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className='input input-bordered rounded-xl w-full max-w-xs py-5'
                />
              </label>

            </div>

            <p className='text-red-500'>{error}</p>

            <div className="card-actions justify-center">
              <button className="btn btn-primary m-2" onClick={handleSave}>Save</button>
            </div>

          </div>
        </div>
      </div>

      {/* FIXED WIDTH USER CARD */}
      <div className="w-[300px] ml-4">
        <UserCard
          user={{ firstName, lastName, gender, about, age, skills, photoUrl }} isProfilePage={true}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
