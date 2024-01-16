import React from 'react'
import { Button } from 'react-bootstrap'

const Header = () => {
  return (
    <div className='table-heading'>
        {/* Filter button */}
      <div className='filter-btn mt-3 ml-3'>
        <img src="filter.png" alt="filter button"/>
      </div>

        {/* Input Field */}
        <form className='input-form mt-3 ml-3'>
        <img src="Search.png" alt="search"/>
        <input type='text' placeholder='Search...' className='search-input-field' />
        </form>

         {/* Button */}
         <Button variant="primary" className='mt-3 mr-3'><span>+</span> Add Customer</Button>

        {/* Delete Icon */}
        <div className='delete-btn mt-3 mr-3'>
        <img src="delete.png" alt="filter button"/>
      </div>
      
    </div>
  )
}

export default Header
