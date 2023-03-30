import "../styles/HomePage.css";
import { useState } from "react";

export const HomePage = ({ userID }) => {
  const [userBalance, setUserBalance] = useState(null);
  async function bal() {
    let response;
    let responseJson;
    try {
      response = await fetch(`http://localhost:3000/user/${userID}/balance`);
      responseJson = await response.json();
      setUserBalance(responseJson.balance);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return (
    <div className="display">
      <div className="container">
        <h2>Balance</h2>
        {userBalance !== null && <h4>{userBalance}</h4>}
        <button onClick={bal}>console</button>
      </div>
    </div>
  );
};
