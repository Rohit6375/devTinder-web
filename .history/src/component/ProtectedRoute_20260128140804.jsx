import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  // 1️⃣ Auth not restored yet → WAIT
  if (user === null) {
    return null; // or a loader
  }

  // 2️⃣ Auth restored + no user → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ User exists → allow access
  return children;
};

export default ProtectedRoute;
