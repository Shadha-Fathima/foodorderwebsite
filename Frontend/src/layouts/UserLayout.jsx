import React from 'react'
import { UserHeader } from '../components/user/userHeader'
import { Outlet } from 'react-router-dom'
import { UserFooter } from '../components/user/UserFooter'

export const UserLayout = () => {
  return (
    <div>
        <UserHeader/>
        <div className='min-h-96'>
            <Outlet/>
        </div>
        <UserFooter/>
    </div>
  )
}
