import {Route, Routes,} from  "react-router-dom"
import App from "../App"
import { Login } from "../components/auth/Login"
import { Signin } from "../components/auth/Signin"

const Router=()=>{

    return(
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Signin/>}/>
            </Route>
        </Routes>
    )
}

export default Router