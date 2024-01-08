import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
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

  // Function for signing In Calling API
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://restapi.adequateshop.com/api/authaccount/login', {
        email:fields.email,
        password:fields.password,
      });
      console.log(response.data.message);
      console.log(response.data);

    } catch (error: unknown) {
      
      if (axios.isAxiosError(error)) {
        console.error('Sign-in failed:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
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
          className="mb-3"
          value={fields.password}
          required
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
