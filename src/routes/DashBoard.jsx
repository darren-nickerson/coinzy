import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SavedCoin from "../components/SavedCoins";

const DashBoard = () => {
  const { user } = UserAuth();

  if (user) {
    return (
      <div className="max-w-[1140px] mx-auto">
        <h1 className="text-2xl font-bold py-10 border-b border-accent mx-4">Saved List</h1>
        <SavedCoin />
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
};

export default DashBoard;
