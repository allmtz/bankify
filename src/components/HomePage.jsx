import "../styles/HomePage.css";
import { useRef } from "react";

export const HomePage = ({ userID }) => {
  function bal() {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(userID),
    };
  }
  return (
    <div className="display">
      <div className="container">
        <h2>Balance</h2>
        <h3></h3>
      </div>
    </div>
  );
};
