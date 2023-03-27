import { useState } from "react";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { HomePage } from "./components/HomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [userID, setUserID] = useState("");
  return (
    <div className="application">
      {isLoggedIn && <HomePage userID={userID} />}
      {!signingUp && !isLoggedIn && (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setSigningUp={setSigningUp}
          setUserID={setUserID}
        />
      )}
      {signingUp && !isLoggedIn && (
        <SignUp
          setSigningUp={setSigningUp}
          setIsLoggedIn={setIsLoggedIn}
          setUserID={setUserID}
        />
      )}
    </div>
  );
}

export default App;
