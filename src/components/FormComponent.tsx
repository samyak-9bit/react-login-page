import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { FcGoogle } from "react-icons/fc";

const FormComponent = () => {


  return (
    <div>
      <Form.Label htmlFor="inputEmail">Email</Form.Label>
      <Form.Control
        type="email"
        id="inputEmail"
        aria-describedby="emailHelpBlock"
      />
       <Form.Label htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
      <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
    Remember me
  </label>
  <a href="">Forgot password</a>
  <button className='signin-button'>Sign in</button>
  <button className='signingoogle-button'><img src='google.png' width="1.80738rem" height="1.80738rem"/><FcGoogle />Sign in with Google</button>
</div>
    </div>
  )
}

export default FormComponent
