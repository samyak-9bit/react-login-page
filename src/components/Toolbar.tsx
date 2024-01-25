import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'
import { Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Tooltip } from '@mui/material';

const Toolbar = () => {
  return (
    <div>
      <Navbar className='justify-content-between'>
        
        <span className='navbar-heading '><ManageSearchIcon fontSize='large'/> Smart Search Table</span>
 
       <Tooltip title="User.."><AccountCircleIcon className='user-icon' fontSize='large'></AccountCircleIcon></Tooltip> 
      </Navbar>
    </div>
  )
}

export default Toolbar
