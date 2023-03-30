import { useState } from "react";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { HomePage } from "./components/HomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  return (
    <div className="application">
      {isLoggedIn && <HomePage userName={userName} userID={userID} />}
      {!signingUp && !isLoggedIn && (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setSigningUp={setSigningUp}
          setUserName={setUserName}
          setUserID={setUserID}
        />
      )}
      {signingUp && !isLoggedIn && (
        <SignUp
          setSigningUp={setSigningUp}
          setIsLoggedIn={setIsLoggedIn}
          setUserName={setUserName}
        />
      )}
    </div>
  );
}

export default App;
