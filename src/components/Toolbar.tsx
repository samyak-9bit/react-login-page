import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'
import { Navbar } from 'react-bootstrap'

const Toolbar = () => {
  return (
    <div>
      <Navbar className=' justify-content-end'>
        <AccountCircleIcon className='user-icon' fontSize='large'></AccountCircleIcon>
      </Navbar>
    </div>
  )
}

export default Toolbar
