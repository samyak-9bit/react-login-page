import React from 'react';
import './App.css';
import { Row } from 'react-bootstrap';
import Heading from './components/Heading';
import FormComponent from './components/LoginForm';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import DataTable from './pages/DataTable';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/table" element={<DataTable />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
   
    </>
  );
}

export default App;
