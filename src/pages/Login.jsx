import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loggedUser } = useAppContext();
  const [loginState, setLoginState] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser.email) {
      navigate("/");
    }
  }, [loggedUser]);

  return (
    <div className="container py-16 mx-auto px-4">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        {loginState ? (
          <LoginForm setLoginState={setLoginState} />
        ) : (
          <RegistrationForm setLoginState={setLoginState} />
        )}
      </div>
    </div>
  );
}

export default Login;
