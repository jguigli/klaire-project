import { useState } from 'react'
import './App.css'
import { Form } from './components/Form'
import { List } from './components/List'
import { Stats } from './components/Stats'

function App() {

  return (
    <>
      <div className='h-screen flex flex-col items-center'>
        <div className='p-10 bg-gray-700 rounded-lg w-full'>
          <h1 className='text-2xl font-bold'> Dashboard </h1>
        </div>
          <div className='mt-10 flex bg-gray-800/50 rounded-lg p-10 w-full'>
            <Stats />
          </div>

        <div className='flex-1 flex flex-row justify-center items-start gap-20 p-10'>
          <div className='bg-gray-700 rounded-lg p-10 w-fit'>
            <Form />
          </div>
          <div className='bg-gray-700 rounded-lg p-10 w-fit'>
            <List />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
