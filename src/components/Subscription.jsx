import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { API } from "../config/api"

function Subscription() {
  const title ="Subscription"
  document.title = "Coways | " + title

  const navigate = useNavigate()

  const [state] = useContext(UserContext)
  const [trans] = useState([])
  const id = state.user.id

  console.log(state)

  const checkAuth = () => {
    if (state.isLogin === false) {
      navigate("/")
    } else if (state.user.status === "admin") {
      navigate("/income")
    }
  }

  checkAuth()

  useEffect(() => {
     //change this to the script source you want to load, for example this is snap.js sandbox env
     const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
     //change this according to your client-key
     const myMidtransClientKey = "SB-Mid-client-8GBlOlIZLs7yEVF3";
 
     let scriptTag = document.createElement("script");
     scriptTag.src = midtransScriptUrl;
     // optional if you want to set script attribute
     // for example snap.js have data-client-key attribute
     scriptTag.setAttribute("data-client-key", myMidtransClientKey);
 
     document.body.appendChild(scriptTag);
     return () => {
       document.body.removeChild(scriptTag);
     };
  }, [])


  const getTransaction =  async () => {
    try {
      //get all transactions
      const response = await API.get("/transactions")
      const respID = response?.data.data.filter((item) => item.user.id === id) 

      console.log("resp id", respID)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(trans, "<==== transactions")

  useEffect(() => {
    getTransaction()
  }, [state])

  const handlePay = async () => {
    try {
      // Create variabel for store token payment from response here ..
      const response = await API.post("/create-transaction")
      const token = response.data.data.token

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          // history.push("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          // history.push("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <Container>
        <div className="d-flex flex-column justify-content-center">
          <p className="text-center premi">Premium</p>
          <p className="text-center pay-text">
            Bayar sekarang dan nikmati streaming music yang kekinian dari&nbsp;
            <span>
              <b>Co</b>&nbsp; <text>Ways</text>
            </span>
          </p>
          <div className="d-grid justify-content-center">
            <button onClick={handlePay} className="btn-add">Subscribe</button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Subscription;
