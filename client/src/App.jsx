import { ToastContainer } from 'react-toastify'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div>
      <ToastContainer autoClose={2000}  draggable />
      <Outlet/>
    </div>
  )
}

export default App
