import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'
import { Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';

const Toolbar = () => {
  return (
    <div>
      <Navbar>
     
        <span className='navbar-heading'>Smart Search Table</span>
 
        <AccountCircleIcon className='user-icon' fontSize='large'></AccountCircleIcon>
      </Navbar>
    </div>
  )
}

export default Toolbar
