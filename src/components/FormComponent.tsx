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
} from '../strings';

interface Fields {
  email: string;
  password: string;
}

const FormComponent: React.FC = () => {
  const [fields, setFields] = useState<Fields>({ email: '', password: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

 
// Function for signing In and calling API
const handleSignIn = async (e: FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://192.168.1.5:9000/authenticate', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: fields.email,
        password: fields.password,
      }),
    });

    if (response.status === 200) {
      alert("Sign-in Successful!");
    } else if (response.status === 401) {
      alert("Invalid Credentials!");
    } else {
      const text = await response.text();
      alert(`Unexpected response: ${response.status}\n${text}`);
    }

  } catch (error) {
    console.error('Sign-in failed:', error);
  }
};


  
  return (
    <div className="content-box mt-2">
      <Form onSubmit={handleSignIn}>
        <Form.Label htmlFor="inputEmail">{email}</Form.Label>
        <Form.Control
          type="email"
          name="email"
          aria-describedby="emailHelpBlock"
          className="mb-3"
          id="emailInput"
          required
          value={fields.email}
          onChange={handleInputChange}
          placeholder={emailPlaceholder}
        />
        <Form.Label htmlFor="inputPassword5">{password}</Form.Label>
        <Form.Control
          type="password"
          name="password"
          required
          aria-describedby="passwordHelpBlock"
          id="passwordInput"
          className="mb-3"
          value={fields.password}
          onChange={handleInputChange}
          placeholder={passwordPlaceholder}
        />
        <div className="option-box">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              {rememberMeCheck}
            </label>
          </div>
          <a href="" className="forgot-password-link">
            {forgotPasswordLink}
          </a>
        </div>
        <button className="signin-button mb-2 mt-3" type="submit">
          {signInBtn}
        </button>
        <button className="signingoogle-button">
          <FcGoogle className="google-icon mr-1" />
          {signInWithGoogleBtn}
        </button>
      </Form>
      <span className="signup-text">
        {signUpText} <a href="" className="signup-link">
          {signUpLink}
        </a>
      </span>
    </div>
  );
};

export default FormComponent;
