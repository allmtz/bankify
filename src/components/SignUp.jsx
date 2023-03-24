import { useRef } from "react";
import "../styles/SignUp.css";

export const SignIn = () => {
  const userName = useRef();
  const fname = useRef();
  const lname = useRef();
  const email = useRef();
  const password = useRef();
  const userInfoArray = [];
  const obj = {};
  function submit(e) {
    e.preventDefault();
    userInfoArray.push(["userName", userName.current.value]);
    userInfoArray.push(["fname", fname.current.value]);
    userInfoArray.push(["lname", lname.current.value]);
    userInfoArray.push(["email", email.current.value]);
    userInfoArray.push(["password", password.current.value]);
    for (let i = 0; i < userInfoArray.length; i++) {
      if (userInfoArray[i][1].trim() === "") {
        alert("INVALID INPUT ASSHOLE!");
        break;
      } else {
        obj[userInfoArray[i][0]] = userInfoArray[i][1].trim();
      }
    }
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(obj),
    };

    if (Object.keys(obj).length === 5) {
      fetch("http://localhost:3000/signup", options)
        .then((response) => response.json)
        .then((json) => console.log("this is json : ", json));
    }
  }

  return (
    <div className="page test">
      <form className="cover" onSubmit={submit}>
        <h1>Sign Up</h1>

        <input ref={userName} type="text" placeholder="Username" />
        <input ref={fname} type="text" placeholder="First Name" />
        <input ref={lname} type="text" placeholder="Last Name" />
        <input ref={email} type="email" placeholder="Email" />
        <input ref={password} type="password" placeholder="Password" />
        <button>Submit</button>
      </form>
    </div>
  );
};
