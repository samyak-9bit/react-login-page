import React from 'react'
import { mainHeading, subHeading } from '../strings'

const Heading = () => {
  return (
    <div>
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
