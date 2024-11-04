import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {userid} = useParams()
  return (
    <div className='bg-orange-600 text-4xl text-center'>User : {userid}</div>
  )
}

export default User