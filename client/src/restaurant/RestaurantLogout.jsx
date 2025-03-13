import React from 'react'
import { RestaurantPopUp } from './RestaurantPopUp'


const RestaurantLogout = () => {

    const message="Are you sure want to logout"

  return (
    <RestaurantPopUp message={message} flag={"logout"}/>
  )
}

export default RestaurantLogout