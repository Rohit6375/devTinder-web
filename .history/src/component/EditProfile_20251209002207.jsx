import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constans';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills, setSkills] = useState(Array.isArray(user.skills) ? user.skills : []);

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  // -------------------------
  // CLOUDINARY IMAGE UPLOAD
  // -------------------------
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        formData
      );

      setPhotoUrl(res.data.secure_url);
      setUploading(false);

    } catch (error) {
      console.log(error);
      setUploading(false);
      setError("Image upload failed");
    }
  };

  // -------------------------
  // SAVE PROFILE UPDATE
  // -------------------------
  const handleSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, gender, age, about, photoUrl, skills },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setShowToast(true);

      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data || "Error updating profile");
    }
  };

 return (
  <div className="flex justify-center my-10">

    <div className="card bg-base-200 w-[480px] shadow-xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <div className="avatar mb-3">
          <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={photoUrl || "https://via.placeholder.com/150"} alt="profile" />
          </div>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          onChange={handlePhotoUpload}
        />
        {uploading && (
          <p className="text-sm text-blue-500 mt-1">Uploading image...</p>
        )}
      </div>

      {/* Form fields */}
      <div className="space-y-4">

        <label className="form-control">
          <span className="label-text">First Name</span>
          <input
            type="text"
            className="input input-bordered rounded-xl"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label className="form-control">
          <span className="label-text">Last Name</span>
          <input
            type="text"
            className="input input-bordered rounded-xl"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        {/* Gender Dropdown */}
        <label className="form-control">
          <span className="label-text">Gender</span>
          <select
            className="select select-bordered rounded-xl"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="form-control">
          <span className="label-text">Age</span>
          <input
            type="number"
            className="input input-bordered rounded-xl"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        {/* Skills input */}
        <label className="form-control">
          <span className="label-text">Skills</span>

          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill, index) => (
              <div key={index} className="badge badge-primary gap-2">
                {skill}
                <button onClick={() => setSkills(skills.filter((_, i) => i !== index))}>
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Type skill & press Enter"
            className="input input-bordered rounded-xl"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                setSkills([...skills, e.target.value.trim()]);
                e.target.value = "";
              }
            }}
          />
        </label>

        <label className="form-control">
          <span className="label-text">About</span>
          <textarea
            className="textarea textarea-bordered rounded-xl"
            rows={3}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </label>
      </div>

      <p className="text-red-500 mt-2">{error}</p>

      <button className="btn btn-primary w-full mt-6" onClick={handleSave}>
        Save Changes
      </button>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
    </div>

    {/* LIVE PREVIEW CARD */}
    <UserCard
      user={{ firstName, lastName, gender, about, age, skills, photoUrl }}
    />

  </div>
);

};

export default EditProfile;
