import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const name = useRef()
  const pass = useRef()
  const email = useRef()
  return (
    <>
    <form className='flex justify-center flex-col mx-auto gap-4 w-max p-10' onSubmit={(e)=>{
      e.preventDefault()
        const saveUser = async() => {
            const {data} = await axios.post('http://localhost:3001/create',{
              email:email.current.value,
              password:pass.current.value,
              name:name.current.value
            })
            console.log(data);
        }
        saveUser()
    }}>
      <input type='text' ref={name} className='bg-slate-900 p-2 rounded ' placeholder='enter name' />
      <input type="email" ref={email} className='bg-slate-900 p-2 rounded '  id="email" placeholder='enter email' />
      <input type="password" ref={pass} className='bg-slate-900 p-2 rounded '  placeholder='enter pass' id="" />
      <input type="submit" className='bg-blue-400 p-2 rounded cursor-pointer hover:bg-red-500' value="Submit" />
    </form>
    </>
  )
}

export default App
