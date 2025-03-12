import React from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

export const Home = () => {
  return (
    <div className='w-full min-h-screen h-full flex'>
        <SideBar/>
        <Outlet/>
    </div>
  )
}
