import React, { useState, ChangeEvent, FormEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { FcGoogle } from 'react-icons/fc';
import {
  email,
  emailPlaceholder,
  forgotPasswordLink,
  password,
  passwordPlaceholder,
  rememberMeCheck,
  signInBtn,
  signInWithGoogleBtn,
  signUpLink,
  signUpText
} from '../constants';
import { Fields } from '../types';
import styled from 'styled-components';

const Span = styled.span`
color: #EA454C;
text-align: center;
font-family: "Poppins";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: 0.42px;
padding-left: 2px;
`

const FormComponent: React.FC = () => {
  const [fields, setFields] = useState<Fields>({ email: '', password: '' });
  const [message, setMessage]=useState<string>("");
 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

 
// Function for signing In and calling API
const handleSignIn = async (e: FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://192.168.1.6:9000/authenticate', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: fields.email,
        password: fields.password,
      }),
    });
    
    if (response.status === 200) {
     setMessage("SignIn Successful!");
    } else if (response.status === 401) {
      const status = await response.json();
      setMessage("Authentication Failed!");
    }

  } catch (error) {
    console.error('Sign-in failed:', error);
  }
};


  
  return (
    <div className="content-box mt-2">
      <Form onSubmit={handleSignIn} data-testid="form">
        <Form.Label htmlFor="inputEmail">{email}</Form.Label>
        <Form.Control
          type="email"
          name="email"
          aria-describedby="emailHelpBlock"
          className="mb-3"
          id="emailInput"
          data-testid="emailInput"
          value={fields.email}
          required
          onChange={handleInputChange}
          placeholder={emailPlaceholder}
          
        />
        <Form.Label htmlFor="inputPassword5">{password}</Form.Label>
        <Form.Control
          type="password"
          name="password"
          aria-describedby="passwordHelpBlock"
          id="passwordInput"
          data-testid="passwordInput"
          className="mb-3"
          value={fields.password}
          required
          onChange={handleInputChange}
          placeholder={passwordPlaceholder}
        />
        <div className="option-box">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" data-testid="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              {rememberMeCheck}
            </label>
          </div>
          <a href="" className="forgot-password-link">
            {forgotPasswordLink}
          </a>
        </div>
        <button className="signin-button mb-2 mt-3" type="submit"  data-testid="signIn-btn">
          {signInBtn}
        </button>
        <button className="signingoogle-button">
          <FcGoogle className="google-icon mr-1" />
          {signInWithGoogleBtn}
        </button>
      </Form>
      <span className="signup-text mb-3">
        {signUpText} <a href="" className="signup-link">
          {signUpLink}
        </a>
      </span>
     <Span>
            {message}
     </Span>
    </div>
  );
};

export default FormComponent;
