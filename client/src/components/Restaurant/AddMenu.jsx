// import { useMutation } from '@apollo/client'
import React from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
// import { ADD_MENU } from '../../graphql/mutation/restaurantMutation'
import { EditMenu } from './EditMenu'

const AddMenu = () => {

  return (
    
      <div className='w-full flex min-h-screen h-full justify-center pt-10'>
        <EditMenu data={null}  mode={"addMenu"} popup={null} /> 
      </div>
  )
}

export default AddMenu