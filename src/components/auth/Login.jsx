import React, { useContext, useState } from "react";
import { Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/UserContext";

function Login() {
  const navigate = useNavigate()

  const title ="Login"
  document.title = "Coways | " + title

  const [state, dispatch] = useContext(UserContext)


  const [message, setMessage] = useState(null)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()
  
        // Insert data user to database
        const response = await API.post("/login", form);
        // const { status, name, email, token } = response.data.data
        // console.log("response login", response.data);
        if (response?.status === 200) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data.data
          })
  
          if (response.data.data.status === "admin") {
            navigate('/income')
          } else {
            navigate('/dashboard')
          }
        }
        // window.location.reload(false);
      
    } catch (error) { 
      const alert =  (<Alert variant="danger" className="py-1">Failed</Alert>)
      setMessage(alert)
      console.log(error)
    }
  })

  return (
    <>
      <div className="form-title">
        <p>Login</p>
        { message && message }
      </div>
      <form className="form-section" onSubmit={(e) => handleSubmit.mutate(e)}>
        <input className="form-inputs"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email" />
        <input className="form-inputs"
              type="password"
              name="password"
              onChange={handleChange} 
              placeholder="Password" />
        <button className="btn-submit">Login</button>
      </form>
    </>
  );
}

export default Login;
