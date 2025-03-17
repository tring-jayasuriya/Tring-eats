import React from 'react'

export const TermsAndConditions = ({setShowterms,setPolicyCheck}) => {

    const handleAcceptTerms=()=>{
        setPolicyCheck(true)
        setShowterms(false)
    }

    const handleCancelTerms=()=>{
        setPolicyCheck(false)
        setShowterms(false)
    }

  return (
    <div className='inset-0 bg-blackop fixed'>
        <div className='flex justify-center items-center w-full h-full bg-transparent'>
            <div className='bg-white p-4 rounded-lg text-sm space-y-2'>
                <p className='font-bold text-lg text-center'>Terms And Conditions</p>
                <p className='font-semibold text-center text-base'>By using TringEats you agree to</p>
                <p>No cancellations after order confirmation </p>
                <p>Estimated delivery times may vary</p>
                <p> Refunds only for missing or incorrect items </p>
                <p>Safe & hygienic food from partner restaurants</p>
                <p>We value your privacy and security. Your data is protected</p>
                <div className='text-center space-x-3'>
                    <button className=' bg-green-500 text-white p-2 rounded-lg' onClick={()=>handleAcceptTerms()}>Accept</button>
                    <button className='text-white p-2 bg-red-500 rounded-lg' onClick={()=>handleCancelTerms()}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
  )
}
