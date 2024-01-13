import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Heading from './components/Heading';
import { mainHeading, signInBtn, signInWithGoogleBtn, subHeading } from './constants';
import FormComponent from './components/FormComponent';
import fetchMock from 'fetch-mock';

describe('Heading Component', () => {
  it('should render text in heading', () => {
    render(<Heading />);

    expect(screen.getByText(mainHeading)).toBeInTheDocument();
    expect(screen.getByText(subHeading)).toBeInTheDocument();
  });
});

// Form Elements
describe('Form Component', () => {
  it('should render buttons and inputs', () => {
    render(<FormComponent />);

    expect(screen.getByRole('button', { name: signInBtn })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: signInWithGoogleBtn })).toBeInTheDocument();
    expect(screen.getByTestId("emailInput")).toBeInTheDocument();
    expect(screen.getByTestId("passwordInput")).toBeInTheDocument();
    expect(screen.getByTestId("flexCheckDefault")).toBeInTheDocument();
  });

  it('should update fields on input change', () => {
    render(<FormComponent />);

    fireEvent.change(screen.getByTestId("emailInput"), { target: { value: "abc@gmail.com" } });
    fireEvent.change(screen.getByTestId("passwordInput"), { target: { value: "sdskdmkcm" } });

    expect(screen.getByTestId("emailInput")).toHaveValue('abc@gmail.com');
    expect(screen.getByTestId("passwordInput")).toHaveValue('sdskdmkcm');
  });

  it('should get error message on invalid fields', async () => {
    render(<FormComponent />);

    fireEvent.change(screen.getByTestId("emailInput"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("passwordInput"), { target: { value: "" } });
    fireEvent.click(screen.getByRole('button', { name: signInBtn }));

    expect(screen.getByTestId('form')).toBeInvalid();
    expect(screen.getByTestId("emailInput")).toBeInvalid();

    // expect(screen.getByText("Please fill out this field.")).toBeInTheDocument();
  });

  it('should handle successful submission on valid fields', async () => {
    fetchMock.post('http://192.168.1.9:9000/authenticate', (url, options) => {
      const requestBody = JSON.parse(options.body as string);
      return {
        status: 200,
        body: { message: 'Login successful' },
      };
    });
  
    render(<FormComponent />);
    
    fireEvent.change(screen.getByTestId("emailInput"), { target: { value: "abc@gmail.com" } });
    fireEvent.change(screen.getByTestId("passwordInput"), { target: { value: "sdskdmkcm" } });
    fireEvent.click(screen.getByRole('button', { name: signInBtn }));
    
    await waitFor(() => {
      expect(screen.getByText("SignIn Successful!")).toBeInTheDocument();
    });
  
    fetchMock.restore();
  });

  it('should give error message when fields not match', async () => {
    fetchMock.post('http://192.168.1.9:9000/authenticate', (url, options) => {
      const requestBody = JSON.parse(options.body as string);
      return {
        status: 401,
        body: { message: 'Login failed' },
      };
    });
  
    render(<FormComponent />);
    
    fireEvent.change(screen.getByTestId("emailInput"), { target: { value: "abc@gmail.com" } });
    fireEvent.change(screen.getByTestId("passwordInput"), { target: { value: "sdskdmkcm" } });
    fireEvent.click(screen.getByRole('button', { name: signInBtn }));
    
    await waitFor(() => {
      expect(screen.getByText("Authentication Failed!")).toBeInTheDocument();
    });
  
    fetchMock.restore();
  });
  
});
