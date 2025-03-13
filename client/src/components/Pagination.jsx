import React, { useState } from 'react'

const Pagination = ({totalPage}) => {

    const [currPage,setCurrPage]=useState(1)
    const [Page,sePage]=useState(0)
    const group=Math.ceil(totalPage/6)

    // const startPage=

  return (
    <div>

        
    </div>
  )
}

export default Pagination