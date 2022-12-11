import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

function Home() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);

  console.log("ini isi state home js", state)

  const checkAuth = () => {
    if (state.isLogin === true) {
      if (state.user.status === "admin") {
        navigate("/income")
      } else {
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    checkAuth()
    
  }, [])
  
  const [isRegister, setIsRegister] = useState(false);

  const switchLogin = () => {
    setIsRegister(false);
  };

  const switchRegister = () => {
    setIsRegister(true);
  };

  return (
    <>
        <Header />
        <div className="hero-section container">
          <div className="left-section">
            <section>
              <h1 className="text-hero-listen">Listening is</h1>
              <div className="d-flex">
                <span className="pe-3">
                  <img src="/assets/img/section-logo.svg" alt="coways" />
                </span>
                <h1 className="d-flex align-items-center text-hero">
                  Everything
                </h1>
              </div>
              <p className="text-section">pay and access millions of songs</p>
              {isRegister ? (
                <button
                  onClick={switchLogin}
                  type="button"
                  className="btn-section"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={switchRegister}
                  type="button"
                  className="btn-section"
                >
                  Register
                </button>
              )}
            </section>
          </div>

          <div className="right-section">
            {isRegister ? <Register /> : <Login />}
        </div>
      </div>
    </>
  );
}

export default Home;
