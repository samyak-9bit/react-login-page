import React from 'react';
import './App.css';
import { Row } from 'react-bootstrap';
import Heading from './components/Heading';
import FormComponent from './components/FormComponent';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import DataTable from './pages/DataTable';

function App() {
  return (
    <>
     <Login/>
      {/* <Routes>
        <Route path="/" element={<Login />}>
        <Route path="/table" element={<DataTable />} />
        </Route>
      </Routes> */}
   
    </>
  );
}

export default App;
