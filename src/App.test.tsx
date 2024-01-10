import React from 'react';
import { render, screen, fireEvent, getByLabelText, waitFor } from '@testing-library/react';
import Heading from './components/Heading';
import { emailPlaceholder, mainHeading, passwordPlaceholder, rememberMeCheck, signInBtn, signInWithGoogleBtn, subHeading } from './strings';
import FormComponent from './components/FormComponent';
import fetchMock from 'fetch-mock-jest';

describe('Heading Component', () => {
  test('renders text in heading', () => {
    render(<Heading/>);

    expect(screen.getByText(mainHeading)).toBeInTheDocument();
    expect(screen.getByText(subHeading)).toBeInTheDocument();
   
  });
})


//Form Elements
describe('Form Component', () => {


  test('renders buttons and inputs',()=>{
    render(<FormComponent/>);

    expect(screen.getByRole('button', { name: signInBtn })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: signInWithGoogleBtn })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(emailPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordPlaceholder)).toBeInTheDocument();
    expect(screen.getByLabelText(rememberMeCheck)).toBeInTheDocument();

  })

  test('updates fields on input change',()=>{
    render(<FormComponent/>);

    fireEvent.change(screen.getByPlaceholderText(emailPlaceholder),{target: {value:"abc@gmail.com"}});
    fireEvent.change(screen.getByPlaceholderText(passwordPlaceholder),{target: {value:"sdskdmkcm"}});
    const emailInput = screen.getByPlaceholderText(emailPlaceholder) as HTMLInputElement
    expect(emailInput?.value).toBe('abc@gmail.com');
    const passwordInput = screen.getByPlaceholderText(passwordPlaceholder) as HTMLInputElement
    expect(passwordInput?.value).toBe('sdskdmkcm');
    
  })

  test('get error message on invalid fields',async()=>{
    render(<FormComponent/>);

    fireEvent.change(screen.getByPlaceholderText(emailPlaceholder),{target: {value:""}});
    fireEvent.change(screen.getByPlaceholderText(passwordPlaceholder),{target: {value:""}});
    fireEvent.click(screen.getByRole('button', { name: signInBtn }));
    await waitFor(() => {
    expect(screen.getByText("Please fill out this field.")).toBeInTheDocument();
    })
  })

  

  
  // test('handles successfull submission on valid fields',()=>{
  //   jest.spyOn(global, 'fetch').mockResolvedValue({
  //     status: 200,
  //     json: jest.fn().mockResolvedValue({}),
  //   });
      
      
  //   render(<FormComponent/>);

  //   fireEvent.change(screen.getByPlaceholderText(emailPlaceholder),{target: {value:"abc@gmail.com"}});
  //   fireEvent.change(screen.getByPlaceholderText(passwordPlaceholder),{target: {value:"sdskdmkcm"}});
  //   fireEvent.click(screen.getByRole('button', { name: signInBtn }));
   
  // })

// test('handles API error on form submission')
})