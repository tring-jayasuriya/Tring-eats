import { useLocation } from "react-router-dom"

export  const getPageUrl=()=>{
    const location=useLocation()
    const searchParams=new URLSearchParams(location.search)
    return parseInt(searchParams.get("page")) || 1
} 