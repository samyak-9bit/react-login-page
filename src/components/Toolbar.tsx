import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'
import { Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const Toolbar = () => {
  return (
    <div>
      <Navbar className='justify-content-between'>
        
        <span className='navbar-heading '><ManageSearchIcon fontSize='large'/> Smart Search Table</span>
 
        <AccountCircleIcon className='user-icon' fontSize='large'></AccountCircleIcon>
      </Navbar>
    </div>
  )
}

export default Toolbar
