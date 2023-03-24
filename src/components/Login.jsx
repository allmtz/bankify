import { useRef } from "react";
import "../styles/Login.css";

export const Login = () => {
  const username = useRef();
  const password = useRef();
  const res = [];
  const obj = {};
  function submit(e) {
    e.preventDefault();
    res.push(["userName", username.current.value]);
    res.push(["password", password.current.value]);
    for (let i = 0; i < res.length; i++) {
      obj[res[i][0]] = res[i][1].trim();
    }
    if (Object.keys(obj).length === 2) {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(obj),
      };
      fetch("http://localhost:3000/login", options)
        .then((response) => response.json)
        .then((json) => console.log("json response:" + json));
    }
  }
  return (
    <div className="login_main_div">
      <form action="" className="login_form" onSubmit={submit}>
        <h1>Login</h1>
        <input ref={username} type="text" placeholder="Username" />
        <input ref={password} type="password" placeholder="Password" />
        <button>Submit</button>
      </form>
    </div>
  );
};
