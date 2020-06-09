import React,{useContext,useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext'

const Landing = (props) => {
  let {isAuthenticated, loadUser} = useContext(AuthContext)
   useEffect(()=>{
    loadUser()
    }
  ,
  // eslint-disable-next-line
  []) 
  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/')
    }
  },[isAuthenticated, props.history])
  return (
    <div>
      <h1>Welcome to my App</h1>
       
    </div>
  )
}

export default Landing
