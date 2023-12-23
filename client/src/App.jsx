import './app.css'
import Navbar from "./component/Navbar"
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Posts from './pages/Posts'
import Login from './pages/Login'
import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [user ,setUser] = useState(null)

  useEffect(()=> {
    const getUser = async() => {
     try{
        const user = await axios.get("http://localhost:8000/auth/login/success",{withCredentials:true})
        const res = user.data
        setUser(res)
     }
     catch(err){
      console.log(err)
     }
    }
    getUser()
  },[])
  
  return (
   <BrowserRouter>
      <div>
      <Navbar user={user}/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/post/:id' element={user ? <Posts/> :<Login/>}/>
        <Route path='/login' element={user ? <Home/> : <Login/>}/>
      </Routes>
      </div>
      </BrowserRouter>
  )
}

export default App
