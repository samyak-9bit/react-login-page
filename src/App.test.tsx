import React from 'react';
import { render, screen, fireEvent, getByLabelText, waitFor } from '@testing-library/react';
import Heading from './components/Heading';
import { emailPlaceholder, mainHeading, passwordPlaceholder, rememberMeCheck, signInBtn, signInWithGoogleBtn, subHeading } from './constants';
import FormComponent from './components/FormComponent';
import {setupServer} from 'msw/node'
import {http} from 'msw';

// const server = setupServer(
//   http.post('http://192.168.1.6:9000/authenticate', (req, res, ctx) => {
//     return res(ctx.status(200));
//   }),
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

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
    expect(screen.getByTestId("emailInput")).toBeInTheDocument();
    expect(screen.getByTestId("passwordInput")).toBeInTheDocument();
    expect(screen.getByTestId("flexCheckDefault")).toBeInTheDocument();

  })

  test('updates fields on input change',()=>{
    render(<FormComponent/>);

    fireEvent.change(screen.getByTestId("emailInput"),{target: {value:"abc@gmail.com"}});
    fireEvent.change(screen.getByTestId("passwordInput"),{target: {value:"sdskdmkcm"}});
    const emailInput = screen.getByTestId("emailInput") as HTMLInputElement
    expect(emailInput?.value).toBe('abc@gmail.com');
    const passwordInput = screen.getByTestId("passwordInput") as HTMLInputElement
    expect(passwordInput?.value).toBe('sdskdmkcm');
    
  })

  test('get error message on invalid fields',async()=>{
     render(<FormComponent />);

    fireEvent.change(screen.getByTestId("emailInput"),{target: {value:""}});
    fireEvent.change(screen.getByTestId("passwordInput"),{target: {value:""}});
    fireEvent.click(screen.getByRole('button', { name: signInBtn }));
    expect(screen.getByTestId('form') as HTMLFormElement).toBeInvalid;
    expect(screen.getByTestId("emailInput") as HTMLInputElement).toBeInvalid;
    
    // expect(screen.getByText("Please fill out this field.")).toBeInTheDocument();
    
  });
  
//  test('handles successfull submission on valid fields',()=>{
//     jest.spyOn(global, 'fetch').mockResolvedValue({
//       status: 200,
//       json: jest.fn().mockResolvedValue({}),
//     }) 
//     ;
      
      
//     render(<FormComponent/>);

//     fireEvent.change(screen.getByPlaceholderText(emailPlaceholder),{target: {value:"abc@gmail.com"}});
//     fireEvent.change(screen.getByPlaceholderText(passwordPlaceholder),{target: {value:"sdskdmkcm"}});
//     fireEvent.click(screen.getByRole('button', { name: signInBtn }));
   
//   })

// test('handles API error on form submission')

})