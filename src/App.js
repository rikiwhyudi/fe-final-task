import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Subscription from "./components/Subscription";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/UserContext";
import AddMusic from "./pages/AddMusic";
import AddSinger from "./pages/AddSinger";
import Beranda from "./pages/Beranda";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";


function App() {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect /
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false && !isLoading) {
      navigate("/");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // console.log("response check auth", response)

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      // console.log("ini data state", state)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
    {
      isLoading ? null : <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Beranda />} />
      <Route path='/add-music' element={<AddMusic />} />
      <Route path='/add-singer' element={<AddSinger />} />
      <Route path='/sub-premium' element={<Subscription />} />
      <Route path='/income' element={<Transaction />} />
      </Routes>
    }
    </>
  );
}

export default App;
