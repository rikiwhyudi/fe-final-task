import React, { useContext, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { API } from '../../config/api'
import { useMutation } from 'react-query';

function Register() {
  const title ="Register"
  document.title = "Coways | " + title

  const [message, setMessage] = useState(null)
  
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  /*for update v2 register.. create context case register success set token from backend with disptach to automatic login if register status success redirect to dashboard*/ 

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post("/register", form)
      
      const alert = <Alert variant="success" className="py-1" >Success</Alert>
      setMessage(alert)
      console.log("berhasil daftar", response.data.data)
      setForm("")

    } catch (error) {
      const alert = (<Alert variant="danger" className="py-1" >Failed</Alert>)
      setMessage(alert)
      console.log(error)
    }

  })

  return (
    <>
    <div className="form-title">
        <p>Register</p>
        {message && message}
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

        <input className="form-inputs"
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Full Name" />
        <button className="btn-submit"> {handleSubmit.isLoading ? "Loading..." : "Register"}</button>
      </form>
    </>
  )
}

export default Register