import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Heading from './components/Heading';
import { emailPlaceholder, mainHeading, passwordPlaceholder, rememberMeCheck, signInBtn, signInWithGoogleBtn, subHeading } from './strings';
import FormComponent from './components/FormComponent';


//Check For Image
describe('The image component', () => {
  test('alt contains correct value', () => {
    render(<App/>)
    const testImage = document.querySelector("img") as HTMLImageElement;
    expect(testImage.alt).toContain("img");
  })

  // test('src contains correct value', () => {
  //   render(<App/>)
  //   const testImage = document.querySelector("img") as HTMLImageElement;
  //   expect(testImage.alt).toContain("sideImg.png");
  // })
});


//Heading Elements
describe('Heading Component', () => {
  test('renders text in heading', () => {
    render(<Heading/>);

    expect(screen.getByText(mainHeading)).toBeInTheDocument();
    expect(screen.getByText(subHeading)).toBeInTheDocument();
   
  });
})


//Form Elements
describe('Form Component', () => {

  // Check for rendering
  test('renders buttons and inputs',()=>{
    render(<FormComponent/>);

    expect(screen.getByRole('button', { name: signInBtn })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: signInWithGoogleBtn })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(emailPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordPlaceholder)).toBeInTheDocument();
    expect(screen.getByLabelText(rememberMeCheck)).toBeInTheDocument();

  })

  //Check for updation of input fields on change
//   test('updates fields on input change'),()=>{
//     render(<FormComponent/>);


//   }
// })


// test('updates fields on input change')

// test('calls API on form submission')

// test('handles API error on form submission')
})