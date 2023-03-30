import { useRef } from "react";
import "../styles/Login.css";

export const Login = ({
  setIsLoggedIn,
  setSigningUp,
  setUserName,
  setUserID,
}) => {
  const username = useRef(null);
  const password = useRef(null);
  const res = [];
  const obj = {};
  async function submit(e) {
    e.preventDefault();
    res.push(["userName", username.current.value]);
    res.push(["password", password.current.value]);
    for (let i = 0; i < res.length; i++) {
      obj[res[i][0]] = res[i][1].trim();
    }
    let response;
    let responseJson;
    if (Object.keys(obj).length === 2) {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(obj),
      };
      try {
        response = await fetch("http://localhost:3000/login", options);
        responseJson = await response.json();
        setIsLoggedIn(true);
        setUserName(responseJson.name);
        setUserID(responseJson.id);
      } catch (err) {
        console.error(err);
        throw err;
      }
      // fetch("http://localhost:3000/login", options)
      //   .then((response) => response.json())
      //   .then((json) => {
      //     console.log(json);
      //     if (json.name) {
      //       setIsLoggedIn(true);
      //       setUserName(json.name);
      //       setUserID(json.id);
      //     }
      //   }).catch(err => {
      //     console.error(err);
      //   })
    }
  }
  function click() {
    setSigningUp(true);
  }
  return (
    <div className="login_main_div">
      <form action="" className="login_form" onSubmit={submit}>
        <h1>Login</h1>
        <input ref={username} type="text" placeholder="Username" />
        <input ref={password} type="password" placeholder="Password" />
        <button>Submit</button>
        <h4 onClick={click}>Sign Up</h4>
      </form>
    </div>
  );
};
