import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../redux/userDataSlice";
import { logout } from "../redux/userDataSlice";
import '../styles/AccountDetails.css'

const AccountDetails = () => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="account-details">
      <h2>Account Details</h2>
      <div className="details">
        <p>
          <strong>Name:</strong> {userData.username}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Lectures Completed:</strong> {userData.purchases.lectures.length}
        </p>
        <p>
          <strong>Quizzes Solved:</strong> {userData.purchases.quizzes.length}
        </p>
        <p>
          <strong>Notes Completed:</strong> {userData.purchases.notes.length}
        </p>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AccountDetails;