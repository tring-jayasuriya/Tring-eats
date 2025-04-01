import React, { useContext, useState } from 'react'
import { ADD_MENU, DELETE_MENU, UPDATE_MENU } from '../../graphql/mutation/restaurantMutation'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { getLocalStorage } from '../common/GetLocalStorage'

import { RiDeleteBinLine } from "react-icons/ri";
import { RestaurantPopUp } from '../../restaurant/RestaurantPopUp'
import { UserContext } from '../../App'

export const EditMenu = ({data,mode,popup}) => {

    const [image,setImage]=useState(data?.image ||  null)
    const navigate=useNavigate()
    const [addMenu]=useMutation(ADD_MENU,{fetchPolicy:"no-cache"})
    const [updateMenu]=useMutation(UPDATE_MENU,{fetchPolicy:"no-cache"})
    const {restaurantData}=useContext(UserContext)

    const [deleteMenu]=useMutation(DELETE_MENU,{fetchPolicy:"no-cache"})

    const [DeleteMenu, setDeleteMenu]=useState(false)
    const [deleteId, setDeleteID]=useState(false)
    const message="Are you sure want to delete this menu"
  
    const {
          register,
          handleSubmit,
          formState:{errors},
          watch
      }=useForm({   
        defaultValues:data || {name:'',price:''}
      })

      const handleImage=(e)=>{
        const file=e.target.files[0]
        if(file){
  
            if(file.size > 5*1024*1024){
                toast.error("file size should be less than 5 mb")
                return
            }
  
            const imageUrl=URL.createObjectURL(file)
            console.log(imageUrl);
            
            setImage(imageUrl)
        }
      }

      const handleUpdateMenu=async(Data)=>{
            console.log("from handle update", Data);
            await updateMenu({variables:{name:Data.name, price:parseFloat(Data.price),image:image || Data.image, id:Data.id}})
            toast.success("menu updated successfully")
            popup(false)
      }

      const handleAddMenu=async(Data)=>{

            console.log("add menu log",Data,image);
            console.log(restaurantData);
            await addMenu({variables:{name:Data.name,price:parseFloat(Data.price),image:image,restaurantid:restaurantData.id }} )
            toast.success("item added successfully")
            navigate("/restaurant?type=dashboard")

      }

      const handleDelteMenu=(Data,e)=>{
        console.log("delete data", Data);
        
        e.stopPropagation()
        setDeleteID(Data.id)
        setDeleteMenu(true)
      }

      const onsubmit=(data)=>{
            console.log("on submit log");
            
            mode==="edit"? handleUpdateMenu(data) : handleAddMenu(data)
      }

        const handleConfirmDelete=async(id,e)=>{

            if(e){ 
                e.preventDefault()
                e.stopPropagation()
            }

            
            console.log("log from handle confirm delete >>>>>>>.",id);
            

            const {data:deleteRes} =await deleteMenu({variables:{id:id}})

            if(deleteRes?.deleteProductById){

              toast.success("item deleted successfully ")
              setDeleteMenu(false)
              editPopup(false)
              navigate("/restaurant?type=dashboard")
            }
          }

  
    return (
    
          <form className='w-[50%] space-y-4 ' onSubmit={handleSubmit(onsubmit)}>
            <p className='text-center text-lg'>{mode=="edit" ?"Edit Menu" : "Add menu"}</p>
  
            <div>
              <p className=' auth-label'>Dish name</p>
              <input type='text' className='input-field ' placeholder='Enter dish' {...register("name",{required:"Dish name is required",
                minLength: { 
                  value: 3, 
                  message: "Must contain atleast 3 characters" 
                } 
              })} />
              {(errors.name &&  <p className="error-msg pt-1" >{errors.name.message} </p>) }
            </div>
  
            <div>
              <p className=' auth-label'>Price</p>
  
              <input type='text' className='input-field' placeholder='Enter price' {...register("price",{required:"Price is required",
                    pattern: { 
                    value: /^\d+(\.\d{1,2})?$/, 
                    message: "Only numbers are allowed" 
                }
              })}/>
  
              {(errors.price &&  <p className="error-msg pt-1" >{errors.price.message} </p>) }
            </div>
  
            <div className='py-4 flex justify-between' >
              <label className='input-field cursor-pointer bg-white max-w-fit' htmlFor='dish-image'>choose image</label>
              <input onChange={(e)=>handleImage(e)} id="dish-image" type='file' accept='image/*' className='hidden'/>

              {
                mode==="edit" && 

                <div  className='flex items-center cursor-pointer  input-field max-w-fit space-x-3 text-red-600 bg-white  '>
                    <button type='button' onClick={(e)=>handleDelteMenu(data,e)}>Delete</button>
                    <RiDeleteBinLine className='text-lg'/>
                </div>
              }

              
            </div>
  
            {
              image && 
              <div className='text-sm space-y-2'>
                <p>Image preview</p>
                <img className='w-full h-44 rounded-lg'  src={image} />
              </div>
            }
  
            <button type='submit' className='input-field bg-mango'>{mode=="edit"? "Edit ":"Add"}</button>

            {
                DeleteMenu && <RestaurantPopUp message={message} flag={"delete"} id={deleteId} editPopup={setDeleteMenu} handleConfirmDelete={handleConfirmDelete}/>   
            }
  
          </form>
    )

}
