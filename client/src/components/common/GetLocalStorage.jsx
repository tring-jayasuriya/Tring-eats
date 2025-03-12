

export const getLocalStorage=(name)=>{
    const data=JSON.parse(localStorage.getItem(name))
    return data
}

export const deleteLocalStorage=(name)=>{
    localStorage.removeItem(name)
}