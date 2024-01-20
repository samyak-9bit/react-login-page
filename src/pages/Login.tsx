import React from 'react'
import Heading from '../components/Heading'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <>
      <div className='row'>
         {/* Form Section */}
        <div className='col-md-6 main-content'>
          <div className='content-box'>
            <Heading />
            <LoginForm />
          </div>
        </div>
        {/* Image Section */}
        <div className='col-md-6' style={{height:"100vh"}}>
          <img src="sideImg.png" alt="img" height="100%" width="100%" />
        </div>
      </div>
    </>
  )
}

export default Login

