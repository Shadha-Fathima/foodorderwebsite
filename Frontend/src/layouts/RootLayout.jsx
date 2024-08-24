import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { LoginPage } from '../pages/user/LoginPage'
import { Outlet } from 'react-router-dom'
import { UserHeader } from '../components/user/userHeader'
import { UserFooter } from '../components/user/UserFooter'

export const RootLayout = () => {
  return (
    <div className='min-h-screen bg-yellow flex flex-col'>
        <UserHeader/>
        <div className='min-h-96'>
        <Outlet/>

        </div>
        <UserFooter/>
    </div>
  )
}
