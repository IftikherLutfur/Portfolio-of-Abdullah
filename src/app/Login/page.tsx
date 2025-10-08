import LoginCard from '@/components/AuthPages/LoginPage'
import React from 'react'

export default function LoginPage() {
  return (
    <div className='py-5'>
      <h1 className="text-4xl font-bold text-black dark:text-white text-center">Login</h1>
      <LoginCard/>
    </div>
  )
}
