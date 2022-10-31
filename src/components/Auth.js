import {useState} from 'react'
import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../store/authContext' 


const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   //use context to make data available throughout
    const authCtx = useContext(AuthContext)

   
 
   const submitHandler = e => {
       e.preventDefault()

       // data being captured 
       const body = {
        username,
        password
       }

       const url = 'https://socialmtn.devmountain.com'

       axios.post(register ? `${url}/register` : `${url}/login`, body)
       .then((res) => {
        console.log('AFTER AUTH', res.data)
        authCtx.login(res.data.token, res.data.exp, res.data.userId)
       })
       .catch(err => {
        console.log(err)
        setPassword('')
        setUsername('')
       })

       console.log('submitHandler called')
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                   className='form-input'/>
               <input
                    type='text'
                    placeholder='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                   className='form-input'/>
               <button className='form-btn' >
                {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth