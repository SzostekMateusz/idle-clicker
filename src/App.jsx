import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import News from './components/News'
import LeftContent from './components/LeftContent'
import RightContent from './components/RightContent'


function App() {


  return (
    <div className='app-container'>
      <Navbar />
      <News />
      <div className='body-container'>
        <LeftContent />
        <RightContent />
      </div>
    </div> 
  )
}

export default App
