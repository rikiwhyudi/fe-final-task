import React from 'react'

function Register() {
  return (
    <>
    <div className="form-title">
        <p>Register</p>
      </div>
      <form className="form-section">
      <input className="form-inputs"
              type="email"
              name="email"
              // onChange={handleChange}
              placeholder="Email" />

        <input className="form-inputs"
              type="password"
              name="password"
              // onChange={handleChange} 
              placeholder="Password" />

        <input className="form-inputs"
              type="text"
              name="name"
              // onChange={handleChange}
              placeholder="Full Name" />
        <button className="btn-submit">Register</button>
      </form>
    </>
  )
}

export default Register