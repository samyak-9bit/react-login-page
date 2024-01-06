import React from 'react';
import './App.css';
import { Row } from 'react-bootstrap';
import Heading from './components/Heading';
import FormComponent from './components/FormComponent';

function App() {
  return (
   <>
   <div className='row'>
      <div className='col-md-6 main-content'>  
      <div className='box'>
        <Heading/>
        <FormComponent/>
       </div>
      </div>
      <div className='col-md-6'>
        <img src="sideImg.png" alt="img" height="100%" width="100%"/>
      </div>
   </div>
   </>
  );
}

export default App;
