import React from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { User } from '../components/User'

const dashboard = () => {
  return (
    <div>
      <Appbar/>
      <div className='m-8'>
        <Balance value={"10,000"}/>
        <User/>
      </div>
    </div>
  )
}

export default dashboard