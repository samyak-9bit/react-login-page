import React, { useState, ChangeEvent, FormEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import {
  defaultErrorMessage,
  email,
  emailPlaceholder,
  error401Message,
  error404Message,
  forgotPasswordLink,
  loginSuccessMessage,
  password,
  passwordPlaceholder,
  rememberMeCheck,
  signInBtn,
  signInWithGoogleBtn,
  signUpLink,
  signUpText
} from '../constants';
import { Fields } from '../types/types';
import styled from 'styled-components';
import './LoginPageStyle.css'

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

const LoginForm: React.FC = () => {
  const [fields, setFields] = useState<Fields>({ email: '', password: '' });
  const [message, setMessage]=useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

 
// Function for signing In and calling API
const handleSignIn = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch('http://192.168.1.7:9000/authenticate', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: fields.email,
        password: fields.password,
      }),
    });

    switch(response.status) {
      case 200:
        setMessage(loginSuccessMessage);
        navigate('/table');
        return;
      case 401:
        setMessage(error401Message);
       return;
      case 404:
        setMessage(error404Message);
       return;
      default:
        setMessage(defaultErrorMessage);
    }
    
  } catch (error) {
    console.error('Sign-in failed:', error);
  }
  setMessage("Something went wrong!");
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
     <Span data-testid="feedback">
            {message}
     </Span>
    </div>
  );
};

export default LoginForm;
