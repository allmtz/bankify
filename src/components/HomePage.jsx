import "../styles/HomePage.css";
import { useState, useRef, useEffect } from "react";

export const HomePage = ({ userID, userName }) => {
  const [userBalance, setUserBalance] = useState(null);
  const withdrawAmount = useRef(0);
  const depositAmount = useRef(0);
  const deposit = {};
  const withdraw = {};

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

  useEffect(() => {
    bal();
  }, []);

  async function depositing(e) {
    e.preventDefault();
    let response;
    let responseJson;
    deposit["amount"] = depositAmount.current.value;

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(deposit),
    };


    try {
      response = await fetch(
        `http://localhost:3000/user/${userID}/balance/deposit`,
        options
      );
      responseJson = await response.json();
      setUserBalance(responseJson);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function withdrawing(e) {
    e.preventDefault();
    let response;
    let responseJson;

    withdraw["amount"] = withdrawAmount.current.value;

    const t = await JSON.stringify(withdraw);
    console.log(t);

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(withdraw),
    };


    try {
      response = await fetch(
        `http://localhost:3000/user/1/balance/withdraw`,
        options
      );
      responseJson = await response.json();
      console.log(response);
      console.log(responseJson);
      setUserBalance(responseJson);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return (
    <div className="display">
      <div className="container">
        <h1>{userName}</h1>
        <h2>Current Balance: ${userBalance}</h2>
        <input ref={depositAmount} type="text" placeholder="Deposit" />
        <h4 onClick={depositing}>deposit</h4>
        <input ref={withdrawAmount} type="text" placeholder="Withdraw" />
        <h4 onClick={withdrawing}>withdraw</h4>
      </div>
    </div>
  );
};
