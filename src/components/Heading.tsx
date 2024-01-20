import React from 'react'
import { mainHeading, subHeading } from '../constants'
import './LoginPageStyle.css'

const Heading = () => {
  return (
    <div className='mb-4'>
      <div className='main-heading'>
        {mainHeading}
      </div>
      <div className='sub-heading'>
        {subHeading}
      </div>
    </div>
  )
}

export default Heading
