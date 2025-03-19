import React from 'react'
import PageNotFoundImage from '../assets/page-not-found/Error404.jpg'

const PageNotFound = () => {
  return (
    <div className='w-full h-screen'>
        <div>
            <img className='w-full h-screen'  src={PageNotFoundImage}/>     
        </div>
    </div>
  )
}

export default PageNotFound